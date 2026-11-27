
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({
      error: "Falta configurar DATABASE_URL en Vercel",
    });
  }

  try {
    // CONSULTAR CAPACITACIONES
    if (req.method === "GET") {
      const { id, empleadoId, estado } = req.query;

      if (id) {
        const cap = await pool.query(
          `SELECT * FROM capacitaciones
           WHERE id = $1 AND estado <> 'eliminada'`,
          [id]
        );

        if (!cap.rows.length) {
          return res.status(404).json({
            error: "Capacitación no encontrada",
          });
        }

        const capacitacion = cap.rows[0];

        const archivos = await pool.query(
          `SELECT * FROM capacitacion_archivos
           WHERE capacitacion_id = $1`,
          [id]
        );

        const preguntas = await pool.query(
          `SELECT p.id, p.pregunta, p.orden,
             COALESCE(
               json_agg(
                 json_build_object(
                   'id', o.id,
                   'opcion', o.opcion,
                   'puntaje', o.puntaje,
                   'orden', o.orden
                 ) ORDER BY o.orden
               ) FILTER (WHERE o.id IS NOT NULL),
               '[]'
             ) AS opciones
           FROM capacitacion_preguntas p
           LEFT JOIN capacitacion_opciones o
             ON o.pregunta_id = p.id
           WHERE p.capacitacion_id = $1
           GROUP BY p.id
           ORDER BY p.orden`,
          [id]
        );

        const destinatarios = await pool.query(
          `SELECT * FROM capacitacion_destinatarios
           WHERE capacitacion_id = $1
           ORDER BY empleado_nombre`,
          [id]
        );

        return res.status(200).json({
          capacitacion,
          archivos: archivos.rows,
          preguntas: preguntas.rows,
          destinatarios: destinatarios.rows,
        });
      }

      if (empleadoId) {
        const result = await pool.query(
          `SELECT c.*, d.id AS destinatario_id,
             d.estado AS estado_empleado,
             d.empleado_cargo
           FROM capacitacion_destinatarios d
           JOIN capacitaciones c
             ON c.id = d.capacitacion_id
           WHERE d.empleado_id = $1
             AND c.estado = 'activa'
           ORDER BY c.fecha_evaluacion ASC`,
          [String(empleadoId)]
        );

        return res.status(200).json(result.rows);
      }

      let sql = `
        SELECT c.*,
          COUNT(d.id)::int AS total_empleados,
          COUNT(d.id) FILTER (
            WHERE d.estado = 'completada'
          )::int AS completadas
        FROM capacitaciones c
        LEFT JOIN capacitacion_destinatarios d
          ON d.capacitacion_id = c.id
        WHERE c.estado = 'activa'
      `;

      const params = [];

      if (estado === "finalizadas") {
        sql += ` GROUP BY c.id
          HAVING COUNT(d.id) > 0
          AND COUNT(d.id) FILTER (
            WHERE d.estado = 'completada'
          ) = COUNT(d.id)
          ORDER BY c.creado_en DESC`;
      } else {
        sql += ` GROUP BY c.id
          ORDER BY c.creado_en DESC`;
      }

      const result = await pool.query(sql, params);

      return res.status(200).json(result.rows);
    }

    // CREAR CAPACITACIÓN
    if (req.method === "POST") {
      const body = req.body || {};

      if (body.accion === "crear") {
        const c = body.capacitacion || {};
        const destinatarios = body.destinatarios || [];
        const archivos = body.archivos || [];
        const preguntas = body.preguntas || [];

        if (
          !c.titulo ||
          !c.fechaEvaluacion ||
          !["operarios", "administrativos", "todos"].includes(c.audiencia)
        ) {
          return res.status(400).json({
            error: "Faltan datos obligatorios de la capacitación",
          });
        }

        if (!destinatarios.length) {
          return res.status(400).json({
            error: "Debes asignar al menos un empleado",
          });
        }

        if (!preguntas.length) {
          return res.status(400).json({
            error: "Debes crear al menos una pregunta",
          });
        }

        const client = await pool.connect();

        try {
          await client.query("BEGIN");

          const nueva = await client.query(
            `INSERT INTO capacitaciones
              (titulo, descripcion, contenido, audiencia,
               fecha_evaluacion, creado_por)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [
              c.titulo,
              c.descripcion || "",
              c.contenido || "",
              c.audiencia,
              c.fechaEvaluacion,
              c.creadoPor || "",
            ]
          );

          const cap = nueva.rows[0];

          for (const d of destinatarios) {
            await client.query(
              `INSERT INTO capacitacion_destinatarios
                (capacitacion_id, empleado_id,
                 empleado_nombre, empleado_cargo, etiqueta)
               VALUES ($1, $2, $3, $4, $5)
               ON CONFLICT (capacitacion_id, empleado_id)
               DO NOTHING`,
              [
                cap.id,
                String(d.empleadoId),
                d.empleadoNombre,
                d.empleadoCargo,
                d.etiqueta,
              ]
            );
          }

          for (const a of archivos) {
            if (!a.url || !["imagen", "video"].includes(a.tipo)) {
              throw new Error("Archivo multimedia no válido");
            }

            await client.query(
              `INSERT INTO capacitacion_archivos
                (capacitacion_id, tipo, url, nombre)
               VALUES ($1, $2, $3, $4)`,
              [cap.id, a.tipo, a.url, a.nombre || ""]
            );
          }

          for (let i = 0; i < preguntas.length; i++) {
            const p = preguntas[i];

            if (!p.pregunta || !Array.isArray(p.opciones) ||
                p.opciones.length < 2) {
              throw new Error("Cada pregunta necesita al menos dos opciones");
            }

            const pregunta = await client.query(
              `INSERT INTO capacitacion_preguntas
                (capacitacion_id, pregunta, orden)
               VALUES ($1, $2, $3)
               RETURNING id`,
              [cap.id, p.pregunta, i + 1]
            );

            for (let j = 0; j < p.opciones.length; j++) {
              const o = p.opciones[j];

              if (!o.opcion || !Number.isFinite(Number(o.puntaje))) {
                throw new Error("Hay una opción o puntaje no válido");
              }

              await client.query(
                `INSERT INTO capacitacion_opciones
                  (pregunta_id, opcion, puntaje, orden)
                 VALUES ($1, $2, $3, $4)`,
                [
                  pregunta.rows[0].id,
                  o.opcion,
                  Number(o.puntaje),
                  j + 1,
                ]
              );
            }
          }

          await client.query("COMMIT");

          return res.status(201).json({
            ok: true,
            capacitacion: cap,
          });
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }
      }

      // ENVIAR EVALUACIÓN
      if (body.accion === "responder") {
        const { destinatarioId, respuestas } = body;

        if (!destinatarioId || !Array.isArray(respuestas)) {
          return res.status(400).json({
            error: "Faltan los datos de la evaluación",
          });
        }

        const client = await pool.connect();

        try {
          await client.query("BEGIN");

          const destino = await client.query(
            `SELECT * FROM capacitacion_destinatarios
             WHERE id = $1 FOR UPDATE`,
            [destinatarioId]
          );

          if (!destino.rows.length) {
            await client.query("ROLLBACK");
            return res.status(404).json({
              error: "Asignación no encontrada",
            });
          }

          if (destino.rows[0].estado === "completada") {
            await client.query("ROLLBACK");
            return res.status(409).json({
              error: "Esta evaluación ya fue enviada",
            });
          }

          const capId = destino.rows[0].capacitacion_id;

          const preguntas = await client.query(
            `SELECT p.id,
               MAX(o.puntaje) AS maximo
             FROM capacitacion_preguntas p
             JOIN capacitacion_opciones o
               ON o.pregunta_id = p.id
             WHERE p.capacitacion_id = $1
             GROUP BY p.id`,
            [capId]
          );

          if (respuestas.length !== preguntas.rows.length) {
            throw new Error("Debes responder todas las preguntas");
          }

          let puntos = 0;
          let maximos = 0;

          const detalles = [];

          for (const p of preguntas.rows) {
            const respuesta = respuestas.find(
              (r) => r.preguntaId === p.id
            );

            if (!respuesta) {
              throw new Error("Falta una respuesta");
            }

            const opcion = await client.query(
              `SELECT o.id, o.puntaje
               FROM capacitacion_opciones o
               JOIN capacitacion_preguntas p
                 ON p.id = o.pregunta_id
               WHERE o.id = $1
                 AND p.id = $2
                 AND p.capacitacion_id = $3`,
              [respuesta.opcionId, p.id, capId]
            );

            if (!opcion.rows.length) {
              throw new Error("Una opción seleccionada no es válida");
            }

            const puntaje = Number(opcion.rows[0].puntaje);

            puntos += puntaje;
            maximos += Number(p.maximo);

            detalles.push({
              preguntaId: p.id,
              opcionId: opcion.rows[0].id,
              puntaje,
            });
          }

          const porcentaje = maximos > 0
            ? (puntos / maximos) * 100
            : 0;

          const resultado = await client.query(
            `INSERT INTO capacitacion_respuestas
              (destinatario_id, puntos_obtenidos,
               puntos_maximos, porcentaje)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [destinatarioId, puntos, maximos, porcentaje]
          );

          for (const d of detalles) {
            await client.query(
              `INSERT INTO capacitacion_respuesta_detalle
                (respuesta_id, pregunta_id, opcion_id,
                 puntaje_obtenido)
               VALUES ($1, $2, $3, $4)`,
              [
                resultado.rows[0].id,
                d.preguntaId,
                d.opcionId,
                d.puntaje,
              ]
            );
          }

          await client.query(
            `UPDATE capacitacion_destinatarios
             SET estado = 'completada',
                 completado_en = NOW()
             WHERE id = $1`,
            [destinatarioId]
          );

          await client.query("COMMIT");

          return res.status(201).json({
            ok: true,
            resultado: resultado.rows[0],
          });
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }
      }

      return res.status(400).json({
        error: "Acción POST no reconocida",
      });
    }

    // EDITAR CAPACITACIÓN
    if (req.method === "PUT") {
      const { id, titulo, descripcion, contenido, fechaEvaluacion } =
        req.body || {};

      if (!id || !titulo || !fechaEvaluacion) {
        return res.status(400).json({
          error: "Faltan datos para editar",
        });
      }

      const existe = await pool.query(
        `SELECT COUNT(*)::int AS total
         FROM capacitacion_respuestas r
         JOIN capacitacion_destinatarios d
           ON d.id = r.destinatario_id
         WHERE d.capacitacion_id = $1`,
        [id]
      );

      if (existe.rows[0].total > 0) {
        return res.status(409).json({
          error: "No se puede editar: ya existen evaluaciones enviadas",
        });
      }

      const result = await pool.query(
        `UPDATE capacitaciones
         SET titulo = $2,
             descripcion = $3,
             contenido = $4,
             fecha_evaluacion = $5,
             actualizado_en = NOW()
         WHERE id = $1 AND estado = 'activa'
         RETURNING *`,
        [id, titulo, descripcion || "", contenido || "", fechaEvaluacion]
      );

      if (!result.rows.length) {
        return res.status(404).json({
          error: "Capacitación no encontrada",
        });
      }

      return res.status(200).json({
        ok: true,
        capacitacion: result.rows[0],
      });
    }

    // ELIMINAR CAPACITACIÓN (BAJA LÓGICA)
    if (req.method === "DELETE") {
      const id = req.query?.id || req.body?.id;

      if (!id) {
        return res.status(400).json({
          error: "Falta el ID de la capacitación",
        });
      }

      await pool.query(
        `UPDATE capacitaciones
         SET estado = 'eliminada',
             actualizado_en = NOW()
         WHERE id = $1`,
        [id]
      );

      return res.status(200).json({
        ok: true,
        deletedId: id,
      });
    }

    return res.status(405).json({
      error: "Método no permitido",
    });

  } catch (error) {
    console.error("Error en /api/capacitaciones:", error);

    return res.status(500).json({
      error: "Error interno del servidor",
      detail: error.message,
    });
  }
}

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: "Falta configurar DATABASE_URL en Vercel" });
  }

  try {
    if (req.method === "GET") {
      const { empleadoId, estado } = req.query;
      let query = "SELECT * FROM jornadas WHERE 1=1";
      const params = [];

      if (empleadoId) {
        params.push(String(empleadoId));
        query += ` AND empleado_id = $${params.length}`;
      }
      if (estado) {
        params.push(String(estado));
        query += ` AND estado = $${params.length}`;
      }

      query += " ORDER BY fecha DESC, hora_inicio DESC";
      const result = await pool.query(query, params);
      return res.status(200).json(result.rows);
    }

    if (req.method === "POST") {
      const j = req.body || {};
      if (!j.id || !j.empleadoId || !j.fecha || !j.cliente || !j.direccion || !j.horaInicio) {
        return res.status(400).json({ error: "Faltan campos obligatorios de la jornada" });
      }

      const fotosNovNormalizadas = Array.isArray(j.fotosNovedades) ? j.fotosNovedades : [];
      const calculoNormalizado =
        j.calculo && typeof j.calculo === "object" ? JSON.stringify(j.calculo) : null;
      const salarioGuardar = Number(j.salario) > 0 ? Number(j.salario) : 1753000;

      const sql = `
        INSERT INTO jornadas (
          id, empleado_id, empleado_nombre, salario, fecha, mes_clave,
          cliente, direccion, hora_inicio, foto_inicio, estado,
          hora_fin, foto_fin, almuerzo_min, observaciones,
          fotos_novedades, calculo, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11,
          $12, $13, $14, $15,
          $16::jsonb, $17::jsonb, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          empleado_id = EXCLUDED.empleado_id,
          empleado_nombre = EXCLUDED.empleado_nombre,
          salario = EXCLUDED.salario,
          fecha = EXCLUDED.fecha,
          mes_clave = EXCLUDED.mes_clave,
          cliente = EXCLUDED.cliente,
          direccion = EXCLUDED.direccion,
          hora_inicio = EXCLUDED.hora_inicio,
          foto_inicio = COALESCE(EXCLUDED.foto_inicio, jornadas.foto_inicio),
          estado = EXCLUDED.estado,
          hora_fin = EXCLUDED.hora_fin,
          foto_fin = COALESCE(EXCLUDED.foto_fin, jornadas.foto_fin),
          almuerzo_min = EXCLUDED.almuerzo_min,
          observaciones = EXCLUDED.observaciones,
          fotos_novedades = EXCLUDED.fotos_novedades,
          calculo = EXCLUDED.calculo,
          updated_at = NOW()
        RETURNING *;
      `;

      const values = [
        String(j.id),
        String(j.empleadoId),
        String(j.empleadoNombre || ""),
        salarioGuardar,
        String(j.fecha),
        String(j.mesClave || String(j.fecha).slice(0, 7)),
        String(j.cliente),
        String(j.direccion),
        String(j.horaInicio),
        j.fotoInicio || null,
        String(j.estado || "abierta"),
        j.horaFin || null,
        j.fotoFin || null,
        j.almuerzoMin === null || j.almuerzoMin === undefined ? 0 : Number(j.almuerzoMin),
        String(j.observaciones || ""),
        JSON.stringify(fotosNovNormalizadas),
        calculoNormalizado,
      ];

      const result = await pool.query(sql, values);
      return res.status(200).json({ ok: true, jornada: result.rows[0] });
    }

    if (req.method === "DELETE") {
      const id = req.query?.id || req.body?.id;
      if (!id) {
        return res.status(400).json({ error: "Falta el id de la jornada a eliminar" });
      }
      await pool.query("DELETE FROM jornadas WHERE id = $1", [String(id)]);
      return res.status(200).json({ ok: true, deletedId: String(id) });
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (err) {
    console.error("Error en /api/jornadas:", err);
    return res.status(500).json({ error: "Error interno del servidor", detail: err.message });
  }
}

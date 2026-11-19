// ==========================================
// CONFIGURACIÓN, ROLES Y LEGISLACIÓN
// ==========================================
const DIVISOR_MENSUAL = 210; // Divisor legal Colombia 2026 (42 horas semanales)

// Festivos Oficiales Colombia (2026)
const FESTIVOS_COLOMBIA = new Set([
  "2026-01-01", "2026-01-12", "2026-03-23", "2026-04-02", "2026-04-03",
  "2026-05-01", "2026-05-18", "2026-06-08", "2026-06-15", "2026-06-29",
  "2026-07-20", "2026-08-07", "2026-08-17", "2026-10-12", "2026-11-02",
  "2026-11-16", "2026-12-08", "2026-12-25"
]);

// Personal Autorizado (Operarios, Redes, Contabilidad y Admin)
let authorizedOperators = [
  { phone: "3204618830", pin: "1934", name: "Tatiana Ruiz", role: "operario_horas", salary: 1750905 },
  { phone: "3000000000", pin: "2034", name: "Liliana Guzmán", role: "contabilidad", salary: 0 },
  { phone: "3217293985", pin: "1834", name: "Carolina Valencia", role: "admin", salary: 2500000 },
  { phone: "3218468761", pin: "1118", name: "Danilo", role: "redes", salary: 0 },
  { phone: "3215617856", pin: "1824", name: "Cristian Camilo Rodas Grajales", role: "operario", salary: 1750905 },
  { phone: "3224032093", pin: "8752", name: "Daniel Antonio Rodas Jaramillo", role: "operario", salary: 1750905 },
  { phone: "3153722857", pin: "7629", name: "Diógenes Marín Franco", role: "operario", salary: 1750905 },
  { phone: "3107630014", pin: "1278", name: "Duban Alberto Rodriguez Castañeda", role: "operario", salary: 1750905 },
  { phone: "3122686744", pin: "3468", name: "Edixon Giovanni Alvarado Villada", role: "operario", salary: 1750905 },
  { phone: "3113099973", pin: "6936", name: "Giovanni Antonio Ocampo Cano", role: "operario", salary: 1750905 },
  { phone: "3102369528", pin: "1472", name: "Héctor Augusto Cardona Arboleda", role: "operario", salary: 1750905 },
  { phone: "3213676599", pin: "2936", name: "Jhon Edwin Botero Rodas", role: "operario", salary: 1750905 },
  { phone: "3137374691", pin: "3427", name: "Jair Antonio Ramirez García", role: "operario", salary: 1750905 },
  { phone: "3145299065", pin: "2509", name: "Javier de Jesús Restrepo Ladino", role: "operario", salary: 1750905 },
  { phone: "3206499919", pin: "6358", name: "Jhon Edier Castrillon Gallego", role: "operario", salary: 1750905 },
  { phone: "3053534019", pin: "9351", name: "Jhon Ever Orejuela Ríos", role: "operario", salary: 1750905 },
  { phone: "3209363345", pin: "8261", name: "Jhonathan Arredondo Ossa", role: "operario", salary: 1750905 },
  { phone: "3043488345", pin: "3067", name: "Jonathan Alexander Martínez Betancourt", role: "operario", salary: 1750905 },
  { phone: "3218986200", pin: "1682", name: "Jorge Miguel Gonzáles Vásquez", role: "operario", salary: 1750905 },
  { phone: "3146105449", pin: "5941", name: "Juan Daniel Gómez Morales", role: "operario", salary: 1750905 },
  { phone: "3145749402", pin: "4736", name: "Juan José Arango Gallego", role: "operario", salary: 1750905 },
  { phone: "3147861372", pin: "3195", name: "Luis Fernando Tangarife Moncada", role: "operario", salary: 1750905 },
  { phone: "3138098395", pin: "1028", name: "Maico Andrey Trejos Chaves", role: "operario", salary: 1750905 },
  { phone: "3115653390", pin: "8950", name: "Milton Andrés Pérez Neva", role: "operario", salary: 1750905 },
  { phone: "3027507045", pin: "9760", name: "Santiago Rivera Marin", role: "operario", salary: 1750905 },
  { phone: "3148643257", pin: "3268", name: "Uriel González Ocampo", role: "operario", salary: 1750905 },
  { phone: "319200041",  pin: "7780", name: "Víctor Fernando Ocampo Amaya", role: "operario", salary: 1750905 },
  { phone: "3228241425", pin: "1520", name: "Wilfer Alberto Sepulveda Restrepo", role: "operario", salary: 1750905 },
  { phone: "3206311945", pin: "1764", name: "Willer Alexis Quintero Hurtado", role: "operario", salary: 1750905 },
  { phone: "3105385889", pin: "7841", name: "Wilmar Diovany Muñoz Giraldo", role: "operario", salary: 1750905 },
  { phone: "3102276487", pin: "7926", name: "Yeison Alberson Morales Uribe", role: "operario", salary: 1750905 }
];

// Tareas por defecto
let defaultMockTasks = [
  {
    id: "1045",
    cliente: "INFRASCTRUCTURAS S.A.S",
    direccion: "Av. 30 de Agosto #45-12",
    maquinaria: "AY23",
    ciudad: "PEREIRA",
    estado: "pendiente"
  },
  {
    id: "1046",
    cliente: "ECOPETROL S.A.",
    direccion: "Planta La Virginia Km 2",
    maquinaria: "AY05",
    ciudad: "LA VIRGINIA",
    estado: "pendiente"
  }
];

// Variables globales de estado
let totalDaysCreated = 0;
let currentActiveTaskId = null;
let currentDaysData = [];
let fotosDiaTemporal = [];
let fotoInicioStamped = "";
let fotoFinStamped = "";
let fotosNovedadesStamped = [];
let ultimoReporteFilasConta = [];
let ultimoReporteTotalesConta = { horas: 0, valor: 0 };
let ultimaJornadaAbiertaId = null;
let tabRedesActiva = "pendientes";

// ==========================================
// CONTROL DE CONECTIVIDAD
// ==========================================
window.addEventListener("online", handleNetworkChange);
window.addEventListener("offline", handleNetworkChange);

function handleNetworkChange() {
  if (navigator.onLine) {
    processOfflineQueue();
  }
}

function processOfflineQueue() {
  const pendingSync = JSON.parse(localStorage.getItem("ayax_sync_queue")) || [];
  if (pendingSync.length > 0) {
    setTimeout(() => {
      localStorage.removeItem("ayax_sync_queue");
    }, 1500);
  }
}

// ==========================================
// AUTENTICACIÓN, SESIÓN Y CONTROL POR ROL
// ==========================================
function normalizarTexto(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function esUsuarioTatianaHoras(usuario) {
  if (!usuario) return false;
  const rol = normalizarTexto(usuario.role);
  const nombre = normalizarTexto(usuario.name);
  return rol === "operario_horas" && nombre.includes("tatiana");
}

function loginUser(phone, pin) {
  const cleanPhone = String(phone || "").trim();
  const cleanPin = String(pin || "").trim();

  const operador = authorizedOperators.find(
    (op) => String(op.phone).trim() === cleanPhone && String(op.pin).trim() === cleanPin
  );

  if (!operador) {
    alert("Teléfono o PIN incorrecto. Por favor verifique.");
    return null;
  }

  localStorage.setItem("usuario_activo", JSON.stringify(operador));

  const loginScreen = document.getElementById("loginScreen");
  const appContainer = document.getElementById("app");
  const userBadgeSpan = document.querySelector("#userBadge span");

  if (userBadgeSpan) userBadgeSpan.textContent = operador.name;
  if (loginScreen) loginScreen.classList.add("hidden");
  if (appContainer) appContainer.classList.remove("hidden");

  configurarVistaPorRol(operador);
  return operador;
}

function handleLogin() {
  const phoneVal = document.getElementById("loginPhone")?.value || "";
  const pinVal = document.getElementById("loginPin")?.value || "";
  return loginUser(phoneVal, pinVal);
}

function logoutUser() {
  localStorage.removeItem("usuario_activo");
  localStorage.removeItem("token_sesion");

  const loginPhone = document.getElementById("loginPhone");
  const loginPin = document.getElementById("loginPin");
  const dropdown = document.getElementById("userDropdownMenu");
  const appContainer = document.getElementById("app");
  const loginScreen = document.getElementById("loginScreen");

  if (loginPhone) loginPhone.value = "";
  if (loginPin) loginPin.value = "";
  if (dropdown) dropdown.classList.add("hidden");
  if (appContainer) appContainer.classList.add("hidden");
  if (loginScreen) loginScreen.classList.remove("hidden");
}

function setVisibilidadTab(tabKey, visible) {
  const cap = tabKey.charAt(0).toUpperCase() + tabKey.slice(1);
  const btn = document.getElementById(`btnTab${cap}`);
  const sec = document.getElementById(`sec${cap}`);

  if (btn) {
    btn.classList.toggle("hidden", !visible);
    btn.style.display = visible ? "" : "none";
  }
  if (sec && !visible) {
    sec.classList.add("hidden");
    sec.classList.remove("active");
  }
}

function configurarVistaPorRol(usuario) {
  if (!usuario) return;

  const rol = normalizarTexto(usuario.role);
  const nombre = normalizarTexto(usuario.name);

  const esTatiana = esUsuarioTatianaHoras(usuario);
  const esRedes = rol === "redes" || nombre.includes("danilo");
  const esConta = rol === "contabilidad" || nombre.includes("liliana");
  const esAdmin = rol === "admin" || rol === "administrador";

  setVisibilidadTab("horas", esTatiana);
  setVisibilidadTab("diasRegistrados", esTatiana);
  setVisibilidadTab("historial", esTatiana);

  setVisibilidadTab("pendientes", !esTatiana && !esConta);
  setVisibilidadTab("finalizadas", !esTatiana && !esConta);
  setVisibilidadTab("contabilidad", esConta || esAdmin);

  if (esTatiana) {
    switchTab("horas");
    return;
  }
  if (esConta) {
    switchTab("contabilidad");
    return;
  }
  if (esRedes) {
    switchTab("finalizadas");
    renderPanelRedesParaDanilo();
    return;
  }
  switchTab("pendientes");
}

// ==========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  verificarModoMantenimiento();
  purgeSyncedTasks();

  const formLogin = document.getElementById("loginForm") || document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const phoneVal = document.getElementById("loginPhone")?.value || "";
      const pinVal = document.getElementById("loginPin")?.value || "";
      loginUser(phoneVal, pinVal);
    });
  }

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      logoutUser();
    });
  }

  window.addEventListener("click", (e) => {
    const dropdown = document.getElementById("userDropdownMenu");
    const badge = document.getElementById("userBadge");
    if (dropdown && badge && !badge.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });

  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db"));
  if (!savedTasks || savedTasks.length === 0) {
    localStorage.setItem("ayax_tasks_db", JSON.stringify(defaultMockTasks));
  }

  const today = new Date();
  const hoyStr = obtenerFechaLocalYYYYMMDD(today);
  const firstDay = obtenerFechaLocalYYYYMMDD(new Date(today.getFullYear(), today.getMonth(), 1));
  const lastDay = obtenerFechaLocalYYYYMMDD(new Date(today.getFullYear(), today.getMonth() + 1, 0));

  if (document.getElementById("pdfStartDate")) document.getElementById("pdfStartDate").value = firstDay;
  if (document.getElementById("pdfEndDate")) document.getElementById("pdfEndDate").value = lastDay;
  if (document.getElementById("jornada-fecha")) document.getElementById("jornada-fecha").value = hoyStr;
  if (document.getElementById("filtro-fecha-inicio-conta")) document.getElementById("filtro-fecha-inicio-conta").value = firstDay;
  if (document.getElementById("filtro-fecha-fin-conta")) document.getElementById("filtro-fecha-fin-conta").value = lastDay;

  initEventListenersHoras();

  const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo"));
  if (usuarioActivo) {
    const loginScreen = document.getElementById("loginScreen");
    const appContainer = document.getElementById("app");
    const userBadgeSpan = document.querySelector("#userBadge span");

    if (loginScreen) loginScreen.classList.add("hidden");
    if (appContainer) appContainer.classList.remove("hidden");
    if (userBadgeSpan) userBadgeSpan.textContent = usuarioActivo.name;

    configurarVistaPorRol(usuarioActivo);
  }
});

function toggleUserMenu() {
  const dropdown = document.getElementById("userDropdownMenu");
  if (dropdown) dropdown.classList.toggle("hidden");
}

function verificarModoMantenimiento() {
  const enMantenimiento = false;
  const pantallaMantenimiento = document.getElementById("maintenance-screen");
  const appContainer = document.getElementById("app");
  const loginScreen = document.getElementById("loginScreen");

  if (enMantenimiento && pantallaMantenimiento) {
    pantallaMantenimiento.style.display = "flex";
    if (appContainer) appContainer.classList.add("hidden");
    if (loginScreen) loginScreen.classList.add("hidden");
  } else if (pantallaMantenimiento) {
    pantallaMantenimiento.style.display = "none";
  }
}

function switchTab(tab) {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo"));
  const tabsSoloTatiana = ["horas", "diasRegistrados", "historial"];
  if (tabsSoloTatiana.includes(tab) && !esUsuarioTatianaHoras(usuarioActivo)) {
    tab = "pendientes";
  }

  const tabs = ["pendientes", "horas", "diasRegistrados", "historial", "finalizadas", "contabilidad"];
  tabs.forEach((t) => {
    const cap = t.charAt(0).toUpperCase() + t.slice(1);
    const btn = document.getElementById(`btnTab${cap}`);
    const sec = document.getElementById(`sec${cap}`);
    if (btn) btn.classList.toggle("active", t === tab);
    if (sec) {
      sec.classList.toggle("hidden", t !== tab);
      sec.classList.toggle("active", t === tab);
    }
  });

  if (tab === "pendientes") renderTasks();
  if (tab === "horas") renderVistaJornada();
  if (tab === "diasRegistrados") renderListaDiasRegistrados();
  if (tab === "historial") renderCarpetasHistorial();
  if (tab === "finalizadas") filterFinalized();
  if (tab === "contabilidad") renderReporteContabilidad();
}

function horaActualHHMM() {
  const ahora = new Date();
  return `${String(ahora.getHours()).padStart(2, "0")}:${String(ahora.getMinutes()).padStart(2, "0")}`;
}

function obtenerFechaLocalYYYYMMDD(dateObj = new Date()) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatearFechaDDMMAAAA(fechaStr) {
  if (!fechaStr || !fechaStr.includes("-")) return fechaStr || "";
  const [y, m, d] = fechaStr.split("-");
  return `${d}/${m}/${y}`;
}

function obtenerClaveMes(fechaStr) {
  if (!fechaStr || fechaStr.length < 7) return obtenerFechaLocalYYYYMMDD().slice(0, 7);
  return fechaStr.slice(0, 7);
}

function formatearNombreMes(claveMes) {
  const [y, m] = claveMes.split("-").map(Number);
  const nombres = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const nombreMes = nombres[(m || 1) - 1] || "Mes";
  return `${nombreMes} ${y} (${claveMes})`;
}

// ==========================================
// FLUJO DE JORNADA, DÍAS REGISTRADOS E HISTORIAL (TATIANA)
// ==========================================
function initEventListenersHoras() {
  const acordeon = document.getElementById("acordeon-apertura-jornada");
  if (acordeon) {
    acordeon.addEventListener("toggle", () => {
      actualizarTituloAcordeonDia();
    });
  }

  const fotoInicioInput = document.getElementById("foto-inicio-file");
  if (fotoInicioInput) {
    fotoInicioInput.addEventListener("change", () => {
      const file = fotoInicioInput.files[0];
      if (!file) return;
      const horaAuto = horaActualHHMM();
      document.getElementById("jornada-hora-inicio").value = horaAuto;
      document.getElementById("hora-inicio-badge").innerText = `Hora asignada automáticamente: ${horaAuto}`;
      refrescarSelloInicioJornada();
    });
  }

  const fotoFinInput = document.getElementById("foto-fin-file");
  if (fotoFinInput) {
    fotoFinInput.addEventListener("change", () => {
      const file = fotoFinInput.files[0];
      if (!file) return;
      const horaAuto = horaActualHHMM();
      document.getElementById("jornada-hora-fin").value = horaAuto;
      document.getElementById("hora-fin-badge").innerText = `Hora asignada automáticamente: ${horaAuto}`;
      refrescarSelloFinJornada();
    });
  }

  const formInicio = document.getElementById("form-inicio-jornada");
  if (formInicio) {
    formInicio.addEventListener("submit", (e) => {
      e.preventDefault();
      guardarAperturaJornada();
    });
  }

  const formCierre = document.getElementById("form-cierre-jornada");
  if (formCierre) {
    formCierre.addEventListener("submit", (e) => {
      e.preventDefault();
      guardarCierreJornada();
    });
  }

  const btnCamNov = document.getElementById("btn-camara-nov");
  if (btnCamNov) btnCamNov.addEventListener("click", () => document.getElementById("input-camara-nov").click());

  const btnGalNov = document.getElementById("btn-galeria-nov");
  if (btnGalNov) btnGalNov.addEventListener("click", () => document.getElementById("input-galeria-nov").click());

  const inCamNov = document.getElementById("input-camara-nov");
  if (inCamNov) inCamNov.addEventListener("change", (e) => {
    if (e.target.files.length) procesarArchivosNovedad(e.target.files);
    e.target.value = "";
  });

  const inGalNov = document.getElementById("input-galeria-nov");
  if (inGalNov) inGalNov.addEventListener("change", (e) => {
    if (e.target.files.length) procesarArchivosNovedad(e.target.files);
    e.target.value = "";
  });
}

function obtenerUltimaJornadaAbiertaUsuario() {
  const user = JSON.parse(localStorage.getItem("usuario_activo"));
  if (!user) return null;
  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
  const abiertas = dbJornadas.filter((j) => j.estado === "abierta" && j.empleadoId === user.phone);
  if (ultimaJornadaAbiertaId) {
    const encontrada = abiertas.find((j) => j.id === ultimaJornadaAbiertaId);
    if (encontrada) return encontrada;
  }
  return abiertas.length ? abiertas[abiertas.length - 1] : null;
}

function actualizarTituloAcordeonDia() {
  const acordeon = document.getElementById("acordeon-apertura-jornada");
  const titulo = document.getElementById("titulo-acordeon-dia");
  const btnElim = document.getElementById("btn-eliminar-apertura-activa");
  if (!acordeon || !titulo) return;

  const abierta = obtenerUltimaJornadaAbiertaUsuario();
  titulo.innerText = "1. Abrir Jornada de Trabajo";
  if (btnElim) btnElim.style.display = abierta ? "inline-block" : "none";
}

function eliminarJornadaActivaDesdeAcordeon() {
  const abierta = obtenerUltimaJornadaAbiertaUsuario();
  if (!abierta) {
    const formInicio = document.getElementById("form-inicio-jornada");
    if (formInicio) formInicio.reset();
    const fechaInput = document.getElementById("jornada-fecha");
    if (fechaInput) fechaInput.value = obtenerFechaLocalYYYYMMDD();
    const badge = document.getElementById("hora-inicio-badge");
    if (badge) badge.innerText = "";
    const canvas = document.getElementById("canvas-inicio-preview");
    if (canvas) {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
    }
    const acordeon = document.getElementById("acordeon-apertura-jornada");
    if (acordeon) acordeon.open = false;
    actualizarTituloAcordeonDia();
    return;
  }
  eliminarJornadaPorId(abierta.id);
}

function capturarGPSJornada(inputId) {
  const input = document.getElementById(inputId);
  if (!navigator.geolocation) {
    input.value = "Pereira, Risaralda (GPS N/A)";
    return;
  }
  input.value = "Obteniendo ubicación...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      input.value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
    },
    () => { input.value = "Pereira, Risaralda"; },
    { enableHighAccuracy: true, timeout: 7000 }
  );
}

function estamparFotoJornada(file, canvasId, lineasTexto, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const maxWidth = 1080;
      const scale = img.width > maxWidth ? maxWidth / img.width : 1;
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const fontSize = Math.max(18, Math.round(canvas.width * 0.032));
      const lineHeight = Math.round(fontSize * 1.35);
      const paddingY = Math.max(12, Math.round(fontSize * 0.65));
      const paddingX = Math.max(14, Math.round(fontSize * 0.75));
      const altoBanner = paddingY * 2 + lineasTexto.length * lineHeight;

      ctx.fillStyle = "rgba(4, 11, 93, 0.92)";
      ctx.fillRect(0, canvas.height - altoBanner, canvas.width, altoBanner);

      ctx.fillStyle = "#BF956E";
      ctx.fillRect(0, canvas.height - altoBanner, canvas.width, Math.max(4, Math.round(fontSize * 0.22)));

      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textBaseline = "top";

      lineasTexto.forEach((linea, idx) => {
        const yPos = canvas.height - altoBanner + paddingY + idx * lineHeight;
        ctx.fillText(linea, paddingX, yPos, canvas.width - paddingX * 2);
      });

      callback(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function refrescarSelloInicioJornada() {
  const file = document.getElementById("foto-inicio-file").files[0];
  if (!file) return;
  const cliente = document.getElementById("jornada-cliente").value.trim() || "Cliente General";
  const fecha = document.getElementById("jornada-fecha").value || "";
  const dir = document.getElementById("jornada-direccion").value.trim() || "Pereira";
  const hora = document.getElementById("jornada-hora-inicio").value || horaActualHHMM();
  estamparFotoJornada(file, "canvas-inicio-preview", [
    `AYAX GRÚAS · INICIO DE DÍA`,
    `Cliente: ${cliente}`,
    `Fecha: ${formatearFechaDDMMAAAA(fecha)} | Hora: ${hora}`,
    `Ubicación: ${dir}`
  ], (url) => { fotoInicioStamped = url; });
}

function refrescarSelloFinJornada() {
  const file = document.getElementById("foto-fin-file").files[0];
  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
  const jActiva = dbJornadas.find((j) => j.id === document.getElementById("cierre-jornada-id").value);
  if (!file || !jActiva) return;
  const horaFin = document.getElementById("jornada-hora-fin").value || horaActualHHMM();
  estamparFotoJornada(file, "canvas-fin-preview", [
    `AYAX GRÚAS · CIERRE DE DÍA`,
    `Cliente: ${jActiva.cliente}`,
    `Fecha: ${formatearFechaDDMMAAAA(jActiva.fecha)} | Hora Fin: ${horaFin}`,
    `Ubicación: ${jActiva.direccion}`
  ], (url) => { fotoFinStamped = url; });
}

function guardarAperturaJornada() {
  const user = JSON.parse(localStorage.getItem("usuario_activo"));
  const fecha = document.getElementById("jornada-fecha").value.trim();
  const cliente = document.getElementById("jornada-cliente").value.trim();
  const direccion = document.getElementById("jornada-direccion").value.trim();
  const horaInicio = document.getElementById("jornada-hora-inicio").value.trim() || horaActualHHMM();
  const fileInicio = document.getElementById("foto-inicio-file").files[0];

  if (!user || !fecha || !cliente || !direccion || !fileInicio) {
    alert("Por favor complete los campos obligatorios y adjunte la foto de inicio.");
    return;
  }

  const finalizarApertura = (imgDataUrl) => {
    const nuevaId = "jrn-" + Date.now();
    const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
    dbJornadas.push({
      id: nuevaId,
      empleadoId: user.phone,
      empleadoNombre: user.name,
      salario: user.salary || 1750905,
      fecha,
      mesClave: obtenerClaveMes(fecha),
      cliente,
      direccion,
      horaInicio,
      fotoInicio: imgDataUrl,
      estado: "abierta",
      horaFin: null,
      fotoFin: null,
      almuerzoMin: null,
      observaciones: "",
      fotosNovedades: [],
      calculo: null
    });
    localStorage.setItem("ayax_jornadas_db", JSON.stringify(dbJornadas));
    ultimaJornadaAbiertaId = nuevaId;
    fotoInicioStamped = "";
    document.getElementById("form-inicio-jornada").reset();
    document.getElementById("jornada-fecha").value = obtenerFechaLocalYYYYMMDD();
    document.getElementById("hora-inicio-badge").innerText = "";
    const canvas = document.getElementById("canvas-inicio-preview");
    if (canvas) {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
    }
    const acordeon = document.getElementById("acordeon-apertura-jornada");
    if (acordeon) acordeon.open = false;
    renderVistaJornada();
  };

  if (fotoInicioStamped) {
    finalizarApertura(fotoInicioStamped);
  } else {
    estamparFotoJornada(
      fileInicio,
      "canvas-inicio-preview",
      [
        `AYAX GRÚAS · INICIO DE DÍA`,
        `Cliente: ${cliente}`,
        `Fecha: ${formatearFechaDDMMAAAA(fecha)} | Hora: ${horaInicio}`,
        `Ubicación: ${direccion}`
      ],
      finalizarApertura
    );
  }
}

function renderVistaJornada() {
  actualizarTituloAcordeonDia();
  renderJornadasAbiertas();
}

function renderJornadasAbiertas() {
  const user = JSON.parse(localStorage.getItem("usuario_activo"));
  const cont = document.getElementById("lista-jornadas-abiertas");
  if (!cont || !user) return;

  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
  const abiertas = dbJornadas.filter((j) => j.estado === "abierta" && j.empleadoId === user.phone);

  if (!abiertas.length) {
    cont.innerHTML = `<p class="empty-msg">No tienes jornadas abiertas pendientes de cierre.</p>`;
    return;
  }

  cont.innerHTML = abiertas.map((j) => `
    <div class="open-item-card">
      <div>
        <strong>${j.cliente}</strong><br>
        <span class="muted">${formatearFechaDDMMAAAA(j.fecha)} · Entrada: ${j.horaInicio}</span><br>
        <span class="muted" style="font-size: 0.75rem;">📍 ${j.direccion}</span>
      </div>
      <div style="display: flex; gap: 6px; align-items: center;">
        <button type="button" class="btn-primary" style="background-color: #ea580c; padding: 8px 12px; font-size: 0.8rem;" onclick="abrirCierreJornada('${j.id}')">Completar / Cerrar</button>
        <button type="button" title="Eliminar" onclick="eliminarJornadaPorId('${j.id}')" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; border-radius: 6px; padding: 6px 10px; font-weight: 700; cursor: pointer;">✕</button>
      </div>
    </div>
  `).join("");
}

function abrirCierreJornada(id) {
  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
  const j = dbJornadas.find((item) => item.id === id);
  if (!j) return;

  fotoFinStamped = "";
  fotosNovedadesStamped = [];
  document.getElementById("cierre-jornada-id").value = j.id;
  document.getElementById("cierre-resumen-txt").innerText = `${j.cliente} | Fecha: ${formatearFechaDDMMAAAA(j.fecha)} | Entrada: ${j.horaInicio}`;
  document.getElementById("foto-fin-file").value = "";
  document.getElementById("jornada-hora-fin").value = "";
  document.getElementById("hora-fin-badge").innerText = "";
  document.getElementById("jornada-almuerzo-min").value = "60";
  document.getElementById("jornada-observaciones").value = "";
  document.getElementById("galeria-novedades-thumbs").innerHTML = "";
  const canvas = document.getElementById("canvas-fin-preview");
  if (canvas) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0;
    canvas.height = 0;
  }

  document.getElementById("panel-cierre-jornada").classList.remove("hidden");
  document.getElementById("panel-cierre-jornada").scrollIntoView({ behavior: "smooth" });
}

function cancelarCierreJornada() {
  document.getElementById("panel-cierre-jornada").classList.add("hidden");
}

function procesarArchivosNovedad(fileList) {
  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
  const j = dbJornadas.find((item) => item.id === document.getElementById("cierre-jornada-id").value);
  const cliente = j ? j.cliente : "Novedad";
  const fecha = j ? formatearFechaDDMMAAAA(j.fecha) : formatearFechaDDMMAAAA(obtenerFechaLocalYYYYMMDD());
  const hora = horaActualHHMM();

  Array.from(fileList).forEach((file) => {
    estamparFotoJornada(file, "canvas-fin-preview", [`AYAX NOVEDAD · ${cliente}`, `Fecha: ${fecha} | Hora: ${hora}`], (url) => {
      fotosNovedadesStamped.push({ id: "nov-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6), url });
      renderThumbsNovedades();
    });
  });
}

function renderThumbsNovedades() {
  const cont = document.getElementById("galeria-novedades-thumbs");
  if (!cont) return;
  cont.innerHTML = fotosNovedadesStamped.map((f) => `
    <div class="thumb-item">
      <button type="button" class="btn-remove-thumb" onclick="quitarThumbNovedad('${f.id}')">✕</button>
      <img src="${f.url}" alt="Evidencia">
    </div>
  `).join("");
}

function quitarThumbNovedad(fotoId) {
  fotosNovedadesStamped = fotosNovedadesStamped.filter((f) => f.id !== fotoId);
  renderThumbsNovedades();
}

function guardarCierreJornada() {
  const id = document.getElementById("cierre-jornada-id").value.trim();
  const horaFin = document.getElementById("jornada-hora-fin").value.trim() || horaActualHHMM();
  const almuerzoRaw = document.getElementById("jornada-almuerzo-min").value;
  const fileFin = document.getElementById("foto-fin-file").files[0];

  if (!id || almuerzoRaw === "" || !fileFin) {
    alert("Debes adjuntar la foto de finalización y colocar el tiempo de almuerzo.");
    return;
  }

  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
  const idx = dbJornadas.findIndex((j) => j.id === id);
  if (idx === -1) return;

  const finalizarCierre = (imgFinUrl) => {
    const almuerzoMin = parseInt(almuerzoRaw, 10);
    const j = dbJornadas[idx];
    j.horaFin = horaFin;
    j.fotoFin = imgFinUrl;
    j.almuerzoMin = almuerzoMin;
    j.observaciones = document.getElementById("jornada-observaciones").value.trim();
    j.fotosNovedades = fotosNovedadesStamped.map((f) => f.url);
    j.mesClave = obtenerClaveMes(j.fecha);
    j.estado = "cerrada";
    j.calculo = calcularJornadaLaboral(j.fecha, j.horaInicio, horaFin, almuerzoMin, j.salario);

    dbJornadas[idx] = j;
    localStorage.setItem("ayax_jornadas_db", JSON.stringify(dbJornadas));
    if (ultimaJornadaAbiertaId === id) {
      ultimaJornadaAbiertaId = null;
    }

    document.getElementById("panel-cierre-jornada").classList.add("hidden");
    document.getElementById("form-cierre-jornada").reset();
    fotosNovedadesStamped = [];
    renderThumbsNovedades();
    renderVistaJornada();
    switchTab("diasRegistrados");
  };

  if (fotoFinStamped) {
    finalizarCierre(fotoFinStamped);
  } else {
    const jActiva = dbJornadas[idx];
    estamparFotoJornada(
      fileFin,
      "canvas-fin-preview",
      [
        `AYAX GRÚAS · CIERRE DE DÍA`,
        `Cliente: ${jActiva.cliente}`,
        `Fecha: ${formatearFechaDDMMAAAA(jActiva.fecha)} | Hora Fin: ${horaFin}`,
        `Ubicación: ${jActiva.direccion}`
      ],
      finalizarCierre
    );
  }
}

function renderTarjetaDiaCerrado(j) {
  const c = j.calculo || {};
  const fechaBonita = formatearFechaDDMMAAAA(j.fecha);
  const fotosHtml = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
      ${j.fotoInicio ? `<div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px; background: #fff;"><div style="font-size: 0.72rem; font-weight: 700; color: #040B5D; margin-bottom: 4px;">Foto Inicio</div><img src="${j.fotoInicio}" alt="Inicio" style="width: 100%; height: auto; border-radius: 4px; display: block;"></div>` : ""}
      ${j.fotoFin ? `<div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px; background: #fff;"><div style="font-size: 0.72rem; font-weight: 700; color: #c2410c; margin-bottom: 4px;">Foto Cierre</div><img src="${j.fotoFin}" alt="Cierre" style="width: 100%; height: auto; border-radius: 4px; display: block;"></div>` : ""}
    </div>
  `;

  return `
    <details class="card" style="margin-bottom: 8px; padding: 10px 12px; border-left: 4px solid #27ae60;">
      <summary style="cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
        <div>
          <strong style="color: #040B5D;">Día: ${fechaBonita}</strong>
          <span class="muted" style="font-size: 0.8rem;"> · ${j.cliente}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 0.85rem; color: #040B5D;">▾</span>
          <button type="button" title="Eliminar registro" onclick="event.preventDefault(); event.stopPropagation(); eliminarJornadaPorId('${j.id}');" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; border-radius: 6px; padding: 3px 9px; font-weight: 700; cursor: pointer;">✕</button>
        </div>
      </summary>
      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 0.8rem;">
        <p style="margin-bottom: 4px;"><strong>Fecha:</strong> ${fechaBonita}</p>
        <p style="margin-bottom: 4px;"><strong>Cliente:</strong> ${j.cliente}</p>
        <p style="margin-bottom: 4px;"><strong>Ubicación:</strong> ${j.direccion}</p>
        <p style="margin-bottom: 4px;"><strong>Horario:</strong> ${j.horaInicio} a ${j.horaFin} · <strong>Almuerzo:</strong> ${j.almuerzoMin ?? 0} min</p>
        <p style="margin-bottom: 6px;"><strong>Observaciones:</strong> ${j.observaciones || "Ninguna"}</p>
        <div style="background: #f8fafc; padding: 8px; border-radius: 6px; margin-bottom: 6px;">
          <strong>Horas netas:</strong> ${c.horasNetas ?? 0} h ·
          <strong>H.E.D:</strong> ${c.heDiurna ?? 0} h ·
          <strong>H.E.N:</strong> ${c.heNocturna ?? 0} h ·
          <strong>Rec.N:</strong> ${c.recNocturno ?? 0} h ·
          <strong>Dom/Fest:</strong> ${((c.recDominical ?? 0) + (c.hedDominical ?? 0) + (c.henDominical ?? 0)).toFixed(2)} h ·
          <strong>Total:</strong> ${c.totalHorasConceptos ?? 0} h ($${(c.valorPagar ?? 0).toLocaleString("es-CO")})
        </div>
        ${fotosHtml}
      </div>
    </details>
  `;
}

function renderListaDiasRegistrados() {
  const user = JSON.parse(localStorage.getItem("usuario_activo"));
  const cont = document.getElementById("lista-dias-registrados-mes");
  if (!cont || !user) return;

  const mesActual = obtenerClaveMes(obtenerFechaLocalYYYYMMDD());
  const titulo = document.getElementById("titulo-pestana-dias");
  if (titulo) {
    titulo.innerText = `Días Registrados (${formatearNombreMes(mesActual)})`;
  }

  const fechaFiltro = document.getElementById("filtro-fecha-dias-registrados")?.value || "";
  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");

  const diasMes = dbJornadas
    .filter((j) => j.estado === "cerrada" && j.empleadoId === user.phone && (j.mesClave || obtenerClaveMes(j.fecha)) === mesActual)
    .filter((j) => !fechaFiltro || j.fecha === fechaFiltro)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  if (!diasMes.length) {
    cont.innerHTML = `<p class="empty-msg">${fechaFiltro ? "No hay registros para esa fecha." : "No hay días cerrados registrados en este mes."}</p>`;
    return;
  }

  cont.innerHTML = diasMes.map(renderTarjetaDiaCerrado).join("");
}

function renderCarpetasHistorial() {
  const user = JSON.parse(localStorage.getItem("usuario_activo"));
  const cont = document.getElementById("carpetas-historial-meses");
  if (!cont || !user) return;

  const fechaFiltro = document.getElementById("filtro-fecha-historial")?.value || "";
  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");

  const cerradas = dbJornadas
    .filter((j) => j.estado === "cerrada" && j.empleadoId === user.phone)
    .filter((j) => !fechaFiltro || j.fecha === fechaFiltro)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  if (!cerradas.length) {
    cont.innerHTML = `<p class="empty-msg">${fechaFiltro ? "No hay registros en el historial para esa fecha." : "Aún no hay carpetas mensuales en el historial."}</p>`;
    return;
  }

  const gruposPorMes = {};
  cerradas.forEach((j) => {
    const clave = j.mesClave || obtenerClaveMes(j.fecha);
    if (!gruposPorMes[clave]) gruposPorMes[clave] = [];
    gruposPorMes[clave].push(j);
  });

  const mesesOrdenados = Object.keys(gruposPorMes).sort((a, b) => b.localeCompare(a));

  cont.innerHTML = mesesOrdenados.map((clave) => {
    const lista = gruposPorMes[clave];
    const totalHoras = lista.reduce((acc, item) => acc + (item.calculo?.totalHorasConceptos || 0), 0);
    const totalValor = lista.reduce((acc, item) => acc + (item.calculo?.valorPagar || 0), 0);
    const debeAbrirCarpeta = Boolean(fechaFiltro);

    return `
      <details class="card" ${debeAbrirCarpeta ? "open" : ""} style="margin-bottom: 10px; border: 1px solid #cbd5e1;">
        <summary style="cursor: pointer; font-weight: 700; color: #040B5D; list-style: none; display: flex; justify-content: space-between; align-items: center;">
          <span>📁 ${formatearNombreMes(clave)} (${lista.length} día${lista.length === 1 ? "" : "s"}) ▾</span>
          <span style="font-size: 0.8rem; color: #27ae60;">$${totalValor.toLocaleString("es-CO")} · ${totalHoras.toFixed(2)}h</span>
        </summary>
        <div class="stack" style="margin-top: 10px;">
          ${lista.map(renderTarjetaDiaCerrado).join("")}
        </div>
      </details>
    `;
  }).join("");
}

function limpiarFiltroCalendario(inputId, fnRenderName) {
  const input = document.getElementById(inputId);
  if (input) input.value = "";
  if (typeof window[fnRenderName] === "function") {
    window[fnRenderName]();
  }
}

function eliminarJornadaPorId(id) {
  if (!confirm("¿Deseas eliminar este registro?")) return;
  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
  const filtradas = dbJornadas.filter((j) => j.id !== id);
  localStorage.setItem("ayax_jornadas_db", JSON.stringify(filtradas));
  if (ultimaJornadaAbiertaId === id) {
    ultimaJornadaAbiertaId = null;
  }
  if (document.getElementById("cierre-jornada-id")?.value === id) {
    cancelarCierreJornada();
  }
  renderVistaJornada();
  renderListaDiasRegistrados();
  renderCarpetasHistorial();
  renderReporteContabilidad();
}

// ==========================================
// CÁLCULO DE EXTRAS Y RECARGOS (COLOMBIA 2026)
// ==========================================
function calcularJornadaLaboral(fechaStr, horaInicioStr, horaFinStr, almuerzoMinutos, salarioMensual) {
  const [y, m, d] = fechaStr.split("-").map(Number);
  const [hI, minI] = horaInicioStr.split(":").map(Number);
  const [hF, minF] = horaFinStr.split(":").map(Number);

  const inicio = new Date(y, m - 1, d, hI, minI, 0);
  const fin = new Date(y, m - 1, d, hF, minF, 0);
  if (fin <= inicio) fin.setDate(fin.getDate() + 1);

  const diaSemana = inicio.getDay();
  // Sábado (6) se trata como día normal; solo Domingo (0) o festivos aplican recargo dominical/festivo
  const esDomingoOFestivo = diaSemana === 0 || FESTIVOS_COLOMBIA.has(fechaStr);
  // Jornada normal diaria de 8 horas
  const jornadaOrdinariaDia = 8;

  const descansoMinutos = Math.max(0, Number(almuerzoMinutos) || 0);
  const totalBrutoHoras = (fin - inicio) / (1000 * 60 * 60);
  const horasNetas = Math.max(0, totalBrutoHoras - descansoMinutos / 60);

  let heDiurna = 0, heNocturna = 0, recNocturno = 0, recDominical = 0, hedDominical = 0, henDominical = 0;

  const tramos = [];
  const pasoMs = 15 * 60 * 1000;
  let cursor = new Date(inicio);

  while (cursor < fin) {
    const siguiente = new Date(Math.min(cursor.getTime() + pasoMs, fin.getTime()));
    const minsTramo = (siguiente - cursor) / (1000 * 60);
    const horaDecimal = cursor.getHours() + cursor.getMinutes() / 60;
    const esFranjaNocturna = horaDecimal >= 19 || horaDecimal < 6;
    const esVentanaAlmuerzo = horaDecimal >= 12 && horaDecimal < 14.5;

    tramos.push({
      minsTramo,
      minsTrabajados: minsTramo,
      esFranjaNocturna,
      esVentanaAlmuerzo
    });
    cursor = siguiente;
  }

  // 1. Descontar minutos de descanso primero en ventana de almuerzo (12:00 - 14:30)
  let descansoPendiente = descansoMinutos;
  for (const t of tramos) {
    if (descansoPendiente <= 0) break;
    if (t.esVentanaAlmuerzo && t.minsTrabajados > 0) {
      const descontado = Math.min(descansoPendiente, t.minsTrabajados);
      t.minsTrabajados -= descontado;
      descansoPendiente -= descontado;
    }
  }

  // 2. Si queda descanso por descontar, descontarlo desde el final del turno
  if (descansoPendiente > 0) {
    for (let i = tramos.length - 1; i >= 0 && descansoPendiente > 0; i--) {
      const t = tramos[i];
      if (t.minsTrabajados > 0) {
        const descontado = Math.min(descansoPendiente, t.minsTrabajados);
        t.minsTrabajados -= descontado;
        descansoPendiente -= descontado;
      }
    }
  }

  // 3. Clasificar horas ordinarias / recargos / extras respetando jornadaOrdinariaDia (8 horas)
  let horasAcumuladas = 0;

  function sumarTramo(horas, superaJornada, domFest, noct) {
    if (horas <= 0) return;
    if (domFest) {
      if (!superaJornada) recDominical += horas;
      else if (noct) henDominical += horas;
      else hedDominical += horas;
    } else if (superaJornada) {
      if (noct) heNocturna += horas;
      else heDiurna += horas;
    } else if (noct) {
      recNocturno += horas;
    }
  }

  for (const t of tramos) {
    if (t.minsTrabajados <= 0) continue;
    const horas = t.minsTrabajados / 60;

    if (horasAcumuladas < jornadaOrdinariaDia && horasAcumuladas + horas > jornadaOrdinariaDia) {
      const hOrdinarias = jornadaOrdinariaDia - horasAcumuladas;
      const hExtras = horas - hOrdinarias;
      sumarTramo(hOrdinarias, false, esDomingoOFestivo, t.esFranjaNocturna);
      sumarTramo(hExtras, true, esDomingoOFestivo, t.esFranjaNocturna);
    } else {
      const supera = horasAcumuladas + 1e-9 >= jornadaOrdinariaDia;
      sumarTramo(horas, supera, esDomingoOFestivo, t.esFranjaNocturna);
    }

    horasAcumuladas += horas;
  }

  const valorHoraOrd = salarioMensual / DIVISOR_MENSUAL;
  // Liquidación enfocada en extras y recargos (recargo dominical 90% = 0.90)
  const valorPagar =
    heDiurna * valorHoraOrd * 1.25 +
    heNocturna * valorHoraOrd * 1.75 +
    recNocturno * valorHoraOrd * 0.35 +
    recDominical * valorHoraOrd * 0.90 +
    hedDominical * valorHoraOrd * 2.15 +
    henDominical * valorHoraOrd * 2.65;

  const totalHorasConceptos = heDiurna + heNocturna + recNocturno + recDominical + hedDominical + henDominical;

  return {
    esDomingoOFestivo,
    horasNetas: Number(horasNetas.toFixed(2)),
    heDiurna: Number(heDiurna.toFixed(2)),
    heNocturna: Number(heNocturna.toFixed(2)),
    recNocturno: Number(recNocturno.toFixed(2)),
    recDominical: Number(recDominical.toFixed(2)),
    hedDominical: Number(hedDominical.toFixed(2)),
    henDominical: Number(henDominical.toFixed(2)),
    totalHorasConceptos: Number(totalHorasConceptos.toFixed(2)),
    valorPagar: Math.round(valorPagar)
  };
}

// ==========================================
// MÓDULO CONTABILIDAD (LILIANA GUZMÁN / ADMIN)
// ==========================================
function renderReporteContabilidad() {
  const selEmp = document.getElementById("filtro-emp-conta");
  if (selEmp && selEmp.options.length === 0) {
    selEmp.innerHTML = `<option value="todos">Todos los empleados</option>` +
      authorizedOperators.filter((o) => o.role === "operario_horas").map((o) => `<option value="${o.phone}">${o.name}</option>`).join("");
  }

  const empFiltro = selEmp ? selEmp.value : "todos";
  const fechaInicio = document.getElementById("filtro-fecha-inicio-conta")?.value || "";
  const fechaFin = document.getElementById("filtro-fecha-fin-conta")?.value || "";

  const txtRango = document.getElementById("txt-rango-activo");
  if (txtRango) {
    if (fechaInicio && fechaFin) {
      txtRango.innerText = `Filtro activo: Del ${formatearFechaDDMMAAAA(fechaInicio)} al ${formatearFechaDDMMAAAA(fechaFin)}`;
    } else if (fechaInicio) {
      txtRango.innerText = `Filtro activo: Desde el ${formatearFechaDDMMAAAA(fechaInicio)}`;
    } else if (fechaFin) {
      txtRango.innerText = `Filtro activo: Hasta el ${formatearFechaDDMMAAAA(fechaFin)}`;
    } else {
      txtRango.innerText = `Filtro activo: Todos los registros cerrados`;
    }
  }

  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
  const filtradas = dbJornadas.filter((j) => {
    if (j.estado !== "cerrada" || !j.calculo) return false;
    if (empFiltro !== "todos" && j.empleadoId !== empFiltro) return false;
    if (fechaInicio && j.fecha < fechaInicio) return false;
    if (fechaFin && j.fecha > fechaFin) return false;
    return true;
  });

  const porEmpleado = {};
  filtradas.forEach((j) => {
    if (!porEmpleado[j.empleadoId]) porEmpleado[j.empleadoId] = { nombre: j.empleadoNombre, filas: [] };
    porEmpleado[j.empleadoId].filas.push(j);
  });

  const tbody = document.getElementById("tbody-contabilidad");
  const tfoot = document.getElementById("tfoot-contabilidad");
  if (!tbody || !tfoot) return;

  tbody.innerHTML = "";
  ultimoReporteFilasConta = [];
  let granHoras = 0, granValor = 0;

  Object.values(porEmpleado).forEach((grupo) => {
    let subHoras = 0, subValor = 0;

    grupo.filas.forEach((f) => {
      const c = f.calculo;
      subHoras += c.totalHorasConceptos;
      subValor += c.valorPagar;

      ultimoReporteFilasConta.push({
        tipo: "registro", fecha: f.fecha, empleado: f.empleadoNombre, cliente: f.cliente,
        direccion: f.direccion, horaInicio: f.horaInicio, horaFin: f.horaFin, almuerzoMin: f.almuerzoMin ?? 0,
        heDiurna: c.heDiurna, heNocturna: c.heNocturna, recNocturno: c.recNocturno, recDominical: c.recDominical,
        hedDominical: c.hedDominical, henDominical: c.henDominical, totalHoras: c.totalHorasConceptos, valorPagar: c.valorPagar
      });

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${f.fecha}</td>
        <td>${f.empleadoNombre}</td>
        <td>${f.cliente}</td>
        <td>${f.direccion}</td>
        <td>${f.horaInicio}</td>
        <td>${f.horaFin}</td>
        <td>${f.almuerzoMin ?? 0}m</td>
        <td><button type="button" class="btn-audit" onclick="abrirModalAuditoria('${f.id}')">Auditar</button></td>
        <td>${c.heDiurna}</td>
        <td>${c.heNocturna}</td>
        <td>${c.recNocturno}</td>
        <td>${c.recDominical}</td>
        <td>${c.hedDominical}</td>
        <td>${c.henDominical}</td>
        <td>${c.totalHorasConceptos.toFixed(2)}</td>
        <td>$${c.valorPagar.toLocaleString("es-CO")}</td>
      `;
      tbody.appendChild(tr);
    });

    granHoras += subHoras;
    granValor += subValor;

    ultimoReporteFilasConta.push({
      tipo: "subtotal", etiqueta: `Subtotal ${grupo.nombre}`, totalHoras: Number(subHoras.toFixed(2)), valorPagar: Math.round(subValor)
    });

    const trSub = document.createElement("tr");
    trSub.className = "subtotal-row";
    trSub.innerHTML = `
      <td colspan="14" style="text-align:right;">Subtotal ${grupo.nombre}:</td>
      <td>${subHoras.toFixed(2)}</td>
      <td>$${subValor.toLocaleString("es-CO")}</td>
    `;
    tbody.appendChild(trSub);
  });

  ultimoReporteTotalesConta = { horas: Number(granHoras.toFixed(2)), valor: Math.round(granValor) };
  tfoot.innerHTML = `
    <tr class="gran-total-row">
      <td colspan="14" style="text-align:right;">TOTAL GENERAL:</td>
      <td>${granHoras.toFixed(2)}</td>
      <td>$${granValor.toLocaleString("es-CO")}</td>
    </tr>
  `;
}

function exportarExcelContabilidad() {
  const encabezados = [
    "Fecha", "Empleado", "Cliente", "Dirección", "Hora Inicio", "Hora Fin", "Almuerzo (min)",
    "H.E. Diurna (25%)", "H.E. Nocturna (75%)", "Rec. Nocturno (35%)", "Rec. Dominical (90%)",
    "H.E.D. Dom/Fest (115%)", "H.E.N. Dom/Fest (165%)", "Total Horas", "Valor a Pagar"
  ];

  let filasHtml = "";
  ultimoReporteFilasConta.forEach((item) => {
    if (item.tipo === "registro") {
      filasHtml += `
        <tr>
          <td>${item.fecha}</td><td>${item.empleado}</td><td>${item.cliente}</td><td>${item.direccion}</td>
          <td>${item.horaInicio}</td><td>${item.horaFin}</td><td>${item.almuerzoMin}</td>
          <td>${item.heDiurna}</td><td>${item.heNocturna}</td><td>${item.recNocturno}</td>
          <td>${item.recDominical}</td><td>${item.hedDominical}</td><td>${item.henDominical}</td>
          <td>${item.totalHoras}</td><td>${item.valorPagar}</td>
        </tr>`;
    } else if (item.tipo === "subtotal") {
      filasHtml += `
        <tr style="font-weight:bold;background:#eff6ff;">
          <td colspan="13">${item.etiqueta}</td><td>${item.totalHoras}</td><td>${item.valorPagar}</td>
        </tr>`;
    }
  });

  const htmlExcel = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="UTF-8"></head>
    <body>
      <table border="1">
        <thead><tr>${encabezados.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${filasHtml}</tbody>
        <tfoot>
          <tr style="font-weight:bold;background:#dbeafe;">
            <td colspan="13">TOTAL GENERAL</td>
            <td>${ultimoReporteTotalesConta.horas}</td>
            <td>${ultimoReporteTotalesConta.valor}</td>
          </tr>
        </tfoot>
      </table>
    </body>
    </html>`;

  const blob = new Blob([htmlExcel], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reporte_nomina_gruas_${obtenerFechaLocalYYYYMMDD()}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function abrirModalAuditoria(id) {
  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
  const j = dbJornadas.find((item) => item.id === id);
  if (!j || !j.calculo) return;
  const c = j.calculo;

  document.getElementById("auditoria-titulo-txt").innerText = `Auditoría · ${j.empleadoNombre}`;

  const novHtml = j.fotosNovedades && j.fotosNovedades.length
    ? `<div class="audit-grid">${j.fotosNovedades.map((f, i) => `
        <div class="audit-photo-card">
          <strong>Evidencia Novedad #${i + 1}</strong>
          <img src="${f}" alt="Novedad" onclick="abrirVisorFoto('Evidencia Novedad #${i + 1} · ${j.empleadoNombre}', this.src)">
          <button type="button" class="btn-secondary-small" style="width: 100%; margin-top: 6px;" onclick="abrirVisorFoto('Evidencia Novedad #${i + 1} · ${j.empleadoNombre}', this.previousElementSibling.src)">🔍 Ver completa</button>
        </div>
      `).join("")}</div>`
    : `<p class="muted">Sin fotos adicionales de novedad.</p>`;

  document.getElementById("auditoria-body-content").innerHTML = `
    <div class="audit-summary">
      <strong>Cliente:</strong> ${j.cliente}<br>
      <strong>Dirección:</strong> ${j.direccion}<br>
      <strong>Tipo de Día:</strong> ${c.esDomingoOFestivo ? "Domingo / Festivo" : "Día Hábil"}<br>
      <strong>Horario:</strong> ${j.horaInicio} a ${j.horaFin} | <strong>Almuerzo:</strong> ${j.almuerzoMin ?? 0} min<br>
      <strong>Observaciones:</strong> ${j.observaciones || "Ninguna"}<br>
      <strong>Total Extras/Recargos:</strong> ${c.totalHorasConceptos} h · <strong>A Pagar:</strong> $${c.valorPagar.toLocaleString("es-CO")}
    </div>
    <div class="audit-grid">
      <div class="audit-photo-card">
        <strong>Foto de Inicio (Apertura)</strong>
        <img src="${j.fotoInicio}" alt="Foto Inicio" onclick="abrirVisorFoto('Foto de Inicio · ${j.empleadoNombre}', this.src)">
        <button type="button" class="btn-secondary-small" style="width: 100%; margin-top: 6px;" onclick="abrirVisorFoto('Foto de Inicio · ${j.empleadoNombre}', this.previousElementSibling.src)">🔍 Ver completa</button>
      </div>
      <div class="audit-photo-card">
        <strong>Foto de Cierre (Finalización)</strong>
        <img src="${j.fotoFin}" alt="Foto Fin" onclick="abrirVisorFoto('Foto de Cierre · ${j.empleadoNombre}', this.src)">
        <button type="button" class="btn-secondary-small" style="width: 100%; margin-top: 6px;" onclick="abrirVisorFoto('Foto de Cierre · ${j.empleadoNombre}', this.previousElementSibling.src)">🔍 Ver completa</button>
      </div>
    </div>
    <h4 style="margin-top: 15px; color: #040B5D;">Evidencias de Novedades</h4>
    ${novHtml}
  `;

  document.getElementById("modalAuditoriaConta").classList.remove("hidden");
}

function abrirVisorFoto(titulo, src) {
  if (!src) return;
  const modal = document.getElementById("modalVisorFoto");
  const tituloEl = document.getElementById("visor-foto-titulo");
  const imgEl = document.getElementById("visor-foto-img");
  if (tituloEl) tituloEl.innerText = titulo || "Vista Ampliada";
  if (imgEl) imgEl.src = src;
  if (modal) modal.classList.remove("hidden");
}

function cerrarVisorFoto() {
  const modal = document.getElementById("modalVisorFoto");
  const imgEl = document.getElementById("visor-foto-img");
  if (modal) modal.classList.add("hidden");
  if (imgEl) imgEl.src = "";
}

function cerrarModalAuditoria() {
  document.getElementById("modalAuditoriaConta").classList.add("hidden");
}

// ==========================================
// RENDERIZADO DE TAREAS PENDIENTES
// ==========================================
function renderTasks() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo"));
  if (usuarioActivo && usuarioActivo.role === "redes") {
    renderPanelRedesParaDanilo();
    return;
  }

  const containerPendientes = document.getElementById("listPendientes");
  if (!containerPendientes) return;
  containerPendientes.innerHTML = "";

  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  let countP = 0;

  savedTasks.forEach((task) => {
    if (task.estado === "pendiente") {
      countP++;
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <div class="task-header">
          <span class="task-code">Tarea #${task.id}</span>
          <small style="color: #64748b;">Pendiente</small>
        </div>
        <p class="task-client"><strong>Cliente:</strong> ${task.cliente}</p>
        <p class="task-client"><strong>Ubicación:</strong> ${task.direccion || task.ubicacion || "N/A"}</p>
        <button type="button" class="btn-primary" onclick="openTask('${task.id}')" style="margin-top: 10px;">Iniciar Servicio</button>
      `;
      containerPendientes.appendChild(card);
    }
  });

  const countPendElem = document.getElementById("countPendientes");
  if (countPendElem) countPendElem.innerText = countP;

  filterFinalized();
}

// ==========================================
// PANEL EXCLUSIVO DE REDES (DANILO) - DESCARGA ZIP
// ==========================================
function renderPanelRedesParaDanilo() {
  const containerFinalizadas = document.getElementById("listFinalizadas");
  if (!containerFinalizadas) return;

  const pdfBox = document.getElementById("pdfButtonContainer");
  if (pdfBox) pdfBox.classList.add("hidden");
  const searchBox = document.querySelector("#secFinalizadas .search-box");
  if (searchBox) searchBox.classList.add("hidden");

  containerFinalizadas.innerHTML = "";

  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;

  const headerNotice = document.createElement("div");
  headerNotice.style.cssText = "background: #e0f2fe; color: #0369a1; padding: 12px; border-radius: 6px; margin-bottom: 12px; font-weight: bold; border: 1px solid #bae6fd; font-size: 0.85rem;";
  headerNotice.innerHTML = `📥 Descargar fotos redes`;
  containerFinalizadas.appendChild(headerNotice);

  const tabsContainer = document.createElement("div");
  tabsContainer.style.cssText = "display: flex; gap: 8px; margin-bottom: 15px;";
  tabsContainer.innerHTML = `
    <button type="button" onclick="cambiarTabRedes('pendientes')" style="flex: 1; padding: 10px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; background: ${tabRedesActiva === "pendientes" ? "#040B5D" : "#e2e8f0"}; color: ${tabRedesActiva === "pendientes" ? "#ffffff" : "#334155"};">
      📥 Pendientes por Descargar
    </button>
    <button type="button" onclick="cambiarTabRedes('historial')" style="flex: 1; padding: 10px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; background: ${tabRedesActiva === "historial" ? "#040B5D" : "#e2e8f0"}; color: ${tabRedesActiva === "historial" ? "#ffffff" : "#334155"};">
      📁 Historial Descargadas
    </button>
  `;
  containerFinalizadas.appendChild(tabsContainer);

  const tareasFiltradas = savedTasks.filter((task) => {
    let cantFotosTotal = 0;
    if (task.diasDetalle && task.diasDetalle.length > 0) {
      cantFotosTotal = task.diasDetalle.reduce((acc, d) => acc + (d.fotosLista ? d.fotosLista.length : 0), 0);
    }
    if (cantFotosTotal === 0) return false;
    return tabRedesActiva === "pendientes" ? !task.descargadoRedes : task.descargadoRedes === true;
  });

  if (tareasFiltradas.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "empty-msg";
    emptyMsg.style.textAlign = "center";
    emptyMsg.style.padding = "20px";
    emptyMsg.innerText = tabRedesActiva === "pendientes"
      ? "¡Excelente! No hay tareas pendientes por descargar en este momento."
      : "No hay registros en el historial de descargas aún.";
    containerFinalizadas.appendChild(emptyMsg);
    return;
  }

  tareasFiltradas.forEach((task) => {
    const cantFotosTotal = task.diasDetalle.reduce((acc, d) => acc + (d.fotosLista ? d.fotosLista.length : 0), 0);
    const isFinalizada = task.estado === "finalizada";

    const card = document.createElement("div");
    card.className = "task-card";
    card.style.cssText = `background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px; border: 1px solid ${tabRedesActiva === "pendientes" ? "#BF956E" : "#cbd5e1"};`;
    card.innerHTML = `
      <div class="task-header">
        <span class="task-code" style="color: ${isFinalizada ? "#27ae60" : "#040B5D"}; font-weight: bold;">
          Tarea #${task.id} (${isFinalizada ? "Finalizada" : "En Progreso / Activa"})
        </span>
        <small style="color: #64748b;">${new Date(task.fechaActualizacion || task.fechaCreacion || Date.now()).toLocaleDateString()}</small>
      </div>
      <p class="task-client"><strong>Cliente:</strong> ${task.cliente}</p>
      <p class="task-client"><strong>Días Registrados / Horas:</strong> ${task.diasDetalle ? task.diasDetalle.length : 1} días (${task.totalHoras || 0.0} hrs)</p>
      <p class="task-client" style="color: #0369a1; font-weight: 600;">📷 Fotos disponibles en paquete: ${cantFotosTotal}</p>
      ${task.descargadoRedes ? `<p style="font-size: 0.75rem; color: #16a34a; margin-top: 4px; font-weight: bold;">✔ Descargado el: ${new Date(task.fechaDescargaRedes).toLocaleString()}</p>` : ""}
      <div style="margin-top: 12px; display: flex; gap: 8px;">
        <button type="button" onclick="descargarEvidenciasTarea('${task.id}')" style="background: ${tabRedesActiva === "pendientes" ? "#040B5D" : "#475569"}; color: white; border: none; padding: 10px 14px; border-radius: 6px; font-weight: bold; cursor: pointer; flex: 1; font-size: 0.85rem;">
          ${tabRedesActiva === "pendientes" ? "📦 Descargar Paquete de Evidencias (ZIP)" : "🔄 Volver a Descargar ZIP"}
        </button>
      </div>
    `;
    containerFinalizadas.appendChild(card);
  });
}

function cambiarTabRedes(tab) {
  tabRedesActiva = tab;
  renderPanelRedesParaDanilo();
}

async function descargarEvidenciasTarea(taskId) {
  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  const task = savedTasks.find((t) => String(t.id) === String(taskId));

  if (!task || !task.diasDetalle || task.diasDetalle.length === 0) {
    alert("No hay evidencias fotográficas registradas para esta tarea.");
    return;
  }

  if (typeof JSZip === "undefined") {
    alert("La librería JSZip no está cargada en la aplicación.");
    return;
  }

  savedTasks = savedTasks.map((t) => {
    if (String(t.id) === String(taskId)) {
      return {
        ...t,
        descargadoRedes: true,
        fechaDescargaRedes: new Date().toISOString()
      };
    }
    return t;
  });
  localStorage.setItem("ayax_tasks_db", JSON.stringify(savedTasks));
  renderPanelRedesParaDanilo();

  const zip = new JSZip();
  const folderName = `Tarea_${task.id}_${task.cliente.replace(/[^a-zA-Z0-9]/g, "_")}`;
  const taskFolder = zip.folder(folderName);
  let fotosAgregadas = 0;

  task.diasDetalle.forEach((day) => {
    if (day.fotosLista && day.fotosLista.length > 0) {
      day.fotosLista.forEach((fotoObj, index) => {
        let base64Data = "";
        if (typeof fotoObj === "string") {
          base64Data = fotoObj.split(",")[1];
        } else if (fotoObj && fotoObj.data) {
          base64Data = fotoObj.data.split(",")[1];
        }
        if (base64Data) {
          const fileName = `Dia_${day.dayNum}_Evidencia_${index + 1}.jpg`;
          taskFolder.file(fileName, base64Data, { base64: true });
          fotosAgregadas++;
        }
      });
    }
  });

  if (fotosAgregadas === 0) {
    alert("No se encontraron archivos de imagen adjuntos en esta tarea.");
    return;
  }

  try {
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `${folderName}_Evidencias.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Error al generar el ZIP:", err);
  }
}

// ==========================================
// FILTRADO DE TAREAS FINALIZADAS
// ==========================================
function filterFinalized() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo"));
  if (usuarioActivo && usuarioActivo.role === "redes") {
    renderPanelRedesParaDanilo();
    return;
  }

  const pdfBox = document.getElementById("pdfButtonContainer");
  if (pdfBox) pdfBox.classList.remove("hidden");
  const searchBox = document.querySelector("#secFinalizadas .search-box");
  if (searchBox) searchBox.classList.remove("hidden");

  const textQuery = document.getElementById("searchInput") ? document.getElementById("searchInput").value.toLowerCase().trim() : "";
  const dateQuery = document.getElementById("searchDate") ? document.getElementById("searchDate").value : "";

  const containerFinalizadas = document.getElementById("listFinalizadas");
  if (!containerFinalizadas) return;
  containerFinalizadas.innerHTML = "";

  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let matchCount = 0;
  let totalFinalizedCount = 0;

  savedTasks.forEach((task) => {
    if (task.estado === "finalizada") {
      const taskDateObj = new Date(task.fechaFinalizacion || task.fechaCreacion || Date.now());
      const taskDateStr = taskDateObj.toISOString().split("T")[0];
      const matchesCurrentMonthYear = (taskDateObj.getMonth() === currentMonth && taskDateObj.getFullYear() === currentYear);

      if (matchesCurrentMonthYear || dateQuery) {
        totalFinalizedCount++;
        const matchesText = task.id.toLowerCase().includes(textQuery) || task.cliente.toLowerCase().includes(textQuery);
        const matchesDate = !dateQuery || taskDateStr === dateQuery;

        if (matchesText && matchesDate) {
          matchCount++;
          const card = document.createElement("div");
          card.className = "task-card";
          card.style.borderColor = "#27ae60";
          card.innerHTML = `
            <div class="task-header">
              <span class="task-code" style="color: #27ae60;">Tarea #${task.id} (Finalizada)</span>
              <small style="color: #27ae60;">${taskDateObj.toLocaleDateString()}</small>
            </div>
            <p class="task-client"><strong>Cliente:</strong> ${task.cliente}</p>
            <p class="task-client"><strong>Total Días:</strong> ${task.totalDias || 1}</p>
            <p class="task-client" style="color: #27ae60; font-weight: 700; margin-top: 6px;">Total Horas: ${task.totalHoras || 0.0} Horas</p>
          `;
          containerFinalizadas.appendChild(card);
        }
      }
    }
  });

  const countElem = document.getElementById("countFinalizadas");
  if (countElem) countElem.innerText = totalFinalizedCount;

  const btnPdfContainer = document.getElementById("pdfButtonContainer");
  if (matchCount === 0) {
    containerFinalizadas.innerHTML = `<p class="empty-msg">No se encontraron tareas finalizadas para este mes o con esos criterios.</p>`;
    if (btnPdfContainer) btnPdfContainer.classList.add("hidden");
  } else {
    if (btnPdfContainer) btnPdfContainer.classList.remove("hidden");
  }
}

// ==========================================
// CONTROL DEL WIZARD DE TAREAS (OPERARIOS / ADMIN)
// ==========================================
function openTask(id) {
  currentActiveTaskId = id;
  document.getElementById("mainNavTabs").classList.add("hidden");
  document.getElementById("secPendientes").classList.add("hidden");
  document.getElementById("secFinalizadas").classList.add("hidden");

  const secWizard = document.getElementById("secWizard");
  secWizard.classList.remove("hidden");
  document.getElementById("wizardTitle").innerText = `Servicio #${id} Operación`;

  document.getElementById("daysContainer").innerHTML = "";
  const daysListContainer = document.getElementById("daysListContainer");
  if (daysListContainer) daysListContainer.innerHTML = "";
  totalDaysCreated = 0;

  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  const task = savedTasks.find((t) => String(t.id) === String(id));

  if (task && task.diasDetalle && task.diasDetalle.length > 0) {
    currentDaysData = [...task.diasDetalle];
    totalDaysCreated = currentDaysData.length;
    renderDaysAccordion();
  } else {
    currentDaysData = [];
  }

  addNewDay();
}

function closeWizard() {
  document.getElementById("secWizard").classList.add("hidden");
  document.getElementById("secSignatures").classList.add("hidden");
  document.getElementById("secReporte").classList.add("hidden");
  document.getElementById("mainNavTabs").classList.remove("hidden");
  document.getElementById("secPendientes").classList.remove("hidden");
  renderTasks();
}

// ==========================================
// GESTIÓN DE DÍAS Y MÚLTIPLES FOTOS
// ==========================================
function addNewDay() {
  totalDaysCreated++;
  fotosDiaTemporal = [];
  const container = document.getElementById("daysContainer");
  const dayCard = document.createElement("div");
  dayCard.className = "day-card";
  dayCard.id = `dayCard-${totalDaysCreated}`;

  dayCard.innerHTML = `
    <div class="day-card-header">
      <span class="day-card-title">Día #${totalDaysCreated} (En curso)</span>
      <span id="hours-display-${totalDaysCreated}" class="calculated-hours">0.0 Horas</span>
    </div>
    <div class="form-group">
      <label>Dirección de Trabajo *</label>
      <input type="text" id="dir-day-${totalDaysCreated}" placeholder="Ej: Vía Cerritos Km 4">
    </div>
    <div class="form-group">
      <label>Descripción Corta de la Labor Realizada *</label>
      <input type="text" id="desc-day-${totalDaysCreated}" placeholder="Ej: Izaje de estructura metálica">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Vehículo / Grúa *</label>
        <select id="grua-day-${totalDaysCreated}" class="form-control">
          <option value="">-- Seleccione Grúa --</option>
          <option value="Grúa 01 - Kenworth">Grúa 01 - Kenworth</option>
          <option value="Grúa 02 - Mack">Grúa 02 - Mack</option>
          <option value="Grúa 03 - Liebherr">Grúa 03 - Liebherr</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Operador *</label>
        <select id="op-day-${totalDaysCreated}" class="form-control">
          <option value="">-- Operador --</option>
          <option value="Brandon Tapasco">Brandon Tapasco</option>
          <option value="Cristian Rodas">Cristian Rodas</option>
          <option value="Giovanni Ocampo">Giovanni Ocampo</option>
          <option value="Carlos Operario">Carlos Operario</option>
          <option value="Mario Restrepo">Mario Restrepo</option>
        </select>
      </div>
      <div class="form-group">
        <label>Aparejador *</label>
        <select id="ap-day-${totalDaysCreated}" class="form-control">
          <option value="">-- Aparejador --</option>
          <option value="Juan Pérez">Juan Pérez</option>
          <option value="Andrés Gómez">Andrés Gómez</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Hora Inicio *</label>
        <div style="display: flex; gap: 6px;">
          <input type="time" id="hini-day-${totalDaysCreated}" class="form-control" onchange="calculateHours(${totalDaysCreated})" style="flex: 1;">
          <button type="button" onclick="setNow('hini-day-${totalDaysCreated}')" style="padding: 0 10px; background: #BF956E; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Ahora</button>
        </div>
      </div>
      <div class="form-group">
        <label>Hora Final *</label>
        <div style="display: flex; gap: 6px;">
          <input type="time" id="hfin-day-${totalDaysCreated}" class="form-control" onchange="calculateHours(${totalDaysCreated})" style="flex: 1;">
          <button type="button" onclick="setNow('hfin-day-${totalDaysCreated}')" style="padding: 0 10px; background: #BF956E; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Ahora</button>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Km/Hr Inicial *</label>
        <input type="number" id="kmini-day-${totalDaysCreated}" placeholder="Ej: 12000">
      </div>
      <div class="form-group">
        <label>Km/Hr Final *</label>
        <input type="number" id="kmfin-day-${totalDaysCreated}" placeholder="Ej: 12150">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Combustible Inicial (Gal)</label>
        <input type="number" id="combi-day-${totalDaysCreated}" placeholder="Ej: 40">
      </div>
      <div class="form-group">
        <label>Combustible Final (Gal)</label>
        <input type="number" id="combf-day-${totalDaysCreated}" placeholder="Ej: 25">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Urea Inicial (Gal)</label>
        <input type="number" id="ureai-day-${totalDaysCreated}" placeholder="Ej: 10">
      </div>
      <div class="form-group">
        <label>Urea Final (Gal)</label>
        <input type="number" id="ureaf-day-${totalDaysCreated}" placeholder="Ej: 5">
      </div>
    </div>
    <div class="form-group">
      <label>Observaciones / Novedades en Sitio (Rayones, Varadas, etc.)</label>
      <textarea id="obs-day-${totalDaysCreated}" rows="2" placeholder="Describa cualquier novedad ocurrida..."></textarea>
    </div>

    <div class="form-group" style="background: #f0fdf4; padding: 14px; border-radius: 8px; border: 2px dashed #27ae60; margin-bottom: 15px;">
      <label style="color: #27ae60; font-weight: bold; display: block; margin-bottom: 6px;">
        📸 Evidencias Fotográficas del Día * (Puede tomar varias)
      </label>
      <p style="font-size: 0.75rem; color: #555; margin-bottom: 10px;">Tome o seleccione cuántas fotos necesite. Todas se estamparán automáticamente con los datos corporativos.</p>
      <input type="file" id="input-foto-multi-${totalDaysCreated}" accept="image/*" capture="environment" style="display: none;" onchange="procesarFotoMulti(event, ${totalDaysCreated})">
      <button type="button" onclick="document.getElementById('input-foto-multi-${totalDaysCreated}').click()" style="background: #27ae60; color: white; border: none; padding: 10px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; width: 100%; font-size: 0.9rem;">
        📸 Tomar o Seleccionar Foto
      </button>
      <div id="galeria-fotos-${totalDaysCreated}" style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px;"></div>
    </div>

    <button type="button" id="btnSaveDay-${totalDaysCreated}" class="btn-save-day" onclick="saveDayRecord(${totalDaysCreated})" style="background-color: #040B5D; color: white; padding: 12px; width: 100%; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 5px;">
      Guardar Día #${totalDaysCreated}
    </button>
  `;

  container.appendChild(dayCard);
}

function procesarFotoMulti(event, dayNum) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      const footerHeight = 125;
      canvas.height = img.height + footerHeight;

      ctx.drawImage(img, 0, 0);

      ctx.fillStyle = "#040B5D";
      ctx.fillRect(0, img.height, canvas.width, footerHeight);

      ctx.fillStyle = "#BF956E";
      ctx.fillRect(0, img.height, canvas.width, 6);

      const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
      const currentTask = savedTasks.find((t) => String(t.id) === String(currentActiveTaskId)) || {};
      const clienteNombre = currentTask.cliente || "CLIENTE GENERAL";
      const numTarea = currentActiveTaskId || "S/N";
      const gruaElem = document.getElementById(`grua-day-${dayNum}`);
      const grua = (gruaElem && gruaElem.value) ? gruaElem.value : "Grúa General";
      const inputDirElement = document.getElementById(`dir-day-${dayNum}`);
      const dirInput = (inputDirElement && inputDirElement.value.trim()) ? inputDirElement.value.trim() : (currentTask.direccion || "Pereira");
      const ciudadTexto = dirInput.includes(",") ? dirInput.split(",")[0].trim() : dirInput;

      const ahora = new Date();
      const fechaActual = ahora.toLocaleDateString();
      const horaActual = ahora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const colIzquierdaX = Math.max(15, Math.floor(canvas.width * 0.025));
      const colDerechaX = Math.floor(canvas.width * 0.52);
      const fontSize = Math.max(12, Math.floor(canvas.width * 0.021));

      ctx.fillStyle = "#FFFFFF";
      ctx.font = `bold ${fontSize + 2}px sans-serif`;
      ctx.fillText(`AYAX | TAREA #${numTarea}`, colIzquierdaX, img.height + 32);
      ctx.fillText(`Vehículo: ${grua}`, colDerechaX, img.height + 32);

      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillText(`Cliente: ${clienteNombre}`, colIzquierdaX, img.height + 64);
      ctx.fillText(`Fecha: ${fechaActual}`, colDerechaX, img.height + 64);

      ctx.fillText(`Ciudad: ${ciudadTexto}`, colIzquierdaX, img.height + 96);
      ctx.fillText(`Hora: ${horaActual}`, colDerechaX, img.height + 96);

      const fotoSelladaBase64 = canvas.toDataURL("image/jpeg", 0.9);
      fotosDiaTemporal.push({
        data: fotoSelladaBase64,
        enviadoRedes: false,
        fechaCaptura: ahora.toISOString()
      });

      renderGaleriaMiniaturas(dayNum);
      event.target.value = "";
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function renderGaleriaMiniaturas(dayNum) {
  const galeria = document.getElementById(`galeria-fotos-${dayNum}`);
  if (!galeria) return;
  galeria.innerHTML = "";

  fotosDiaTemporal.forEach((fotoObj, index) => {
    const fotoSrc = typeof fotoObj === "string" ? fotoObj : fotoObj.data;
    const contenedorMini = document.createElement("div");
    contenedorMini.style.cssText = "position: relative; width: 75px; height: 75px; border-radius: 6px; overflow: hidden; border: 2px solid #BF956E; cursor: pointer; background: #000;";
    contenedorMini.innerHTML = `
      <img src="${fotoSrc}" onclick="verFotoGrande('${fotoSrc}')" style="width: 100%; height: 100%; object-fit: cover;" title="Tocar para ampliar">
      <button type="button" onclick="event.stopPropagation(); eliminarFotoTemporal(${dayNum}, ${index})" style="position: absolute; top: 2px; right: 2px; background: rgba(220,38,38,0.9); color: white; border: none; border-radius: 50%; width: 22px; height: 22px; font-size: 11px; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center;" title="Eliminar foto">✕</button>
    `;
    galeria.appendChild(contenedorMini);
  });
}

function verFotoGrande(base64Url) {
  let modal = document.getElementById("modalVistaPreviaFoto");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modalVistaPreviaFoto";
    modal.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 10000; padding: 15px;";
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div style="position: relative; max-width: 95%; max-height: 85%; text-align: center;">
      <img src="${base64Url}" style="max-width: 100%; max-height: 80vh; border-radius: 8px; border: 2px solid #BF956E; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
      <br>
      <button type="button" onclick="document.getElementById('modalVistaPreviaFoto').style.display='none'" style="margin-top: 15px; background: #dc2626; color: white; border: none; padding: 10px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 1rem;">Cerrar Vista Previa</button>
    </div>
  `;
  modal.style.display = "flex";
}

function eliminarFotoTemporal(dayNum, index) {
  fotosDiaTemporal.splice(index, 1);
  renderGaleriaMiniaturas(dayNum);
}

function setNow(fieldId) {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const inputElem = document.getElementById(fieldId);
  if (inputElem) {
    inputElem.value = `${hours}:${minutes}`;
    const parts = fieldId.split("-");
    if (parts.length >= 3) {
      calculateHours(parts[2]);
    }
  }
}

function calculateHours(dayNum) {
  const hini = document.getElementById(`hini-day-${dayNum}`).value;
  const hfin = document.getElementById(`hfin-day-${dayNum}`).value;
  const display = document.getElementById(`hours-display-${dayNum}`);
  let hours = 0.0;
  if (hini && hfin) {
    const [h1, m1] = hini.split(":").map(Number);
    const [h2, m2] = hfin.split(":").map(Number);
    let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diff < 0) diff += 24 * 60;
    hours = (diff / 60).toFixed(1);
  }
  if (display) {
    display.dataset.hours = hours;
    display.innerText = `${hours} Horas`;
  }
}

function saveDayRecord(dayNum) {
  const dir = document.getElementById(`dir-day-${dayNum}`).value;
  const desc = document.getElementById(`desc-day-${dayNum}`).value;
  const grua = document.getElementById(`grua-day-${dayNum}`).value;
  const op = document.getElementById(`op-day-${dayNum}`).value;
  const ap = document.getElementById(`ap-day-${dayNum}`).value;
  const hini = document.getElementById(`hini-day-${dayNum}`).value;
  const hfin = document.getElementById(`hfin-day-${dayNum}`).value;
  const kmini = document.getElementById(`kmini-day-${dayNum}`).value;
  const kmfin = document.getElementById(`kmfin-day-${dayNum}`).value;
  const combi = document.getElementById(`combi-day-${dayNum}`)?.value || "";
  const combf = document.getElementById(`combf-day-${dayNum}`)?.value || "";
  const ureai = document.getElementById(`ureai-day-${dayNum}`)?.value || "";
  const ureaf = document.getElementById(`ureaf-day-${dayNum}`)?.value || "";
  const observaciones = document.getElementById(`obs-day-${dayNum}`).value || "Sin novedades";

  if (!dir || !desc || !grua || !op || !ap || !hini || !hfin || !kmini || !kmfin) {
    alert("Por favor complete todos los campos obligatorios (*)");
    return;
  }

  if (fotosDiaTemporal.length === 0) {
    alert("⚠️ ¡Atención! Debe tomar o adjuntar al menos una foto de evidencia para este día.");
    return;
  }

  const hoursDisplay = document.getElementById(`hours-display-${dayNum}`);
  const hoursWorked = hoursDisplay && hoursDisplay.dataset.hours ? parseFloat(hoursDisplay.dataset.hours) : 0.0;

  const dayData = {
    dayNum,
    direccion: dir,
    labor: desc,
    grua,
    operador: op,
    aparejador: ap,
    horaInicio: hini,
    horaFin: hfin,
    kmInicial: kmini,
    kmFinal: kmfin,
    combustibleInicial: combi,
    combustibleFinal: combf,
    ureaInicial: ureai,
    ureaFinal: ureaf,
    horasTrabajadas: hoursWorked,
    observaciones,
    tieneEvidenciaFotografica: true,
    fotosLista: [...fotosDiaTemporal]
  };

  currentDaysData.push(dayData);
  sincronizarAvanceEnSegundoPlano();
  renderDaysAccordion();
  document.getElementById("daysContainer").innerHTML = "";
  alert(`Día #${dayNum} guardado correctamente con ${fotosDiaTemporal.length} foto(s) de evidencia.`);
  fotosDiaTemporal = [];
}

function sincronizarAvanceEnSegundoPlano() {
  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  const totalHoursSum = currentDaysData.reduce((acc, day) => acc + (day.horasTrabajadas || 0), 0);

  savedTasks = savedTasks.map((t) => {
    if (String(t.id) === String(currentActiveTaskId)) {
      return {
        ...t,
        totalDias: currentDaysData.length,
        totalHoras: totalHoursSum.toFixed(1),
        diasDetalle: currentDaysData,
        fechaActualizacion: new Date().toISOString()
      };
    }
    return t;
  });

  localStorage.setItem("ayax_tasks_db", JSON.stringify(savedTasks));
}

function renderDaysAccordion() {
  const container = document.getElementById("daysListContainer");
  if (!container) return;
  container.innerHTML = "";

  currentDaysData.forEach((day) => {
    const details = document.createElement("details");
    details.className = "day-accordion";
    details.style.cssText = "background: #f8f9fa; border: 1px solid #DDC9B8; border-radius: 8px; margin-bottom: 10px; overflow: hidden;";

    const summary = document.createElement("summary");
    summary.style.cssText = "background: #ffffff; padding: 12px 16px; font-weight: 600; color: #040B5D; cursor: pointer; display: flex; justify-content: space-between; align-items: center;";
    summary.innerHTML = `<span>Día #${day.dayNum} - ${day.grua} (${day.horasTrabajadas} hrs)</span> <span style="font-size: 12px; color: #BF956E;">Ver detalle ▾</span>`;

    const content = document.createElement("div");
    content.style.cssText = "padding: 15px; background: #ffffff; border-top: 1px solid #DDC9B8; font-size: 0.85rem; color: #333;";
    content.innerHTML = `
      <p><strong>Labor:</strong> ${day.labor}</p>
      <p><strong>Ubicación:</strong> ${day.direccion}</p>
      <p><strong>Operador:</strong> ${day.operador} | <strong>Aparejador:</strong> ${day.aparejador}</p>
      <p><strong>Horario:</strong> ${day.horaInicio} - ${day.horaFin} (${day.horasTrabajadas} Horas)</p>
      <p style="color: #27ae60; font-weight: bold; margin-top: 5px;">📷 ${day.fotosLista ? day.fotosLista.length : 0} Evidencia(s) Fotográfica(s) Registrada(s)</p>
    `;

    details.appendChild(summary);
    details.appendChild(content);
    container.appendChild(details);
  });
}

// ==========================================
// FIRMAS, CIERRE Y REPORTE PDF DE TAREAS
// ==========================================
async function goToSignSection() {
  if (currentDaysData.length === 0) {
    alert("Por favor guarde al menos un día de trabajo antes de continuar a firmas.");
    return;
  }

  const totalFotosTotal = currentDaysData.reduce((acc, day) => acc + (day.fotosLista ? day.fotosLista.length : 0), 0);
  const badgeFotos = document.getElementById("cantFotosAcumuladas");
  if (badgeFotos) {
    badgeFotos.textContent = totalFotosTotal;
  }

  document.getElementById("secWizard").classList.add("hidden");
  document.getElementById("secSignatures").classList.remove("hidden");
  initSignCanvas("canvasOperador");
  initSignCanvas("canvasCliente");
}

function backToWizardDays() {
  document.getElementById("secSignatures").classList.add("hidden");
  document.getElementById("secWizard").classList.remove("hidden");
}

function initSignCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }
  function endPosition() {
    painting = false;
    ctx.beginPath();
  }
  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.onmousedown = startPosition;
  canvas.onmouseup = endPosition;
  canvas.onmousemove = draw;
  canvas.ontouchstart = (e) => { startPosition(e); e.preventDefault(); };
  canvas.ontouchend = (e) => { endPosition(); e.preventDefault(); };
  canvas.ontouchmove = (e) => { draw(e); e.preventDefault(); };
}

function clearCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function finalizeTask() {
  let totalHoursSum = currentDaysData.reduce((acc, day) => acc + (day.horasTrabajadas || 0), 0);
  if (totalHoursSum === 0) totalHoursSum = 16.5;

  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  savedTasks = savedTasks.map((t) => {
    if (String(t.id) === String(currentActiveTaskId)) {
      return {
        ...t,
        estado: "finalizada",
        totalDias: currentDaysData.length,
        totalHoras: totalHoursSum.toFixed(1),
        diasDetalle: currentDaysData,
        fechaFinalizacion: new Date().toISOString(),
        fechaCierre: new Date().toISOString()
      };
    }
    return t;
  });

  localStorage.setItem("ayax_tasks_db", JSON.stringify(savedTasks));
  alert("¡Tarea finalizada con éxito! Todas las evidencias fotográficas selladas han quedado disponibles en el panel de Redes.");
  showReportView(currentActiveTaskId);
}

function showReportView(id) {
  document.getElementById("secSignatures").classList.add("hidden");
  const secReporte = document.getElementById("secReporte");
  secReporte.classList.remove("hidden");
  document.getElementById("repTaskId").innerText = id;

  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  const task = savedTasks.find((t) => String(t.id) === String(id));

  let htmlDetails = "";
  if (task) {
    htmlDetails = `
      <p><strong>Cliente:</strong> ${task.cliente}</p>
      <p><strong>Dirección:</strong> ${task.direccion || "Varios puntos"}</p>
      <p><strong>Total Días Registrados:</strong> ${task.totalDias || 1}</p>
      <p><strong>Total Horas Acumuladas:</strong> ${task.totalHoras || 0.0} Horas</p>
      <hr style="margin: 10px 0; border: 0; border-top: 1px solid #DDC9B8;">
      <p style="font-size: 0.8rem; color: #27ae60; font-weight: 700;">Estado: Finalizado</p>
    `;
  }
  document.getElementById("reportContent").innerHTML = htmlDetails;
}

function descargarReportePDF() {
  const startDate = document.getElementById("pdfStartDate").value;
  const endDate = document.getElementById("pdfEndDate").value;

  if (!startDate || !endDate) {
    alert("Por favor seleccione una fecha de inicio y una fecha final para el reporte.");
    return;
  }

  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  const filteredTasks = savedTasks.filter((t) => {
    if (t.estado !== "finalizada") return false;
    const taskDateStr = new Date(t.fechaFinalizacion || t.fechaCierre || t.fechaCreacion || Date.now()).toISOString().split("T")[0];
    return taskDateStr >= startDate && taskDateStr <= endDate;
  });

  if (filteredTasks.length === 0) {
    alert(`No hay tareas finalizadas en el rango del ${startDate} al ${endDate}.`);
    return;
  }

  const printWindow = window.open("", "_blank");
  let htmlContent = `
    <html>
    <head>
    <title>Reporte Consolidado - Ayax Grúas Pereira</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
      h2 { color: #040B5D; text-align: center; margin: 5px 0; }
      p { font-size: 0.9rem; margin: 4px 0; }
      .subtitle { text-align: center; color: #666; font-size: 0.85rem; margin-bottom: 15px; }
      .task-box { border: 1px solid #DDC9B8; padding: 12px; margin-bottom: 12px; border-radius: 6px; background: #fdfbf7; }
      .header-info { display: flex; justify-content: space-between; font-weight: bold; color: #040B5D; border-bottom: 1px solid #DDC9B8; padding-bottom: 4px; margin-bottom: 6px; }
      .day-det { font-size: 0.85rem; color: #333; margin-left: 10px; border-left: 2px solid #BF956E; padding-left: 6px; margin-top: 6px; }
      .total-general { background: #040B5D; color: white; padding: 10px; text-align: right; font-weight: bold; border-radius: 6px; margin-top: 15px; }
    </style>
    </head>
    <body>
    <h2>AYAX - GRÚAS PEREIRA</h2>
    <div class="subtitle">Reporte Consolidado de Operaciones | Desde: ${startDate} Hasta: ${endDate}</div>
    <hr style="border: 0; border-top: 2px solid #BF956E; margin: 15px 0;">
  `;

  let totalGeneralHoras = 0;

  filteredTasks.forEach((task) => {
    const fecha = new Date(task.fechaFinalizacion || task.fechaCierre || task.fechaCreacion || Date.now()).toLocaleDateString();
    totalGeneralHoras += parseFloat(task.totalHoras || 0);

    htmlContent += `
      <div class="task-box">
        <div class="header-info">
          <span>Servicio #${task.id} - Cliente: ${task.cliente}</span>
          <span>Fecha: ${fecha}</span>
        </div>
        <p><strong>Dirección:</strong> ${task.direccion || "N/A"}</p>
        <p><strong>Total Días:</strong> ${task.totalDias || 1}</p>
    `;

    if (task.diasDetalle && task.diasDetalle.length > 0) {
      task.diasDetalle.forEach((d) => {
        htmlContent += `
          <div class="day-det">
            <p><strong>Día #${d.dayNum}:</strong> ${d.labor || "Labor en campo"}</p>
            <p><strong>Operador:</strong> ${d.operador} &nbsp;|&nbsp; <strong>Aparejador:</strong> ${d.aparejador}</p>
            <p style="color: #27ae60; font-weight: bold;">Horas empleadas: ${d.horasTrabajadas} Horas</p>
          </div>
        `;
      });
    }

    htmlContent += `
        <p style="text-align: right; font-weight: bold; color: #040B5D; margin-top: 8px;">Total Tarea: ${task.totalHoras || 0} Horas</p>
      </div>
    `;
  });

  htmlContent += `
    <div class="total-general">
      Total Horas Acumuladas en el Periodo: ${totalGeneralHoras.toFixed(1)} Horas
    </div>
    <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

// ==========================================
// PURGA DE TAREAS ANTIGUAS
// ==========================================
function purgeSyncedTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || [];
  const retentionDays = 7;
  const now = new Date();

  const cleanedTasks = savedTasks.filter((task) => {
    if (task.estado === "sincronizada") return false;
    if (task.estado === "pendiente") return true;
    if (task.estado === "finalizada") {
      const finishDate = new Date(task.fechaFinalizacion || task.fechaCierre || Date.now());
      const diffTime = Math.abs(now - finishDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= retentionDays;
    }
    return true;
  });
  localStorage.setItem("ayax_tasks_db", JSON.stringify(cleanedTasks));
}

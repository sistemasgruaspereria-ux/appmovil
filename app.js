// ==========================================
// CONFIGURACIÓN, ROLES Y LEGISLACIÓN COLOMBIA 2026
// ==========================================
const DIVISOR_MENSUAL = 210; // Divisor legal Colombia 2026 (42 horas semanales)
const FESTIVOS_COLOMBIA = new Set([
  "2026-01-01", "2026-01-12", "2026-03-23", "2026-04-02", "2026-04-03",
  "2026-05-01", "2026-05-18", "2026-06-08", "2026-06-15", "2026-06-29",
  "2026-07-20", "2026-08-07", "2026-08-17", "2026-10-12", "2026-11-02",
  "2026-11-16", "2026-12-08", "2026-12-25"
]);
// Usuarios y roles base (se pueden crear, editar y eliminar desde Admin)
let defaultUsers = [
  { phone: "3217293985", pin: "1834", name: "Carolina Valencia Motato", role: "admin", salary: 0 },
  { phone: "3000000000", pin: "2034", name: "Liliana Guzmán", role: "contabilidad", salary: 0 },
  { phone: "3218468761", pin: "1118", name: "Danilo", role: "redes", salary: 0 },
  { phone: "3100000000", pin: "1234", name: "Coordinación Proyectos", role: "proyectos", salary: 0 },
  { phone: "3204618830", pin: "1934", name: "Tatiana Ruiz", role: "operario_horas", salary: 1750905 },
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
  { phone: "319200041", pin: "7780", name: "Víctor Fernando Ocampo Amaya", role: "operario", salary: 1750905 },
  { phone: "3228241425", pin: "1520", name: "Wilfer Alberto Sepulveda Restrepo", role: "operario", salary: 1750905 },
  { phone: "3206311945", pin: "1764", name: "Willer Alexis Quintero Hurtado", role: "operario", salary: 1750905 },
  { phone: "3105385889", pin: "7841", name: "Wilmar Diovany Muñoz Giraldo", role: "operario", salary: 1750905 },
  { phone: "3102276487", pin: "7926", name: "Yeison Alberson Morales Uribe", role: "operario", salary: 1750905 }
];
// Listados desplegables de Operadores y Aparejadores
let defaultOperadores = [
  "Cristian Camilo Rodas Grajales", "Daniel Antonio Rodas Jaramillo", "Diógenes Marín Franco",
  "Duban Alberto Rodriguez Castañeda", "Edixon Giovanni Alvarado Villada", "Giovanni Antonio Ocampo Cano",
  "Héctor Alexander Quiroz Mosquera", "Héctor Augusto Cardona Arboleda", "Jhon Edwin Botero Rodas",
  "Jair Antonio Ramirez García", "Javier de Jesús Restrepo Ladino", "Jhon Edier Castrillon Gallego",
  "Jhon Ever Orejuela Ríos", "Jhonathan Arredondo Ossa", "Jonathan Alexander Martínez Betancourt",
  "Jorge Miguel Gonzáles Vásquez", "Juan José Arango Gallego", "Luis Fernando Tangarife Moncada",
  "Maico Andrey Trejos Chaves", "Milton Andrés Pérez Neva", "Santiago Rivera Marin",
  "Uriel González Ocampo", "Víctor Fernando Ocampo Amaya", "Wilfer Alberto Sepulveda Restrepo",
  "Willer Alexis Quintero Hurtado", "Wilmar Diovany Muñoz Giraldo", "Yeison Alberson Morales Uribe"
];
let defaultAparejadores = [
  "Andrés Camilo Montes Alzate", "Andrés Felipe Gonzalez Ruiz", "Andrés Felipe Ospina Zapata",
  "Arley Cano Vergara", "Brandon Estiven Tapasco Piñeros", "Didier Roberto Orejuela Henao",
  "Duban Alberto Rodriguez Castañeda", "Jhon Fredy Rios Bedoya", "Jhon Jaider Conrrado Mosquera",
  "Jhonathan Arredondo Ossa", "Jonathan Steven Trujillo Taborda", "Juan Daniel Gómez Morales",
  "Juan José Arango Gallego", "Luis Fernando Tangarife Moncada"
];
// Vehículos / Equipos
let defaultVehiculos = [
  { categoria: "Grúa", etiqueta: "#29 TADANO 70 TON", modelo: "TADANO/TADANO 70 TON", combustible: "Eléctrico" },
  { categoria: "Alquiladas", etiqueta: "ALQUILADAS #45", modelo: "Foton/4612 Aumark", combustible: "Gasolina" },
  { categoria: "Grúa", etiqueta: "CAMIÓN GRÚA # 23", modelo: "INTERNATIONAL/4700 4*2 / NATIONAL CRANE", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "CAMIÓN GRÚA # 24", modelo: "HINO 500 2626/FM8JRTA / BRAZO SERIE EX0416 MODELO TM20110", combustible: "Diésel" },
  { categoria: "Extensión de apoyo", etiqueta: "CANASTILLA", modelo: "Canastilla", combustible: "Diésel" },
  { categoria: "Camioneta", etiqueta: "DFSK K01 CHASIS", modelo: "DFSK/K01 Chasis", combustible: "Gasolina" },
  { categoria: "Extensión de apoyo", etiqueta: "DOLLY # 46", modelo: "N/A/DOLLY", combustible: "Diésel" },
  { categoria: "Equipo Hidraulico", etiqueta: "EQUIPO HIDRAULICO # 5", modelo: "Acura/Equipo Hidraulico # 5", combustible: "Eléctrico" },
  { categoria: "Camioneta", etiqueta: "FOTON 4612 AUMARK", modelo: "Foton/4612 Aumark", combustible: "Gasolina" },
  { categoria: "Grúa", etiqueta: "GRÚA # 17", modelo: "XCMG/GRUA XCMG/MODELO XCA250SA", combustible: "Eléctrico" },
  { categoria: "Grúa", etiqueta: "GRÚA # 18", modelo: "LINK-BELT/HC 138- SERIE 19TGK20020", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "GRÚA # 19", modelo: "Volkswagen/CAMION VW23-230 / BRAZO SERIE EX0416 MODELO TM20110", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "GRÚA # 2 ACURA", modelo: "Acura/#2", combustible: "Eléctrico" },
  { categoria: "Grúa", etiqueta: "GRÚA # 2 TEREX", modelo: "TEREX/TEREX #02", combustible: "Eléctrico" },
  { categoria: "Grúa", etiqueta: "GRÚA # 20", modelo: "LOCATELLI/GRIL 827/267", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "GRÚA # 22", modelo: "XCMG/MODELO XZJ5327JQZ30K/SERIE LXGCPA32X8A000706", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "GRÚA # 27", modelo: "XCMG/MODELO XZJ5410JQZ50K/SERIE LXGCPA438KA010388", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "GRÚA # 30", modelo: "Mitsubishi/FUSO", combustible: "Eléctrico" },
  { categoria: "Grúa", etiqueta: "GRÚA # 32", modelo: "Foton/Camión Grúa Foton", combustible: "Eléctrico" },
  { categoria: "Grúa", etiqueta: "GRÚA # 4", modelo: "Freightliner/PK19000", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "GRÚA # 43", modelo: "XCMG/MODELO XZJ5414JQZ60K/SERIE LXGCPA419AA002815", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "GRÚA # 47", modelo: "XCMG/MODELO XZJ5550JOZ130K / SERIE LXCDPA5567A008053", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "GRÚA # 48", modelo: "PYH OMEGA/M:OMEGA/48829", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "GRÚA # 55", modelo: "PYH OMEGA/HSHMC-25/55218", combustible: "Diésel" },
  { categoria: "Grúa", etiqueta: "Grúa #44", modelo: "kato/Grúa kato", combustible: "Eléctrico" },
  { categoria: "Grúa", etiqueta: "GRÚA GROVE # 70", modelo: "GROVE/GROVE #70", combustible: "Eléctrico" },
  { categoria: "LanzaVigas", etiqueta: "LANZA-VIGAS # 25", modelo: "Alfa/Lanzavigas # 25", combustible: "Eléctrico" },
  { categoria: "Extensión de apoyo", etiqueta: "MANLIFT 16 MT", modelo: "Acura/Alfa/Manlift de 16 mt", combustible: "Eléctrico" },
  { categoria: "Extensión de apoyo", etiqueta: "MANLIFT DE 28", modelo: "Alfa/Manlift de 28 mt", combustible: "Eléctrico" },
  { categoria: "Extensión de apoyo", etiqueta: "MANLIFT DE 30 MT", modelo: "Alfa/Manlift de 30mt", combustible: "Eléctrico" },
  { categoria: "Minimula", etiqueta: "MINIMULA # 72", modelo: "Audi/Minimula# 72", combustible: "Eléctrico" },
  { categoria: "Montacarga", etiqueta: "MONTACAGRA # 54", modelo: "HELI/Montacarga CPQYD30", combustible: "Totalmente híbrido" },
  { categoria: "Montacarga", etiqueta: "MONTACARGA # 21", modelo: "Acura/MONTACARGA 12 TONELADAS", combustible: "Eléctrico" },
  { categoria: "Camioneta", etiqueta: "RENAULT KANGOO", modelo: "Renault/KANGOO", combustible: "Gasolina" },
  { categoria: "Tractocamión", etiqueta: "TRACTOCAMIÓN # 10", modelo: "Foton/Tractocamión SUMSN 2544 6x2", combustible: "Diésel" },
  { categoria: "Tractocamión", etiqueta: "TRACTOCAMIÓN # 11", modelo: "Freightliner/Columbia", combustible: "Diésel" },
  { categoria: "Tractocamión", etiqueta: "TRACTOCAMIÓN # 12", modelo: "Freightliner/Columbia", combustible: "Diésel" },
  { categoria: "Tractocamión", etiqueta: "TRACTOCAMIÓN # 13", modelo: "INTERNATIONAL/4700 4*2 / NATIONAL CRANE", combustible: "Diésel" },
  { categoria: "Tractocamión", etiqueta: "TRACTOCAMIÓN # 14", modelo: "Foton/Tractocamión SUMSN 2544 6x2", combustible: "Diésel" },
  { categoria: "Tractocamión", etiqueta: "TRACTOCAMIÓN # 15", modelo: "Kenworth/T800", combustible: "Diésel" },
  { categoria: "Tractocamión", etiqueta: "TRACTOCAMIÓN # 28", modelo: "Volkswagen/VW 17-280", combustible: "Diésel" },
  { categoria: "Tractocamión", etiqueta: "TRACTOCAMIÓN # 7", modelo: "Foton/Tractocamión AUMAN EST 6x4", combustible: "Diésel" },
  { categoria: "Tractocamión", etiqueta: "TRACTOCAMIÓN # 8", modelo: "Foton/4612 Aumark", combustible: "Gasolina" },
  { categoria: "Tractocamión", etiqueta: "TRACTOCAMIÓN #9", modelo: "Foton/Tractocamión AUMAN EST 6x4", combustible: "Diésel" }
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
let ultimoReporteTotalesConta = { horasExtras: 0, horasRecargos: 0, totalHoras: 0, valor: 0 };
let ultimaJornadaAbiertaId = null;
let tabRedesActiva = "pendientes";
// ==========================================
// PERSISTENCIA Y CATÁLOGOS
// ==========================================
function getDBUsers() {
  const local = JSON.parse(localStorage.getItem("ayax_users_db"));
  if (!local || !local.length) {
    localStorage.setItem("ayax_users_db", JSON.stringify(defaultUsers));
    return [...defaultUsers];
  }
  return local;
}
function saveDBUsers(users) {
  localStorage.setItem("ayax_users_db", JSON.stringify(users));
}
function getDBOperadores() {
  const local = JSON.parse(localStorage.getItem("ayax_operadores_db"));
  if (!local || !local.length) {
    localStorage.setItem("ayax_operadores_db", JSON.stringify(defaultOperadores));
    return [...defaultOperadores];
  }
  return local;
}
function getDBAparejadores() {
  const local = JSON.parse(localStorage.getItem("ayax_aparejadores_db"));
  if (!local || !local.length) {
    localStorage.setItem("ayax_aparejadores_db", JSON.stringify(defaultAparejadores));
    return [...defaultAparejadores];
  }
  return local;
}
function getDBVehiculos() {
  const local = JSON.parse(localStorage.getItem("ayax_vehiculos_db"));
  if (!local || !local.length) {
    localStorage.setItem("ayax_vehiculos_db", JSON.stringify(defaultVehiculos));
    return [...defaultVehiculos];
  }
  return local;
}
function getNextConsecutivoGP() {
  const seq = parseInt(localStorage.getItem("ayax_consecutivo_gp") || "1", 10);
  const code = "GP " + String(seq).padStart(4, "0");
  return { code, seq };
}
function incrementConsecutivoGP() {
  const seq = parseInt(localStorage.getItem("ayax_consecutivo_gp") || "1", 10);
  localStorage.setItem("ayax_consecutivo_gp", String(seq + 1));
}
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
function esUsuarioOperarioHoras(usuario) {
  if (!usuario) return false;
  return normalizarTexto(usuario.role) === "operario_horas";
}
function loginUser(phone, pin) {
  const cleanPhone = String(phone || "").trim();
  const cleanPin = String(pin || "").trim();
  const operador = getDBUsers().find(
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
function logoutUser() {
  localStorage.removeItem("usuario_activo");
  localStorage.removeItem("token_sesion");
  totalDaysCreated = 0;
  currentActiveTaskId = null;
  currentDaysData = [];
  fotosDiaTemporal = [];
  fotoInicioStamped = "";
  fotoFinStamped = "";
  fotosNovedadesStamped = [];
  ultimaJornadaAbiertaId = null;
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
  const esHoras = rol === "operario_horas";
  const esProyectos = rol === "proyectos";
  const esRedes = rol === "redes";
  const esConta = rol === "contabilidad";
  const esAdmin = rol === "admin" || rol === "administrador";
  const navTabs = document.getElementById("mainNavTabs");
  if (navTabs) {
    navTabs.classList.toggle("hidden", esProyectos);
    navTabs.style.display = esProyectos ? "none" : "";
  }
  setVisibilidadTab("proyectos", esProyectos || esAdmin);
  setVisibilidadTab("admin", esAdmin);
  setVisibilidadTab("horas", esHoras || esAdmin);
  setVisibilidadTab("diasRegistrados", esHoras || esAdmin);
  setVisibilidadTab("historial", esHoras || esAdmin);
  setVisibilidadTab("pendientes", !esHoras && !esProyectos && !esConta && !esRedes);
  setVisibilidadTab("finalizadas", !esHoras && !esProyectos && !esConta);
  setVisibilidadTab("contabilidad", esConta || esAdmin);
  if (esProyectos) {
    switchTab("proyectos");
    return;
  }
  if (esAdmin) {
    switchTab("admin");
    return;
  }
  if (esHoras) {
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
  getDBUsers();
  getDBOperadores();
  getDBAparejadores();
  getDBVehiculos();
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
  const rol = normalizarTexto(usuarioActivo?.role);
  const tabsSoloHoras = ["horas", "diasRegistrados", "historial"];
  if (tabsSoloHoras.includes(tab) && !esUsuarioOperarioHoras(usuarioActivo) && rol !== "admin") {
    tab = "pendientes";
  }
  const tabs = ["proyectos", "admin", "pendientes", "horas", "diasRegistrados", "historial", "finalizadas", "contabilidad"];
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
  if (tab === "proyectos") renderMenuProyectos();
  if (tab === "admin") renderMenuAdmin();
  if (tab === "pendientes") renderTasks();
  if (tab === "horas") sincronizarJornadasDesdeNube(renderVistaJornada);
  if (tab === "diasRegistrados") sincronizarJornadasDesdeNube(renderListaDiasRegistrados);
  if (tab === "historial") sincronizarJornadasDesdeNube(renderCarpetasHistorial);
  if (tab === "finalizadas") filterFinalized();
  if (tab === "contabilidad") sincronizarJornadasDesdeNube(renderReporteContabilidad);
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
// ROL PROYECTOS
// ==========================================
function renderMenuProyectos() {
  document.getElementById("grid-proyectos-menu")?.classList.remove("hidden");
  document.getElementById("subvista-proyectos-container")?.classList.add("hidden");
}
function volverMenuProyectos() {
  renderMenuProyectos();
}
function abrirFormularioCrearTarea() {
  const { code } = getNextConsecutivoGP();
  const ops = getDBOperadores().map((o) => `<option value="${o}">${o}</option>`).join("");
  const vehs = getDBVehiculos().map((v) => `<option value="${v.etiqueta}">${v.etiqueta}</option>`).join("");
  document.getElementById("grid-proyectos-menu").classList.add("hidden");
  const container = document.getElementById("subvista-proyectos-container");
  const body = document.getElementById("subvista-proyectos-body");
  document.getElementById("subvista-proyectos-titulo").innerText = `Crear Tarea (${code})`;
  container.classList.remove("hidden");
  body.innerHTML = `
    <form id="form-crear-tarea-proyectos">
      <div class="form-group">
        <label>Consecutivo Automático</label>
        <input type="text" value="${code}" disabled style="background:#f1f5f9; font-weight:700;">
      </div>
      <div class="form-group">
        <label>Título de la Tarea *</label>
        <input type="text" id="p-titulo" placeholder="Ej: Izaje de estructura metálica" required>
      </div>
      <div class="form-row">
        <div class="form-group" style="flex:1;">
          <label>Fecha Inicio *</label>
          <input type="date" id="p-fecha" value="${obtenerFechaLocalYYYYMMDD()}" required>
        </div>
        <div class="form-group" style="flex:1;">
          <label>Hora Inicio *</label>
          <input type="time" id="p-hora" value="07:00" required>
        </div>
      </div>
      <div class="form-group">
        <label>Cliente *</label>
        <input type="text" id="p-cliente" placeholder="Nombre del cliente" required>
      </div>
      <div class="form-group">
        <label>Dirección del Cliente *</label>
        <input type="text" id="p-direccion" placeholder="Dirección o ubicación" required>
      </div>
      <div class="form-group">
        <label>Operador *</label>
        <select id="p-operador" required><option value="">-- Seleccione Operador --</option>${ops}</select>
      </div>
      <div class="form-group">
        <label>Equipo Asignado *</label>
        <select id="p-equipo" required><option value="">-- Seleccione Equipo --</option>${vehs}</select>
      </div>
      <div class="form-group">
        <label>Número de Cotización (Opcional)</label>
        <input type="text" id="p-cotizacion" placeholder="Ej: COT-00322">
      </div>
      <button type="submit" class="btn-primary" style="background:#27ae60;">Asignar Tarea</button>
    </form>
  `;
  document.getElementById("form-crear-tarea-proyectos").addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevaTarea = {
      id: code,
      titulo: document.getElementById("p-titulo").value.trim(),
      fechaInicio: document.getElementById("p-fecha").value,
      horaInicio: document.getElementById("p-hora").value,
      cliente: document.getElementById("p-cliente").value.trim(),
      direccion: document.getElementById("p-direccion").value.trim(),
      operador: document.getElementById("p-operador").value,
      maquinaria: document.getElementById("p-equipo").value,
      cotizacion: document.getElementById("p-cotizacion").value.trim(),
      estado: "pendiente",
      fechaCreacion: new Date().toISOString()
    };
    const tasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
    tasks.push(nuevaTarea);
    localStorage.setItem("ayax_tasks_db", JSON.stringify(tasks));
    incrementConsecutivoGP();
    alert(`Tarea ${code} asignada a ${nuevaTarea.operador}. Ya aparece en Tareas Pendientes y en el usuario del operador.`);
    volverMenuProyectos();
  });
}
function verSubVistaProyectos(tipo) {
  document.getElementById("grid-proyectos-menu").classList.add("hidden");
  const container = document.getElementById("subvista-proyectos-container");
  const body = document.getElementById("subvista-proyectos-body");
  container.classList.remove("hidden");
  const titulos = {
    pendientes: "Tareas Pendientes",
    proceso: "Tareas en Proceso",
    finalizadas: "Tareas Finalizadas",
    canceladas: "Tareas Canceladas",
    informes: "Informes"
  };
  document.getElementById("subvista-proyectos-titulo").innerText = titulos[tipo] || "Proyectos";
  if (tipo === "informes") {
    renderInformesProyectos(body);
    return;
  }
  body.innerHTML = `
    <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px;">
      <input type="text" id="filtro-p-codigo" placeholder="Buscar por código..." onkeyup="filtrarListaSubvistaProyectos('${tipo}')" style="flex:1; min-width:120px;">
      <input type="date" id="filtro-p-inicio" onchange="filtrarListaSubvistaProyectos('${tipo}')" style="flex:1; min-width:120px;">
      <input type="date" id="filtro-p-fin" onchange="filtrarListaSubvistaProyectos('${tipo}')" style="flex:1; min-width:120px;">
    </div>
    <div id="lista-subvista-proyectos-content" class="stack"></div>
  `;
  filtrarListaSubvistaProyectos(tipo);
}
function filtrarListaSubvistaProyectos(tipo) {
  const container = document.getElementById("lista-subvista-proyectos-content");
  if (!container) return;
  const cod = (document.getElementById("filtro-p-codigo")?.value || "").toLowerCase().trim();
  const fIni = document.getElementById("filtro-p-inicio")?.value || "";
  const fFin = document.getElementById("filtro-p-fin")?.value || "";
  const tasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  const estadoMap = {
    pendientes: "pendiente",
    proceso: "en_proceso",
    finalizadas: "finalizada",
    canceladas: "cancelada"
  };
  const targetEstado = estadoMap[tipo];
  const filtradas = tasks.filter((t) => {
    const st = t.estado || "pendiente";
    if (st !== targetEstado) return false;
    if (cod && !String(t.id).toLowerCase().includes(cod) && !String(t.cliente || "").toLowerCase().includes(cod)) return false;
    const fTarea = t.fechaInicio || (t.fechaCreacion ? t.fechaCreacion.slice(0, 10) : "");
    if (fIni && fTarea < fIni) return false;
    if (fFin && fTarea > fFin) return false;
    return true;
  });
  if (!filtradas.length) {
    container.innerHTML = `<p class="empty-msg">No hay tareas en esta sección con esos filtros.</p>`;
    return;
  }
  container.innerHTML = filtradas.map((t) => {
    const diasHtml = (t.diasDetalle && t.diasDetalle.length)
      ? `<div style="margin-top:8px; padding-top:8px; border-top:1px solid #e2e8f0; font-size:0.78rem;">
          ${t.diasDetalle.map((d) => `
            <div style="margin-bottom:6px; background:#f8fafc; padding:6px; border-radius:6px;">
              <strong>Día #${d.dayNum}</strong> · ${d.labor || "N/A"}<br>
              Operador: ${d.operador || "N/A"} · Aparejador: ${d.aparejador || "N/A"} · Equipo: ${d.grua || t.maquinaria || "N/A"}<br>
              Horas: ${d.horasTrabajadas || 0}h · Km/Hr: ${d.kmInicial || "-"} a ${d.kmFinal || "-"} · Comb: ${d.combustibleInicial || "-"}→${d.combustibleFinal || "-"} · Urea: ${d.ureaInicial || "-"}→${d.ureaFinal || "-"}
            </div>
          `).join("")}
        </div>`
      : "";
    return `
      <div class="task-card">
        <div class="task-header">
          <span class="task-code">${t.id} ${t.titulo ? "· " + t.titulo : ""}</span>
          <small style="color:#64748b;">${t.estado}</small>
        </div>
        <p class="task-client"><strong>Cliente:</strong> ${t.cliente}</p>
        <p class="task-client"><strong>Dirección:</strong> ${t.direccion || "N/A"}</p>
        <p class="task-client"><strong>Operador:</strong> ${t.operador || "Sin asignar"} · <strong>Equipo:</strong> ${t.maquinaria || "N/A"}</p>
        <p class="task-client"><strong>Cotización:</strong> ${t.cotizacion || "N/A"} · <strong>Total Horas:</strong> ${t.totalHoras || 0}</p>
        ${diasHtml}
        ${tipo === "pendientes" ? `<button type="button" class="btn-danger-small" style="margin-top:8px;" onclick="cancelarTareaPorProyectos('${t.id}')">Cancelar Tarea</button>` : ""}
      </div>
    `;
  }).join("");
}
function cancelarTareaPorProyectos(id) {
  if (!confirm(`¿Cancelar la tarea ${id}? Al operario se le marcará como cancelada y no podrá iniciar ni registrar.`)) return;
  let tasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  tasks = tasks.map((t) => String(t.id) === String(id) ? { ...t, estado: "cancelada", fechaCancelacion: new Date().toISOString() } : t);
  localStorage.setItem("ayax_tasks_db", JSON.stringify(tasks));
  alert(`Tarea ${id} marcada como cancelada.`);
  filtrarListaSubvistaProyectos("pendientes");
}
function renderInformesProyectos(container) {
  container.innerHTML = `
    <div class="form-group">
      <label>Estado de Tareas</label>
      <select id="inf-p-estado" class="form-control">
        <option value="todas">Todas las Tareas</option>
        <option value="pendiente">Pendientes</option>
        <option value="en_proceso">En Proceso</option>
        <option value="finalizada">Finalizadas</option>
        <option value="cancelada">Canceladas</option>
      </select>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex:1;">
        <label>Fecha Inicio</label>
        <input type="date" id="inf-p-inicio" class="form-control">
      </div>
      <div class="form-group" style="flex:1;">
        <label>Fecha Fin</label>
        <input type="date" id="inf-p-fin" class="form-control">
      </div>
    </div>
    <button type="button" class="btn-primary" onclick="descargarExcelInformesProyectos()" style="background:#27ae60;">Descargar Excel (.xls)</button>
  `;
}
function descargarExcelInformesProyectos() {
  const est = document.getElementById("inf-p-estado")?.value || "todas";
  const fIni = document.getElementById("inf-p-inicio")?.value || "";
  const fFin = document.getElementById("inf-p-fin")?.value || "";
  const tasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  const filtradas = tasks.filter((t) => {
    if (est !== "todas" && (t.estado || "pendiente") !== est) return false;
    const fT = t.fechaInicio || (t.fechaCreacion ? t.fechaCreacion.slice(0, 10) : "");
    if (fIni && fT < fIni) return false;
    if (fFin && fT > fFin) return false;
    return true;
  });
  let filasHtml = "";
  filtradas.forEach((t) => {
    const fechaCreacionStr = (t.fechaCreacion || "").slice(0, 10);
    if (t.diasDetalle && t.diasDetalle.length > 0) {
      t.diasDetalle.forEach((d) => {
        filasHtml += `<tr>
          <td>${fechaCreacionStr}</td>
          <td>${t.id}</td>
          <td>${t.cliente || ""}</td>
          <td>${d.direccion || t.direccion || ""}</td>
          <td>${d.operador || t.operador || ""}</td>
          <td>${d.aparejador || ""}</td>
          <td>${d.grua || t.maquinaria || ""}</td>
          <td>${t.cotizacion || ""}</td>
          <td>${t.estado || "pendiente"}</td>
          <td>Día #${d.dayNum}</td>
          <td>${d.horasTrabajadas || 0}</td>
          <td>${d.kmInicial || ""}</td>
          <td>${d.kmFinal || ""}</td>
          <td>${d.combustibleInicial || ""}</td>
          <td>${d.combustibleFinal || ""}</td>
          <td>${d.ureaInicial || ""}</td>
          <td>${d.ureaFinal || ""}</td>
          <td>${d.observaciones || ""}</td>
        </tr>`;
      });
    } else {
      filasHtml += `<tr>
        <td>${fechaCreacionStr}</td>
        <td>${t.id}</td>
        <td>${t.cliente || ""}</td>
        <td>${t.direccion || ""}</td>
        <td>${t.operador || ""}</td>
        <td></td>
        <td>${t.maquinaria || ""}</td>
        <td>${t.cotizacion || ""}</td>
        <td>${t.estado || "pendiente"}</td>
        <td>-</td>
        <td>${t.totalHoras || 0}</td>
        <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
      </tr>`;
    }
  });
  const html = `<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"></head><body><table border="1">
    <thead><tr>
      <th>Fecha Creación</th><th>Código Tarea</th><th>Cliente</th><th>Dirección</th>
      <th>Operador</th><th>Aparejador</th><th>Equipo</th><th>Cotización</th><th>Estado</th>
      <th>Día</th><th>Horas</th><th>Km/Hr Ini</th><th>Km/Hr Fin</th>
      <th>Comb Ini</th><th>Comb Fin</th><th>Urea Ini</th><th>Urea Fin</th><th>Observaciones</th>
    </tr></thead>
    <tbody>${filasHtml}</tbody>
  </table></body></html>`;
  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `informe_proyectos_${obtenerFechaLocalYYYYMMDD()}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// ==========================================
// ROL ADMINISTRADOR
// ==========================================
function renderMenuAdmin() {
  document.getElementById("grid-admin-menu")?.classList.remove("hidden");
  document.getElementById("subvista-admin-container")?.classList.add("hidden");
}
function volverMenuAdmin() {
  renderMenuAdmin();
}
function verSubVistaAdmin(tipo) {
  document.getElementById("grid-admin-menu").classList.add("hidden");
  const container = document.getElementById("subvista-admin-container");
  const body = document.getElementById("subvista-admin-body");
  container.classList.remove("hidden");
  const titulos = {
    usuarios: "Gestión de Usuarios",
    catalogos: "Operadores, Aparejadores y Equipos",
    informes: "Informes por Rol",
    backup: "Copia de Seguridad"
  };
  document.getElementById("subvista-admin-titulo").innerText = titulos[tipo] || "Administración";
  if (tipo === "usuarios") renderAdminUsuarios(body);
  if (tipo === "catalogos") renderAdminCatalogos(body);
  if (tipo === "informes") renderAdminInformes(body);
  if (tipo === "backup") renderAdminBackup(body);
}
function renderAdminUsuarios(container) {
  const users = getDBUsers();
  container.innerHTML = `
    <h3>Crear Usuario</h3>
    <form id="form-admin-crear-user" style="margin-bottom:18px; background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
      <div class="form-row">
        <div class="form-group" style="flex:1;"><label>Número de Teléfono *</label><input type="tel" id="u-phone" required></div>
        <div class="form-group" style="flex:1;"><label>PIN de Acceso (4 dígitos) *</label><input type="password" id="u-pin" maxlength="4" required></div>
      </div>
      <div class="form-group"><label>Nombre Completo *</label><input type="text" id="u-name" required></div>
      <div class="form-row">
        <div class="form-group" style="flex:1;">
          <label>Rol de Usuario *</label>
          <select id="u-role" required>
            <option value="operario">operario</option>
            <option value="operario_horas">operario_horas</option>
            <option value="proyectos">proyectos</option>
            <option value="contabilidad">contabilidad</option>
            <option value="redes">redes</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div class="form-group" style="flex:1;"><label>Salario Base ($)</label><input type="number" id="u-salary" value="1750905"></div>
      </div>
      <button type="submit" class="btn-primary" style="background:#27ae60;">Guardar Usuario</button>
    </form>
    <h3>Usuarios Creados (${users.length})</h3>
    <div class="stack">
      ${users.map((u, idx) => `
        <div class="open-item-card" style="flex-direction:column; align-items:stretch; gap:8px;">
          <div>
            <strong>${u.name}</strong> · <span style="color:#040B5D; font-weight:700;">${u.role}</span><br>
            <span class="muted">Tel: ${u.phone} | PIN: ${u.pin} | Salario: $${Number(u.salary || 0).toLocaleString("es-CO")}</span>
          </div>
          <div style="display:flex; gap:8px;">
            <button type="button" class="btn-secondary-small" style="flex:1;" onclick="editarUsuarioAdmin(${idx})">Editar</button>
            <button type="button" class="btn-danger-small" style="flex:1;" onclick="eliminarUsuarioAdmin('${u.phone}')">Eliminar</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
  document.getElementById("form-admin-crear-user").addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = document.getElementById("u-phone").value.trim();
    const pin = document.getElementById("u-pin").value.trim();
    const name = document.getElementById("u-name").value.trim();
    const role = document.getElementById("u-role").value;
    const salary = parseFloat(document.getElementById("u-salary").value) || 0;
    if (!/^\d{4}$/.test(pin)) {
      alert("El PIN debe tener exactamente 4 dígitos numéricos.");
      return;
    }
    const currentUsers = getDBUsers();
    if (currentUsers.some((u) => String(u.phone).trim() === phone)) {
      alert("Ese número de teléfono ya existe.");
      return;
    }
    currentUsers.push({ phone, pin, name, role, salary });
    saveDBUsers(currentUsers);
    alert("Usuario guardado en Usuarios Creados.");
    renderAdminUsuarios(container);
  });
}
function editarUsuarioAdmin(index) {
  const users = getDBUsers();
  const u = users[index];
  if (!u) return;
  const nuevoNombre = prompt("Nombre completo:", u.name);
  if (nuevoNombre === null) return;
  const nuevoTel = prompt("Número de teléfono:", u.phone);
  if (nuevoTel === null) return;
  const nuevoPin = prompt("PIN de 4 dígitos:", u.pin);
  if (nuevoPin === null) return;
  const nuevoRol = prompt("Rol (operario, operario_horas, proyectos, contabilidad, redes, admin):", u.role);
  if (nuevoRol === null) return;
  const nuevoSalario = prompt("Salario base:", String(u.salary || 0));
  if (nuevoSalario === null) return;
  users[index] = {
    phone: nuevoTel.trim() || u.phone,
    pin: /^\d{4}$/.test(nuevoPin.trim()) ? nuevoPin.trim() : u.pin,
    name: nuevoNombre.trim() || u.name,
    role: nuevoRol.trim() || u.role,
    salary: Number(nuevoSalario) || 0
  };
  saveDBUsers(users);
  alert("Usuario actualizado.");
  renderAdminUsuarios(document.getElementById("subvista-admin-body"));
}
function eliminarUsuarioAdmin(phone) {
  if (!confirm("¿Eliminar este usuario?")) return;
  const currentUsers = getDBUsers().filter((u) => String(u.phone) !== String(phone));
  saveDBUsers(currentUsers);
  renderAdminUsuarios(document.getElementById("subvista-admin-body"));
}
function renderAdminCatalogos(container) {
  const ops = getDBOperadores();
  const aps = getDBAparejadores();
  const vehs = getDBVehiculos();
  container.innerHTML = `
    <h3>Agregar Operador</h3>
    <div style="display:flex; gap:6px; margin-bottom:12px;">
      <input type="text" id="new-op-name" placeholder="Nombre del operador" style="flex:1;">
      <button type="button" class="btn-primary" onclick="agregarOperadorAdmin()" style="width:auto; padding:0 14px;">Agregar</button>
    </div>
    <h3>Agregar Aparejador</h3>
    <div style="display:flex; gap:6px; margin-bottom:12px;">
      <input type="text" id="new-ap-name" placeholder="Nombre del aparejador" style="flex:1;">
      <button type="button" class="btn-primary" onclick="agregarAparejadorAdmin()" style="width:auto; padding:0 14px;">Agregar</button>
    </div>
    <h3>Agregar Vehículo / Equipo</h3>
    <div class="stack" style="margin-bottom:14px; background:#f8fafc; padding:10px; border-radius:8px;">
      <input type="text" id="new-veh-etiqueta" placeholder="Etiqueta (ej: GRÚA # 99)">
      <input type="text" id="new-veh-categoria" placeholder="Categoría (ej: Grúa)">
      <input type="text" id="new-veh-modelo" placeholder="Modelo">
      <input type="text" id="new-veh-combustible" placeholder="Tipo de combustible (ej: Diésel)">
      <button type="button" class="btn-primary" onclick="agregarVehiculoAdmin()">Agregar Vehículo</button>
    </div>
    <h4>Operadores (${ops.length})</h4>
    <div class="stack" style="max-height:130px; overflow-y:auto; margin-bottom:12px;">
      ${ops.map((o, i) => `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; font-size:0.82rem;">
          <span>${o}</span>
          <div style="display:flex; gap:4px;">
            <button type="button" class="btn-secondary-small" onclick="editarOperadorAdmin(${i})">Editar</button>
            <button type="button" class="btn-danger-small" onclick="eliminarOperadorAdmin(${i})">✕</button>
          </div>
        </div>
      `).join("")}
    </div>
    <h4>Aparejadores (${aps.length})</h4>
    <div class="stack" style="max-height:130px; overflow-y:auto; margin-bottom:12px;">
      ${aps.map((a, i) => `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; font-size:0.82rem;">
          <span>${a}</span>
          <div style="display:flex; gap:4px;">
            <button type="button" class="btn-secondary-small" onclick="editarAparejadorAdmin(${i})">Editar</button>
            <button type="button" class="btn-danger-small" onclick="eliminarAparejadorAdmin(${i})">✕</button>
          </div>
        </div>
      `).join("")}
    </div>
    <h4>Vehículos / Equipos (${vehs.length})</h4>
    <div class="stack" style="max-height:160px; overflow-y:auto;">
      ${vehs.map((v, i) => `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; font-size:0.82rem;">
          <span><strong>${v.etiqueta}</strong> · ${v.combustible || ""}</span>
          <div style="display:flex; gap:4px;">
            <button type="button" class="btn-secondary-small" onclick="editarVehiculoAdmin(${i})">Editar</button>
            <button type="button" class="btn-danger-small" onclick="eliminarVehiculoAdmin(${i})">✕</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}
function agregarOperadorAdmin() {
  const name = document.getElementById("new-op-name")?.value.trim();
  if (!name) return;
  const ops = getDBOperadores();
  ops.push(name);
  localStorage.setItem("ayax_operadores_db", JSON.stringify(ops));
  renderAdminCatalogos(document.getElementById("subvista-admin-body"));
}
function editarOperadorAdmin(idx) {
  const ops = getDBOperadores();
  const nuevo = prompt("Editar nombre del operador:", ops[idx]);
  if (!nuevo || !nuevo.trim()) return;
  ops[idx] = nuevo.trim();
  localStorage.setItem("ayax_operadores_db", JSON.stringify(ops));
  renderAdminCatalogos(document.getElementById("subvista-admin-body"));
}
function eliminarOperadorAdmin(idx) {
  const ops = getDBOperadores().filter((_, i) => i !== idx);
  localStorage.setItem("ayax_operadores_db", JSON.stringify(ops));
  renderAdminCatalogos(document.getElementById("subvista-admin-body"));
}
function agregarAparejadorAdmin() {
  const name = document.getElementById("new-ap-name")?.value.trim();
  if (!name) return;
  const aps = getDBAparejadores();
  aps.push(name);
  localStorage.setItem("ayax_aparejadores_db", JSON.stringify(aps));
  renderAdminCatalogos(document.getElementById("subvista-admin-body"));
}
function editarAparejadorAdmin(idx) {
  const aps = getDBAparejadores();
  const nuevo = prompt("Editar nombre del aparejador:", aps[idx]);
  if (!nuevo || !nuevo.trim()) return;
  aps[idx] = nuevo.trim();
  localStorage.setItem("ayax_aparejadores_db", JSON.stringify(aps));
  renderAdminCatalogos(document.getElementById("subvista-admin-body"));
}
function eliminarAparejadorAdmin(idx) {
  const aps = getDBAparejadores().filter((_, i) => i !== idx);
  localStorage.setItem("ayax_aparejadores_db", JSON.stringify(aps));
  renderAdminCatalogos(document.getElementById("subvista-admin-body"));
}
function agregarVehiculoAdmin() {
  const etiqueta = document.getElementById("new-veh-etiqueta")?.value.trim();
  if (!etiqueta) return;
  const vehs = getDBVehiculos();
  vehs.push({
    etiqueta,
    categoria: document.getElementById("new-veh-categoria")?.value.trim() || "General",
    modelo: document.getElementById("new-veh-modelo")?.value.trim() || "",
    combustible: document.getElementById("new-veh-combustible")?.value.trim() || ""
  });
  localStorage.setItem("ayax_vehiculos_db", JSON.stringify(vehs));
  renderAdminCatalogos(document.getElementById("subvista-admin-body"));
}
function editarVehiculoAdmin(idx) {
  const vehs = getDBVehiculos();
  const v = vehs[idx];
  if (!v) return;
  const etiqueta = prompt("Etiqueta del vehículo:", v.etiqueta);
  if (etiqueta === null) return;
  const combustible = prompt("Tipo de combustible:", v.combustible || "");
  if (combustible === null) return;
  vehs[idx] = { ...v, etiqueta: etiqueta.trim() || v.etiqueta, combustible: combustible.trim() };
  localStorage.setItem("ayax_vehiculos_db", JSON.stringify(vehs));
  renderAdminCatalogos(document.getElementById("subvista-admin-body"));
}
function eliminarVehiculoAdmin(idx) {
  const vehs = getDBVehiculos().filter((_, i) => i !== idx);
  localStorage.setItem("ayax_vehiculos_db", JSON.stringify(vehs));
  renderAdminCatalogos(document.getElementById("subvista-admin-body"));
}
function renderAdminInformes(container) {
  container.innerHTML = `
    <div class="form-group">
      <label>Elegir Rol</label>
      <select id="admin-inf-rol" class="form-control">
        <option value="proyectos">proyectos (Tareas y Control de Operaciones)</option>
        <option value="contabilidad">contabilidad (Nómina y Recargos)</option>
        <option value="operario_horas">operario_horas (Jornadas Registradas)</option>
      </select>
    </div>
    <button type="button" class="btn-primary" onclick="exportarInformePorRolAdmin()" style="background:#27ae60;">Generar Informe del Rol</button>
  `;
}
function exportarInformePorRolAdmin() {
  const rol = document.getElementById("admin-inf-rol")?.value || "proyectos";
  if (rol === "contabilidad") {
    renderReporteContabilidad();
    exportarExcelContabilidad();
  } else {
    descargarExcelInformesProyectos();
  }
}
function renderAdminBackup(container) {
  container.innerHTML = `
    <p class="muted" style="margin-bottom:10px;">Descarga una copia de seguridad completa en formato JSON.</p>
    <button type="button" class="btn-primary" onclick="generarBackupJSON()" style="background:#ea580c;">Descargar Copia de Seguridad</button>
  `;
}
function generarBackupJSON() {
  const data = {
    users: getDBUsers(),
    tasks: JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]"),
    jornadas: JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]"),
    operadores: getDBOperadores(),
    aparejadores: getDBAparejadores(),
    vehiculos: getDBVehiculos(),
    fechaBackup: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `backup_ayax_${obtenerFechaLocalYYYYMMDD()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// ==========================================
// FLUJO DE JORNADA, DÍAS REGISTRADOS E HISTORIAL (OPERARIO HORAS)
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
      const maxWidth = 800;
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
      callback(canvas.toDataURL("image/jpeg", 0.65));
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
    const nuevaJornada = {
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
    };
    dbJornadas.push(nuevaJornada);
    localStorage.setItem("ayax_jornadas_db", JSON.stringify(dbJornadas));
    guardarJornadaEnNube(nuevaJornada);
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
  const [y, m, d] = (j.fecha || obtenerFechaLocalYYYYMMDD()).split("-").map(Number);
  const esViernes = new Date(y, (m || 1) - 1, d || 1).getDay() === 5;
  document.getElementById("cierre-jornada-id").value = j.id;
  document.getElementById("cierre-resumen-txt").innerText = `${j.cliente} | Fecha: ${formatearFechaDDMMAAAA(j.fecha)} | Entrada: ${j.horaInicio}`;
  document.getElementById("foto-fin-file").value = "";
  document.getElementById("jornada-hora-fin").value = "";
  document.getElementById("hora-fin-badge").innerText = "";
  document.getElementById("jornada-almuerzo-min").value = esViernes ? "60" : "0";
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
  if (!id || !fileFin) {
    alert("Debes adjuntar la foto de finalización.");
    return;
  }
  const dbJornadas = JSON.parse(localStorage.getItem("ayax_jornadas_db") || "[]");
  const idx = dbJornadas.findIndex((j) => j.id === id);
  if (idx === -1) return;
  const finalizarCierre = (imgFinUrl) => {
    const j = dbJornadas[idx];
    const [y, m, d] = j.fecha.split("-").map(Number);
    const esViernes = new Date(y, m - 1, d).getDay() === 5;
    const almuerzoMin =
      almuerzoRaw !== "" && almuerzoRaw !== null && almuerzoRaw !== undefined
        ? Math.max(0, parseInt(almuerzoRaw, 10) || 0)
        : (esViernes ? 60 : 0);
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
    guardarJornadaEnNube(j);
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
          <span class="flecha-acordeon" style="font-size: 0.85rem; color: #040B5D;">▾</span>
          <button type="button" title="Eliminar registro" onclick="event.preventDefault(); event.stopPropagation(); eliminarJornadaPorId('${j.id}');" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; border-radius: 6px; padding: 3px 9px; font-weight: 700; cursor: pointer;">✕</button>
        </div>
      </summary>
      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 0.8rem;">
        <p style="margin-bottom: 4px;"><strong>Fecha:</strong> ${fechaBonita}</p>
        <p style="margin-bottom: 4px;"><strong>Cliente:</strong> ${j.cliente}</p>
        <p style="margin-bottom: 4px;"><strong>Ubicación:</strong> ${j.direccion}</p>
        <p style="margin-bottom: 4px;"><strong>Horario:</strong> ${j.horaInicio} a ${j.horaFin} · <strong>Descanso/Almuerzo:</strong> ${j.almuerzoMin ?? 0} min</p>
        <p style="margin-bottom: 6px;"><strong>Observaciones:</strong> ${j.observaciones || "Ninguna"}</p>
        <div style="background: #f8fafc; padding: 8px; border-radius: 6px; margin-bottom: 6px;">
          <strong>Horas netas:</strong> ${c.horasNetas ?? 0} h ·
          <strong>Total H. Extras:</strong> ${c.totalHorasExtras ?? 0} h ·
          <strong>Total Recargos:</strong> ${c.totalHorasRecargos ?? 0} h ·
          <strong>A Pagar:</strong> $${(c.valorPagar ?? 0).toLocaleString("es-CO")}
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
          <span>📁 ${formatearNombreMes(clave)} (${lista.length} día${lista.length === 1 ? "" : "s"}) <span class="flecha-acordeon">▾</span></span>
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
// CÁLCULO DE EXTRAS Y RECARGOS (COLOMBIA — NOVIEMBRE 2026)
// Esquema: Lun-Jue 8.5h (sin almuerzo) | Vie 8.0h (60 min almuerzo) = 42h/sem
// Divisor: 210h/mes | Nocturno: 19:00-06:00 | Dom/Fest: 90%
// ==========================================
function normalizarCalculoJornada(jornada, calculoRaw) {
  const base = calculoRaw || {};
  const mismaHora = Boolean(
    jornada &&
    jornada.horaInicio &&
    jornada.horaFin &&
    String(jornada.horaInicio).trim() === String(jornada.horaFin).trim()
  );

  if (mismaHora) {
    return {
      ...base,
      heDiurna: 0,
      heNocturna: 0,
      recNocturno: 0,
      recDominical: 0,
      recNoctDom: 0,
      hedDominical: 0,
      henDominical: 0,
      totalHorasExtras: 0,
      totalHorasRecargos: 0,
      totalHorasConceptos: 0,
      valorPagar: 0
    };
  }

  return base;
}

function calcularJornadaLaboral(fechaStr, horaInicioStr, horaFinStr, almuerzoMinutos, salarioMensual) {
  const [y, m, d] = String(fechaStr || "").split("-").map(Number);
  const [hI, minI] = String(horaInicioStr || "00:00").split(":").map(Number);
  const [hF, minF] = String(horaFinStr || "00:00").split(":").map(Number);

  const inicio = new Date(y, (m || 1) - 1, d || 1, hI || 0, minI || 0, 0);
  const fin = new Date(y, (m || 1) - 1, d || 1, hF || 0, minF || 0, 0);

  // Solo suma 1 día si la hora de fin es estrictamente menor que la de inicio (cruce de medianoche).
  // Si son iguales (ej. 10:21 y 10:21), queda en 0 horas.
  if (fin < inicio) {
    fin.setDate(fin.getDate() + 1);
  }

  const diaSemana = inicio.getDay(); // 0=Dom, 1=Lun, ..., 5=Vie, 6=Sab
  const festivosSet = typeof FESTIVOS_COLOMBIA !== "undefined" && FESTIVOS_COLOMBIA ? FESTIVOS_COLOMBIA : new Set();
  const esDomingoOFestivo = diaSemana === 0 || festivosSet.has(fechaStr);

  let jornadaOrdinariaDia = 8.5;
  if (diaSemana === 5) jornadaOrdinariaDia = 8.0;
  if (diaSemana === 6 || diaSemana === 0) jornadaOrdinariaDia = 0.0;

  const descansoMinutos =
    almuerzoMinutos !== undefined && almuerzoMinutos !== null && almuerzoMinutos !== ""
      ? Math.max(0, Number(almuerzoMinutos))
      : (diaSemana === 5 ? 60 : 0);

  const totalBrutoHoras = Math.max(0, (fin - inicio) / (1000 * 60 * 60));
  const horasNetas = Math.max(0, totalBrutoHoras - descansoMinutos / 60);

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

  let descansoPendiente = descansoMinutos;
  for (const t of tramos) {
    if (descansoPendiente <= 0) break;
    if (t.esVentanaAlmuerzo && t.minsTrabajados > 0) {
      const descontado = Math.min(descansoPendiente, t.minsTrabajados);
      t.minsTrabajados -= descontado;
      descansoPendiente -= descontado;
    }
  }
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

  let heDiurna = 0;
  let heNocturna = 0;
  let recNocturno = 0;
  let recDominical = 0;
  let recNoctDom = 0;
  let hedDominical = 0;
  let henDominical = 0;
  let horasAcumuladas = 0;

  function clasificarHoras(horas, superaJornada, domFest, noct) {
    if (horas <= 0) return;
    if (domFest) {
      if (!superaJornada) {
        if (noct) recNoctDom += horas;
        else recDominical += horas;
      } else {
        if (noct) henDominical += horas;
        else hedDominical += horas;
      }
    } else {
      if (superaJornada) {
        if (noct) heNocturna += horas;
        else heDiurna += horas;
      } else if (noct) {
        recNocturno += horas;
      }
    }
  }

  for (const t of tramos) {
    if (t.minsTrabajados <= 0) continue;
    const horas = t.minsTrabajados / 60;
    if (horasAcumuladas < jornadaOrdinariaDia && horasAcumuladas + horas > jornadaOrdinariaDia) {
      const hOrdinarias = jornadaOrdinariaDia - horasAcumuladas;
      const hExtras = horas - hOrdinarias;
      clasificarHoras(hOrdinarias, false, esDomingoOFestivo, t.esFranjaNocturna);
      clasificarHoras(hExtras, true, esDomingoOFestivo, t.esFranjaNocturna);
    } else {
      const supera = horasAcumuladas + 1e-9 >= jornadaOrdinariaDia;
      clasificarHoras(horas, supera, esDomingoOFestivo, t.esFranjaNocturna);
    }
    horasAcumuladas += horas;
  }

  const divisor = typeof DIVISOR_MENSUAL === "number" && DIVISOR_MENSUAL > 0 ? DIVISOR_MENSUAL : 210;
  const valorHoraOrd = (Number(salarioMensual) || 1750905) / divisor;
  const valorExtrasYRecargos =
    heDiurna * valorHoraOrd * 0.25 +
    heNocturna * valorHoraOrd * 0.75 +
    recNocturno * valorHoraOrd * 0.35 +
    recDominical * valorHoraOrd * 0.90 +
    recNoctDom * valorHoraOrd * 1.25 +
    hedDominical * valorHoraOrd * 1.15 +
    henDominical * valorHoraOrd * 1.65;

  const totalHorasExtras = Number((heDiurna + heNocturna + hedDominical + henDominical).toFixed(2));
  const totalHorasRecargos = Number((recNocturno + recDominical + recNoctDom).toFixed(2));
  const totalHorasConceptos = Number((totalHorasExtras + totalHorasRecargos).toFixed(2));

  return {
    esDomingoOFestivo,
    jornadaOrdinariaDia,
    descansoMinutos,
    horasNetas: Number(horasNetas.toFixed(2)),
    heDiurna: Number(heDiurna.toFixed(2)),
    heNocturna: Number(heNocturna.toFixed(2)),
    recNocturno: Number(recNocturno.toFixed(2)),
    recDominical: Number(recDominical.toFixed(2)),
    recNoctDom: Number(recNoctDom.toFixed(2)),
    hedDominical: Number(hedDominical.toFixed(2)),
    henDominical: Number(henDominical.toFixed(2)),
    totalHorasExtras,
    totalHorasRecargos,
    totalHorasConceptos,
    valorPagar: Math.round(valorExtrasYRecargos)
  };
}

// ==========================================
// MÓDULO CONTABILIDAD (NÓMINA Y AUDITORÍA)
// ==========================================
function renderReporteContabilidad() {
  const selEmp = document.getElementById("filtro-emp-conta");
  if (selEmp && selEmp.options.length === 0) {
    selEmp.innerHTML = `<option value="todos">Todos los empleados</option>` +
      getDBUsers().filter((o) => o.role === "operario_horas").map((o) => `<option value="${o.phone}">${o.name}</option>`).join("");
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
  let granExtras = 0, granRecargos = 0, granHoras = 0, granValor = 0;
  Object.values(porEmpleado).forEach((grupo) => {
    let subExtras = 0, subRecargos = 0, subHoras = 0, subValor = 0;
    grupo.filas.forEach((f) => {
      const c = normalizarCalculoJornada(f, f.calculo);
      const hExtras = Number(c.totalHorasExtras ?? ((c.heDiurna || 0) + (c.heNocturna || 0) + (c.hedDominical || 0) + (c.henDominical || 0)));
      const hRecargos = Number(c.totalHorasRecargos ?? ((c.recNocturno || 0) + (c.recDominical || 0) + (c.recNoctDom || 0)));
      const hTotal = Number(c.totalHorasConceptos ?? (hExtras + hRecargos));
      const valorFila = Number(c.valorPagar || 0);
      subExtras += hExtras;
      subRecargos += hRecargos;
      subHoras += hTotal;
      subValor += valorFila;
      ultimoReporteFilasConta.push({
        tipo: "registro",
        fecha: f.fecha,
        empleado: f.empleadoNombre,
        cliente: f.cliente,
        direccion: f.direccion,
        horaInicio: f.horaInicio,
        horaFin: f.horaFin,
        almuerzoMin: f.almuerzoMin ?? 0,
        totalHorasExtras: Number(hExtras.toFixed(2)),
        totalHorasRecargos: Number(hRecargos.toFixed(2)),
        heDiurna: c.heDiurna || 0,
        heNocturna: c.heNocturna || 0,
        recNocturno: c.recNocturno || 0,
        recDominical: c.recDominical || 0,
        recNoctDom: c.recNoctDom || 0,
        hedDominical: c.hedDominical || 0,
        henDominical: c.henDominical || 0,
        totalHoras: Number(hTotal.toFixed(2)),
        valorPagar: valorFila
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
        <td><strong>${hExtras.toFixed(2)}</strong></td>
        <td>${hRecargos.toFixed(2)}</td>
        <td>${c.heDiurna || 0}</td>
        <td>${c.heNocturna || 0}</td>
        <td>${c.recNocturno || 0}</td>
        <td>${c.recDominical || 0}</td>
        <td>${c.recNoctDom || 0}</td>
        <td>${c.hedDominical || 0}</td>
        <td>${c.henDominical || 0}</td>
        <td>${hTotal.toFixed(2)}</td>
        <td>$${valorFila.toLocaleString("es-CO")}</td>
      `;
      tbody.appendChild(tr);
    });
    granExtras += subExtras;
    granRecargos += subRecargos;
    granHoras += subHoras;
    granValor += subValor;
    ultimoReporteFilasConta.push({
      tipo: "subtotal",
      etiqueta: `Subtotal ${grupo.nombre}`,
      totalHorasExtras: Number(subExtras.toFixed(2)),
      totalHorasRecargos: Number(subRecargos.toFixed(2)),
      totalHoras: Number(subHoras.toFixed(2)),
      valorPagar: Math.round(subValor)
    });
    const trSub = document.createElement("tr");
    trSub.className = "subtotal-row";
    trSub.innerHTML = `
      <td colspan="8" style="text-align:right;">Subtotal ${grupo.nombre}:</td>
      <td>${subExtras.toFixed(2)}</td>
      <td>${subRecargos.toFixed(2)}</td>
      <td colspan="7"></td>
      <td>${subHoras.toFixed(2)}</td>
      <td>$${Math.round(subValor).toLocaleString("es-CO")}</td>
    `;
    tbody.appendChild(trSub);
  });
  ultimoReporteTotalesConta = {
    horasExtras: Number(granExtras.toFixed(2)),
    horasRecargos: Number(granRecargos.toFixed(2)),
    totalHoras: Number(granHoras.toFixed(2)),
    valor: Math.round(granValor)
  };
  const resumenBox = document.getElementById("resumen-extras-conta");
  if (resumenBox) {
    resumenBox.innerHTML = `
      <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:8px 10px;">
        <div style="font-size:0.72rem; color:#1d4ed8; font-weight:700;">TOTAL HORAS EXTRAS</div>
        <div style="font-size:1rem; color:#040B5D; font-weight:800;">${ultimoReporteTotalesConta.horasExtras.toFixed(2)} h</div>
      </div>
      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:8px 10px;">
        <div style="font-size:0.72rem; color:#15803d; font-weight:700;">TOTAL A PAGAR EXTRAS/RECARGOS</div>
        <div style="font-size:1rem; color:#166534; font-weight:800;">$${ultimoReporteTotalesConta.valor.toLocaleString("es-CO")}</div>
      </div>
    `;
  }
  tfoot.innerHTML = `
    <tr class="gran-total-row">
      <td colspan="8" style="text-align:right;">TOTAL GENERAL:</td>
      <td>${granExtras.toFixed(2)}</td>
      <td>${granRecargos.toFixed(2)}</td>
      <td colspan="7"></td>
      <td>${granHoras.toFixed(2)}</td>
      <td>$${Math.round(granValor).toLocaleString("es-CO")}</td>
    </tr>
  `;
}

function exportarExcelContabilidad() {
  const encabezados = [
    "Fecha", "Empleado", "Cliente", "Dirección", "Hora Inicio", "Hora Fin", "Almuerzo (min)",
    "Total Horas Extras", "Total Horas Recargos",
    "H.E. Diurna (25%)", "H.E. Nocturna (75%)", "Rec. Nocturno (35%)", "Rec. Dominical (90%)",
    "Rec. Noct. Dom/Fest (125%)", "H.E.D. Dom/Fest (115%)", "H.E.N. Dom/Fest (165%)",
    "Total Conceptos", "Valor a Pagar"
  ];
  let filasHtml = "";
  ultimoReporteFilasConta.forEach((item) => {
    if (item.tipo === "registro") {
      filasHtml += `
        <tr>
          <td>${item.fecha}</td><td>${item.empleado}</td><td>${item.cliente}</td><td>${item.direccion}</td>
          <td>${item.horaInicio}</td><td>${item.horaFin}</td><td>${item.almuerzoMin}</td>
          <td>${item.totalHorasExtras}</td><td>${item.totalHorasRecargos}</td>
          <td>${item.heDiurna}</td><td>${item.heNocturna}</td><td>${item.recNocturno}</td>
          <td>${item.recDominical}</td><td>${item.recNoctDom}</td><td>${item.hedDominical}</td>
          <td>${item.henDominical}</td><td>${item.totalHoras}</td><td>${item.valorPagar}</td>
        </tr>`;
    } else if (item.tipo === "subtotal") {
      filasHtml += `
        <tr style="font-weight:bold;background:#eff6ff;">
          <td colspan="7">${item.etiqueta}</td>
          <td>${item.totalHorasExtras}</td><td>${item.totalHorasRecargos}</td>
          <td colspan="7"></td>
          <td>${item.totalHoras}</td><td>${item.valorPagar}</td>
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
            <td colspan="7">TOTAL GENERAL</td>
            <td>${ultimoReporteTotalesConta.horasExtras}</td>
            <td>${ultimoReporteTotalesConta.horasRecargos}</td>
            <td colspan="7"></td>
            <td>${ultimoReporteTotalesConta.totalHoras}</td>
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
  const c = normalizarCalculoJornada(j, j.calculo);
  const valorPagar = Number(c.valorPagar || 0);
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
      <strong>Tipo de Día:</strong> ${c.esDomingoOFestivo ? "Domingo / Festivo" : "Día Hábil"} (Jornada base: ${c.jornadaOrdinariaDia ?? 8.5}h)<br>
      <strong>Horario:</strong> ${j.horaInicio} a ${j.horaFin} | <strong>Almuerzo/Descanso:</strong> ${j.almuerzoMin ?? 0} min<br>
      <strong>Observaciones:</strong> ${j.observaciones || "Ninguna"}<br>
      <strong>Total H. Extras:</strong> ${c.totalHorasExtras ?? 0} h · <strong>Total Recargos:</strong> ${c.totalHorasRecargos ?? 0} h · <strong>A Pagar:</strong> $${valorPagar.toLocaleString("es-CO")}
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
// RENDERIZADO DE TAREAS PENDIENTES (OPERARIO)
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
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  const esAdmin = normalizarTexto(usuarioActivo?.role) === "admin";
  const nombreUsuario = normalizarTexto(usuarioActivo?.name);
  let countP = 0;
  savedTasks.forEach((task) => {
    const estado = task.estado || "pendiente";
    const asignadaAlUsuario = !task.operador || normalizarTexto(task.operador) === nombreUsuario || esAdmin;
    if (!asignadaAlUsuario) return;
    if (estado === "pendiente" || estado === "en_proceso") {
      countP++;
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <div class="task-header">
          <span class="task-code">${task.id} ${task.titulo ? "· " + task.titulo : ""}</span>
          <small style="color: #64748b;">${estado === "en_proceso" ? "En proceso" : "Pendiente"}</small>
        </div>
        <p class="task-client"><strong>Cliente:</strong> ${task.cliente}</p>
        <p class="task-client"><strong>Ubicación:</strong> ${task.direccion || task.ubicacion || "N/A"}</p>
        <p class="task-client"><strong>Equipo:</strong> ${task.maquinaria || "N/A"}</p>
        <button type="button" class="btn-primary" onclick="openTask('${task.id}')" style="margin-top: 10px;">
          ${estado === "en_proceso" ? "Continuar Servicio" : "Iniciar Servicio"}
        </button>
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
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
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
          Tarea ${task.id} (${isFinalizada ? "Finalizada" : "En Progreso / Activa"})
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
  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
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
  const folderName = `Tarea_${String(task.id).replace(/[^a-zA-Z0-9]/g, "_")}_${String(task.cliente || "").replace(/[^a-zA-Z0-9]/g, "_")}`;
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
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  let matchCount = 0;
  let totalFinalizedCount = 0;
  savedTasks.forEach((task) => {
    if (task.estado === "finalizada") {
      const taskDateObj = new Date(task.fechaFinalizacion || task.fechaCreacion || Date.now());
      const taskDateStr = obtenerFechaLocalYYYYMMDD(taskDateObj);
      const matchesCurrentMonthYear = (taskDateObj.getMonth() === currentMonth && taskDateObj.getFullYear() === currentYear);
      if (matchesCurrentMonthYear || dateQuery) {
        totalFinalizedCount++;
        const matchesText = String(task.id).toLowerCase().includes(textQuery) || String(task.cliente || "").toLowerCase().includes(textQuery);
        const matchesDate = !dateQuery || taskDateStr === dateQuery;
        if (matchesText && matchesDate) {
          matchCount++;
          const card = document.createElement("div");
          card.className = "task-card";
          card.style.borderColor = "#27ae60";
          card.innerHTML = `
            <div class="task-header">
              <span class="task-code" style="color: #27ae60;">${task.id} (Finalizada)</span>
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
  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  const task = savedTasks.find((t) => String(t.id) === String(id));
  if (!task) return;
  if (task.estado === "cancelada") {
    alert("Tarea cancelada. No es posible iniciar ni registrar información en esta tarea.");
    renderTasks();
    return;
  }
  savedTasks = savedTasks.map((t) => String(t.id) === String(id) && (t.estado || "pendiente") === "pendiente"
    ? { ...t, estado: "en_proceso", fechaInicioEjecucion: new Date().toISOString() }
    : t);
  localStorage.setItem("ayax_tasks_db", JSON.stringify(savedTasks));
  currentActiveTaskId = id;
  document.getElementById("mainNavTabs").classList.add("hidden");
  document.getElementById("secPendientes").classList.add("hidden");
  document.getElementById("secFinalizadas").classList.add("hidden");
  const secWizard = document.getElementById("secWizard");
  secWizard.classList.remove("hidden");
  document.getElementById("wizardTitle").innerText = `${id} · Operación`;
  document.getElementById("daysContainer").innerHTML = "";
  const daysListContainer = document.getElementById("daysListContainer");
  if (daysListContainer) daysListContainer.innerHTML = "";
  totalDaysCreated = 0;
  if (task.diasDetalle && task.diasDetalle.length > 0) {
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
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  const currentTask = savedTasks.find((t) => String(t.id) === String(currentActiveTaskId)) || {};
  const opsOptions = getDBOperadores().map((o) => {
    const sel = currentTask.operador && normalizarTexto(currentTask.operador) === normalizarTexto(o) ? "selected" : "";
    return `<option value="${o}" ${sel}>${o}</option>`;
  }).join("");
  const apsOptions = getDBAparejadores().map((a) => `<option value="${a}">${a}</option>`).join("");
  const vehsOptions = getDBVehiculos().map((v) => {
    const sel = currentTask.maquinaria && normalizarTexto(currentTask.maquinaria) === normalizarTexto(v.etiqueta) ? "selected" : "";
    return `<option value="${v.etiqueta}" ${sel}>${v.etiqueta}</option>`;
  }).join("");
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
      <input type="text" id="dir-day-${totalDaysCreated}" value="${currentTask.direccion || ""}" placeholder="Ej: Vía Cerritos Km 4">
    </div>
    <div class="form-group">
      <label>Descripción Corta de la Labor Realizada *</label>
      <input type="text" id="desc-day-${totalDaysCreated}" value="${currentTask.titulo || ""}" placeholder="Ej: Izaje de estructura metálica">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Vehículo / Grúa *</label>
        <select id="grua-day-${totalDaysCreated}" class="form-control">
          <option value="">-- Seleccione Grúa --</option>
          ${vehsOptions}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Operador *</label>
        <select id="op-day-${totalDaysCreated}" class="form-control">
          <option value="">-- Operador --</option>
          ${opsOptions}
        </select>
      </div>
      <div class="form-group">
        <label>Aparejador *</label>
        <select id="ap-day-${totalDaysCreated}" class="form-control">
          <option value="">-- Aparejador --</option>
          ${apsOptions}
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
      const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
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
      ctx.fillText(`AYAX | ${numTarea}`, colIzquierdaX, img.height + 32);
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
  abrirVisorFoto("Vista Previa de Evidencia", base64Url);
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
  const savedTasksCheck = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  const tareaActual = savedTasksCheck.find((t) => String(t.id) === String(currentActiveTaskId));
  if (tareaActual && tareaActual.estado === "cancelada") {
    alert("Tarea cancelada. No se puede guardar información en esta tarea.");
    closeWizard();
    return;
  }
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
    fechaRegistro: obtenerFechaLocalYYYYMMDD(),
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
  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  const totalHoursSum = currentDaysData.reduce((acc, day) => acc + (day.horasTrabajadas || 0), 0);
  savedTasks = savedTasks.map((t) => {
    if (String(t.id) === String(currentActiveTaskId)) {
      return {
        ...t,
        estado: t.estado === "cancelada" ? "cancelada" : "en_proceso",
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
    summary.innerHTML = `<span>Día #${day.dayNum} - ${day.grua} (${day.horasTrabajadas} hrs)</span> <span class="flecha-acordeon" style="font-size: 12px; color: #BF956E;">Ver detalle ▾</span>`;
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
  const totalHoursSum = currentDaysData.reduce((acc, day) => acc + (day.horasTrabajadas || 0), 0);
  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
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
  alert(`¡Tarea ${currentActiveTaskId} finalizada con éxito! Quedó disponible en Tareas Finalizadas y en el panel de Redes.`);
  showReportView(currentActiveTaskId);
}
function showReportView(id) {
  document.getElementById("secSignatures").classList.add("hidden");
  const secReporte = document.getElementById("secReporte");
  secReporte.classList.remove("hidden");
  document.getElementById("repTaskId").innerText = id;
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
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
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  const filteredTasks = savedTasks.filter((t) => {
    if (t.estado !== "finalizada") return false;
    const taskDateStr = obtenerFechaLocalYYYYMMDD(new Date(t.fechaFinalizacion || t.fechaCierre || t.fechaCreacion || Date.now()));
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
          <span>Servicio ${task.id} - Cliente: ${task.cliente}</span>
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
// LIMPIEZA DE TAREAS SINCRONIZADAS
// ==========================================
function purgeSyncedTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db") || "[]");
  const cleanedTasks = savedTasks.filter((task) => task.estado !== "sincronizada");
  localStorage.setItem("ayax_tasks_db", JSON.stringify(cleanedTasks));
}
// ==========================================
// SINCRONIZACIÓN DE JORNADAS CON NEON (/api/jornadas)
// ==========================================
function normalizarJornadaDesdeDB(row) {
  let fotosNov = row.fotos_novedades || row.fotosNovedades || [];
  if (typeof fotosNov === "string") {
    try { fotosNov = JSON.parse(fotosNov); } catch { fotosNov = []; }
  }
  let calc = row.calculo || null;
  if (typeof calc === "string") {
    try { calc = JSON.parse(calc); } catch { calc = null; }
  }
  const fechaStr = String(row.fecha || "").slice(0, 10);
  return {
    id: String(row.id),
    empleadoId: String(row.empleado_id || row.empleadoId || ""),
    empleadoNombre: String(row.empleado_nombre || row.empleadoNombre || ""),
    salario: Number(row.salario || 1750905),
    fecha: fechaStr,
    mesClave: String(row.mes_clave || row.mesClave || fechaStr.slice(0, 7)),
    cliente: String(row.cliente || ""),
    direccion: String(row.direccion || ""),
    horaInicio: String(row.hora_inicio || row.horaInicio || ""),
    fotoInicio: row.foto_inicio || row.fotoInicio || null,
    estado: String(row.estado || "abierta"),
    horaFin: row.hora_fin || row.horaFin || null,
    fotoFin: row.foto_fin || row.fotoFin || null,
    almuerzoMin: (row.almuerzo_min !== null && row.almuerzo_min !== undefined)
      ? Number(row.almuerzo_min)
      : (row.almuerzoMin ?? null),
    observaciones: String(row.observaciones || ""),
    fotosNovedades: Array.isArray(fotosNov) ? fotosNov : [],
    calculo: calc
  };
}
async function guardarJornadaEnNube(jornada) {
  if (!jornada || !navigator.onLine) return;
  try {
    const resp = await fetch("/api/jornadas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jornada)
    });
    if (!resp.ok) {
      const errTxt = await resp.text();
      console.warn("No se pudo guardar en Neon:", errTxt);
    }
  } catch (err) {
    console.warn("Sin conexión o error de red al guardar en Neon:", err);
  }
}
async function sincronizarJornadasDesdeNube(renderCallback) {
  if (!navigator.onLine) {
    if (typeof renderCallback === "function") renderCallback();
    return;
  }
  try {
    const resp = await fetch("/api/jornadas");
    if (!resp.ok) {
      if (typeof renderCallback === "function") renderCallback();
      return;
    }
    const rows = await resp.json();
    if (Array.isArray(rows)) {
      const jornadasNube = rows.map(normalizarJornadaDesdeDB);
      localStorage.setItem("ayax_jornadas_db", JSON.stringify(jornadasNube));
    }
  } catch (err) {
    console.warn("No se pudo sincronizar desde Neon:", err);
  } finally {
    if (typeof renderCallback === "function") renderCallback();
  }
}




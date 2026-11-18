// ==========================================
// LISTA DE OPERADORES Y REDES AUTORIZADOS
// ==========================================
let authorizedOperators = [
  { phone: "3217293985", pin: "1834", name: "Carolina Valencia", role: "admin" },
  { phone: "3218468761", pin: "1118", name: "Danilo", role: "redes" },
  { phone: "3156642481", pin: "9372", name: "Brandon Estiven Tapasco Piñeros", role: "operario" },
  { phone: "3215617856", pin: "1824", name: "Cristian Camilo Rodas Grajales", role: "operario" },
  { phone: "3224032093", pin: "8752", name: "Daniel Antonio Rodas Jaramillo", role: "operario" },
  { phone: "3153722857", pin: "7629", name: "Diógenes Marín Franco", role: "operario" },
  { phone: "3107630014", pin: "1278", name: "Duban Alberto Rodriguez Castañeda", role: "operario" },
  { phone: "3122686744", pin: "3468", name: "Edixon Giovanni Alvarado Villada", role: "operario" },
  { phone: "3113099973", pin: "6936", name: "Giovanni Antonio Ocampo Cano", role: "operario" },
  { phone: "3102369528", pin: "1472", name: "Héctor Augusto Cardona Arboleda", role: "operario" },
  { phone: "3213676599", pin: "2936", name: "Jhon Edwin Botero Rodas", role: "operario" },
  { phone: "3137374691", pin: "3427", name: "Jair Antonio Ramirez García", role: "operario" },
  { phone: "3145299065", pin: "2509", name: "Javier de Jesús Restrepo Ladino", role: "operario" },
  { phone: "3206499919", pin: "6358", name: "Jhon Edier Castrillon Gallego", role: "operario" },
  { phone: "3053534019", pin: "9351", name: "Jhon Ever Orejuela Ríos", role: "operario" },
  { phone: "3209363345", pin: "8261", name: "Jhonathan Arredondo Ossa", role: "operario" },
  { phone: "3043488345", pin: "3067", name: "Jonathan Alexander Martínez Betancourt", role: "operario" },
  { phone: "3218986200", pin: "1682", name: "Jorge Miguel Gonzáles Vásquez", role: "operario" },
  { phone: "3146105449", pin: "5941", name: "Juan Daniel Gómez Morales", role: "operario" },
  { phone: "3145749402", pin: "4736", name: "Juan José Arango Gallego", role: "operario" },
  { phone: "3147861372", pin: "3195", name: "Luis Fernando Tangarife Moncada", role: "operario" },
  { phone: "3138098395", pin: "1028", name: "Maico Andrey Trejos Chaves", role: "operario" },
  { phone: "3115653390", pin: "8950", name: "Milton Andrés Pérez Neva", role: "operario" },
  { phone: "3027507045", pin: "9760", name: "Santiago Rivera Marin", role: "operario" },
  { phone: "3148643257", pin: "3268", name: "Uriel González Ocampo", role: "operario" },
  { phone: "319200041",  pin: "7780", name: "Víctor Fernando Ocampo Amaya", role: "operario" },
  { phone: "3228241425", pin: "1520", name: "Wilfer Alberto Sepulveda Restrepo", role: "operario" },
  { phone: "3206311945", pin: "1764", name: "Willer Alexis Quintero Hurtado", role: "operario" },
  { phone: "3105385889", pin: "7841", name: "Wilmar Diovany Muñoz Giraldo", role: "operario" },
  { phone: "3102276487", pin: "7926", name: "Yeison Alberson Morales Uribe", role: "operario" }
];

// ==========================================
// VARIABLES Y CONFIGURACIÓN GLOBAL
// ==========================================
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
let totalDaysCreated = 0;
let currentActiveTaskId = null;
let currentDaysData = [];
let fotosDiaTemporal = [];

// ==========================================
// CONTROL DE CONECTIVIDAD Y EVENTOS
// ==========================================
window.addEventListener('online', handleNetworkChange);
window.addEventListener('offline', handleNetworkChange);
function handleNetworkChange() {
  if (navigator.onLine) {
    processOfflineQueue();
  }
}
function processOfflineQueue() {
  let pendingSync = JSON.parse(localStorage.getItem("ayax_sync_queue")) || [];
  if (pendingSync.length > 0) {
    setTimeout(() => {
      localStorage.removeItem("ayax_sync_queue");
    }, 1500);
  }
}

// ==========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  verificarModoMantenimiento();
  purgeSyncedTasks();
  
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('usuario_activo');
        localStorage.removeItem('token_sesion');
        window.location.reload();
      }
    });
  }
  
  window.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdownMenu');
    const badge = document.getElementById('userBadge');
    if (dropdown && badge && !badge.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db"));
  if (!savedTasks || savedTasks.length === 0) {
    localStorage.setItem("ayax_tasks_db", JSON.stringify(defaultMockTasks));
  }
  
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
  
  if (document.getElementById("pdfStartDate")) document.getElementById("pdfStartDate").value = firstDay;
  if (document.getElementById("pdfEndDate")) document.getElementById("pdfEndDate").value = lastDay;
  
  const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo"));
  if (usuarioActivo) {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    const userBadgeSpan = document.querySelector("#userBadge span");
    if (userBadgeSpan) userBadgeSpan.textContent = usuarioActivo.name;
    configurarVistaPorRol(usuarioActivo);
  }
});

function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdownMenu');
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
}

function verificarModoMantenimiento() {
  const enMantenimiento = false;
  const pantallaMantenimiento = document.getElementById('maintenance-screen');
  const appContainer = document.getElementById('app');
  const loginScreen = document.getElementById('loginScreen');
  if (enMantenimiento && pantallaMantenimiento) {
    pantallaMantenimiento.style.display = 'flex';
    if (appContainer) appContainer.classList.add('hidden');
    if (loginScreen) loginScreen.classList.add('hidden');
  } else if (pantallaMantenimiento) {
    pantallaMantenimiento.style.display = 'none';
  }
}

function configurarVistaPorRol(operador) {
  const navTabs = document.getElementById("mainNavTabs");
  const secPendientes = document.getElementById("secPendientes");
  const secFinalizadas = document.getElementById("secFinalizadas");
  if (operador.role === "redes") {
    if (navTabs) navTabs.style.display = "none";
    if (secPendientes) secPendientes.classList.add("hidden");
    if (secFinalizadas) {
      secFinalizadas.classList.remove("hidden");
      renderPanelRedesParaDanilo();
    }
  } else {
    if (navTabs) navTabs.style.display = "flex";
    renderTasks();
  }
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
  
  savedTasks.forEach(task => {
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
        <p class="task-client"><strong>Ubicación:</strong> ${task.direccion || task.ubicacion || 'N/A'}</p>
        <button class="btn-primary" onclick="openTask('${task.id}')" style="margin-top: 10px;">Iniciar Servicio</button>
      `;
      containerPendientes.appendChild(card);
    }
  });
  
  const countPendElem = document.getElementById("countPendientes");
  if (countPendElem) countPendElem.innerText = countP;
  filterFinalized();
}

// ==========================================
// PANEL EXCLUSIVO DE REDES (DANILO) CON PESTAÑAS DE CONTROL
// ==========================================
let tabRedesActiva = 'pendientes'; // 'pendientes' o 'historial'

function renderPanelRedesParaDanilo() {
  const containerFinalizadas = document.getElementById("listFinalizadas");
  if (!containerFinalizadas) return;
  containerFinalizadas.innerHTML = "";
  
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  
  const headerNotice = document.createElement("div");
  headerNotice.style.cssText = "background: #e0f2fe; color: #0369a1; padding: 12px; border-radius: 6px; margin-bottom: 12px; font-weight: bold; border: 1px solid #bae6fd; font-size: 0.85rem;";
  headerNotice.innerHTML = `📥 Panel de Redes`;
  containerFinalizadas.appendChild(headerNotice);

  const tabsContainer = document.createElement("div");
  tabsContainer.style.cssText = "display: flex; gap: 8px; margin-bottom: 15px;";
  tabsContainer.innerHTML = `
    <button type="button" onclick="cambiarTabRedes('pendientes')" style="flex: 1; padding: 10px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; background: ${tabRedesActiva === 'pendientes' ? '#040B5D' : '#e2e8f0'}; color: ${tabRedesActiva === 'pendientes' ? '#ffffff' : '#334155'};">
      📥 Pendientes por Descargar
    </button>
    <button type="button" onclick="cambiarTabRedes('historial')" style="flex: 1; padding: 10px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; background: ${tabRedesActiva === 'historial' ? '#040B5D' : '#e2e8f0'}; color: ${tabRedesActiva === 'historial' ? '#ffffff' : '#334155'};">
      📁 Historial Descargadas
    </button>
  `;
  containerFinalizadas.appendChild(tabsContainer);

  const tareasFiltradas = savedTasks.filter(task => {
    let cantFotosTotal = 0;
    if (task.diasDetalle && task.diasDetalle.length > 0) {
      cantFotosTotal = task.diasDetalle.reduce((acc, d) => acc + (d.fotosLista ? d.fotosLista.length : 0), 0);
    }
    if (cantFotosTotal === 0) return false;

    if (tabRedesActiva === 'pendientes') {
      return !task.descargadoRedes;
    } else {
      return task.descargadoRedes === true;
    }
  });

  if (tareasFiltradas.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "empty-msg";
    emptyMsg.style.textAlign = "center";
    emptyMsg.style.padding = "20px";
    emptyMsg.innerText = tabRedesActiva === 'pendientes' 
      ? "¡Excelente! No hay tareas pendientes por descargar en este momento." 
      : "No hay registros en el historial de descargas aún.";
    containerFinalizadas.appendChild(emptyMsg);
    return;
  }

  tareasFiltradas.forEach(task => {
    let cantFotosTotal = task.diasDetalle.reduce((acc, d) => acc + (d.fotosLista ? d.fotosLista.length : 0), 0);
    const isFinalizada = task.estado === "finalizada";
    
    const card = document.createElement("div");
    card.className = "task-card";
    card.style.cssText = `background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px; border: 1px solid ${tabRedesActiva === 'pendientes' ? '#BF956E' : '#cbd5e1'};`;
    
    card.innerHTML = `
      <div class="task-header">
        <span class="task-code" style="color: ${isFinalizada ? '#27ae60' : '#040B5D'}; font-weight: bold;">
          Tarea #${task.id} (${isFinalizada ? 'Finalizada' : 'En Progreso / Activa'})
        </span>
        <small style="color: #64748b;">${new Date(task.fechaActualizacion || task.fechaCreacion || Date.now()).toLocaleDateString()}</small>
      </div>
      <p class="task-client"><strong>Cliente:</strong> ${task.cliente}</p>
      <p class="task-client"><strong>Días Registrados / Horas:</strong> ${task.diasDetalle ? task.diasDetalle.length : 1} días (${task.totalHoras || 0.0} hrs)</p>
      <p class="task-client" style="color: #0369a1; font-weight: 600;">📷 Fotos disponibles en paquete: ${cantFotosTotal}</p>
      ${task.descargadoRedes ? `<p style="font-size: 0.75rem; color: #16a34a; margin-top: 4px; font-weight: bold;">✔ Descargado el: ${new Date(task.fechaDescargaRedes).toLocaleString()}</p>` : ''}
      <div style="margin-top: 12px; display: flex; gap: 8px;">
        <button onclick="descargarEvidenciasTarea('${task.id}')" style="background: ${tabRedesActiva === 'pendientes' ? '#040B5D' : '#475569'}; color: white; border: none; padding: 10px 14px; border-radius: 6px; font-weight: bold; cursor: pointer; flex: 1; font-size: 0.85rem;">
          ${tabRedesActiva === 'pendientes' ? '📦 Descargar Paquete de Evidencias (ZIP)' : '🔄 Volver a Descargar ZIP'}
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

// ==========================================
// DESCARGA DE EVIDENCIAS Y PASE INMEDIATO AL HISTORIAL
// ==========================================
async function descargarEvidenciasTarea(taskId) {
  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  const task = savedTasks.find(t => String(t.id) === String(taskId));
  
  if (!task || !task.diasDetalle || task.diasDetalle.length === 0) {
    alert("No hay evidencias fotográficas registradas para esta tarea.");
    return;
  }

  if (typeof JSZip === 'undefined') {
    alert("La librería JSZip no está cargada en la aplicación.");
    return;
  }

  // 1. Marcar inmediatamente como descargado en el almacenamiento local y mover al historial
  savedTasks = savedTasks.map(t => {
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

  // 2. Actualizar la vista de Danilo al instante
  renderPanelRedesParaDanilo();

  // 3. Generar y descargar el archivo ZIP en segundo plano de manera silenciosa
  const zip = new JSZip();
  const folderName = `Tarea_${task.id}_${task.cliente.replace(/[^a-zA-Z0-9]/g, '_')}`;
  const taskFolder = zip.folder(folderName);
  let fotosAgregadas = 0;

  task.diasDetalle.forEach((day) => {
    if (day.fotosLista && day.fotosLista.length > 0) {
      day.fotosLista.forEach((fotoObj, index) => {
        let base64Data = "";
        if (typeof fotoObj === "string") {
          base64Data = fotoObj.split(',')[1];
        } else if (fotoObj && fotoObj.data) {
          base64Data = fotoObj.data.split(',')[1];
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
    const link = document.createElement('a');
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

  savedTasks.forEach(task => {
    if (task.estado === "finalizada") {
      const taskDateObj = new Date(task.fechaFinalizacion || task.fechaCreacion || Date.now());
      const taskDateStr = taskDateObj.toISOString().split('T')[0];
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
// CONTROL DEL WIZARD DE TAREAS
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
  const task = savedTasks.find(t => t.id === id);
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
    <!-- SECCIÓN DE FOTOS MÚLTIPLES CON SELLO CORPORATIVO -->
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

// ==========================================
// PROCESAR MÚLTIPLES FOTOS CON SELLO CORPORATIVO
// ==========================================
function procesarFotoMulti(event, dayNum) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      const footerHeight = 125;
      canvas.height = img.height + footerHeight;
      
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "#040B5D";
      ctx.fillRect(0, img.height, canvas.width, footerHeight);
      ctx.fillStyle = "#BF956E";
      ctx.fillRect(0, img.height, canvas.width, 6);
      
      const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
      const currentTask = savedTasks.find(t => String(t.id) === String(currentActiveTaskId)) || {};
      
      const clienteNombre = currentTask.cliente || "CLIENTE GENERAL";
      const numTarea = currentActiveTaskId || "S/N";
      const gruaElem = document.getElementById(`grua-day-${dayNum}`);
      const grua = (gruaElem && gruaElem.value) ? gruaElem.value : "Grúa General";
      
      const inputDirElement = document.getElementById(`dir-day-${dayNum}`);
      const dirInput = (inputDirElement && inputDirElement.value.trim()) ? inputDirElement.value.trim() : (currentTask.direccion || "Pereira");
      
      let ciudadTexto = "Pereira";
      if (dirInput.includes(",")) {
        const partes = dirInput.split(",");
        ciudadTexto = partes[0].trim();
      } else {
        ciudadTexto = dirInput;
      }
      
      const ahora = new Date();
      const fechaActual = ahora.toLocaleDateString();
      const horaActual = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
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
      
      const fotoSelladaBase64 = canvas.toDataURL('image/jpeg', 0.9);
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

// ==========================================
// RENDERIZAR MINIATURAS CON VISTA PREVIA
// ==========================================
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
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const inputElem = document.getElementById(fieldId);
  if (inputElem) {
    inputElem.value = `${hours}:${minutes}`;
    const parts = fieldId.split('-');
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
    const [h1, m1] = hini.split(':').map(Number);
    const [h2, m2] = hfin.split(':').map(Number);
    let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diff < 0) diff += 24 * 60;
    hours = (diff / 60).toFixed(1);
  }
  if (display) {
    display.dataset.hours = hours;
    display.innerText = `${hours} Horas`;
  }
}

// ==========================================
// GUARDADO DE DÍA Y SINCRONIZACIÓN
// ==========================================
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
  let totalHoursSum = currentDaysData.reduce((acc, day) => acc + (day.horasTrabajadas || 0), 0);
  savedTasks = savedTasks.map(t => {
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
// SECCIÓN DE FIRMAS Y CIERRE
// ==========================================
async function goToSignSection() {
  if (currentDaysData.length === 0) {
    alert("Por favor guarde al menos un día de trabajo antes de continuar a firmas.");
    return;
  }
  
  let totalFotosTotal = currentDaysData.reduce((acc, day) => acc + (day.fotosLista ? day.fotosLista.length : 0), 0);
  const badgeFotos = document.getElementById('cantFotosAcumuladas');
  if (badgeFotos) {
    badgeFotos.textContent = totalFotosTotal;
  }
  document.getElementById("secWizard").classList.add("hidden");
  document.getElementById("secSignatures").classList.remove("hidden");
  initSignCanvas('canvasOperador');
  initSignCanvas('canvasCliente');
}

function backToWizardDays() {
  document.getElementById("secSignatures").classList.add("hidden");
  document.getElementById("secWizard").classList.remove("hidden");
}

function initSignCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
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
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
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
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ==========================================
// FINALIZAR TAREA
// ==========================================
function finalizeTask() {
  let totalHoursSum = currentDaysData.reduce((acc, day) => acc + (day.horasTrabajadas || 0), 0);
  if (totalHoursSum === 0) totalHoursSum = 16.5;
  
  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  let currentTaskData = null;
  
  savedTasks = savedTasks.map(t => {
    if (String(t.id) === String(currentActiveTaskId)) {
      currentTaskData = t;
      return {
        ...t,
        estado: "finalizada",
        totalDias: currentDaysData.length,
        totalHoras: totalHoursSum.toFixed(1),
        diasDetalle: currentDaysData,
        fechaFinalizacion: new Date().toISOString()
      };
    }
    return t;
  });
  
  localStorage.setItem("ayax_tasks_db", JSON.stringify(savedTasks));
  alert("¡Tarea finalizada con éxito! Todas las evidencias fotográficas selladas han quedado disponibles en el panel de Redes para Danilo.");
  showReportView(currentActiveTaskId);
}

function showReportView(id) {
  document.getElementById("secSignatures").classList.add("hidden");
  const secReporte = document.getElementById("secReporte");
  secReporte.classList.remove("hidden");
  document.getElementById("repTaskId").innerText = id;
  
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  const task = savedTasks.find(t => String(t.id) === String(id));
  let htmlDetails = "";
  if (task) {
    htmlDetails = `
      <p><strong>Cliente:</strong> ${task.cliente}</p>
      <p><strong>Dirección:</strong> ${task.direccion || 'Varios puntos'}</p>
      <p><strong>Total Días Registrados:</strong> ${task.totalDias || 1}</p>
      <p><strong>Total Horas Acumuladas:</strong> ${task.totalHoras || 0.0} Horas</p>
      <hr style="margin: 10px 0; border: 0; border-top: 1px solid #DDC9B8;">
      <p style="font-size: 0.8rem; color: #27ae60; font-weight: 700;">Estado: Finalizado</p>
    `;
  }
  document.getElementById("reportContent").innerHTML = htmlDetails;
}

// ==========================================
// REPORTE MENSUAL EN PDF
// ==========================================
function descargarReportePDF() {
  const startDate = document.getElementById("pdfStartDate").value;
  const endDate = document.getElementById("pdfEndDate").value;
  if (!startDate || !endDate) {
    alert("Por favor seleccione una fecha de inicio y una fecha final para el reporte.");
    return;
  }
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  let filteredTasks = savedTasks.filter(t => {
    if (t.estado !== "finalizada") return false;
    const taskDateStr = new Date(t.fechaFinalizacion || t.fechaCreacion || Date.now()).toISOString().split('T')[0];
    return taskDateStr >= startDate && taskDateStr <= endDate;
  });
  if (filteredTasks.length === 0) {
    alert(`No hay tareas finalizadas en el rango del ${startDate} al ${endDate}.`);
    return;
  }
  let printWindow = window.open('', '_blank');
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
  filteredTasks.forEach(task => {
    let fecha = new Date(task.fechaFinalizacion || task.fechaCreacion || Date.now()).toLocaleDateString();
    totalGeneralHoras += parseFloat(task.totalHoras || 0);
    htmlContent += `
      <div class="task-box">
        <div class="header-info">
          <span>Servicio #${task.id} - Cliente: ${task.cliente}</span>
          <span>Fecha: ${fecha}</span>
        </div>
        <p><strong>Dirección:</strong> ${task.direccion || 'N/A'}</p>
        <p><strong>Total Días:</strong> ${task.totalDias || 1}</p>
    `;
    if (task.diasDetalle && task.diasDetalle.length > 0) {
      task.diasDetalle.forEach(d => {
        htmlContent += `
          <div class="day-det">
            <p><strong>Día #${d.dayNum}:</strong> ${d.labor || 'Labor en campo'}</p>
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

function switchTab(tab) {
  const btnPendientes = document.getElementById("btnTabPendientes");
  const btnFinalizadas = document.getElementById("btnTabFinalizadas");
  const secPendientes = document.getElementById("secPendientes");
  const secFinalizadas = document.getElementById("secFinalizadas");
  
  if (tab === 'pendientes') {
    btnPendientes.classList.add("active");
    btnFinalizadas.classList.remove("active");
    secPendientes.classList.remove("hidden");
    secFinalizadas.classList.add("hidden");
  } else {
    btnFinalizadas.classList.add("active");
    btnPendientes.classList.remove("active");
    secFinalizadas.classList.remove("hidden");
    secPendientes.classList.add("hidden");
  }
  filterFinalized();
}

// ==========================================
// PURGA DE TAREAS ANTIGUAS Y LOGIN
// ==========================================
function purgeSyncedTasks() {
  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || [];
  const retentionDays = 7;
  const now = new Date();
  
  const cleanedTasks = savedTasks.filter(task => {
    if (task.estado === "pendiente") return true;
    if (task.estado === "finalizada") {
      const finishDate = new Date(task.fechaFinalizacion || Date.now());
      const diffTime = Math.abs(now - finishDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= retentionDays;
    }
    return true;
  });
  localStorage.setItem("ayax_tasks_db", JSON.stringify(cleanedTasks));
}

function handleLogin() {
  const phoneInput = document.getElementById("loginPhone").value.trim();
  const pinInput = document.getElementById("loginPin").value.trim();
  
  const operadorEncontrado = authorizedOperators.find(
    op => op.phone === phoneInput && op.pin === pinInput
  );
  
  if (operadorEncontrado) {
    localStorage.setItem("usuario_activo", JSON.stringify(operadorEncontrado));
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    
    const userBadgeSpan = document.querySelector("#userBadge span");
    if (userBadgeSpan) {
      userBadgeSpan.textContent = operadorEncontrado.name;
    }
    configurarVistaPorRol(operadorEncontrado);
  } else {
    alert("Número de teléfono o PIN incorrecto. Por favor verifique.");
  }
}

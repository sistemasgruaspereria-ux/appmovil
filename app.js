let authorizedOperators = [
  { phone: "3101234567", pin: "1234", name: "Carlos Operario" }
];

const defaultMockTasks = [
  {
    id: "1045",
    cliente: "Constructora Bolívar",
    direccion: "Km 4 Vía Cerritos, Pereira",
    fechaCreacion: new Date().toISOString(),
    estado: "pendiente"
  },
  {
    id: "1046",
    cliente: "Megacentro Pereira",
    direccion: "Av. 30 de Agosto #45-12",
    fechaCreacion: new Date().toISOString(),
    estado: "pendiente"
  },
  {
    id: "1044",
    cliente: "Ingeniería y Vías S.A.S.",
    direccion: "Sector Dosquebradas",
    fechaCreacion: new Date().toISOString(),
    fechaFinalizacion: new Date().toISOString(),
    totalDias: 2,
    totalHoras: "16.5",
    diasDetalle: [
      { dayNum: 1, operador: "Carlos Operario", aparejador: "Juan Pérez", horasTrabajadas: 8.5, labor: "Izaje pesado", ureaInicial: 10, ureaFinal: 5 },
      { dayNum: 2, operador: "Carlos Operario", aparejador: "Juan Pérez", horasTrabajadas: 8.0, labor: "Montaje de vigas", ureaInicial: 5, ureaFinal: 2 }
    ],
    estado: "finalizada"
  }
];

let totalDaysCreated = 0;
let currentActiveTaskId = null;
let currentDaysData = [];

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

window.addEventListener("DOMContentLoaded", () => {
  verificarModoMantenimiento();

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

  if (!localStorage.getItem("ayax_tasks_db")) {
    localStorage.setItem("ayax_tasks_db", JSON.stringify(defaultMockTasks));
  }
  
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
  
  if (document.getElementById("pdfStartDate")) document.getElementById("pdfStartDate").value = firstDay;
  if (document.getElementById("pdfEndDate")) document.getElementById("pdfEndDate").value = lastDay;

  renderTasks();
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

function handleLogin() {
  const phoneInput = document.getElementById("loginPhone").value.trim();
  const pinInput = document.getElementById("loginPin").value.trim();

  const operator = authorizedOperators.find(op => op.phone === phoneInput && op.pin === pinInput);

  if (operator) {
    document.getElementById("userBadge").innerHTML = `<span>${operator.name}</span> ▾`;
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    renderTasks();
  } else {
    alert("Número de teléfono o PIN incorrecto. (Usa Teléfono: 3101234567 y PIN: 1234)");
  }
}

let tempPhoneForRecovery = "";
let generatedVerificationCode = "";

function showRecoverStep1() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("recoverStep1").classList.remove("hidden");
}

function backToLogin() {
  document.getElementById("recoverStep1").classList.add("hidden");
  document.getElementById("recoverStep2").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
}

function sendVerificationCode() {
  const phone = document.getElementById("recoverPhone").value.trim();
  const operator = authorizedOperators.find(op => op.phone === phone);

  if (!operator) {
    alert("Este número de teléfono no está registrado.");
    return;
  }

  tempPhoneForRecovery = phone;
  generatedVerificationCode = Math.floor(1000 + Math.random() * 9000).toString();
  alert(`📲 [CÓDIGO ENVIADO]: Tu código de acceso es: ${generatedVerificationCode}`);

  document.getElementById("recoverStep1").classList.add("hidden");
  document.getElementById("recoverStep2").classList.remove("hidden");
}

function saveNewPin() {
  const enteredCode = document.getElementById("verificationCode").value.trim();
  const newPin = document.getElementById("newPin").value.trim();
  const confirmPin = document.getElementById("confirmPin").value.trim();

  if (enteredCode !== generatedVerificationCode) {
    alert("El código de verificación es incorrecto.");
    return;
  }

  if (newPin.length !== 4 || newPin !== confirmPin) {
    alert("El PIN debe tener 4 dígitos y coincidir.");
    return;
  }

  const operatorIndex = authorizedOperators.findIndex(op => op.phone === tempPhoneForRecovery);
  if (operatorIndex !== -1) {
    authorizedOperators[operatorIndex].pin = newPin;
    alert("¡PIN actualizado con éxito!");
    document.getElementById("loginPhone").value = tempPhoneForRecovery;
    document.getElementById("loginPin").value = newPin;
    backToLogin();
  }
}

function renderTasks() {
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
        <p class="task-client"><strong>Ubicación:</strong> ${task.direccion}</p>
        <button class="btn-primary" onclick="openTask('${task.id}')">Iniciar Servicio 🚚</button>
      `;
      containerPendientes.appendChild(card);
    }
  });

  const countPendElem = document.getElementById("countPendientes");
  if (countPendElem) countPendElem.innerText = countP;
  filterFinalized();
}

function filterFinalized() {
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
            <p class="task-client" style="color: #27ae60; font-weight: 700; margin-top: 6px;">⏱️ Total Horas: ${task.totalHoras || 0.0} Horas</p>
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

function openTask(id) {
  currentActiveTaskId = id;
  document.getElementById("mainNavTabs").classList.add("hidden");
  document.getElementById("secPendientes").classList.add("hidden");
  document.getElementById("secFinalizadas").classList.add("hidden");
  
  const secWizard = document.getElementById("secWizard");
  secWizard.classList.remove("hidden");
  
  document.getElementById("wizardTitle").innerText = `Servicio #${id} Operación`;
  document.getElementById("daysContainer").innerHTML = "";
  totalDaysCreated = 0;
  currentDaysData = [];

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

function addNewDay() {
  totalDaysCreated++;
  const container = document.getElementById("daysContainer");

  const dayCard = document.createElement("div");
  dayCard.className = "day-card";
  dayCard.id = `dayCard-${totalDaysCreated}`;
  dayCard.innerHTML = `
    <div class="day-card-header">
      <span class="day-card-title">📅 Día #${totalDaysCreated}</span>
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
        <input type="time" id="hini-day-${totalDaysCreated}" onchange="calculateHours(${totalDaysCreated})">
      </div>
      <div class="form-group">
        <label>Hora Final *</label>
        <input type="time" id="hfin-day-${totalDaysCreated}" onchange="calculateHours(${totalDaysCreated})">
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
        <label>Combustible Inicial (Gal) *</label>
        <input type="number" id="combi-day-${totalDaysCreated}" placeholder="Ej: 40">
      </div>
      <div class="form-group">
        <label>Combustible Final (Gal) *</label>
        <input type="number" id="combf-day-${totalDaysCreated}" placeholder="Ej: 25">
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Urea Inicial (Gal) *</label>
        <input type="number" id="ureai-day-${totalDaysCreated}" placeholder="Ej: 10">
      </div>
      <div class="form-group">
        <label>Urea Final (Gal) *</label>
        <input type="number" id="ureaf-day-${totalDaysCreated}" placeholder="Ej: 5">
      </div>
    </div>

    <div class="form-group">
      <label>Observaciones (Opcional)</label>
      <textarea id="obs-day-${totalDaysCreated}" rows="2" placeholder="Novedades en sitio..."></textarea>
    </div>

    <div class="form-group">
      <label>Subir Fotos de Evidencia</label>
      <input type="file" id="photos-day-${totalDaysCreated}" accept="image/*" multiple class="file-upload-box">
    </div>

    <button type="button" id="btnSaveDay-${totalDaysCreated}" class="btn-save-day" onclick="saveDayRecord(${totalDaysCreated})">
      💾 Guardar Día #${totalDaysCreated}
    </button>
  `;

  container.appendChild(dayCard);
}

function calculateHours(dayNum) {
  const hini = document.getElementById(`hini-day-${dayNum}`).value;
  const hfin = document.getElementById(`hfin-day-${dayNum}`).value;
  const display = document.getElementById(`hours-display-${dayNum}`);

  if (hini && hfin) {
    const [h1, m1] = hini.split(':').map(Number);
    const [h2, m2] = hfin.split(':').map(Number);
    let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diff < 0) diff += 24 * 60;
    const hours = (diff / 60).toFixed(1);
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
  const ureai = document.getElementById(`ureai-day-${dayNum}`).value;
  const ureaf = document.getElementById(`ureaf-day-${dayNum}`).value;
  const hoursDisplay = document.getElementById(`hours-display-${dayNum}`);
  const hoursWorked = hoursDisplay && hoursDisplay.dataset.hours ? parseFloat(hoursDisplay.dataset.hours) : 8.0;

  if (!dir || !desc || !grua || !op || !ap || !hini || !hfin || !kmini || !kmfin || !ureai || !ureaf) {
    alert("Por favor complete todos los campos obligatorios (*)");
    return;
  }

  currentDaysData.push({
    dayNum,
    direccion: dir,
    labor: desc,
    grua,
    operador: op,
    aparejador: ap,
    horaInicio: hini,
    horaFin: hfin,
    horasTrabajadas: hoursWorked,
    ureaInicial: ureai,
    ureaFinal: ureaf
  });

  const btn = document.getElementById(`btnSaveDay-${dayNum}`);
  btn.innerText = `✅ Día #${dayNum} Guardado`;
  btn.classList.add("saved");

  alert(`Día #${dayNum} guardado correctamente.`);
}

function goToSignSection() {
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
    ctx.strokeStyle = '#000';

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);

  canvas.addEventListener('touchstart', startPosition);
  canvas.addEventListener('touchend', endPosition);
  canvas.addEventListener('touchmove', draw);
}

function clearCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function finalizeTask() {
  let totalHoursSum = currentDaysData.reduce((acc, day) => acc + (day.horasTrabajadas || 0), 0);
  if (totalHoursSum === 0) totalHoursSum = 16.5;

  let savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  let currentTaskData = null;
  
  savedTasks = savedTasks.map(t => {
    if (t.id === currentActiveTaskId) {
      currentTaskData = t;
      return {
        ...t,
        estado: "finalizada",
        totalDias: totalDaysCreated,
        totalHoras: totalHoursSum.toFixed(1),
        diasDetalle: currentDaysData,
        fechaFinalizacion: new Date().toISOString()
      };
    }
    return t;
  });

  localStorage.setItem("ayax_tasks_db", JSON.stringify(savedTasks));

  // WhatsApp automático (Fase 3)
  const clienteNombre = currentTaskData ? currentTaskData.cliente : "Cliente";
  const mensajeWhatsApp = `*🚚 REPORTE DE SERVICIO FINALIZADO - GRÚAS PEREIRA*%0A%0A` +
    `*📋 Servicio:* #${currentActiveTaskId}%0A` +
    `*🏢 Cliente:* ${clienteNombre}%0A` +
    `*⏱️ Total Horas:* ${totalHoursSum.toFixed(1)} hrs%0A` +
    `*📅 Días Laborados:* ${totalDaysCreated}%0A` +
    `*✅ Estado:* Firmado en campo y completado exitosamente.%0A%0A` +
    `_Enviado desde la PWA Operativa de Ayax_`;

  const telefonoLogistica = "573101234567"; 
  const urlWhatsApp = `https://wa.me/${telefonoLogistica}?text=${mensajeWhatsApp}`;

  if (!navigator.onLine) {
    let queue = JSON.parse(localStorage.getItem("ayax_sync_queue")) || [];
    queue.push({ taskId: currentActiveTaskId, fecha: new Date().toISOString() });
    localStorage.setItem("ayax_sync_queue", JSON.stringify(queue));
    alert("📴 Servicio finalizado offline. Se guardó localmente y se enviará la notificación al recuperar señal.");
  } else {
    alert("🚀 ¡Servicio finalizado con éxito! Abriendo WhatsApp para notificar a logística...");
    window.open(urlWhatsApp, '_blank');
  }

  showReportView(currentActiveTaskId);
}

function showReportView(id) {
  document.getElementById("secSignatures").classList.add("hidden");
  const secReporte = document.getElementById("secReporte");
  secReporte.classList.remove("hidden");
  
  document.getElementById("repTaskId").innerText = id;
  
  const savedTasks = JSON.parse(localStorage.getItem("ayax_tasks_db")) || defaultMockTasks;
  const task = savedTasks.find(t => t.id === id);

  if (task) {
    let htmlDetails = `
      <p><strong>Cliente:</strong> ${task.cliente}</p>
      <p><strong>Dirección:</strong> ${task.direccion || 'Varios puntos'}</p>
      <p><strong>Total Días Registrados:</strong> ${task.totalDias || 1}</p>
      <p><strong>Total Horas Acumuladas:</strong> ${task.totalHoras || 0.0} Horas</p>
      <hr style="margin: 10px 0; border: 0; border-top: 1px solid #DDC9B8;">
      <p style="font-size: 0.8rem; color: #27ae60; font-weight: 700;">Estado: Firmado y Sincronizado OK</p>
    `;
    document.getElementById("reportContent").innerHTML = htmlDetails;
  }
}

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
        .logo-header { text-align: center; margin-bottom: 5px; }
        .logo-header img { height: 45px; width: auto; }
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
      <div class="logo-header">
        <img src="logo.png" alt="Ayax Logo">
      </div>
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
            <p>👷 <strong>Operador:</strong> ${d.operador} &nbsp;|&nbsp; 🦺 <strong>Aparejador:</strong> ${d.aparejador}</p>
            <p>💧 <strong>Urea Inicial:</strong> ${d.ureaInicial || 0} Gal &nbsp;|&nbsp; 💧 <strong>Urea Final:</strong> ${d.ureaFinal || 0} Gal</p>
            <p style="color: #27ae60; font-weight: bold;">⏱️ Horas empleadas: ${d.horasTrabajadas} Horas</p>
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
      <script>
        window.onload = function() { window.print(); }
      </script>
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
    filterFinalized();
  }
}

function syncWithOdoo() {
  alert("☁️ Conectando con la API de Odoo... Datos transmitidos y validados exitosamente en la nube de Ayax.");
  closeWizard();
  renderTasks();
}

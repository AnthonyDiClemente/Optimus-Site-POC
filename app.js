const summaryGrid = document.getElementById("summaryGrid");
const projectCards = document.getElementById("projectCards");
const verticalBars = document.getElementById("verticalBars");
const projectFilter = document.getElementById("projectFilter");
const detailTitle = document.getElementById("detailTitle");
const detailSubtitle = document.getElementById("detailSubtitle");
const detailPanel = document.getElementById("detailPanel");
const secureLaunchLink = document.getElementById("secureLaunchLink");
const secureLaunchText = document.getElementById("secureLaunchText");
const pmBriefTitle = document.getElementById("pmBriefTitle");
const pmBriefText = document.getElementById("pmBriefText");
const pmBriefList = document.getElementById("pmBriefList");
const statusForm = document.getElementById("statusForm");
const reportHistory = document.getElementById("reportHistory");
const saveMessage = document.getElementById("saveMessage");
const clearDraftButton = document.getElementById("clearDraftButton");

let activeFilter = "all";
let activeProjectId = appData.projects[0].id;
const storageKey = "optimus-pm-status-reports-v1";
const draftStoragePrefix = "optimus-pm-status-draft-";
let statusReports = loadStatusReports();

function loadStatusReports() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveStatusReports() {
  localStorage.setItem(storageKey, JSON.stringify(statusReports));
}

function getProjectById(projectId) {
  return appData.projects.find((item) => item.id === projectId);
}

function getProjectReports(projectId) {
  return statusReports
    .filter((report) => report.projectId === projectId)
    .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
}

function getLatestReport(projectId) {
  return getProjectReports(projectId)[0] || null;
}

function getHealthClass(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("green") || normalized.includes("high") || normalized.includes("on track")) {
    return "green";
  }
  if (normalized.includes("red") || normalized.includes("low") || normalized.includes("off track")) {
    return "red";
  }
  return "amber";
}

function setSaveMessage(message) {
  saveMessage.textContent = message;
  window.clearTimeout(setSaveMessage.timeoutId);
  setSaveMessage.timeoutId = window.setTimeout(() => {
    saveMessage.textContent = "";
  }, 3000);
}

function renderSummary() {
  const totalReports = statusReports.length;
  const lastSaved = totalReports ? new Date(statusReports[statusReports.length - 1].savedAt).toLocaleDateString() : "None yet";
  const dynamicCards = appData.summaryCards.map((card) => ({ ...card }));
  dynamicCards[3] = {
    label: "Status reports saved",
    value: String(totalReports),
    copy: totalReports ? `Latest report captured ${lastSaved}.` : "No PM updates have been submitted yet."
  };

  summaryGrid.innerHTML = dynamicCards.map((card) => `
    <article class="summary-card">
      <span class="mini-label">${card.label}</span>
      <div class="metric-value">${card.value}</div>
      <p class="summary-copy">${card.copy}</p>
    </article>
  `).join("");
}

function renderBrief() {
  pmBriefTitle.textContent = appData.pmBrief.title;
  pmBriefText.textContent = appData.pmBrief.text;
  pmBriefList.innerHTML = appData.pmBrief.items.map((item) => `<li>${item}</li>`).join("");
}

function renderVerticals() {
  const max = Math.max(...appData.verticals.map((item) => item.count));
  verticalBars.innerHTML = appData.verticals.map((item) => `
    <div class="vertical-row">
      <div class="vertical-label">
        <span>${item.name}</span>
        <span>${item.count}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${(item.count / max) * 100}%"></div>
      </div>
    </div>
  `).join("");
}

function getVisibleProjects() {
  if (activeFilter === "all") {
    return appData.projects;
  }
  return appData.projects.filter((project) => project.type === activeFilter);
}

function renderProjects() {
  const visibleProjects = getVisibleProjects();

  if (!visibleProjects.some((project) => project.id === activeProjectId)) {
    activeProjectId = visibleProjects[0]?.id ?? null;
  }

  projectCards.innerHTML = visibleProjects.map((project) => `
    <article class="project-card ${project.id === activeProjectId ? "is-active" : ""}" data-project-id="${project.id}">
      <div class="project-head">
        <span class="chip ${project.type}">${project.type === "client" ? "Client delivery" : "Internal / SG&A"}</span>
        <span class="health ${getLatestReport(project.id)?.projectHealth ? getHealthClass(getLatestReport(project.id).projectHealth) : project.health}">${getLatestReport(project.id)?.projectHealth ? `${getLatestReport(project.id).projectHealth} status submitted` : project.healthLabel}</span>
      </div>
      <h3>${project.title}</h3>
      <p class="project-meta">${getLatestReport(project.id)?.executiveSummary || project.pmNote}</p>
      <div class="metric-row">
        <div>
          <span class="mini-label">People</span>
          <span class="mini-value">${project.people}</span>
        </div>
        <div>
          <span class="mini-label">${getLatestReport(project.id) ? "Latest period" : "Staffing mix"}</span>
          <span class="mini-value">${getLatestReport(project.id)?.reportingPeriod || project.staffingMix.split(",")[0]}</span>
        </div>
      </div>
      <div class="project-footer">
        <span>ID ${project.id}</span>
        <span>${getProjectReports(project.id).length} report${getProjectReports(project.id).length === 1 ? "" : "s"}</span>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeProjectId = card.dataset.projectId;
      renderProjects();
      renderDetail();
      populateFormForProject();
      renderReportHistory();
    });
  });
}

function renderDetail() {
  const project = getProjectById(activeProjectId);
  const latestReport = getLatestReport(activeProjectId);

  if (!project) {
    detailTitle.textContent = "Choose a workspace";
    detailSubtitle.textContent = "Click a card to inspect delivery posture.";
    detailPanel.innerHTML = `<div class="empty-state">No workspace is available for the selected filter.</div>`;
    return;
  }

  detailTitle.textContent = project.title;
  detailSubtitle.textContent = latestReport
    ? `Latest PM update saved by ${latestReport.pmName} for ${latestReport.reportingPeriod}.`
    : `Derived PM view for workspace ${project.id}. Real title and staffing counts come from your parquet sample; health signals and actions are POC logic layered on top.`;

  detailPanel.innerHTML = `
    <div class="detail-metrics">
      <div class="detail-stat">
        <span class="mini-label">Workspace type</span>
        <strong>${project.type === "client" ? "Client" : "Internal"}</strong>
      </div>
      <div class="detail-stat">
        <span class="mini-label">Visible people</span>
        <strong>${project.people}</strong>
      </div>
      <div class="detail-stat">
        <span class="mini-label">Health signal</span>
        <strong>${latestReport ? latestReport.projectHealth : project.healthLabel}</strong>
      </div>
    </div>
    <p class="detail-copy">${latestReport ? latestReport.executiveSummary : project.pmNote}</p>
    ${latestReport ? `
      <div class="status-pill-row">
        <div class="status-pill ${getHealthClass(latestReport.projectHealth)}">Health: ${latestReport.projectHealth}</div>
        <div class="status-pill ${getHealthClass(latestReport.scheduleStatus)}">Schedule: ${latestReport.scheduleStatus}</div>
        <div class="status-pill ${getHealthClass(latestReport.budgetStatus)}">Budget: ${latestReport.budgetStatus}</div>
      </div>
      <div>
        <span class="mini-label">Current blockers / risks</span>
        <p class="detail-copy">${latestReport.risksBlockers || "No blockers recorded in the latest update."}</p>
      </div>
      <div>
        <span class="mini-label">Decisions needed</span>
        <p class="detail-copy">${latestReport.decisionsNeeded || "No decisions requested in the latest update."}</p>
      </div>
    ` : ""}
    <div>
      <span class="mini-label">Top roles</span>
      <ul class="role-list">${project.topRoles.map((role) => `<li>${role}</li>`).join("")}</ul>
    </div>
    <div>
      <span class="mini-label">${latestReport ? "Latest next steps" : "Recommended PM actions"}</span>
      <ul class="action-list">${(latestReport?.nextStepsInput ? latestReport.nextStepsInput.split("\n").filter(Boolean) : project.nextAction).map((action) => `<li>${action}</li>`).join("")}</ul>
    </div>
  `;
}

function getDefaultReportingPeriod() {
  const now = new Date();
  return `Week of ${now.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}`;
}

function populateFormForProject() {
  if (!statusForm || !activeProjectId) {
    return;
  }

  const project = getProjectById(activeProjectId);
  const latestReport = getLatestReport(activeProjectId);
  const draft = loadDraft(activeProjectId);

  statusForm.pmName.value = draft.pmName || latestReport?.pmName || "Anthony Di Clemente";
  statusForm.reportingPeriod.value = draft.reportingPeriod || latestReport?.reportingPeriod || getDefaultReportingPeriod();
  statusForm.projectHealth.value = draft.projectHealth || latestReport?.projectHealth || (project.health === "red" ? "Red" : project.health === "amber" ? "Amber" : "Green");
  statusForm.deliveryConfidence.value = draft.deliveryConfidence || latestReport?.deliveryConfidence || "Medium";
  statusForm.budgetStatus.value = draft.budgetStatus || latestReport?.budgetStatus || "On track";
  statusForm.scheduleStatus.value = draft.scheduleStatus || latestReport?.scheduleStatus || "On track";
  statusForm.executiveSummary.value = draft.executiveSummary || latestReport?.executiveSummary || project.pmNote;
  statusForm.accomplishments.value = draft.accomplishments || latestReport?.accomplishments || "";
  statusForm.risksBlockers.value = draft.risksBlockers || latestReport?.risksBlockers || "";
  statusForm.decisionsNeeded.value = draft.decisionsNeeded || latestReport?.decisionsNeeded || "";
  statusForm.nextStepsInput.value = draft.nextStepsInput || latestReport?.nextStepsInput || project.nextAction.join("\n");
}

function loadDraft(projectId) {
  try {
    const raw = localStorage.getItem(`${draftStoragePrefix}${projectId}`);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

function saveDraft() {
  if (!activeProjectId || !statusForm) {
    return;
  }

  const draft = Object.fromEntries(new FormData(statusForm).entries());
  localStorage.setItem(`${draftStoragePrefix}${activeProjectId}`, JSON.stringify(draft));
}

function clearDraft() {
  if (!activeProjectId) {
    return;
  }

  localStorage.removeItem(`${draftStoragePrefix}${activeProjectId}`);
  populateFormForProject();
  setSaveMessage("Draft cleared.");
}

function renderReportHistory() {
  const project = getProjectById(activeProjectId);
  const reports = getProjectReports(activeProjectId);

  if (!project || reports.length === 0) {
    reportHistory.innerHTML = `<div class="empty-state">No saved reports yet for this workspace. Submit the form to create the first status update.</div>`;
    return;
  }

  reportHistory.innerHTML = reports.slice(0, 5).map((report) => `
    <article class="status-card">
      <div class="status-row">
        <div class="status-title">${report.reportingPeriod}</div>
        <div class="status-time">${new Date(report.savedAt).toLocaleString()}</div>
      </div>
      <div class="status-pill-row">
        <div class="status-pill ${getHealthClass(report.projectHealth)}">${report.projectHealth}</div>
        <div class="status-pill ${getHealthClass(report.scheduleStatus)}">${report.scheduleStatus}</div>
        <div class="status-pill ${getHealthClass(report.budgetStatus)}">${report.budgetStatus}</div>
      </div>
      <p class="status-copy"><strong>PM:</strong> ${report.pmName}</p>
      <p class="status-copy">${report.executiveSummary}</p>
    </article>
  `).join("");
}

function handleStatusSubmit(event) {
  event.preventDefault();

  const project = getProjectById(activeProjectId);
  if (!project) {
    return;
  }

  const formValues = Object.fromEntries(new FormData(statusForm).entries());
  const report = {
    id: crypto.randomUUID(),
    projectId: activeProjectId,
    projectTitle: project.title,
    savedAt: new Date().toISOString(),
    ...formValues
  };

  statusReports.push(report);
  saveStatusReports();
  localStorage.removeItem(`${draftStoragePrefix}${activeProjectId}`);
  renderSummary();
  renderProjects();
  renderDetail();
  renderReportHistory();
  populateFormForProject();
  setSaveMessage("Status report saved.");
}

function attachEvents() {
  projectFilter.addEventListener("change", (event) => {
    activeFilter = event.target.value;
    renderProjects();
    renderDetail();
    populateFormForProject();
    renderReportHistory();
  });

  statusForm.addEventListener("submit", handleStatusSubmit);
  statusForm.addEventListener("input", saveDraft);
  clearDraftButton.addEventListener("click", clearDraft);
}

function init() {
  const resolvedLaunchUrl = appData.secureLaunchUrl || window.location.origin;
  secureLaunchLink.href = resolvedLaunchUrl;
  secureLaunchText.textContent = resolvedLaunchUrl;
  renderSummary();
  renderBrief();
  renderVerticals();
  renderProjects();
  renderDetail();
  populateFormForProject();
  renderReportHistory();
  attachEvents();
}

init();

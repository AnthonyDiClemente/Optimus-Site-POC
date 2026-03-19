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

let activeFilter = "all";
let activeProjectId = appData.projects[0].id;

function renderSummary() {
  summaryGrid.innerHTML = appData.summaryCards.map((card) => `
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
        <span class="health ${project.health}">${project.healthLabel}</span>
      </div>
      <h3>${project.title}</h3>
      <p class="project-meta">${project.pmNote}</p>
      <div class="metric-row">
        <div>
          <span class="mini-label">People</span>
          <span class="mini-value">${project.people}</span>
        </div>
        <div>
          <span class="mini-label">Staffing mix</span>
          <span class="mini-value">${project.staffingMix.split(",")[0]}</span>
        </div>
      </div>
      <div class="project-footer">
        <span>ID ${project.id}</span>
        <span>View PM lens</span>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeProjectId = card.dataset.projectId;
      renderProjects();
      renderDetail();
    });
  });
}

function renderDetail() {
  const project = appData.projects.find((item) => item.id === activeProjectId);

  if (!project) {
    detailTitle.textContent = "Choose a workspace";
    detailSubtitle.textContent = "Click a card to inspect delivery posture.";
    detailPanel.innerHTML = `<div class="empty-state">No workspace is available for the selected filter.</div>`;
    return;
  }

  detailTitle.textContent = project.title;
  detailSubtitle.textContent = `Derived PM view for workspace ${project.id}. Real title and staffing counts come from your parquet sample; health signals and actions are POC logic layered on top.`;

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
        <strong>${project.healthLabel}</strong>
      </div>
    </div>
    <p class="detail-copy">${project.pmNote}</p>
    <div>
      <span class="mini-label">Top roles</span>
      <ul class="role-list">${project.topRoles.map((role) => `<li>${role}</li>`).join("")}</ul>
    </div>
    <div>
      <span class="mini-label">Recommended PM actions</span>
      <ul class="action-list">${project.nextAction.map((action) => `<li>${action}</li>`).join("")}</ul>
    </div>
  `;
}

function attachEvents() {
  projectFilter.addEventListener("change", (event) => {
    activeFilter = event.target.value;
    renderProjects();
    renderDetail();
  });
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
  attachEvents();
}

init();

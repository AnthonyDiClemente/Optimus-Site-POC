const appData = {
  secureLaunchUrl: "",
  pmBrief: {
    title: "Two client workspaces and one internal cost centre need PM attention.",
    text: "The parquet sample shows a heavy staffing footprint across a small set of high-volume workspaces. This demo turns that into a manager-facing portfolio readout.",
    items: [
      "RBC-238 and RBC-260 are contractor-heavy and should be reviewed for continuity risk.",
      "SG&A workspaces absorb a large share of staffing, which can hide delivery capacity pressure.",
      "Banking and public-sector style verticals dominate the sample, so the PM story should emphasize portfolio prioritization."
    ]
  },
  summaryCards: [
    {
      label: "Workspace assignments",
      value: "21,943",
      copy: "Rows in the staffing sample used to frame who is attached to which workspace."
    },
    {
      label: "Custom field rows",
      value: "27,164",
      copy: "Project metadata values powering vertical, sponsor, service, and geography context."
    },
    {
      label: "Top vertical",
      value: "Banks",
      copy: "Big 5 Canadian Banks is the largest visible vertical in the attached sample."
    },
    {
      label: "Teams launch",
      value: "HTTPS",
      copy: "A secure web endpoint can be pinned as a Microsoft Teams tab for broader adoption."
    }
  ],
  verticals: [
    { name: "Big 5 Canadian Banks", count: 364 },
    { name: "Healthcare", count: 311 },
    { name: "Government", count: 281 },
    { name: "Private Sector", count: 262 },
    { name: "Municipal", count: 204 },
    { name: "Other FI's", count: 183 },
    { name: "Insurance", count: 77 },
    { name: "Transit", count: 10 }
  ],
  projects: [
    {
      id: "42786034",
      type: "client",
      title: "RBC-238: IMO-HSBC Integration Support",
      people: 110,
      health: "amber",
      healthLabel: "Watch contractor reliance",
      staffingMix: "83 contractor FT, 6 manager, 6 forecast",
      topRoles: [
        "Contractor FT: 83",
        "Manager: 6",
        "Forecast: 6",
        "Associate: 4",
        "Senior Manager: 3"
      ],
      nextAction: [
        "Confirm knowledge transfer coverage for critical contractor-held responsibilities.",
        "Review forecast placeholders versus named resources for the next reporting cycle.",
        "Prepare a client-facing checkpoint on integration milestones and delivery dependencies."
      ],
      pmNote: "This workspace reads like a large, execution-heavy delivery squad. The role mix suggests immediate capacity is strong, but PM confidence will depend on contractor continuity and named ownership."
    },
    {
      id: "44324470",
      type: "client",
      title: "RBC-260: EFTR Fintrac Reporting",
      people: 82,
      health: "amber",
      healthLabel: "Execution stable, leadership thin",
      staffingMix: "68 contractor FT, 4 forecast, 2 manager",
      topRoles: [
        "Contractor FT: 68",
        "Forecast: 4",
        "Manager: 2",
        "Senior Analyst: 2",
        "Associate: 2"
      ],
      nextAction: [
        "Check whether governance bandwidth matches the size of the delivery team.",
        "Escalate any compliance deadline changes into the weekly status rhythm.",
        "Stand up a single PMO view of open decisions and blockers."
      ],
      pmNote: "The team shape implies strong delivery throughput but limited visible management depth. That usually becomes a coordination issue before it becomes a schedule issue."
    },
    {
      id: "42773805",
      type: "client",
      title: "RBC-234: Commercial Banking Transformation office project resources",
      people: 66,
      health: "green",
      healthLabel: "Healthy delivery posture",
      staffingMix: "41 contractor FT, 6 analyst, 4 forecast",
      topRoles: [
        "Contractor FT: 41",
        "Analyst: 6",
        "Forecast: 4",
        "Principal: 3",
        "Manager: 3"
      ],
      nextAction: [
        "Keep decision logs and cross-stream dependencies visible for steering meetings.",
        "Pressure-test upcoming forecasted roles against actual demand.",
        "Track transformation-office asks that could expand scope without notice."
      ],
      pmNote: "The workspace has enough senior oversight to keep momentum if the PM cadence stays disciplined. It feels like a manageable but dependency-heavy transformation effort."
    },
    {
      id: "26001345",
      type: "client",
      title: "RBC-173: IFRS 17 Program Management, Business Architecture and Analysis",
      people: 48,
      health: "amber",
      healthLabel: "Complex program coordination",
      staffingMix: "19 contractor FT, 7 senior associate, 4 senior manager",
      topRoles: [
        "Contractor FT: 19",
        "Senior Associate: 7",
        "Senior Manager: 4",
        "Forecast: 4",
        "Principal: 3"
      ],
      nextAction: [
        "Use the app to separate architecture decisions from delivery blockers.",
        "Focus the next leadership review on program assumptions and timeline shifts.",
        "Validate whether forecast resources are tied to real funding windows."
      ],
      pmNote: "The workspace suggests a program with meaningful coordination overhead. A PM dashboard is useful here because leadership, architecture, and analysis work can drift apart quickly."
    },
    {
      id: "44571438",
      type: "client",
      title: "TDB-174: EUC Compliance Support",
      people: 47,
      health: "green",
      healthLabel: "Solid but monitor deadlines",
      staffingMix: "27 contractor FT, 5 senior associate, 4 forecast",
      topRoles: [
        "Contractor FT: 27",
        "Senior Associate: 5",
        "Forecast: 4",
        "Principal: 2",
        "Manager: 2"
      ],
      nextAction: [
        "Keep compliance deliverables and evidence packs tied to owners.",
        "Review role redundancy in case audit demand spikes.",
        "Highlight regulatory dates in the Teams landing view."
      ],
      pmNote: "This is a good fit for a Teams-based working hub because status and compliance milestones need to be visible to multiple groups without opening Mavenlink directly."
    },
    {
      id: "43918095",
      type: "client",
      title: "TDB-156: Workforce Transformation",
      people: 50,
      health: "amber",
      healthLabel: "Scope could expand quickly",
      staffingMix: "34 contractor FT, 9 forecast, 3 principal",
      topRoles: [
        "Contractor FT: 34",
        "Forecast: 9",
        "Principal: 3",
        "Manager: 2",
        "Unspecified: 1"
      ],
      nextAction: [
        "Convert forecast placeholders into owned positions before the next phase gate.",
        "Separate transformation outcomes from advisory backlog items.",
        "Monitor change demand from leadership stakeholders."
      ],
      pmNote: "A high forecast count usually means future ambiguity. For PMs, that is less a staffing issue than a planning-confidence issue."
    },
    {
      id: "25419665",
      type: "internal",
      title: "SG&A - Sick Time & Personal Days",
      people: 417,
      health: "red",
      healthLabel: "Internal load distorts capacity view",
      staffingMix: "102 associate, 85 senior associate, 74 senior analyst",
      topRoles: [
        "Associate: 102",
        "Senior Associate: 85",
        "Senior Analyst: 74",
        "Manager: 47",
        "Analyst: 36"
      ],
      nextAction: [
        "Exclude or segment this workspace from delivery rollups in the next iteration.",
        "Use separate internal-capacity rules so PMs do not confuse admin load with project staffing.",
        "Add utilization and availability overlays in the live version."
      ],
      pmNote: "This workspace is exactly why a curated PM experience matters. Raw Mavenlink structures can swamp the signal unless internal work is clearly separated from client delivery."
    },
    {
      id: "25419565",
      type: "internal",
      title: "SG&A - Proposal Processing",
      people: 173,
      health: "amber",
      healthLabel: "Important overhead",
      staffingMix: "32 associate, 30 senior associate, 27 senior analyst",
      topRoles: [
        "Associate: 32",
        "Senior Associate: 30",
        "Senior Analyst: 27",
        "Manager: 19",
        "Analyst: 17"
      ],
      nextAction: [
        "Surface proposal-processing demand separately for practice leaders.",
        "Compare proposal effort against active client-delivery pressure.",
        "Use the Teams view to coordinate intake and turnaround targets."
      ],
      pmNote: "Internal proposal work competes with delivery attention. A PM dashboard should make that conflict explicit instead of burying it in assignment tables."
    },
    {
      id: "25717915",
      type: "internal",
      title: "SG&A - Shared Services",
      people: 116,
      health: "green",
      healthLabel: "Stable support backbone",
      staffingMix: "31 senior analyst, 23 analyst, 15 contractor FT",
      topRoles: [
        "Senior Analyst: 31",
        "Analyst: 23",
        "Contractor FT: 15",
        "Associate: 14",
        "Senior Associate: 9"
      ],
      nextAction: [
        "Keep shared-service work visible but partitioned from billable programs.",
        "Watch whether support demand is pushing specialized staff out of delivery teams.",
        "Use a future release to connect intake volume and cycle time."
      ],
      pmNote: "This workspace looks operationally stable. The value for PMs is understanding when support capacity starts cannibalizing billable program work."
    },
    {
      id: "45081895",
      type: "internal",
      title: "SG&A - FSG",
      people: 99,
      health: "green",
      healthLabel: "Contained internal portfolio",
      staffingMix: "24 senior associate, 20 associate, 14 senior manager",
      topRoles: [
        "Senior Associate: 24",
        "Associate: 20",
        "Senior Manager: 14",
        "Manager: 11",
        "Principal: 10"
      ],
      nextAction: [
        "Track this as a management and advisory overhead lane.",
        "Measure whether leadership-heavy staffing is intentional or residual.",
        "Keep internal work transparent when reviewing client portfolio margin pressure."
      ],
      pmNote: "This is a useful internal comparator. A polished Teams hub can help leaders see where management attention is pooling outside client programs."
    }
  ]
};

# Day 8 Report – AI Linux Investigator

## Project

AI Linux Investigator

## Date

Day 8 Internship Progress Report

---

# Objective

The objective of Day 8 was to transform the backend investigation engine into a complete analyst-facing investigation workspace.

The focus was on:

* Frontend architecture
* Investigation workflow design
* Evidence visualization
* Attack correlation
* AI report presentation
* Analyst productivity features

The goal was not to build a generic dashboard, but to create a security investigation platform that resembles a modern SOC product.

---

# Frontend Architecture

Implemented a React-based investigation workspace using:

* React
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React
* React Markdown
* Remark GFM

Architecture was designed with strict separation between:

```text
UI Layer
    ↓
Investigation Workspace Hook
    ↓
Derived Intelligence Layer
    ↓
API Layer
    ↓
Backend Investigation Engine
```

---

# Backend Integration

Connected frontend to:

```http
GET /investigate
```

Backend response:

```json
{
  "evidence": {},
  "findings": [],
  "ai_analysis": ""
}
```

Frontend automatically:

1. Fetches investigation data
2. Processes intelligence
3. Generates investigation views
4. Updates workspace

---

# Derived Intelligence Layer

Implemented a frontend intelligence layer to convert raw investigation data into higher-level security insights.

Modules created:

## Timeline Generator

Generates attack progression from findings.

Produces:

```text
Initial Access
    ↓
Persistence
    ↓
Command & Control
    ↓
Execution
    ↓
Impact
```

---

## Narrative Builder

Transforms findings into a human-readable incident story.

Example:

```text
The attacker likely gained access through
an exposed service and established
persistence through scheduled execution.
```

---

## Posture Calculator

Calculates:

* Identity Risk
* Network Risk
* Persistence Risk
* Execution Risk

Outputs:

* Score
* Severity
* Explanation

---

## Attack Chain Mapper

Maps findings to attack stages.

Stages:

* Initial Access
* Persistence
* Command & Control
* Execution
* Impact

---

# Investigation Workspace

Designed a workflow-first interface rather than a traditional dashboard.

Implemented sections:

---

## Threat Command Center

Provides:

* Risk Score
* Threat Level
* Investigation Status
* Scan Controls

Purpose:

Immediate situational awareness.

---

## Security Posture Summary

Displays:

* Identity Risk
* Network Risk
* Persistence Risk
* Execution Risk

Each category includes:

* Score
* Severity
* Explanation

---

## Attack Chain Visualization

Visualizes attacker progression.

Example:

```text
Initial Access
      ↓
Persistence
      ↓
Command & Control
      ↓
Execution
      ↓
Impact
```

Allows analysts to quickly understand attack progression.

---

## Attack Timeline

Displays:

* Event sequence
* Severity
* Correlated evidence

Provides chronological investigation context.

---

## Investigation Narrative

Converts technical findings into analyst-readable incident reports.

Focuses on:

* Attack progression
* Persistence methods
* Impact assessment

---

## Executive AI Report

Integrated AI-generated analysis.

Rendered using:

* React Markdown
* Remark GFM

Sections:

* Executive Summary
* Attack Scenario
* Risk Assessment
* Recommendations

Provides executive-level reporting.

---

## Findings Explorer

Displays investigation findings.

Features:

* Severity filtering
* Search capability
* Investigation notes
* Evidence correlation

Severity Levels:

* LOW
* MEDIUM
* HIGH
* CRITICAL

---

## Evidence Explorer

Provides forensic evidence exploration.

Categories:

* Processes
* Network Activity
* Users
* Persistence
* Login Activity

Features:

* Search
* Filtering
* Context expansion
* Highlighting

---

# Analyst Productivity Features

Implemented investigation workflow enhancements.

---

## Finding → Evidence Correlation

Analysts can:

* Select findings
* Jump directly to supporting evidence
* Highlight related telemetry

Reduces investigation time.

---

## Entity Pivoting

Added entity exploration.

Examples:

```text
IP Address
User
Process
```

Selecting an entity opens a contextual investigation drawer showing:

* Related findings
* Associated evidence
* Risk information

---

## Entity Drawer

Provides:

* Entity profile
* Related evidence
* Investigation context
* Correlated findings

Acts as a mini investigation workspace.

---

## Export Features

Added report export actions:

* Copy Report
* Export Markdown
* Print Report

Supports executive reporting workflows.

---

# UI/UX Improvements

Multiple redesign iterations were performed.

Goals:

* Improve analyst workflow
* Increase information density
* Reduce unnecessary scrolling
* Prioritize investigation context

Enhancements:

* Compact timeline
* Context-aware attack chain
* Dense evidence explorer
* Improved typography
* Better spacing hierarchy
* Faster navigation

---

# Error Handling

Implemented:

* Loading states
* Retry mechanisms
* Missing telemetry states
* Backend connection checks

Ensures graceful failure handling.

---

# Technologies Used

## Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React

## Content Rendering

* React Markdown
* Remark GFM

## Integration

* REST API
* Fetch API

---

# Outcome

By the end of Day 8, the project evolved from a backend investigation engine into a complete AI-assisted security investigation workspace.

The platform can:

* Collect forensic evidence
* Visualize attack progression
* Generate investigation narratives
* Produce executive AI reports
* Correlate findings with evidence
* Support analyst investigation workflows

The result is a modern cybersecurity investigation platform inspired by enterprise SOC products and designed to demonstrate the integration of AI, security analytics, and investigation workflows.

---

# Next Steps (Day 9)

Planned improvements:

* Evidence virtualization for large datasets
* MITRE ATT&CK mapping
* Real-time event streaming
* Threat hunting interface
* Alert acknowledgment workflow
* Remediation actions
* PDF report generation
* Role-based access controls
* Sensor health monitoring
* Investigation history tracking

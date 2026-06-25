# Day 7 - Backend API Integration (FastAPI)

**Date:** 22 June 2026

## Objective

The objective of Day 7 was to design and implement the core investigation engine capable of collecting Linux forensic evidence, identifying suspicious activity, and generating AI-assisted security assessments.

The focus was on backend functionality, evidence collection, analysis logic, and AI integration rather than frontend presentation.

---

# Architecture Overview

```text
Linux Host
    ↓
Evidence Collection Layer
    ↓
Investigation Engine
    ↓
Finding Generator
    ↓
AI Analysis Engine
    ↓
JSON Investigation Report
```

---

# Features Implemented

## 1. Evidence Collection Module

Developed evidence gathering routines to collect:

### Running Processes

Collected:

* Process Name
* PID
* CPU Usage
* Memory Usage
* User

Purpose:

Detect:

* Cryptocurrency miners
* Suspicious scripts
* Unknown processes
* Resource abuse

---

### Network Activity

Collected:

* Listening Ports
* Active Connections
* Associated Processes

Purpose:

Detect:

* Backdoors
* Command & Control channels
* Unauthorized listeners

---

### User Enumeration

Collected:

* Username
* UID
* GID
* Home Directory
* Shell

Purpose:

Identify:

* Unauthorized accounts
* Suspicious users
* Persistence mechanisms

---

### Cron Job Analysis

Collected:

* Scheduled Tasks
* Executed Commands

Purpose:

Detect:

* Persistence techniques
* Scheduled malware execution
* Backdoor re-entry mechanisms

---

### Login Activity

Collected:

* Logged-in User
* Source IP Address

Purpose:

Detect:

* Suspicious access attempts
* Unauthorized remote logins

---

# Finding Generation Engine

Implemented rule-based detection logic.

Current detections include:

### Suspicious Process Detection

Example:

```text
/bin/bash /tmp/miner.sh
```

Severity:

HIGH

---

### Netcat Listener Detection

Example:

```text
nc -lvnp 4444
```

Severity:

HIGH

Purpose:

Potential Command & Control communication.

---

### Persistence Detection

Example:

```text
/tmp/backdoor.sh
```

Severity:

HIGH

Purpose:

Scheduled malicious execution.

---

### Suspicious Login Detection

Example:

```text
User logged in from unexpected source
```

Severity:

LOW

Purpose:

Potential unauthorized access.

---

# AI Investigation Module

Integrated AI analysis to transform raw findings into a human-readable security report.

Generated Sections:

## Executive Summary

High-level overview of the incident.

---

## Likely Attack Scenario

Explains:

* Initial Access
* Persistence
* Command & Control
* Execution
* Impact

---

## Risk Assessment

Evaluates:

* Confidentiality
* Integrity
* Availability

---

## Recommended Actions

Provides:

* Containment actions
* Remediation steps
* Hardening recommendations

---

# API Development

Implemented investigation endpoint:

```http
GET /investigate
```

Response Structure:

```json
{
  "evidence": {},
  "findings": [],
  "ai_analysis": ""
}
```

The endpoint performs:

1. Evidence Collection
2. Detection Logic
3. AI Analysis
4. Report Generation

in a single request.

---

# Technologies Used

## Backend

* Python
* FastAPI

## AI

* Groq API
* LLM-based report generation

## Security Analysis

* psutil
* Linux system commands
* Custom detection rules

---

# Testing Performed

Validated:

* Process collection
* Network collection
* User enumeration
* Cron analysis
* Login collection
* Detection logic
* API responses
* AI report generation

Successfully generated investigation reports from simulated attack scenarios.

---

## Outcome

By the end of Day 7, the project successfully evolved from a simple data collection script into an AI-assisted Linux investigation engine capable of:

* Collecting forensic evidence
* Detecting suspicious activity
* Correlating findings
* Generating executive security reports
* Exposing investigation results through a REST API

This established the foundation for the investigation workspace and intelligence-driven frontend developed during Day 8.

---

# Next Steps (Day 8)

Planned work:

* Build React Investigation Workspace
* Create Attack Timeline
* Create Attack Chain Visualization
* Create Investigation Narrative
* Create Executive AI Report Interface
* Create Evidence Explorer
* Implement Evidence Correlation
* Improve Analyst Workflow Experience
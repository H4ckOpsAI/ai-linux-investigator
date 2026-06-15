# Engineering Decisions Log

This document records important technical decisions made during project development.

---

## Decision 001

### Topic

Docker-Based Security Lab

### Issue

A realistic Linux environment was required to generate security investigation data.

### Decision

Use Docker containers instead of virtual machines.

### Reason

* Lightweight
* Fast setup
* Minimal resource consumption
* Easy reproducibility

### Impact

Rapid environment creation and easier project portability.

---

## Decision 002

### Topic

Security Event Simulation

### Issue

Real-world security incidents were required for investigation testing.

### Decision

Create simulated security events.

Implemented Events:

* Failed SSH Login Attempts
* Suspicious High-CPU Process
* Cron Persistence Mechanism
* Suspicious Network Listener
* Login Activity Collection

### Reason

Provides controlled and repeatable investigation scenarios.

### Impact

Consistent evidence generation for AI analysis.

---

## Decision 003

### Topic

Authentication Log Collection

### Issue

Traditional authentication logs were unavailable inside the minimal Ubuntu Docker container.

Observed:

* No rsyslog
* No journald
* No auditd
* No /var/log/auth.log

### Decision

Use command-based evidence collection for the MVP.

Evidence Sources:

* last
* ps aux
* ss -tulnp
* crontab -l
* /etc/passwd

### Reason

Reduces implementation complexity and keeps the project aligned with the internship timeline.

### Impact

Authentication activity is represented through login evidence rather than traditional log files.

### Future Enhancement

Deploy a full Linux server container with:

* rsyslog
* auditd
* journald

to support advanced authentication log analysis.

---

## Decision 004

### Topic

AI Model Selection

### Issue

Project budget constraints prevent hosting local LLMs.

### Decision

Use free-tier cloud-hosted LLMs.

Selected Providers:

* Groq
* Google Gemini

### Reason

* No local GPU requirement
* Free-tier availability
* Fast inference

### Impact

Allows AI investigation capabilities on low-resource hardware.

---

## Decision 005

### Topic

Development Methodology

### Issue

Project duration is limited to 12 working days.

### Decision

Follow a phased implementation approach.

Order:

1. Infrastructure
2. Security Event Simulation
3. Evidence Collection
4. Data Normalization
5. AI Analysis
6. Reporting
7. API Integration
8. Dashboard
9. DevSecOps

### Reason

Ensures a working MVP is available before adding advanced features.

### Impact

Reduces project risk and improves delivery confidence.

---

## Decision 006

### Topic

Interactive Chat Investigation Interface

### Issue

Conversational investigation capabilities were proposed.

### Decision

Treat as a stretch goal.

### Reason

Core investigation workflow must be completed first.

### Impact

Project success does not depend on chatbot functionality.

### Future Enhancement

Implement a conversational interface capable of answering questions about generated investigation reports.

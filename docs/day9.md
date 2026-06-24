# Day 9 – MITRE ATT&CK, Dockerization & DevSecOps

## Objective

Transform the AI Linux Investigator from a prototype into a deployable and maintainable security platform by introducing:

* MITRE ATT&CK intelligence mapping
* Full Docker deployment
* Automated attack lab integration
* Historical telemetry preservation
* DevSecOps security pipeline

---

## Phase 9.1 – MITRE ATT&CK Intelligence Layer

### Completed

Created:

* utils/intelligence/mitreMapper.js
* MitreAttackMatrix.jsx

Integrated MITRE ATT&CK enrichment into the investigation workflow.

### Supported Techniques

| Finding Type       | MITRE Technique                         |
| ------------------ | --------------------------------------- |
| Login Activity     | T1078 – Valid Accounts                  |
| Cron Persistence   | T1053 – Scheduled Task                  |
| Netcat Listener    | T1105 – Ingress Tool Transfer           |
| Suspicious Process | T1059 – Command & Scripting Interpreter |
| Crypto Miner       | T1496 – Resource Hijacking              |

### Outcome

Findings are automatically correlated to ATT&CK tactics and techniques.

---

## Phase 9.2 – Dockerization

### Completed

Created:

* backend/Dockerfile
* frontend/Dockerfile
* frontend/nginx.conf
* docker-compose.yml
* .env.example

### Architecture

Frontend:

* React + Vite
* Nginx reverse proxy

Backend:

* FastAPI
* Uvicorn

### Deployment

```bash
docker compose build
docker compose up -d
```

### Outcome

Entire platform deployable through Docker Compose.

---

## Phase 9.3 – Docker Lab Integration

### Completed

Created:

* docker-compose.lab.yml
* Ubuntu Target Container
* Attacker Container
* Historical Telemetry Architecture

### Automated Services

Victim container automatically starts:

* SSHD
* Cron
* Netcat listener
* Miner process
* Backdoor persistence

### Historical Telemetry

Telemetry stored as append-only logs:

```text
/telemetry/
├── processes.log
├── network.log
├── users.log
├── logins.log
└── cron.log
```

Example:

```text
=== 2026-06-24T09:45:42Z ===
<command output>
```

### Outcome

Lab automatically generates realistic attack telemetry without manual interaction.

---

## Phase 9.4 – DevSecOps Security Pipeline

### Completed

Created:

* .github/workflows/security.yml
* bandit.yaml
* .semgrepignore
* .trivyignore

### Security Gates

1. Quality Gate

   * Frontend build validation
   * Python syntax validation
   * FastAPI import validation
   * Docker Compose validation

2. SAST Gate

   * Bandit
   * Semgrep

3. Secret Scanning Gate

   * Gitleaks

4. Container Security Gate

   * Trivy image scanning

### Outcome

Every push and pull request is automatically validated for:

* Build integrity
* Security issues
* Secrets exposure
* Container vulnerabilities

---

## Day 9 Deliverables

* MITRE ATT&CK Mapping
* Production Docker Deployment
* Automated Attack Lab
* Historical Telemetry Storage
* Security Scanning Pipeline
* GitHub Actions Automation

## Status

Day 9: Completed

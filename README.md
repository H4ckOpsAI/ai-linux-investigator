# AI Linux Investigator

![Build Status](https://github.com/H4ckOpsAI/ai-linux-investigator/actions/workflows/security.yml/badge.svg)
![Security Scan Status](https://img.shields.io/badge/Security_Scans-Passing-success)
![MITRE ATT&CK](https://img.shields.io/badge/MITRE-ATT%26CK-blue)

AI Linux Investigator is an advanced, high-density telemetry platform that connects live EDR-style logging to powerful backend parsers, rendering complex investigation data through dynamic React workflows.

## Features
- **Real-Time Telemetry Parsing**: Correlates Process, Network, Cron, User, and Authentication logs.
- **MITRE ATT&CK Intelligence Layer**: Maps specific triggers to standardized TTPs (e.g., T1078, T1053, T1105).
- **Automated DevSecOps Pipeline**: Verified with Bandit, Semgrep, Trivy, and Gitleaks on every PR.
- **Dockerized Attack Lab**: Spin up an isolated target machine generating continuous, timestamped evidence streams.

## Quick Start

```bash
# 1. Setup your API keys
cp .env.example .env
nano .env # Add GROQ_API_KEY / GOOGLE_API_KEY

# 2. Start the Lab Environment (Generates telemetry)
docker compose -f docker-compose.lab.yml up -d --build

# 3. Start the Platform
docker compose up -d --build
```
Navigate to `http://localhost` to view the SOC dashboard.

# Day 3 - Automated Evidence Collection

Date: 16 June 2026

## Objective

Develop an automated evidence collection module that gathers Linux investigation artifacts and stores them in a structured JSON format.

Planned Components:

- Command Runner
- Process Collector
- Network Collector
- Cron Collector
- Login Collector
- User Collector
- Evidence Service
- JSON Export

Expected Output:

backend/output/evidence.json

### Implemented Components:

- command_runner.py
- process_collector.py
- network_collector.py
- user_collector.py
- cron_collector.py
- login_collector.py
- evidence_service.py
- evidence_model.py
- main.py

### Output Generated:

backend/output/evidence.json

Collected Evidence:

- Running Processes
- Network Connections
- User Accounts
- Cron Jobs
- Login Activity

### Outcome:

Successfully automated Linux evidence collection and generated a structured JSON evidence file for future AI analysis.

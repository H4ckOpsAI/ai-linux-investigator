# Day 5 - Investigation Engine Implementation

Date: 22 June 2026

## Objective

Build the first version of the Investigation Engine capable of analyzing structured evidence and generating security findings automatically.

---

## Architecture Progress

Current Investigation Pipeline:

```text
Docker Lab
    ↓
Evidence Collection
    ↓
Collectors
    ↓
Raw Evidence
    ↓
Parsers
    ↓
Structured Evidence
    ↓
Analyzers
    ↓
Security Findings
```

Day 5 introduces the Analysis Layer of the project.

---

## Existing Evidence Sources

The Investigation Engine receives evidence collected from:

* Running Processes
* Network Activity
* User Accounts
* Cron Jobs
* Login Activity

Evidence is already collected and converted into structured JSON format.

---

## Analyzer Module Creation

Created new analyzer package:

```text
src/analyzers/
├── __init__.py
├── process_analyzer.py
├── network_analyzer.py
├── cron_analyzer.py
└── login_analyzer.py
```

Created investigation service:

```text
src/services/investigation_service.py
```

---

## Process Analyzer

### Objective

Identify processes exhibiting suspicious behavior.

### Detection Logic

Rule:

```text
CPU Usage > 80%
```

Finding Generated:

```text
Suspicious Process
```

Example Detection:

```text
/tmp/miner.sh
CPU: 99.9%
```

Generated Finding:

```json
{
    "severity": "HIGH",
    "type": "Suspicious Process"
}
```

### Security Significance

High CPU utilization may indicate:

* Cryptomining malware
* Resource abuse
* Malicious scripts
* Infinite loop processes

---

## Network Analyzer

### Objective

Identify suspicious listening services.

### Detection Logic

Rule:

```text
Process = nc
```

Finding Generated:

```text
Suspicious Network Listener
```

Example Detection:

```text
nc -lvnp 4444
```

Generated Finding:

```json
{
    "severity": "HIGH",
    "type": "Suspicious Network Listener"
}
```

### Security Significance

Netcat listeners are commonly used for:

* Backdoors
* Reverse shell handlers
* Command and Control channels
* Unauthorized services

### Important Observation

The analyzer does not classify activity as malicious solely based on port numbers.

Investigation decisions are based on:

* Process name
* Process behavior
* Service context

Example:

```text
sshd on Port 22
→ Expected Service

nc on Port 4444
→ Suspicious Listener
```

---

## Cron Analyzer

### Objective

Identify suspicious persistence mechanisms.

### Detection Logic

Rule:

```text
Cron command contains /tmp/
```

Example:

```text
* * * * * /tmp/backdoor.sh
```

Generated Finding:

```json
{
    "severity": "HIGH",
    "type": "Persistence Mechanism"
}
```

### Security Significance

Attackers commonly store temporary payloads inside:

```text
/tmp
```

and configure cron jobs to maintain persistence after initial compromise.

---

## Login Analyzer

### Objective

Analyze user login activity.

### Detection Logic

Extracted:

```text
Username
Source IP Address
```

Example Parsed Login:

```json
{
    "user": "testuser",
    "source_ip": "172.18.0.2"
}
```

Generated Finding:

```json
{
    "severity": "INFO",
    "type": "Login Activity"
}
```

### Security Significance

Login events help investigators determine:

* User activity
* Access origins
* Timeline reconstruction
* Potential account misuse

---

## Investigation Service

Implemented:

```text
investigation_service.py
```

Responsibilities:

1. Receive structured evidence
2. Execute analyzers
3. Aggregate findings
4. Return investigation results

Flow:

```text
Evidence
    ↓
Process Analyzer
    ↓
Network Analyzer
    ↓
Cron Analyzer
    ↓
Login Analyzer
    ↓
Findings
```

---

## Main Application Update

Updated:

```text
backend/main.py
```

New Workflow:

```text
Collect Evidence
        ↓
Parse Evidence
        ↓
Analyze Evidence
        ↓
Generate Findings
        ↓
Save Results
```

---

## Output Structure

Generated output:

```json
{
    "evidence": {
        ...
    },
    "findings": [
        ...
    ]
}
```

Example Findings:

```json
[
    {
        "severity": "HIGH",
        "type": "Suspicious Process"
    },
    {
        "severity": "HIGH",
        "type": "Suspicious Network Listener"
    },
    {
        "severity": "HIGH",
        "type": "Persistence Mechanism"
    },
    {
        "severity": "INFO",
        "type": "Login Activity"
    }
]
```

---

## Day 5 Outcome

Successfully implemented the first Investigation Engine capable of:

* Consuming structured evidence
* Applying detection rules
* Generating security findings
* Producing investigation-ready output

The system can now automatically identify:

* High CPU suspicious processes
* Unauthorized network listeners
* Persistence mechanisms
* User login activity

---

## Lessons Learned

* Evidence collection and analysis should remain separate layers.
* Detection decisions should rely on behavior and context rather than assumptions.
* Structured data significantly simplifies investigation logic.
* Rule-based detection forms the foundation for future AI-assisted investigations.
* Findings generated by the Investigation Engine will later be enriched using LLM-based analysis and report generation.

---

## Git Commit

```bash
git add .
git commit -m "Day 5 - Implemented investigation engine"
```

---

## Next Phase

Day 6 will focus on AI-powered investigation reporting.

Current State:

```text
Evidence
    ↓
Parsers
    ↓
Analyzers
    ↓
Findings
```

Target State:

```text
Evidence
    ↓
Parsers
    ↓
Analyzers
    ↓
Findings
    ↓
LLM Investigation Engine
    ↓
Incident Report
```

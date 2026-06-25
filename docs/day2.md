# Day 2 - Security Event Simulation

**Date:** 15 June 2026

## Objective

Generate realistic security events inside the Docker-based Linux security lab and collect evidence that can later be analyzed by the AI Investigation Engine.

---

## Scenario 1 - Failed SSH Login

### Objective

Simulate authentication failures against the target system.

### Commands Used

```bash
ssh fakeuser@ubuntu-target
```

Entered incorrect passwords multiple times.

### Result

Authentication attempts failed successfully.

Output:

```text
Permission denied
```

### Security Significance

Failed login attempts are commonly associated with:

* Password guessing attacks
* Brute-force attacks
* Unauthorized access attempts

### Observation

The Ubuntu Docker container did not generate traditional authentication logs because syslog services are not running inside the container.

---

## Scenario 2 - Suspicious Process

### Objective

Simulate a malicious process consuming excessive system resources.

### Commands Used

Created a fake mining process:

```bash
cat > /tmp/miner.sh
chmod +x /tmp/miner.sh
/tmp/miner.sh &
```

Collected evidence:

```bash
ps aux
```

### Result

Process:

```text
/tmp/miner.sh
```

was running continuously.

Evidence showed:

```text
CPU Usage ≈ 99.9%
```

### Security Significance

Such behavior may indicate:

* Cryptomining malware
* Resource abuse
* Malicious background execution

### Evidence Generated

```text
evidence/suspicious_process.txt
```

---

## Scenario 3 - Persistence Mechanism (Cron Job)

### Objective

Simulate attacker persistence on the system.

### Commands Used

Created a persistence script:

```bash
/tmp/backdoor.sh
```

Added cron entry:

```bash
crontab cronjob.txt
```

Verified:

```bash
crontab -l
```

### Result

Cron entry created:

```text
* * * * * /tmp/backdoor.sh
```

### Security Significance

Persistence mechanisms allow malicious code to execute repeatedly after initial compromise.

### Evidence Generated

```text
evidence/cron_persistence.txt
```

---

## Scenario 4 - Suspicious Network Listener

### Objective

Simulate an unauthorized network service.

### Commands Used

Installed Netcat:

```bash
apt install netcat-openbsd -y
```

Started listener:

```bash
nc -lvnp 4444 &
```

Verified:

```bash
ss -tulnp
```

### Result

Netcat listening on:

```text
0.0.0.0:4444
```

### Security Significance

Unexpected listening ports may indicate:

* Backdoors
* Command-and-Control listeners
* Reverse shell handlers
* Unauthorized services

### Evidence Generated

```text
evidence/network_activity.txt
```

---

## Scenario 5 - Login Activity Collection

### Objective

Collect SSH login history from the target system.

### Commands Used

```bash
last
```

### Result

SSH login activity from attacker container was recorded.

### Security Significance

User login history helps investigators identify:

* Source systems
* User activity
* Timeline of access

### Evidence Generated

```text
evidence/login_activity.txt
```

---

## Day 2 Outcome

Successfully generated realistic security investigation artifacts including:

* Failed authentication attempts
* Suspicious high-CPU process
* Persistence mechanism
* Suspicious network listener
* User login activity

These evidence files will be used during the next phase to build the automated Evidence Collection Module and AI Investigation Engine.
# Day 1 - Security Lab Setup

Date: 12 June 2026

## Objective

Create a Docker-based security lab environment that will be used throughout the project for generating security events and collecting evidence.

---

## Environment

### Terminal Layout

T1 → Kali Host

T2 → Attacker Container

T3 → Ubuntu Target Container

This terminal structure will be maintained throughout the project.

---

## Project Structure

```text
ai-linux-investigator/
├── docker-lab
├── backend
├── reports
├── evidence
└── docs
```

---

## Docker Lab Setup

Created Docker Compose environment containing:

* ubuntu-target
* attacker

Commands Used:

```bash
docker compose up -d
docker ps
```

---

## Network Verification

Entered attacker container:

```bash
docker exec -it attacker bash
```

Installed ping:

```bash
apt update
apt install iputils-ping -y
```

Verified communication:

```bash
ping ubuntu-target
```

Result:

Successful connectivity between attacker and target containers.

---

## SSH Server Configuration

Entered target container:

```bash
docker exec -it ubuntu-target bash
```

Installed OpenSSH:

```bash
apt update
apt install openssh-server -y
```

Created runtime directory:

```bash
mkdir -p /run/sshd
```

Created test user:

```bash
useradd -m testuser
echo "testuser:test123" | chpasswd
```

Started SSH service:

```bash
/usr/sbin/sshd
```

Verified service:

```bash
ps aux | grep sshd
```

Result:

SSH server running successfully.

---

## SSH Login Verification

Entered attacker container:

```bash
docker exec -it attacker bash
```

Installed SSH client:

```bash
apt install openssh-client -y
```

Connected:

```bash
ssh testuser@ubuntu-target
```

Result:

Successful login to target system.

---

## Evidence Collection

Collected:

### processes.txt

```bash
docker exec ubuntu-target ps aux > processes.txt
```

### network.txt

```bash
docker exec ubuntu-target ss -tulnp > network.txt
```

### users.txt

```bash
docker exec ubuntu-target cat /etc/passwd > users.txt
```

Result:

Initial evidence successfully collected.

---

## Key Outcome

Successfully created a Docker-based attack lab consisting of:

Attacker Container
↓
SSH Access
↓
Ubuntu Target

This environment will be used to simulate security incidents in Day 2.

---

## Lessons Learned

* Docker containers communicate through Docker networks.
* OpenSSH can be manually configured inside containers.
* Evidence can be collected using Linux commands and redirected to files.
* Containers differ from full Linux VMs and may not contain complete logging infrastructure.

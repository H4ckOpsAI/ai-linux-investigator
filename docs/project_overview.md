# AI-Powered Linux Security Investigation Assistant

## Project Overview

### Objective

The objective of this project is to develop an AI-powered Linux Security Investigation Assistant capable of collecting security-related evidence from Linux systems, analyzing suspicious activities using Large Language Models (LLMs), and automatically generating structured security investigation reports.

The project combines Cybersecurity, Artificial Intelligence, and DevSecOps practices into a single end-to-end solution.

---

## Problem Statement

Security analysts spend significant time manually reviewing Linux systems to identify suspicious behavior such as unauthorized access attempts, abnormal processes, persistence mechanisms, and unusual network activity.

The investigation process often requires collecting evidence from multiple sources, correlating findings, and generating reports.

This project aims to automate the initial investigation process and provide AI-assisted analysis and reporting.

---

## High-Level Architecture

Security Lab Environment
↓
Evidence Collection Module
↓
Data Normalization Module
↓
AI Investigation Engine
↓
Report Generation Module
↓
Security Investigation Report

---

## Core Modules

### 1. Security Lab Environment

Purpose:

Generate realistic Linux security events inside a controlled Docker-based environment.

Components:

* Ubuntu Target Container
* SSH Service
* Attacker Container
* Simulated Security Events

Outputs:

* Process Information
* Network Activity
* Login Activity
* Persistence Artifacts
* User Information

---

### 2. Evidence Collection Module

Purpose:

Collect security-relevant evidence from Linux systems.

Data Sources:

* Login Activity
* Running Processes
* Active Network Connections
* User Accounts
* Scheduled Tasks (Cron Jobs)
* System Services

Output:

Structured evidence dataset.

---

### 3. Data Normalization Module

Purpose:

Convert raw Linux command output into a standardized JSON structure suitable for AI processing.

Functions:

* Parsing
* Validation
* Normalization
* JSON Generation

Output:

Investigation-ready JSON evidence.

---

### 4. AI Investigation Engine

Purpose:

Analyze evidence using Large Language Models.

Planned Models:

* Google Gemini
* Groq LLaMA Models

Capabilities:

* Suspicious Activity Detection
* Risk Assessment
* Threat Explanation
* Severity Classification
* Remediation Recommendations

Output:

AI-generated investigation findings.

---

### 5. Report Generation Module

Purpose:

Generate structured analyst-style security reports.

Report Sections:

* Executive Summary
* Findings
* Severity Levels
* Evidence
* Recommendations

Output:

Security Investigation Report.

---

### 6. DevSecOps Pipeline

Purpose:

Implement secure development and deployment practices.

Tools:

* Docker
* Docker Compose
* GitHub Actions
* Bandit
* Semgrep
* Trivy

Output:

Automated security validation pipeline.

---

## Technology Stack

### Backend

* Python
* FastAPI

### AI

* Groq
* Google Gemini

### Cybersecurity

* Linux Investigation Commands
* Process Monitoring
* Network Monitoring
* Persistence Analysis

### DevOps

* Docker
* Docker Compose
* GitHub Actions

### Security Tools

* Bandit
* Semgrep
* Trivy

### Frontend

* Streamlit

---

## Project Timeline

Day 1 - Security Lab Setup

Day 2 - Security Event Simulation

Day 3 - Evidence Collection Module

Day 4 - Data Normalization Module

Day 5 - AI Investigation Engine (Part 1)

Day 6 - AI Investigation Engine (Part 2)

Day 7 - Report Generation Module

Day 8 - FastAPI Integration

Day 9 - Streamlit Dashboard

Day 10 - Dockerization

Day 11 - DevSecOps Pipeline

Day 12 - Testing, Documentation, and Demo Preparation

---

## Current Status

Completed:

* Day 1: Security Lab Setup
* Day 2: Security Event Simulation

Next Phase:

* Automated Evidence Collection Module

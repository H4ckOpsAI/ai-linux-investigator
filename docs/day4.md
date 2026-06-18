# Day 4 - Evidence Normalization

Date: 17 June 2026

## Objective

Convert raw Linux command output into structured JSON data suitable for AI analysis.

Planned Components:

- Process Parser
- Network Parser
- User Parser
- Cron Parser
- Login Parser

Expected Output:

Structured evidence.json containing JSON objects instead of raw command output.

## Implemented

1. Process Parser
2. Network Parser
3. Cron Parser
4. Package Initialization (__init__.py)
5. Structured JSON Output

## New Architecture

Collectors
    ↓
Raw Evidence
    ↓
Parsers
    ↓
Structured Evidence
    ↓
JSON Output

## Output Example

Detected:
- /tmp/miner.sh
- nc listener on 4444
- cron persistence

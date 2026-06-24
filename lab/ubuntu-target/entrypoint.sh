#!/bin/bash

# Start SSH daemon
mkdir -p /run/sshd
/usr/sbin/sshd

# Start cron
service cron start

# Start netcat listener in background
nc -lvnp 4444 >/dev/null 2>&1 &

# Start miner in background
/tmp/miner.sh &

# Ensure telemetry directory exists
mkdir -p /telemetry

MAX_SIZE=$((5 * 1024 * 1024)) # 5MB

rotate_if_needed() {
    local file=$1
    if [ -f "$file" ]; then
        local size=$(stat -c%s "$file" 2>/dev/null || echo 0)
        if [ "$size" -gt "$MAX_SIZE" ]; then
            mv "$file" "$file.1"
        fi
    fi
}

append_telemetry() {
    local cmd=$1
    local file=$2
    rotate_if_needed "$file"
    local ts=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    echo -e "\n=== $ts ===" >> "$file"
    eval "$cmd" >> "$file" 2>&1
}

# Infinite telemetry loop
while true; do
    append_telemetry "ps aux" "/telemetry/processes.log"
    append_telemetry "ss -tulnp" "/telemetry/network.log"
    append_telemetry "cat /etc/passwd" "/telemetry/users.log"
    append_telemetry "last" "/telemetry/logins.log"
    append_telemetry "crontab -l -u testuser" "/telemetry/cron.log"
    
    sleep 2
done

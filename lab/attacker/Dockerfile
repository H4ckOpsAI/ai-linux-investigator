FROM ubuntu:22.04

RUN apt-get update && apt-get install -y openssh-client sshpass

# Periodically SSH into the target to generate realistic login/auth telemetry
CMD while true; do sshpass -p 'test123' ssh -o StrictHostKeyChecking=no testuser@ubuntu-target "whoami" || true; sleep 15; done

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    openssh-server \
    cron \
    iproute2 \
    netcat-openbsd \
    procps \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m testuser && \
    echo "testuser:test123" | chpasswd

COPY miner.sh /tmp/miner.sh
COPY backdoor.sh /tmp/backdoor.sh
RUN chmod +x /tmp/miner.sh /tmp/backdoor.sh

# Create a crontab for testuser
RUN echo "* * * * * /tmp/backdoor.sh" | crontab -u testuser -

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# This directory will be shared via a docker volume
VOLUME ["/telemetry"]

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

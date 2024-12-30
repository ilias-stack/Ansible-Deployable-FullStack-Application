#!/bin/sh

# Check if the IP variable is set
if [ -z "$IP" ]; then
  echo "Environment variable IP is not set. Exiting."
  exit 1
fi

# Replace IP placeholder in the environment file
sed -i "s/IP_PLACEHOLDER/$IP/g" /app/src/environments/environment.development.ts
# Start Angular
ng serve --host 0.0.0.0
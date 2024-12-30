#!/bin/bash

set -e

log() {
    echo -e "\033[1;32m$1\033[0m"
}

# Check if arguments were provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <IP_ADDRESS> <AI_TOKEN>"
    exit 1
fi

# Store arguments in variables
IP_ADDRESS=$1
AI_TOKEN=$2

# Create a temporary docker-compose file
cat > docker-compose.yml <<EOF
version: "3.9"

services:
  chatbot:
    image: chatbot
    container_name: chatbot
    build: ./spring-ai
    ports:
      - "8080:8087"
    networks:
      - custom_network
    environment:
      - DB_HOST=84.8.108.132
      - AI_TOKEN=$AI_TOKEN

  app:
    build: ./app
    container_name: app
    ports:
      - "80:4200" 
    environment:
      - IP=$IP_ADDRESS
    networks:
      - custom_network

networks:
  custom_network:
    driver: bridge
EOF

log "Stopping and removing containers..."
docker-compose down --volumes

log "Saving local changes..."
git stash

log "Pulling the latest changes from Git..."
git pull origin main

log "Restoring local changes..."
git stash pop

log "Starting containers with the latest changes..."
docker-compose up -d --build

log "Deployment completed successfully!"
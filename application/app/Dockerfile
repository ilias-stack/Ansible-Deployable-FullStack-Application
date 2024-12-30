FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install -g @angular/cli
RUN npm install --force

# Add execute permission to entrypoint
RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
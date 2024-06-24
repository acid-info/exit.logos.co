FROM node:lts-alpine as dependencies
WORKDIR /app

FROM node:lts-alpine as builder
WORKDIR /app
RUN npm install -g http-server
COPY . .

FROM lipanski/docker-static-website:latest
COPY --from=builder /app/dist .
COPY httpd.conf .
ARG PORT=3000
EXPOSE ${PORT}
ENTRYPOINT ["/busybox", "httpd"]
CMD ["-f", "-v", "-p", "${PORT}", "-c", "httpd.conf"]

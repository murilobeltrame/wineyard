FROM node:18-alpine AS builder
WORKDIR /src
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
ARG BACKEND_URL
RUN npm run build:webpack -- --env backendUrl=${BACKEND_URL}

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/dist /usr/share/nginx/html
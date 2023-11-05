FROM node:18-alpine AS builder
ARG ENV
WORKDIR /src
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
RUN npm run build -- --env ${ENV}

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/dist /usr/share/nginx/html
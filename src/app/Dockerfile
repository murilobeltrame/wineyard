FROM node:18-alpine
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "serve" ]
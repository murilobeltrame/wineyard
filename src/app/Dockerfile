FROM node:21-alpine AS builder
WORKDIR /src
COPY package.json .
COPY package-lock.json .
RUN npm ci --no-audit
COPY . .
ARG ROOT_CONFIG_URL
ARG SCAFFOLD_MFE_URL
ARG COUNTRIES_MFE_URL
ARG GRAPES_MFE_URL
ARG WINES_MFE_URL
RUN npm run build:webpack -- \
    --env rootConfigUrl=${ROOT_CONFIG_URL} \
    --env scaffoldMfeUrl=${SCAFFOLD_MFE_URL} \
    --env countriesMfeUrl=${COUNTRIES_MFE_URL} \
    --env grapesMfeUrl=${GRAPES_MFE_URL} \
    --env winesMfeUrl=${WINES_MFE_URL}

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/dist /usr/share/nginx/html
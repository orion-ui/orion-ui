FROM node:16-buster as build-front
WORKDIR /app

ARG NPM_TOKEN
RUN npm config set @armado:registry https://gitlab.armado.fr/api/v4/packages/npm/
RUN npm config set '//gitlab.armado.fr/api/v4/packages/npm/:_authToken' "${NPM_TOKEN}"

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
ENV NODE_OPTIONS=--max-old-space-size=4096

COPY ./ ./
RUN npm run build:lib
RUN npm run docs:build

FROM nginx:alpine as runtime
COPY default.conf /etc/nginx/conf.d/
COPY --from=build-front /app/docs/.vuepress/dist /usr/share/nginx/html
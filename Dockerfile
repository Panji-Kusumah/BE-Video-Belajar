# syntax=docker/dockerfile:1
ARG NODE_VERSION=24.13.0
FROM node:${NODE_VERSION}-slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /usr/src/app
ENV NODE_ENV=development
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
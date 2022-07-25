﻿FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENTRYPOINT ["npm", "start"]
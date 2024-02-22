FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY drizzle.config.ts tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 80

CMD "npm" "start"
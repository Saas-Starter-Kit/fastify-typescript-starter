FROM node:20-alpine

WORKDIR /usr/src/app
COPY . /usr/src/app

COPY package.json package-lock.json ./
COPY src ./src

RUN npm install
RUN npm run build
COPY . .

EXPOSE 80

CMD "npm" "start"

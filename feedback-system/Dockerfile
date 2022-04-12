FROM node:alpine

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 5002

ENTRYPOINT [ "npm", "start" ]
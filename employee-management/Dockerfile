FROM node:alpine

WORKDIR /app

COPY ./package.json .

RUN yarn install

COPY . .

EXPOSE 5005

ENTRYPOINT [ "yarn", "start" ]
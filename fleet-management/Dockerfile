FROM node:alpine

WORKDIR /app

COPY ./package.json .

RUN yarn install

COPY . .

EXPOSE 5004

ENTRYPOINT [ "yarn", "start" ]
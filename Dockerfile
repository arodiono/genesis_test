FROM node:12-alpine
WORKDIR /usr/src/api

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000:3000
CMD [ "yarn", "start:dev" ]

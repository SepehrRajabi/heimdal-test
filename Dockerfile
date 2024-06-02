FROM node:lts-alpine

WORKDIR /

COPY ./package.json ./

RUN npm install

COPY ./ ./

EXPOSE 1212

CMD [ "npm", "run", "dev" ]

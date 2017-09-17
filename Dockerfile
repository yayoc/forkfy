FROM node:8.4.0-alpine

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
RUN npm build

COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]

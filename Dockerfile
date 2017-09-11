FROM node:8.4.0-alpine
ARG SPOTIFY_CLIENT_ID
ENV SPOTIFY_CLIENT_ID $SPOTIFY_CLIENT_ID

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
RUN npm build

COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]





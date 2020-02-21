FROM node:12.14-alpine
WORKDIR /server
COPY package*.json ./
RUN npm i
RUN npm i -g nodemon
EXPOSE 3001
ENTRYPOINT ["nodemon", "src/index.js"]
FROM node:12.14
WORKDIR /client
COPY package*.json ./
RUN npm i
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
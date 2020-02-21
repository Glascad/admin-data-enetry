FROM postgres:11
WORKDIR /db
RUN apt-get update && apt-get upgrade -y && apt-get install curl -y
# install node from source, for debian distros
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
COPY package*.json ./
RUN npm i
RUN npm i -g nodemon
EXPOSE 5432
# the postgres image looks at /docker-entrypoint-initdb.d/ to extend its init scripts
RUN echo "nodemon ./js/index.js &" > /docker-entrypoint-initdb.d/index.sh
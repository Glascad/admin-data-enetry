FROM postgres:11-alpine
WORKDIR /user/app
RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl -y
# install node from source, for debian distros
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
COPY . .
RUN npm i
EXPOSE 5432
ENTRYPOINT ["node", "."]
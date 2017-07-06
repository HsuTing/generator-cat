FROM node:latest

# upgrade system
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y dist-upgrade
RUN apt-get -y autoremove

# copy file
RUN mkdir /root/accounting-system
WORKDIR /root/accounting-system

COPY .babelrc \
     yarn.lock \
     package.json \
     webpack.config.js ./
COPY bin ./bin
COPY public/favicon ./public/favicon
COPY src ./src
COPY views ./views

# start project
RUN yarn install
RUN yarn prod

# set server
ENV PORT=8000
ENV NODE_ENV="production"
ENV PGUSER="hsuting"
ENV PGPASSWORD="hsuting"
ENV PGDATABASE="db"
ENV PGHOST="db"
ENV PGPORT=5432
EXPOSE 8000

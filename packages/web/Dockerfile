FROM node:14-alpine AS base
WORKDIR /usr/src/app
COPY . .
RUN yarn

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

EXPOSE 4000
CMD /wait && yarn start
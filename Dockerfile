# FROM mhart/alpine-node:12
FROM node:12.10.0-alpine

RUN apk add --update bash && rm -rf /var/cache/apk/* && apk --virtual build-dependencies add build-base curl make gcc python2 vim git

USER root

ENV targetDir /home/sudoku
RUN mkdir -p ${targetDir} && mkdir -p /var/lib/postgresql/data
RUN chmod 0700 /var/lib/postgresql/data

WORKDIR ${targetDir}
COPY . ${targetDir}

RUN npm install

EXPOSE 2102

CMD ["npm", "run", "start:develop"]

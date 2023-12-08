FROM node:20
WORKDIR /var/app
COPY package.json .
RUN mkdir -p upload/img && npm i
COPY build build
EXPOSE 3001
CMD [ "npm","run","setup"]
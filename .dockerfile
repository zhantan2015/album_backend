FROM node:20
WORKDIR /var/app
COPY package.json .
RUN npm i
COPY build build
EXPOSE 3001
CMD [ "npm","run","setup"]
FROM node:latest

COPY ./package.json /src/

WORKDIR /src

RUN npm install

EXPOSE 3000

COPY . /src

CMD ["npm", "start"]

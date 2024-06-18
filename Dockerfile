from node:20.13.1

run mkdir -p /project
workdir /project

copy ./build ./
copy package.json ./
copy mongodTest.private.pem ./
copy mongodTest.public.pem ./
copy .env ./

run npm i --omit=dev

cmd node app.js
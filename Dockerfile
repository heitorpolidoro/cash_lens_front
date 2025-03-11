FROM node:latest
WORKDIR /cash_lens_front
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
#COPY . .




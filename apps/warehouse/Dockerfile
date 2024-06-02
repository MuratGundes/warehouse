FROM node:18.3.0
#TODO: Had to use older version of node due to : https://github.com/nodejs/docker-node/issues/1946
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "dist/apps/warehouse/main"]
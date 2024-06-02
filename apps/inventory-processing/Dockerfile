FROM node:18.3.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
CMD ["node", "dist/apps/inventory-processing/main"]
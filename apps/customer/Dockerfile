FROM node:18.3.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
CMD ["node", "dist/apps/customer/main"]
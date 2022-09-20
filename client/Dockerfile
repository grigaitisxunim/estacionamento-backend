FROM node:alpine
ENV CI=true
WORKDIR /montd/front
COPY package.json ./
RUN npm install --silent
COPY . .
CMD ["npm", "start"]
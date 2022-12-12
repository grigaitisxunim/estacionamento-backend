FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

RUN npm install --save-dev 
# If you are building your code for production
# RUN npm ci --only=production


RUN npm install nodemon -g --save
# Bundle app source
COPY ./ .
RUN npm run wdb

EXPOSE 5000
CMD ["npm", "run", "dev"]
#CMD [ "node", "server.js" ]

FROM node:18.16-alpine
# FROM node:20

WORKDIR /app

# COPY --chown=node:node package*.json ./
COPY **/package.json ./
COPY **/package-lock.json ./
RUN npm i -g @nestjs/cli
ENV NODE_ENV development
RUN npm i

COPY . .
# COPY --chown=node:node . .

# Copy the .env and .env.development files
COPY .env  ./
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# USER node
# Start the server using the production build
# CMD ["npm", "run", "start:prod"]
# Start the server using the production build
# CMD [ "node", "dist/main.js" ]
CMD [ "npm", "run", "start:dev" ]

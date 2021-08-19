FROM node
WORKDIR /app
COPY package.json ./
RUN npm install -g @angular/cli
RUN npm install --force
COPY . .
EXPOSE 4200
CMD npm run start
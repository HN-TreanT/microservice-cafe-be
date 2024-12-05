FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm install
RUN npm i -g @nestjs/cli

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev" ]
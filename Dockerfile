FROM node:20-alpine AS packages

WORKDIR /app

COPY ./src/package*.json ./
COPY ./src/schema*.prisma ./
COPY ./src/.env ./

RUN npm install
RUN npm run prisma:generate
RUN npm run prisma:migrate

FROM node:20-alpine AS build

WORKDIR /app

COPY --from=packages ./app/node_modules ./node_modules
COPY ./src ./

RUN npm run init
RUN npm run build

FROM node:20-alpine AS run

WORKDIR /app

COPY --from=build ./app/.next/standalone ./
COPY --from=build ./app/.next/static ./
COPY --from=build ./app/public ./
COPY --from=build ./app/dev.db ./

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME='0.0.0.0' node server.js
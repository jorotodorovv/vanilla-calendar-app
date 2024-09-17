FROM node:20-alpine AS packages

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM node:20-alpine AS build

WORKDIR /app

COPY . .
COPY --from=packages /app/node_modules ./node_modules

RUN npx prisma generate
RUN npx prisma migrate deploy

RUN npm run init
RUN npm run build

FROM node:20-alpine AS run

WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./
COPY --from=build /app/public ./

COPY --from=build /app/prisma/dev.db ./prisma/dev.db

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME='0.0.0.0' node server.js
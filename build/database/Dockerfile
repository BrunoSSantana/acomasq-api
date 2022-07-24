# -------------->
FROM node:16.13-alpine as migrate

ENV NODE_ENV 'production'
ENV DATABASE_URL ''

USER node

WORKDIR /home/node

COPY --chown=node:node  src/infra/repositories/prisma/migrations ./prisma/migrations
COPY --chown=node:node  src/infra/repositories/prisma/schema.prisma ./prisma
COPY --chown=node:node  package.json .

RUN npm install prisma@3.9.1

CMD [ "npm", "run", "prisma:migration:push:build" ]

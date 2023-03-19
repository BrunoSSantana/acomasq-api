# -------------->
FROM node:18.15-bullseye as builder

USER node

WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json src/infra/repositories/prisma/schema.prisma ./

RUN npm ci


# -------------->
FROM node:18.15.0-alpine3.17 as runner

USER node

WORKDIR /home/node

COPY --chown=node:node --from=builder /home/node/node_modules/ ./node_modules
COPY --chown=node:node . .

CMD ["npm", "run", "start:dev"]

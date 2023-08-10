FROM node:latest

WORKDIR /usr/app

# Argument
ARG DATABASE_URL

# Environment
ENV DATABASE_URL ${DATABASE_URL}

# Create the keys
COPY genKeyPair.js ./
COPY secretKeys secretKeys
RUN node genKeyPair.js

# Install Dependences
COPY package*.json ./
RUN npm ci

# Setup database
COPY prisma ./prisma

# RUN echo ${DATABASE_URL}
RUN DATABASE_URL=${DATABASE_URL} npm run dbPush

# Copy all files
COPY . .

CMD ["npm", "start"]

EXPOSE 5000


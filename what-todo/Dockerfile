# Official node.js image
FROM node:22.14.0

# Working directory
WORKDIR /app

COPY package*.json ./

# Install dependencies with optional dependencies
RUN npm install --include=optional

# Copy app into container
COPY . .

# Build app
RUN npm run build

# Port for running the app
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# run app with proper host binding
CMD ["npm", "run", "serve"]
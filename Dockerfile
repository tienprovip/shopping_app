# Use Node.js official image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy app code
COPY . .

# Expose the app port
EXPOSE 5000

# Start the app
CMD ["yarn", "run", "dev"]

# Use official Node.js runtime as a base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Set the correct entry point (Ensure correct casing)
CMD ["node", "Server.js"]

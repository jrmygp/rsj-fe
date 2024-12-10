# Use an official Node.js runtime as a base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the preview server will use
EXPOSE 4173

# Start the production build using Vite's preview command
CMD ["npm", "run", "preview"]

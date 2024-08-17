# Use the node image from official Docker Hub
FROM node:latest as build-stage
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json (if available)
COPY package*.json ./
# Install the project dependencies
RUN npm install
# Copy the rest of the project files to the container
COPY . .
# Build the Vue.js application to the production mode to dist folder
RUN npm run build

# Use the lightweight Nginx image from the previous stage for the nginx container
FROM nginx:stable-alpine as production-stage
# Copy the build application from the previous stage to the Nginx container
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copy the nginx configuration file
COPY ./.docker/nginx/default.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]
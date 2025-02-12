FROM cgr.dev/chainguard/node:latest AS build

# Set the working directory
WORKDIR /react

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Runtime stage
FROM cgr.dev/chainguard/nginx:latest-dev

USER root

# Set the working directory
WORKDIR /usr/share/nginx/html

RUN addgroup -S appgroup && adduser -S react -G appgroup

# Copy the built React app from the build stage
COPY --from=build --chown=react:appgroup /react/build /usr/share/nginx/html/

# Copy custom NGINX config file
COPY --chown=react:appgroup nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/lib/nginx/logs /run/nginx && chown -R react:appgroup /var/lib/nginx /run/nginx


# Switch to the non-root user
USER react

# Expose port 80
EXPOSE 80

# Command to start NGINX with a custom PID path
CMD ["-g", "daemon off;"]
FROM node:18.16.1-alpine as builder # Use a smaller base image for building
WORKDIR /app                      

COPY package*.json ./              # Copy package files
RUN npm ci                         # Install dependencies (more efficient for Docker)

COPY . .                           # Copy project files
RUN npm run build                  # Build your TypeScript project

FROM node:18.16.1-alpine as production # A separate, slim image for production
WORKDIR /app                     

COPY --from=builder /app/dist ./   # Copy built files from the builder stage
COPY --from=builder /app/node_modules ./   # Copy node_modules from the builder stage

EXPOSE 3000                     # Expose the port your app runs on
CMD ["node", "dist/index.js"]    # Start your app

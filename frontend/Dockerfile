FROM node:14

WORKDIR /app

# Copy the package.json and package-lock.json if it exists
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . /app

# Start the application
CMD ["npm", "start"]

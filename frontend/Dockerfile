FROM node:14

WORKDIR /app

# Copy only the package.json file first
COPY package.json /app/package.json

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . /app

# Start the application
CMD ["npm", "start"]

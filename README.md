# Code Challenge - Sam

## Energy Domain Full Stack Developer Code Challenge

Welcome to the Energy Domain code challenge. Here you will be able to show off your skills in a fun, creative way. Please attempt to have your challenge completed within a week. If something comes up and you need more time, reach out to Eric, otherwise please turn in what you have at the deadline. If you need any clarification, feel free to ask.

You will be creating a small web app that displays restaurants and their cumulative ratings on a map, within 2.5 miles of the Energy Domain office (1301 W. 7th Street., Suite 120., Fort Worth TX 76102).
Requirements

- Use a combination of Python, Django, Typescript and React to build your application.
- Persist your data in a Postgres database.
- Include a script to spin up and load the database with the initial data.
- The app should have the functionality to manually add a new restaurant and give it a rating.
- Write a README describing how your app works, your thought process, and how to install and run your application.

## Technologies Used

### Backend

- **Framework**: Django 4.2.15
- **Language**: Python 3.10
- **Database**: PostgreSQL
- **Additional Packages**:
  - `djangorestframework`: For building RESTful APIs.
  - `django-cors-headers`: To handle Cross-Origin Resource Sharing (CORS).
  - `psycopg2-binary`: PostgreSQL adapter for Python.

### Frontend

- **Framework**: React
- **Language**: TypeScript
- **Additional Packages**:
  - `react-leaflet`: For integrating Leaflet maps with React.
  - `leaflet`: For interactive maps.
  - `mapbox-gl`: For Mapbox tiles integration.

### Database

- **Database**: PostgreSQL
- **Image**: `postgres:latest`

## Dependencies

The application has the following dependencies:

- **Backend**:

  - `asgiref==3.8.1`
  - `certifi==2024.7.4`
  - `charset-normalizer==3.3.2`
  - `Django==4.2.15`
  - `django-cors-headers==4.4.0`
  - `djangorestframework==3.15.2`
  - `idna==3.7`
  - `pillow==10.4.0`
  - `psycopg2-binary==2.9.9`

- **Frontend**:
  - Dependencies are specified in `package.json`.

## Setup and Running the Application

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Build Docker images**:
   Build the Docker images for the frontend and backend services:
   `docker-compose build`
3. **Start the Application**:

- Start the application with Docker Compose:
  `docker-compose up`
- This command will start the following services:
  - db: PostgreSQL database.
  - backend: Django application server.
  - frontend: React application server.
  - data_loader: A service for loading initial data.

4. Access the Application:

   - Frontend: Open your web browser and navigate to http://localhost:3000.
   - Backend API: Accessible at http://localhost:8000/api/.

5. Loading initial data:
   If you need to load initial data, the data_loader service will handle it. Ensure it's running after your backend service is up.
   `docker-compose run data_loader`

## Things to improve

- Feature enhancement and addition:
  - Include image upload feature when creating new restaurant
  - Add restaurant update and delete feature, which is for frontend
  - Advanced search and filtering
- Make quality application:
  - User authentication and authorization for secure API endpoints
  - Improve error handling on both frontend and backend
  - Add unit and integration tests
  - Implement logging for better insight into application
- Use environment variables to manage configuration settings:
  - `MAPBOXGL_ACCESS_TOKEN` for frontend
  - `GOOGLE_API_KEY` for backend
  - Server url, initial location and zoom parameter, etc

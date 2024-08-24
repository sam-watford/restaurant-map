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

## Screenshot

<img width="1511" alt="Screenshot 2024-08-23 at 8 38 16 PM" src="https://github.com/user-attachments/assets/c57c223b-5e5d-4acd-8d67-633aeb7da947">

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

- Feature Enhancements and Additions:
  - Enable image upload when adding a new restaurant.
  - Implement features to update and delete restaurant entries.
  - Add timestamps (created_at and updated_at) to the restaurants table.
  - Introduce advanced search and filtering options to help users find restaurants more easily.
- Configuration Management:
  - Use environment variables to handle configuration settings, such as:
    - `MAPBOXGL_ACCESS_TOKEN` for frontend
    - `GOOGLE_API_KEY` for backend
    - Server URL, initial map location, and zoom level, among others.
- Application Quality Improvements:
  - Introduce a state management system in the frontend, such as Redux or React Context API.
  - Enhance error handling throughout both the frontend and backend for better user experience.
  - Implement logging to gain better insight into application performance and issues.
  - Add unit and integration tests to improve the reliability and maintainability of the codebase.
  - Implement user authentication and authorization to secure API endpoints and protect user data.

# Home Service App - Local Backend

This is a Node.js Express backend for the Home Service App that connects to a local MongoDB database. It provides API endpoints for user authentication, service management, and appointment booking.

## Prerequisites

- Node.js and npm installed
- MongoDB installed locally (or accessible MongoDB server)

## Setup Instructions

1. **Install MongoDB Community Edition**

   Download and install MongoDB Community Server from:
   https://www.mongodb.com/try/download/community

2. **Start MongoDB Server**

   Start MongoDB server locally:
   ```
   mongod --dbpath=/path/to/your/data/folder
   ```

   Or if you've installed MongoDB as a service, make sure it's running.

3. **Install Dependencies**

   Navigate to the backend folder and install dependencies:
   ```
   cd backend
   npm install
   ```

4. **Start the Server**

   For development with auto-restart:
   ```
   npm run dev
   ```

   For production:
   ```
   npm start
   ```

   The server will start on port 3000 by default. You can change this by setting the PORT environment variable.

## Connecting from Flutter App

The Flutter app is configured to connect to the local Express server at `http://10.0.2.2:3000` (for Android emulator). If you're testing on a physical device, update the `baseUrl` in `lib/services/api_service.dart` to your computer's IP address.

For example:
```dart
static const String baseUrl = 'http://192.168.1.100:3000/api';
```

## Default Accounts

The server automatically creates a default admin account:

- **Admin User:**
  - Email: admin@test.com
  - Password: admin123

## API Endpoints

### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/providers/register` - Register a new service provider
- POST `/api/users/login` - Login for users and providers

### Categories
- GET `/api/categories` - Get all service categories

### Services
- GET `/api/services` - Get all services
- GET `/api/services/category/:category` - Get services by category
- POST `/api/services` - Create a new service (provider only)

### Appointments
- POST `/api/appointments` - Book a new appointment
- GET `/api/appointments/user` - Get user's appointments
- GET `/api/appointments/provider` - Get provider's appointments
- PATCH `/api/appointments/:id` - Update appointment status

### Admin Routes
- GET `/api/admin/users` - Get all users (admin only)
- PATCH `/api/admin/providers/:id/verify` - Verify a service provider (admin only)

## Troubleshooting

1. **Database Connection Issues**
   - Ensure MongoDB is running
   - Check the connection string in `server.js`

2. **CORS Errors**
   - The server has CORS enabled for all origins by default
   - If needed, adjust the CORS settings in `server.js`

3. **Flutter Connection Issues**
   - On physical devices, ensure your device and computer are on the same network
   - Update the baseUrl to your computer's actual IP address
   - Try disabling firewall or adding exceptions 
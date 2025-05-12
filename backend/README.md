# 🛠️ Home Service App – Backend API

This is the complete Node.js, Express, and MongoDB backend for the **Home Service App** platform. It includes user authentication, service management, bookings, provider tools, admin dashboard, notifications, and analytics.

---

## ✅ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/home-service-app-backend.git
cd home-service-app-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/home_service_app
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
```

### 4. Start MongoDB
```bash
sudo service mongod start   # or use Docker
```

### 5. Run the Server
```bash
npm run dev   # for nodemon
# or
npm start
```

---

## 📬 Postman Collection

📥 [Download Collection](#) *(Add link if exported)*

### Base URL:
```
http://localhost:3000/api
```

### Auth Routes
| Method | Endpoint              | Description       |
|--------|------------------------|-------------------|
| POST   | `/auth/register`       | Register a new user |
| POST   | `/auth/login`          | Login and get token |

### User Routes
| Method | Endpoint                  | Description             |
|--------|----------------------------|-------------------------|
| PUT    | `/users/update`           | Update profile          |
| GET    | `/users/email/:email`     | Get user by email       |
| GET    | `/users/favorites`        | List favorites          |
| POST   | `/users/favorites/:id`    | Add favorite            |
| DELETE | `/users/favorites/:id`    | Remove favorite         |

### Provider Routes
| Method | Endpoint                    | Description                   |
|--------|------------------------------|-------------------------------|
| PATCH  | `/providers/availability`    | Toggle availability           |
| PATCH  | `/providers/status`          | Toggle online status          |
| PATCH  | `/providers/location`        | Update location               |
| GET    | `/providers/location/:id`    | Get provider location         |
| GET    | `/providers/nearby`          | Find nearby providers         |
| GET    | `/providers/earnings`        | Earnings dashboard            |

### Service Routes
| Method | Endpoint                  | Description                   |
|--------|----------------------------|-------------------------------|
| POST   | `/services`               | Create new service            |
| GET    | `/services`               | Get all services              |
| GET    | `/services/category/:cat`| Filter by category            |
| GET    | `/services/search?q=...` | Fuzzy search                  |

### Appointments
| Method | Endpoint                  | Description                   |
|--------|----------------------------|-------------------------------|
| POST   | `/appointments`           | Book appointment              |
| PATCH  | `/appointments/:id/status`| Update appointment status     |
| GET    | `/appointments/user`      | Get user bookings             |
| GET    | `/appointments/provider`  | Get provider requests         |

### Admin & Analytics
| Method | Endpoint                  | Description                   |
|--------|----------------------------|-------------------------------|
| GET    | `/analytics/dashboard`    | Admin overview stats          |
| GET    | `/analytics/services`     | Booking trends by service     |

### Issues & Notifications
| Method | Endpoint                  | Description                   |
|--------|----------------------------|-------------------------------|
| POST   | `/issues`                | Report issue                  |
| GET    | `/issues`                | Admin get all issues          |
| POST   | `/notifications`         | Send notification             |
| GET    | `/notifications`         | Get user notifications        |

---

## 🔐 Authentication
Pass token in headers:
```
Authorization: Bearer <token>
```
Get token from `/auth/login`

---

## ✅ Status
- ✅ Fully running with `nodemon`
- ✅ Connected to MongoDB
- ✅ Admin, provider, and user roles supported
- ✅ JWT-based authentication

---

## 🧠 Contributing
Pull requests welcome. Make sure your routes are secure, tested, and documented in this README.

---

## 👨‍💻 Author
Built by **Ridwan** for the Home Service Finder Project – 2025.
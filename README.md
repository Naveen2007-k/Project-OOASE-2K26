# Beauty Salon Appointment System

## Project Description
A complete full-stack web application suitable for a college engineering project. The "Beauty Salon Appointment System" streamlines the reservation process, allowing customers to book services, select beauticians, and make payments online. It also features a comprehensive dashboard for staff to manage their schedule and for administrators to oversee the entire business.

## Features
- **Customer Portal:** Browse services, select staff, book time slots, simulate payments, view history, and leave reviews.
- **Staff Portal:** View assigned appointments, accept/reject bookings, and update availability.
- **Admin Dashboard:** Manage users, services, staff, appointments, payments, and view overall system metrics.
- **Security:** JWT-based authentication and secure password hashing.
- **Modern UI:** Built with React and styled with TailwindCSS for a premium, responsive look.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, React.js, TailwindCSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Tools:** VS Code, Postman, Jira, ArgoUML

## System Architecture
The project follows a standard MERN stack architecture. The React frontend communicates via HTTP requests to the Express.js REST API. The backend processes business logic, validates data, and interfaces with the MongoDB database.

## Folder Structure
```
beauty-salon-appointment/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Full page views
│   │   ├── services/       # API call handlers
│   │   └── App.jsx         # Main router
│
├── server/                 # Node/Express Backend
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoint definitions
│   ├── middleware/         # Auth & Error handling
│   ├── config/             # DB connection
│   └── server.js           # Server entry point
│
├── docs/                   # UML and Requirement Analysis Documents
├── README.md
└── package.json
```

## Installation & Setup

### 1. MongoDB Setup
Ensure you have MongoDB installed locally or have a MongoDB Atlas cluster URI.
Database Name: `beauty_salon_db`

### 2. Environment Variables
Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/beauty_salon_db
JWT_SECRET=your_super_secret_key_here
```

### 3. How to run Backend
```bash
cd server
npm install
npm run dev
```
The server will start on `http://localhost:5000`.

### 4. How to run Frontend
```bash
cd client
npm install
npm run dev
```
The client will start on `http://localhost:5173`.

## API Documentation & Postman Testing
Refer to the `docs/4_API_and_Testing.md` for endpoint details. You can import the provided endpoints into Postman to test authentication and CRUD operations.

## Future Enhancements
- Integration of a real payment gateway (Stripe/PayPal).
- Email/SMS notifications using Twilio or SendGrid.
- Advanced inventory management for salon products.

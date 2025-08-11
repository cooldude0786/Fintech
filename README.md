# Full-Stack Authentication & Transactions App

A **MERN (MongoDB, Express.js, React.js, Node.js)** application that supports dual authentication methods:  
1. **JWT-based login & signup**  
2. **OTP verification** (currently static `123` for development)  

Includes a **transaction management module** with a modern, responsive UI.

---

## 📂 Project Structure

/backend → Node.js + Express API server  
/frontend → React.js frontend application

---

## ⚙️ Tech Stack

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Static OTP Verification
- bcrypt / bcryptjs for password hashing
- Nodemailer (email integration ready)
- dotenv for environment configuration

**Frontend**
- React.js (Vite or CRA)
- Context API + Custom Hooks for state management
- Tailwind CSS + DaisyUI for UI
- Fetch / Axios for API requests

---

## 🚀 Features

### Authentication
- **Signup** with hashed password
- **Login** with JWT token
- **OTP Verification** (static `123` in dev mode)
- Protected backend routes via JWT middleware

### Transactions
- Add income or expense transactions
- View full transaction history
- Responsive UI for desktop and mobile
- Auto-updates transaction list after adding new ones

---
## 📦 Installation

### Install dependencies
cmd
# Backend
- cd backend
- pm install

# Frontend (in a new terminal)
- cd ../frontend
- npm install
---
## 🔑 Environment Variables
- PORT=5000
- MONGO_URI=mongodb://127.0.0.1:27017/Fintech
- JWT_SECRET=MyFintechSuperKey

## 🏃 Running the App
- Run backend and frontend in separate terminals.
- cd backend
- npm start 

- Frontend
- cd fitness
- npm run dev     

## 📬 API Endpoints
- Auth Routes (/api/*)
- POST /api/signup
- Body:
- json Copy code
- {
-  "username": "yourname",
-  "email": "you@example.com",
-  "password": "yourpassword"
- }

**POST /api/login**
- Body:

- json
- Copy code
- {
-  "email": "you@example.com",
-  "password": "yourpassword"
- }
**Responses:**

- If OTP required:

- *json*
- Copy code
- { "userId": "<id>", "otp_required": true }
- If verified:

- *json*
- Copy code
- { "token": "<jwt>", "username": "YourName" }
- POST /api/verify-otp
- Body:

*json*
- Copy code
- {
 -  "userId": "<id>",
  - "otp": "123"
- }
- Response:

*json*
- Copy code
- { "token": "<jwt>" }
- Transactions (/api/transactions)
- POST (protected)
- Headers:

*pgsql*
- Copy code
- Authorization: Bearer <jwt>
- Content-Type: application/json
*Body:*

- json
- Copy code
- {
 -  "title": "Grocery",
  - "amount": 250,
  - "type": "expense",
  - "description": "Veggies"
- }
**Response: Created transaction object (HTTP 201)**

GET (protected)
Headers:

makefile
Copy code
Authorization: Bearer <jwt>
Response:

json
Copy code
[
  { "title": "Grocery", "amount": 250, "type": "expense", "description": "Veggies" },
  ...
]
## 🔐 Auth & Middleware
JWT issued on login or OTP verification

Protected routes use middleware that verifies:

makefile
Copy code
Authorization: Bearer <token>
Token is validated against JWT_SECRET

🛠 Future Improvements
Replace static OTP with dynamic, expiring OTP via Nodemailer

Implement refresh tokens & improved expiry handling

Add transaction categories, filters, and analytics

Add pagination & CSV export for transactions

Improve server-side validation & sanitization

## 🧰 Development Notes
Backend script in package.json:

json
Copy code
"scripts": {
  "start": "nodemon server.js"
}
If MongoDB fails on IPv6 (::1), use:

Copy code
127.0.0.1
in MONGO_URI.

Always keep .env in .gitignore to avoid committing secrets



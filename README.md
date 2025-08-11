# Full-Stack Authentication & Transactions App

A **MERN (MongoDB, Express.js, React.js, Node.js)** application that supports dual authentication methods:
1. **JWT-based login & signup**
2. **OTP verification** (currently static `123` for development)

Includes a **transaction management module** with a modern, responsive UI.

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies for both backend and frontend using `npm install`
3. Create a `.env` file in the root directory with the following variables:
	* `PORT=5000`
	* `MONGO_URI=mongodb://127.0.0.1:27017/Fintech`
	* `JWT_SECRET=MyFintechSuperKey`
4. Run the backend server using `npm start` in the backend directory
5. Run the frontend server using `npm run dev` in the frontend directory

## API Endpoints

### Auth Routes (/api/*)

* **POST /api/signup**
	+ Body:
		- `username`
		- `email`
		- `password`
* **POST /api/login**
	+ Body:
		- `email`
		- `password`
	+ Response:
		- If OTP required:
			- `userId`
			- `otp_required`
		- If verified:
			- `token`
			- `username`
* **POST /api/verify-otp**
	+ Body:
		- `userId`
		- `otp`
	+ Response:
		- `token`

### Transactions (/api/transactions)

* **POST (protected)**
	+ Headers:
		- `Authorization: Bearer <jwt>`
		- `Content-Type: application/json`
	+ Body:
		- `title`
		- `amount`
		- `type`
		- `description`
	+ Response:
		- Created transaction object (HTTP 201)
* **GET (protected)**
	+ Headers:
		- `Authorization: Bearer <jwt>`
	+ Response:
		- Array of transaction objects

## Test Credentials

* Email: test2@gmail.com
* Password: 123

Please note that this is a development-only setup and should not be used in production.



# Car Shop Fullstack Application

This is a full-stack Car Shop web application developed using Express, TypeScript, and ReactJS. The project includes user registration, login, car management, order placement, and order status management with different levels of access (admin and user).

## Table of Contents

1. [Technologies](#technologies)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Backend API Routes](#backend-api-routes)
   - [Car Routes](#car-routes)
   - [Order Routes](#order-routes)
   - [Auth Routes](#auth-routes)
5. [Folder Structure](#folder-structure)
6. [Contributing](#contributing)
7. [License](#license)

## Technologies

### Backend:
- **Express**: Web framework for building REST APIs.
- **TypeScript**: Type-safe JavaScript for backend development.
- **JWT (JSON Web Tokens)**: Authentication mechanism for users and admins.
- **Mongoose**: For interacting with the MongoDB database (if used).

### Frontend:
- **ReactJS**: JavaScript library for building user interfaces.
- **TypeScript**: Type-safe JavaScript for frontend development.

## Features

- **User Authentication**: Users can register, log in, and refresh tokens for access.
- **Car Management**: Admin users can add, edit, update, or delete cars.
- **Order Management**: Users can place orders for cars; admins can view, update, or delete orders.
- **Admin Authorization**: Some routes are restricted to the admin, ensuring only authorized users can manage cars and orders.

## Getting Started

To run this application locally, follow these steps:

### Prerequisites
- Node.js installed
- MongoDB (if you are using MongoDB)
- npm or yarn as package manager

### Install Dependencies

1. Clone the repository to your local machine.
   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

### Environment Variables

Make sure to set up the required environment variables:

1. **Backend** (in `.env`):
   - `PORT`:
   - `DB_URL`:
   - `NODE_ENV`:
   -`JWT_ACCESS_SECRET`:
   -`JWT_ACCESS_EXPIRES_IN`:
   -`JWT_REFRESH_SECRET`:
   -`JWT_REFRESH_EXPIRES_IN`:
   -`SP_ENDPOINT`:
   -`SP_USERNAME`:
   -`SP_PASSWORD`:
   -`SP_PREFIX`:
   -`SP_RETURN_URL`:

2. **Frontend** (in `.env`):
   - `VITE_BACKEND_URL`: The URL of the backend API.

### Running the Application

1. Start the backend:
   ```bash
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

## Backend API Routes

### Car Routes
- **POST `/cars/add`**: Admin adds a new car (requires authentication).
- **GET `/cars/all`**: Fetch all cars.
- **GET `/cars/:id`**: Get details of a car by ID.
- **DELETE `/cars/delete/:id`**: Admin deletes a car by ID (requires authentication).
- **PUT `/cars/update/:id`**: Admin updates a car (requires authentication).


### Order Routes
- **POST `/orders/add`**: User places a new order.
- **GET `/orders/all`**: Admin fetches all orders.
- **GET `/orders/verify/:id`**: Verify payment for an order.
- **GET `/orders/my-orders/:id`**: Get the user's own orders.
- **GET `/orders/:id`**: Get order details by ID.
- **PATCH `/orders/update/status/:id`**: Admin updates the status of an order.
- **DELETE `/orders/delete/:id`**: Admin deletes an order.


### Auth Routes
- **POST `/auth/register`**: User registration.
- **POST `/auth/login`**: User login (JWT authentication).
- **POST `/auth/refresh-token`**: Refresh JWT token.

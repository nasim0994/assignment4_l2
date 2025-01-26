## Setup Instructions

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/nasim0994/L2_assignment3.git
cd L2_assignment3
```

### 2. Install Dependencies

Once you have cloned the repository, install the necessary dependencies by running:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```env
PORT=5000
DB_URL=
```

### 4. Running the Project

#### Development Mode

To run the project in development mode with hot reloading, use:

```bash
npm run dev
```

This will start the server and allow you to make changes and see them reflected immediately.

#### Production Mode

To run the project in production mode, first build the TypeScript code:

```bash
npm run build
```

Then start the server:

```bash
npm start
```

### 5. Linting & Code Quality

#### Linting

To check for linting issues, run the following command:

```bash
npm run lint
```

#### Fixing Linting Issues

To automatically fix linting issues, use:

```bash
npm run lint:fix
```

#### Formatting Code

To format the code according to the predefined style guide, run:

```bash
npm run format
```



# Blogging Platform API Documentation

This document provides an overview of the API endpoints for a blogging platform, including user authentication, blog management, and admin-specific actions.

## Collection of Contents
1. [User Authentication](#user-authentication)
    - [Register User](#register-user)
    - [Login User](#login-user)
2. [Blog Management](#blog-management)
    - [Create Blog](#create-blog)
    - [Update Blog](#update-blog)
    - [Delete Blog](#delete-blog)
    - [Get All Blogs (Public)](#get-all-blogs-public)
3. [Admin Actions](#admin-actions)
    - [Block User](#block-user)
    - [Delete Blog (Admin)](#delete-blog-admin)

---

## User Authentication

### 1. Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Response:**
- **201 Created**: User successfully registered.
- **400 Bad Request**: User already exists.

**Example Response:**
```json
{
  "message": "User registered successfully."
}
```

---

### 2. Login User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Response:**
- **200 OK**: Login successful.
- **401 Unauthorized**: Invalid credentials.

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "60b8f42f9c2a3c9b7cbd4f18",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

---

## Blog Management

### 1. Create Blog
**Endpoint:** `POST /api/blogs`

**Request Body:**
```json
{
  "title": "Introduction to Technology",
  "content": "Technology is evolving rapidly...",
  "author": "60b8f42f9c2a3c9b7cbd4f18"
}
```

**Response:**
- **201 Created**: Blog created successfully.
- **400 Bad Request**: Validation error.

**Example Response:**
```json
{
  "message": "Blog created successfully."
}
```

---

### 2. Update Blog
**Endpoint:** `PATCH /api/blogs/:id`

**Request Body:**
```json
{
  "title": "Updated Blog Title",
  "content": "Updated content goes here..."
}
```

**Response:**
- **200 OK**: Blog updated successfully.
- **404 Not Found**: Blog not found.

**Example Response:**
```json
{
  "message": "Blog updated successfully."
}
```

---

### 3. Delete Blog
**Endpoint:** `DELETE /api/blogs/:id`

**Response:**
- **200 OK**: Blog deleted successfully.
- **404 Not Found**: Blog not found.

**Example Response:**
```json
{
  "message": "Blog deleted successfully."
}
```

---

### 4. Get All Blogs (Public)
**Endpoint:** `GET /api/blogs`

**Query Parameters:**
- `search` (optional): Search term for blog titles or content.
- `sortBy` (optional): Field to sort by (e.g., `createdAt`).
- `sortOrder` (optional): `asc` or `desc`.
- `author` (optional): Filter by author ID.

**Response:**
- **200 OK**: Blogs retrieved successfully.

**Example Response:**
```json
[
  {
    "title": "Introduction to Technology",
    "content": "Technology is evolving rapidly...",
    "..."
  }
]
```

---

## Example Request URL
```plaintext
GET /api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&author=60b8f42f9c2a3c9b7cbd4f18
```

---




## Admin Actions

### 1. Block User
**Endpoint:** `PATCH /api/admin/users/:userId/block`

**Response:**
- **200 OK**: User blocked successfully.
- **404 Not Found**: User not found.

**Example Response:**
```json
{
  "message": "User blocked successfully."
}
```

---

### 2. Delete Blog (Admin)
**Endpoint:** `DELETE /api/admin/blogs/:id`

**Response:**
- **200 OK**: Blog deleted successfully.
- **404 Not Found**: Blog not found.

**Example Response:**
```json
{
  "message": "Blog deleted successfully."
}
```



## Notes
- Authentication tokens must be included in the `Authorization` header for protected routes.



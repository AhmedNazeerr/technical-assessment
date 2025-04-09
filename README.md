## Overview
This project is a backend API for managing products. It includes controllers, models, routes, and tests for CRUD operations on products. The backend is built using Node.js, Express, and MongoDB.

---

## Project Structure

### 1. **Controllers**
Controllers handle the business logic for the application. They process incoming requests, interact with the database, and send responses.

- **File:** `connect.js`
- **Purpose:** Handles database connection logic using MongoDB.

### 2. **Models**
Models define the structure of the data stored in MongoDB.

- **File:** `models/Product.js` (assumed)
- **Purpose:** Defines the schema for the `Product` collection, including fields like `name`, `price`, `quantity`, and `description`.

### 3. **Routes**
Routes define the API endpoints and map them to the appropriate controller functions.

- **File:** `routes/productroute.js`
- **Purpose:** Handles all product-related routes such as:
  - `POST /api/v1/products` - Create a new product
  - `GET /api/v1/products` - Retrieve all products
  - `GET /api/v1/products/:id` - Retrieve a product by ID
  - `PUT /api/v1/products/:id` - Update a product
  - `DELETE /api/v1/products/:id` - Delete a product

### 4. **Tests**
Tests ensure the API behaves as expected.

- **File:** product.test.js
- **Purpose:** Contains test cases for all product-related operations, including:
  - Creating a product
  - Retrieving all products
  - Retrieving a product by ID
  - Updating a product
  - Deleting a product
  - Handling non-existent products

### 5. **Main Application**
The main application file initializes the Express app, connects to the database, and starts the server.

- **File:** app.js
- **Purpose:** 
  - Sets up middleware (e.g., CORS, JSON parsing, cookie parsing).
  - Registers routes.
  - Connects to MongoDB.
  - Starts the server.

---

## How to Start the Backend

### Prerequisites
- Node.js installed on your machine.
- MongoDB connection string (set in .env file as `MONGO_URL`).

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add the following:
   ```env
   MONGO_URL=<your-mongodb-connection-string>
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

---

## How to Run Tests

### Steps
1. Ensure the server is running and the database is connected.

2. Run the tests using the following command:
   ```bash
   npm test
   ```

3. The test suite will execute and display the results for all test cases in product.test.js.

---

## API Endpoints

### Product Routes
| Method | Endpoint                     | Description                  |
|--------|-------------------------------|------------------------------|
| POST   | `/api/v1/products`           | Create a new product         |
| GET    | `/api/v1/products`           | Retrieve all products        |
| GET    | `/api/v1/products/:id`       | Retrieve a product by ID     |
| PUT    | `/api/v1/products/:id`       | Update a product by ID       |
| DELETE | `/api/v1/products/:id`       | Delete a product by ID       |


---

## Notes
- Ensure MongoDB is running locally or provide a valid connection string in the .env file.
- Use `Postman` or `cURL` to test the API endpoints manually.
- The product.test.js file uses `supertest` for API testing.

---

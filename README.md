
# QimaStore

This project is divided into two parts: **frontend** and **backend**.

- **Frontend**: Developed with React, version 18.
- **Backend**: Developed with Spring Boot 3 and Java 22.

## Project Structure

### Frontend

The frontend uses React to create an interactive and responsive user interface. To run the frontend, use the following commands:

```bash
cd frontend
npm install
npm start
```

### Backend

The backend is built with Spring Boot and provides a REST API to manage products and categories in the store. To run the backend, use the following commands:

```bash
cd backend
./mvnw spring-boot:run
```

## Controllers

### ProductController

Located at `com.qima.QimaStore.controllers.ProductController`, this controller manages operations related to products.

- **GET /api/products**: Returns a list of all products. (Public)
- **GET /api/products/{id}**: Returns a specific product by ID. (Public)
- **POST /api/products**: Creates a new product. (Private, admin only)
- **PUT /api/products/{id}**: Updates an existing product by ID. (Private, admin only)
- **DELETE /api/products/{id}**: Deletes a product by ID. (Private, admin only)

### CategoryController

Located at `com.qima.QimaStore.controllers.CategoryController`, this controller manages operations related to categories.

- **GET /api/categories**: Returns a list of all categories.
- **GET /api/categories/{id}`**: Returns a specific category by ID.
- **POST /api/categories**: Creates a new category.
- **PUT /api/categories/{id}`**: Updates an existing category by ID.
- **DELETE /api/categories/{id}`**: Deletes a category by ID.

**Note**: No security rules have been applied to the category endpoints.

### AuthController

Located at `com.qima.QimaStore.controllers.AuthController`, this controller manages user authentication.

- **POST /login**: Authenticates a user and returns a JWT token. (Public)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/qima-store.git
   ```
2. Install the dependencies and start the frontend and backend as described above.

## Contribution

1. Fork the project.
2. Create a branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

---

This README provides a basic overview of the QimaStore project, including its structure and main endpoints. For more details, refer to the complete documentation or contact the development team.

## Default Users

By default, there are two users:

- **Admin User**: Username is `admin`, and the password is `adminpassword`.
- **Regular User**: Username is `user`, and the password is `userpassword`.

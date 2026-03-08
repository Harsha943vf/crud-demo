# Spring Boot CRUD Demo

A simple REST API built with **Spring Boot 3.5** that demonstrates full CRUD operations for a `Product` entity using an H2 in-memory database.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Spring Boot 3.5 |
| ORM | Spring Data JPA / Hibernate |
| Database | H2 (in-memory) |
| Build Tool | Maven |
| Utilities | Lombok, Jakarta Validation |

## API Endpoints

Base URL: `http://localhost:8080/api/products`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products?name={name}` | Search products by name |
| `GET` | `/api/products/{id}` | Get product by ID |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/{id}` | Update an existing product |
| `DELETE` | `/api/products/{id}` | Delete a product |

## Running the Application

### Prerequisites
- Java 17 or higher
- Maven (or use the included `./mvnw` wrapper)

### Start the App
```bash
./mvnw spring-boot:run
```

The server starts on **http://localhost:8080**

### H2 Console
Access the in-memory database UI at:  
**http://localhost:8080/h2-console**  
- JDBC URL: `jdbc:h2:mem:cruddb`
- Username: `sa`
- Password: *(leave blank)*

## Example Requests

### Create a Product
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Gaming laptop","price":1299.99,"quantity":5}'
```

### Get All Products
```bash
curl http://localhost:8080/api/products
```

### Update a Product
```bash
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop Pro","description":"Updated laptop","price":1499.99,"quantity":3}'
```

### Delete a Product
```bash
curl -X DELETE http://localhost:8080/api/products/1
```

## Project Structure

```
src/main/java/com/example/cruddemo/
├── CrudDemoApplication.java       # Entry point
├── controller/
│   └── ProductController.java     # REST endpoints
├── service/
│   └── ProductService.java        # Business logic
├── repository/
│   └── ProductRepository.java     # JPA repository
├── model/
│   └── Product.java               # JPA entity
└── exception/
    ├── ResourceNotFoundException.java
    └── GlobalExceptionHandler.java
```

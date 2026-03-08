<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Spring Boot CRUD Demo — Copilot Instructions

## Project Overview
This is a Spring Boot 3.5 REST API project implementing full CRUD operations for a `Product` entity.

## Tech Stack
- **Java 17+** with Spring Boot 3.5
- **Spring Web** — REST controllers
- **Spring Data JPA** — repository layer
- **H2** — in-memory database (dev/test)
- **Lombok** — boilerplate reduction (@Data, @RequiredArgsConstructor, etc.)
- **Jakarta Validation** — request body validation

## Conventions
- Use `@RestController` and `@RequestMapping` for all controllers
- Use `@Service` for business logic; keep controllers thin
- Use `@Repository` interfaces extending `JpaRepository`
- Use `@Valid` on `@RequestBody` parameters to trigger validation
- Throw `ResourceNotFoundException` for missing entities; the `GlobalExceptionHandler` handles it
- Base API path: `/api/products`

## Package Structure
```
com.example.cruddemo
├── controller/   # REST controllers
├── service/      # Business logic
├── repository/   # JPA repositories
├── model/        # JPA entities
└── exception/    # Custom exceptions & global handler
```

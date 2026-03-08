# ─── Stage 1: Build React + Spring Boot ───────────────────────────────────────
FROM eclipse-temurin:17-jdk-alpine AS builder

# Install Node.js (needed for frontend-maven-plugin)
RUN apk add --no-cache nodejs npm

WORKDIR /app

# Copy Maven wrapper and pom first (layer cache)
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw dependency:go-offline -q

# Copy full source
COPY src ./src
COPY frontend ./frontend

# Build everything (React + Spring Boot JAR)
RUN ./mvnw clean package -DskipTests -q

# ─── Stage 2: Minimal runtime image ────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy only the built JAR from builder stage
COPY --from=builder /app/target/crud-demo-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]

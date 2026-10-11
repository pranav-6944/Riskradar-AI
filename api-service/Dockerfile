# Stage 1: Build the JAR with Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build fat JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

ENV PORT=8080

RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

# Persistent directory for embedded H2 database
RUN mkdir -p /app/data

COPY --from=build /app/target/api-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8080/api/v1/companies || exit 1

CMD ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]

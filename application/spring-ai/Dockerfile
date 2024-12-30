FROM eclipse-temurin:17-jdk-focal
#
WORKDIR /app
#
## Copy Maven wrapper and project configuration
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
#
## Copy application source code
COPY src ./src

## Expose application port
EXPOSE 8080
#
## Run the application
CMD ["./mvnw", "spring-boot:run"]

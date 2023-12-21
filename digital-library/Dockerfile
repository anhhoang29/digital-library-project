FROM maven:3.8.3-openjdk-17 as BUILD
COPY ./src ./src
COPY ./pom.xml .
RUN mvn -f /pom.xml -B -DskipTests clean package

FROM openjdk:17-jdk
WORKDIR /app
ARG JAR_FILE_NAME=digital-library-0.0.1-SNAPSHOT.jar
COPY --from=BUILD /target/${JAR_FILE_NAME} /app/app.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/app.jar"]

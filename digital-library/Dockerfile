#FROM adoptopenjdk:11-jre-hotspot as builder
##FROM openjdk:17-jdk-slim-buster as builder
#WORKDIR application
#COPY mvnw .
#COPY .mvn .mvn
#COPY pom.xml .
#COPY src src
##RUN ./mvnw install -DskipTests
## ARG là một câu lệnh trong Dockerfile để truyền biến từ bên ngoài vào trong Dockerfile
#ARG JAR_FILE=target/*.jar
## COPY: copy file từ máy host vào trong image
#COPY ${JAR_FILE} application.jar
#RUN java -Djarmode=layertools -jar application.jar extract
##RUN java -Djarmode=layertools -jar target/docker-spring-boot-0.0.1.jar extract
#
#
#FROM adoptopenjdk:11-jre-hotspot
##FROM openjdk:17-jdk-slim-buster as builder
#WORKDIR /app
##COPY --from=builder dependencies/ ./
##COPY --from=builder snapshot-dependencies/ ./
##COPY --from=builder spring-boot-loader/ ./
##COPY --from=builder application/ ./
##ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
#
#COPY --from=builder /application/dependencies/ ./dependencies/
#COPY --from=builder /application/snapshot-dependencies/ ./snapshot-dependencies/
#COPY --from=builder /application/spring-boot-loader/ ./spring-boot-loader/
#COPY --from=builder /application/application/ ./application/
#
## Specify the entry point for the application
#ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
FROM maven:3.8.3-openjdk-17 as BUILD
COPY digital-library/src digital-library/src
COPY digital-library/pom.xml /digital-library
RUN mvn -f /digital-library/pom.xml -B -DskipTests clean package

FROM openjdk:17-jdk
WORKDIR /app
ARG JAR_FILE_NAME=digital_library-0.0.1-SNAPSHOT.jar
COPY --from=BUILD /digital-library/target/${JAR_FILE_NAME} /app/app.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/app.jar"]

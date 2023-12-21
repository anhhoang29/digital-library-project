# Project: digital-library Backend
# Ho Chi Minh City University of Technology and Education

## Thông tin nhóm
| Sinh viên          | MSSV            |           
|:-------------------|:----------------| 
| `Vũ Hoàng Anh`     | `20110205`      |
| `Nguyễn Văn Thuận` | `20110732`      |

## Thông tin đồ án
| Tên đồ án          | Thư mục            |
|:-------------------|:----------------|
| `Digital Library`  | `digital-library`      |


# Setup environment
## 1. Install Java 11
## 2. Install Maven
## 3. Install Docker


# Run Mvn clean package to build project
``` mvn clean package ```
# Run Mvn clean package to build project and run test
``` mvn clean package -DskipTests=false ```
# Run Mvn clean package to build project and run test and generate jacoco report
``` mvn clean package -DskipTests=false jacoco:report ```

# How to run with docker
## 1. Build docker image
### 1.1. Build docker image for backend
``` docker build -t digital-library-backend:1.0 .```
### 1.2. Build docker image for frontend
``` docker build -t digital-library-frontend:1.0 .```
## 2. Run docker container
### 2.1. Run docker container for backend
``` docker run -d -p 8080:8080 digital-library-backend:1.0 ```
### 2.2. Run docker container for frontend
``` docker run -d -p 80:80 digital-library-frontend:1.0 ```
## 3. Access to application
### 3.1. Access to backend
``` http://localhost:8080 ```
### 3.2. Access to frontend
``` http://localhost ```

# How to run with docker-compose
## 1. Build docker image
### 1.1. Build docker image for backend
``` docker build -t digital-library-backend:1.0 .```

### 1.2. Build docker image for frontend
``` docker build -t digital-library-frontend:1.0 .```
## 2. Run docker-compose
``` docker-compose up -d ```
## 3. Access to application
### 3.1. Access to backend
``` http://localhost:8080 ```
### 3.2. Access to frontend
``` http://localhost ```

# How to run with docker-compose and nginx
## 1. Build docker image
### 1.1. Build docker image for backend
``` docker build -t digital-library-backend:1.0 .```

### 1.2. Build docker image for frontend
``` docker build -t digital-library-frontend:1.0 .```
## 2. Run docker-compose
``` docker-compose up -d ```
## 3. Access to application
``` http://localhost ```


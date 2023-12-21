# Thông tin project
| Tên đồ án          | Thư mục            |
|:-------------------|:----------------|
| `Digital Library`  | `digital-library`      |


# Thông tin nhóm
| STT | Họ và tên          | MSSV       | Email                            |
|:---:|:-------------------|:-----------|:---------------------------------|
|  1  | `Vũ Hoàng Anh`     | `20110205` | `20110205@student.hcmute.edu.vn` |
|  2  | `Nguyễn Văn Thuận` | `20110732` | `20110732@student.hcmute.edu.vn` |


# Setup environment

## 1. Run Backend
### 1.1. Install Java 11
### 1.2. Install Maven
### 1.3. Install Docker
### 1.4. Run Mvn clean package to build project
``` mvn clean package ```
### 1.5. Run Mvn clean package to build project and run test
``` mvn clean package -DskipTests=false ```
### 1.6. Run Mvn clean package to build project and run test and generate jacoco report
``` mvn clean package -DskipTests=false jacoco:report ```
### 1.7. Build docker image for backend
``` docker build -t digital-library-backend:1.0 .```
### 1.8. Run docker container for backend
``` docker run -d -p 8080:8080 digital-library-backend:1.0 ```
### 1.9. Access to backend
``` http://localhost:8080 ```
## 2. Run Frontend ReactJS
### 2.1. Install NodeJS
``` npm install ``` or ``` yarn install ```
### 2.2. Run Frontend ReactJS
``` npm start ``` or ``` yarn start ```
### 2.3. Build docker image for frontend
``` docker build -t digital-library-frontend:1.0 .```
### 2.4. Run docker container for frontend
``` docker run -d -p 80:80 digital-library-frontend:1.0 ```
### 2.5. Access to frontend
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

# How to run with docker-compose and nginx and mysql    
## 1. Build docker image
### 1.1. Build docker image for backend
``` docker build -t digital-library-backend:1.0 .```

### 1.2. Build docker image for frontend
``` docker build -t digital-library-frontend:1.0 .```

### 1.3. Build docker image for mysql
``` docker build -t digital-library-mysql:1.0 .```

## 2. Run docker-compose
``` docker-compose up -d ```
## 3. Access to application
``` http://localhost ```

# Tree project
```

# CRM Backend API

A Spring Boot REST API for Customer Relationship Management system with JWT authentication.

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.8+
- MySQL 8.0+
- Docker & Docker Compose (optional)

### Run with Docker (Recommended)
```bash
cd backend
docker-compose up -d
```

The API will be available at: **http://localhost:8080**

### Run Locally
```bash
cd backend/CRM/project/proj
mvn spring-boot:run
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe",
  "email": "john@example.com"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe",
  "email": "john@example.com"
}
```

### Customer Endpoints

All customer endpoints require JWT authentication via `Authorization: Bearer <token>` header.

#### Get All Customers
```http
GET /api/customers
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Acme Corp",
    "email": "contact@acme.com",
    "phone": "+1-555-0123",
    "company": "Acme Corporation",
    "status": "ACTIVE",
    "createdAt": "2024-11-19T10:30:00"
  }
]
```

#### Get Customer by ID
```http
GET /api/customers/{id}
Authorization: Bearer <your-jwt-token>
```

#### Create Customer
```http
POST /api/customers
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1-555-9876",
  "company": "Smith Inc",
  "status": "ACTIVE"
}
```

#### Update Customer
```http
PUT /api/customers/{id}
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "email": "jane.updated@example.com",
  "phone": "+1-555-9999",
  "company": "Smith Inc",
  "status": "INACTIVE"
}
```

#### Delete Customer
```http
DELETE /api/customers/{id}
Authorization: Bearer <your-jwt-token>
```

## 🛠️ Tech Stack

- **Framework**: Spring Boot 3.3.2
- **Java Version**: 17
- **Database**: MySQL 8.0
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven
- **Container**: Docker

## 📁 Project Structure

```
backend/
├── CRM/project/proj/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/CRM/project/
│   │   │   │   ├── ProjectApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   └── DatabaseConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   └── CustomerController.java
│   │   │   │   ├── entity/
│   │   │   │   │   ├── Customer.java
│   │   │   │   │   ├── User.java
│   │   │   │   │   └── Role.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── CustomerService.java
│   │   │   │   │   └── impl/
│   │   │   │   │       ├── AuthService.java
│   │   │   │   │       ├── JwtService.java
│   │   │   │   │       └── CustomerServiceImpl.java
│   │   │   │   ├── repo/
│   │   │   │   │   └── UserRepo.java
│   │   │   │   └── exceptions/
│   │   │   │       └── GlobalExceptionHandler.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-prod.properties
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
├── docker-compose.yml
└── DEPLOYMENT.md
```

## ⚙️ Configuration

### Development (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/crm_db
spring.datasource.username=root
spring.datasource.password=root123
server.port=8080
```

### Production (application-prod.properties)
```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
server.port=${PORT:8080}
```

## 🔒 Security

- JWT-based authentication
- Password encryption using BCrypt
- CORS configuration for frontend integration
- Role-based access control (USER, ADMIN)

## 🧪 Testing

```bash
# Run tests
mvn test

# Run with coverage
mvn test jacoco:report
```

## 📦 Building

```bash
# Build JAR
mvn clean package

# Skip tests
mvn clean package -DskipTests

# Build Docker image
docker build -t crm-backend:latest .
```

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions including:
- Local development setup
- Docker deployment
- Cloud deployment (Render, Railway, AWS, DigitalOcean)
- Environment configuration
- Troubleshooting guide

## 📊 Health Check

```bash
curl http://localhost:8080/actuator/health
```

## 🔗 Related Links

- **Frontend Repository**: [Link to frontend repo if available]
- **API Documentation**: [Swagger/OpenAPI link if enabled]
- **Project Board**: [GitHub Projects link]

## 👥 Contributors

- Your Name - [GitHub Profile](https://github.com/dev-ploy)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for showcasing to recruiters**

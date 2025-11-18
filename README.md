# Customer Relationship Management System

A full-stack CRM application built with React (Frontend) and Spring Boot (Backend).

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Spring Boot 3.3.2
- Spring Data JPA
- MySQL/PostgreSQL
- JWT Authentication
- Maven

## 📋 Prerequisites

- Node.js 16+ and npm
- Java 17+
- Maven 3.6+
- MySQL 8.0+ (for local development)

## 🛠️ Local Development Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend/CRM/project/proj
```

2. Create `.env` file from example:
```bash
cp .env.example .env
```

3. Update database credentials in `.env`

4. Create database:
```sql
CREATE DATABASE crm_db;
```

5. Run the application:
```bash
./mvnw spring-boot:run
```

Backend will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update API URL in `.env` if needed

5. Run development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 Deployment

### Option 1: Deploy to Render (Recommended)

#### Backend Deployment on Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Create a new **PostgreSQL** database (Free tier)
4. Create a new **Web Service**
   - Connect your GitHub repository
   - Build Command: `cd backend/CRM/project/proj && ./mvnw clean package -DskipTests`
   - Start Command: `java -jar backend/CRM/project/proj/target/CRM-0.0.1-SNAPSHOT.jar`
   - Add environment variables:
     - `DB_URL`: (Use Render PostgreSQL internal URL)
     - `DB_USERNAME`: (From Render PostgreSQL)
     - `DB_PASSWORD`: (From Render PostgreSQL)
     - `JWT_SECRET`: Your secret key
     - `JWT_EXPIRATION`: 86400000

#### Frontend Deployment on Vercel

1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL

### Option 2: Deploy to Railway

#### Backend + Database on Railway

1. Go to [Railway](https://railway.app/)
2. Create new project
3. Add PostgreSQL database
4. Add your GitHub repository
5. Configure:
   - Root Directory: `backend/CRM/project/proj`
   - Build Command: `./mvnw clean package -DskipTests`
   - Start Command: `java -jar target/CRM-0.0.1-SNAPSHOT.jar`
6. Add environment variables (same as Render)

#### Frontend on Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Import from GitHub
3. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. Add environment variable:
   - `VITE_API_URL`: Your Railway backend URL

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer

## 📝 Environment Variables

### Backend
- `DB_URL` - Database connection URL
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRATION` - Token expiration time in milliseconds

### Frontend
- `VITE_API_URL` - Backend API base URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👥 Authors

- Your Name

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- Tailwind CSS

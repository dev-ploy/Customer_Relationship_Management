# CRM Application - Deployment Guide

## 🚀 Quick Start - Full Stack Deployment

This guide will help you deploy the CRM application for recruiters and production use.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Docker Deployment (Recommended)](#docker-deployment-recommended)
- [Cloud Deployment Options](#cloud-deployment-options)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Docker & Docker Compose** (v20.10+)
- **Java 17+** (for local development)
- **Maven 3.8+** (for local development)
- **MySQL 8.0+** (if not using Docker)
- **Git**

### Optional
- **Node.js & npm** (for frontend)
- **Postman** (for API testing)

---

## 🏠 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/dev-ploy/Customer_Relationship_Management.git
cd Customer_Relationship_Management/backend
```

### 2. Setup MySQL Database
```sql
CREATE DATABASE crm_db;
CREATE USER 'crm_user'@'localhost' IDENTIFIED BY 'crm_pass';
GRANT ALL PRIVILEGES ON crm_db.* TO 'crm_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configure Application
Edit `CRM/project/proj/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/crm_db
spring.datasource.username=root
spring.datasource.password=your_password
```

### 4. Build and Run
```bash
cd CRM/project/proj
mvn clean install
mvn spring-boot:run
```

The backend will be available at: **http://localhost:8080**

---

## 🐳 Docker Deployment (Recommended)

### Option 1: Using Docker Compose (Full Stack)

#### 1. Navigate to Backend Directory
```bash
cd Customer_Relationship_Management/backend
```

#### 2. Start All Services
```bash
docker-compose up -d
```

This will start:
- MySQL Database on port **3306**
- Spring Boot Backend on port **8080**

#### 3. Verify Services
```bash
# Check running containers
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f mysql
```

#### 4. Stop Services
```bash
docker-compose down

# To remove volumes as well
docker-compose down -v
```

### Option 2: Manual Docker Build

#### Build Backend Image
```bash
cd CRM/project/proj
docker build -t crm-backend:latest .
```

#### Run MySQL Container
```bash
docker run -d \
  --name crm-mysql \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=crm_db \
  -p 3306:3306 \
  mysql:8.0
```

#### Run Backend Container
```bash
docker run -d \
  --name crm-backend \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e DATABASE_URL=jdbc:mysql://host.docker.internal:3306/crm_db \
  -e DB_USERNAME=root \
  -e DB_PASSWORD=root123 \
  --link crm-mysql \
  crm-backend:latest
```

---

## ☁️ Cloud Deployment Options

### 🌐 Deploy on Render.com (FREE)

#### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. Deploy MySQL Database
- Go to [Render Dashboard](https://dashboard.render.com/)
- Click **New +** → **MySQL**
- Set Database Name: `crm_db`
- Note down the **Internal Database URL**

#### 3. Deploy Backend
- Click **New +** → **Web Service**
- Connect your GitHub repository
- Configure:
  - **Name**: crm-backend
  - **Root Directory**: `backend/CRM/project/proj`
  - **Build Command**: `mvn clean package -DskipTests`
  - **Start Command**: `java -jar target/CRM-0.0.1-SNAPSHOT.jar`
  - **Environment**: Docker or Native

#### 4. Add Environment Variables
```
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=<your-render-mysql-url>
DB_USERNAME=<database-username>
DB_PASSWORD=<database-password>
JWT_SECRET=89766330041286159616c0a21a9bf2ba
CORS_ORIGINS=https://your-frontend-domain.com
```

#### 5. Deploy
- Click **Create Web Service**
- Wait for deployment (5-10 minutes)
- Your backend will be live at: `https://crm-backend.onrender.com`

---

### 🎨 Deploy Frontend on Vercel (FREE & Recommended)

#### 1. Push Frontend to GitHub (if not already)
```bash
cd Customer_Relationship_Management
git add frontend
git commit -m "Add frontend for deployment"
git push origin main
```

#### 2. Deploy on Vercel
- Go to [Vercel Dashboard](https://vercel.com/)
- Click **Add New** → **Project**
- Import your GitHub repository
- Configure:
  - **Framework Preset**: Vite
  - **Root Directory**: `frontend`
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

#### 3. Add Environment Variables
In Vercel dashboard, go to **Settings** → **Environment Variables**:
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
VITE_APP_NAME=Customer Relationship Management
```

#### 4. Deploy
- Click **Deploy**
- Your frontend will be live at: `https://your-app.vercel.app`

#### 5. Update Backend CORS
Update your backend environment variable on Render:
```
CORS_ORIGINS=https://your-app.vercel.app
```

---

### 🌐 Deploy Frontend on Netlify (Alternative)

#### 1. Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from frontend directory
cd Customer_Relationship_Management/frontend
netlify deploy --prod
```

#### 2. Or Deploy via GitHub
- Go to [Netlify](https://app.netlify.com/)
- Click **Add new site** → **Import an existing project**
- Connect GitHub repository
- Configure:
  - **Base directory**: `frontend`
  - **Build command**: `npm run build`
  - **Publish directory**: `frontend/dist`

#### 3. Environment Variables
In Netlify dashboard:
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

Your frontend will be live at: `https://your-app.netlify.app`

---

### 🚀 Deploy on Railway.app

#### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

#### 2. Login and Initialize
```bash
railway login
cd Customer_Relationship_Management/backend
railway init
```

#### 3. Add MySQL Database
```bash
railway add mysql
```

#### 4. Deploy Backend
```bash
railway up
```

#### 5. Set Environment Variables
```bash
railway variables set SPRING_PROFILES_ACTIVE=prod
railway variables set JWT_SECRET=89766330041286159616c0a21a9bf2ba
```

---

### 🔵 Deploy on AWS (EC2 + RDS)

#### 1. Launch EC2 Instance
- Instance Type: t2.micro (Free Tier)
- OS: Ubuntu 22.04
- Security Group: Open ports 22, 8080

#### 2. Setup RDS MySQL
- Engine: MySQL 8.0
- Instance Class: db.t3.micro
- Storage: 20 GB
- Note endpoint and credentials

#### 3. Connect to EC2 and Setup
```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Java 17
sudo apt update
sudo apt install openjdk-17-jdk -y

# Install Docker (optional)
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker ubuntu

# Clone repository
git clone https://github.com/dev-ploy/Customer_Relationship_Management.git
cd Customer_Relationship_Management/backend/CRM/project/proj
```

#### 4. Configure and Run
```bash
# Create application-prod.properties with RDS endpoint
nano src/main/resources/application-prod.properties

# Build
./mvnw clean package -DskipTests

# Run as background service
nohup java -jar target/CRM-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=prod \
  --DATABASE_URL=jdbc:mysql://your-rds-endpoint:3306/crm_db \
  --DB_USERNAME=admin \
  --DB_PASSWORD=your-password \
  > app.log 2>&1 &
```

#### 5. Setup Nginx Reverse Proxy (Optional)
```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/crm
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/crm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### 🌊 Deploy on DigitalOcean

#### 1. Create Droplet
- Image: Docker on Ubuntu
- Size: Basic ($6/month)
- Add SSH key

#### 2. SSH and Deploy
```bash
ssh root@your-droplet-ip

# Clone repository
git clone https://github.com/dev-ploy/Customer_Relationship_Management.git
cd Customer_Relationship_Management/backend

# Deploy with Docker Compose
docker-compose up -d

# Check status
docker-compose ps
```

#### 3. Setup Domain (Optional)
- Point your domain A record to droplet IP
- Install Let's Encrypt SSL
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🔧 Environment Variables

### Development (.env)
```env
SPRING_PROFILES_ACTIVE=dev
DATABASE_URL=jdbc:mysql://localhost:3306/crm_db
DB_USERNAME=root
DB_PASSWORD=root123
JWT_SECRET=89766330041286159616c0a21a9bf2ba
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:3000
```

### Production (.env.prod)
```env
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=jdbc:mysql://your-db-host:3306/crm_db
DB_USERNAME=your_username
DB_PASSWORD=your_secure_password
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRATION=86400000
CORS_ORIGINS=https://your-frontend-domain.com
```

---

## 🧪 API Testing

### Health Check
```bash
curl http://localhost:8080/actuator/health
```

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 📊 Monitoring

### View Logs (Docker)
```bash
# Backend logs
docker logs -f crm-backend

# MySQL logs
docker logs -f crm-mysql
```

### Health Endpoints
- Health: `http://localhost:8080/actuator/health`
- Info: `http://localhost:8080/actuator/info`

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080
# Or on Windows
netstat -ano | findstr :8080

# Kill process
kill -9 <PID>
```

### Database Connection Issues
```bash
# Test MySQL connection
mysql -h localhost -u root -p crm_db

# Check if MySQL is running (Docker)
docker ps | grep mysql
docker logs crm-mysql
```

### Build Issues
```bash
# Clean build
mvn clean install -U

# Skip tests
mvn clean package -DskipTests
```

### Docker Issues
```bash
# Rebuild images
docker-compose build --no-cache

# Remove all containers and volumes
docker-compose down -v

# Check Docker logs
docker-compose logs --tail=100
```

---

## 📝 Important URLs for Recruiters

After deployment, share these URLs:

- **Backend API**: `https://your-domain.com` or `http://your-ip:8080`
- **API Documentation**: `https://your-domain.com/swagger-ui.html` (if enabled)
- **Health Check**: `https://your-domain.com/actuator/health`
- **GitHub Repository**: https://github.com/dev-ploy/Customer_Relationship_Management

### Demo Credentials
```
Email: demo@crm.com
Password: demo123
```

---

## 🎯 Production Checklist

- [ ] Change JWT secret in production
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL
- [ ] Setup proper CORS origins
- [ ] Configure backup for database
- [ ] Setup monitoring and alerting
- [ ] Enable application logs
- [ ] Setup CI/CD pipeline
- [ ] Configure firewall rules
- [ ] Setup domain name
- [ ] Add API rate limiting
- [ ] Enable actuator endpoints selectively

---

## 📞 Support

For issues or questions:
- GitHub Issues: [Create an Issue](https://github.com/dev-ploy/Customer_Relationship_Management/issues)
- Email: your-email@example.com

---

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ for demonstration purposes**

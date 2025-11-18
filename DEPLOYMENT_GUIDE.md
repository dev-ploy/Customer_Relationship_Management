# 🚀 Complete Deployment Guide - CRM Application

This guide will walk you through deploying your CRM application using **100% free and open-source tools**.

## 📦 What We'll Use (All Free!)

- **GitHub** - Code repository (Free)
- **Render** - Backend + Database hosting (Free tier)
- **Vercel** - Frontend hosting (Free tier)

---

## 🎯 Step 1: Push Code to GitHub

### 1.1 Initialize Git Repository

Open PowerShell in your project root directory:

```powershell
cd E:\Customer_Relationship_Management

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: CRM application with React frontend and Spring Boot backend"

# Add your GitHub remote repository
git remote add origin https://github.com/dev-ploy/Customer_Relationship_Management.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🗄️ Step 2: Deploy Database on Render

### 2.1 Create Render Account
1. Go to [Render.com](https://render.com/)
2. Sign up with your GitHub account (Free)

### 2.2 Create PostgreSQL Database
1. Click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `crm-database`
   - **Database**: `crm_db`
   - **User**: `crm_user` (auto-generated)
   - **Region**: Choose closest to you
   - **Instance Type**: **Free**
3. Click **"Create Database"**
4. Wait for deployment (2-3 minutes)
5. **Save these credentials** (you'll need them):
   - Internal Database URL
   - External Database URL
   - Username
   - Password

---

## 🔧 Step 3: Deploy Backend on Render

### 3.1 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select `Customer_Relationship_Management` repository

### 3.2 Configure Build Settings
```
Name: crm-backend
Region: Same as database
Branch: main
Root Directory: backend/CRM/project/proj
Runtime: Java
Build Command: ./mvnw clean package -DskipTests
Start Command: java -Dserver.port=$PORT -Dspring.profiles.active=prod -jar target/CRM-0.0.1-SNAPSHOT.jar
Instance Type: Free
```

### 3.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```
DB_URL = <Your Render PostgreSQL Internal URL>
Example: jdbc:postgresql://dpg-xxxxx.oregon-postgres.render.com/crm_db

DB_USERNAME = <Your Render DB Username>

DB_PASSWORD = <Your Render DB Password>

JWT_SECRET = 89766330041286159616c0a21a9bf2ba

JWT_EXPIRATION = 86400000

SPRING_PROFILES_ACTIVE = prod
```

⚠️ **Important**: Replace MySQL driver with PostgreSQL in your configuration!

### 3.4 Update Backend for PostgreSQL

You need to update the `pom.xml` to use PostgreSQL instead of MySQL.

Replace MySQL dependency:
```xml
<!-- MySQL Driver -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>
```

With PostgreSQL:
```xml
<!-- PostgreSQL Driver -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

Update `application-prod.properties`:
```properties
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

Commit and push changes:
```powershell
git add .
git commit -m "Update to PostgreSQL for production deployment"
git push
```

### 3.5 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for build and deployment
3. Your backend URL will be: `https://crm-backend-xxxx.onrender.com`

---

## 🎨 Step 4: Deploy Frontend on Vercel

### 4.1 Create Vercel Account
1. Go to [Vercel.com](https://vercel.com/)
2. Sign up with GitHub (Free)

### 4.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Import `Customer_Relationship_Management` repository
3. Configure:

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4.3 Add Environment Variable
1. Go to **Settings** → **Environment Variables**
2. Add variable:

```
Name: VITE_API_URL
Value: https://crm-backend-xxxx.onrender.com/api
```

Replace `xxxx` with your actual Render backend URL (without trailing slash)

### 4.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your frontend URL: `https://your-project.vercel.app`

---

## ✅ Step 5: Test Your Deployment

### 5.1 Access Your Application
1. Open your Vercel URL: `https://your-project.vercel.app`
2. You should see the CRM login page

### 5.2 Test Signup & Login
1. Click **"Sign Up"**
2. Create a new account
3. Login with your credentials
4. Try adding/editing/deleting customers

### 5.3 Verify Backend Connection
- Check Render dashboard logs for API requests
- Check browser DevTools → Network tab for API calls

---

## 🐛 Troubleshooting

### Backend Issues

**Build Fails:**
```powershell
# Check logs in Render dashboard
# Ensure all dependencies are in pom.xml
# Verify Java version is 17
```

**Database Connection Error:**
- Verify DB_URL format: `jdbc:postgresql://host/database`
- Check username and password
- Ensure database is running

**CORS Issues:**
Add to your backend CORS configuration:
```java
@CrossOrigin(origins = {"https://your-project.vercel.app", "http://localhost:5173"})
```

### Frontend Issues

**API Calls Failing:**
- Check VITE_API_URL environment variable
- Ensure backend URL is correct
- Check browser console for errors

**Build Fails:**
```powershell
# Clear node_modules and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🔒 Security Best Practices

1. **Change JWT Secret:**
   ```powershell
   # Generate new secret
   openssl rand -base64 32
   ```

2. **Use Strong Database Password:**
   - Render generates secure passwords automatically

3. **Enable HTTPS:**
   - Both Render and Vercel provide free SSL certificates

4. **Add CORS Configuration:**
   - Only allow your frontend domain

---

## 📊 Free Tier Limits

### Render Free Tier:
- ✅ 750 hours/month (more than enough)
- ✅ Spins down after 15 min of inactivity
- ✅ Takes ~30s to wake up
- ✅ PostgreSQL: 1GB storage

### Vercel Free Tier:
- ✅ Unlimited personal projects
- ✅ 100GB bandwidth/month
- ✅ Instant deployment
- ✅ Automatic HTTPS

---

## 🎉 Alternative Free Options

### Railway (Alternative to Render)
- Free $5 credit/month
- PostgreSQL included
- Same process as Render

### Netlify (Alternative to Vercel)
- 100GB bandwidth/month
- Continuous deployment
- Similar to Vercel

### PlanetScale (Free MySQL)
- 5GB storage
- 1 billion row reads/month
- Better for MySQL users

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed and running
- [ ] Database connected successfully
- [ ] Frontend deployed and accessible
- [ ] Signup/Login working
- [ ] CRUD operations working
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Domain (optional) configured

---

## 🔄 Continuous Deployment

Both Render and Vercel automatically redeploy when you push to GitHub:

```powershell
# Make changes
git add .
git commit -m "Your changes"
git push

# Automatic deployment happens!
# Check deployment status in dashboards
```

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Spring Boot**: https://spring.io/guides
- **React**: https://react.dev/

---

## 🎊 Congratulations!

Your CRM application is now live and accessible worldwide! 🌍

**Share your deployed URLs:**
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://crm-backend-xxxx.onrender.com/api`

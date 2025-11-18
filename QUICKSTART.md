# Quick Start Guide

## 🚀 Deploy in 3 Steps

### Step 1: Push to GitHub (5 minutes)
```powershell
# Run the deployment script
.\deploy.ps1
```

Or manually:
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/dev-ploy/Customer_Relationship_Management.git
git push -u origin main
```

### Step 2: Deploy Backend + Database (10 minutes)

1. **Go to [Render.com](https://render.com/)** (Sign up free with GitHub)

2. **Create PostgreSQL Database:**
   - Click "New +" → "PostgreSQL"
   - Name: `crm-database`
   - Free tier
   - Save the credentials!

3. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Configure:
     ```
     Root Directory: backend/CRM/project/proj
     Build Command: ./mvnw clean package -DskipTests
     Start Command: java -Dserver.port=$PORT -jar target/CRM-0.0.1-SNAPSHOT.jar
     ```
   - Add Environment Variables:
     ```
     DB_URL = <Your PostgreSQL Internal URL>
     DB_USERNAME = <Your DB Username>
     DB_PASSWORD = <Your DB Password>
     JWT_SECRET = 89766330041286159616c0a21a9bf2ba
     ```

4. **Important:** Update `pom.xml` to use PostgreSQL:
   - Replace MySQL dependency with PostgreSQL
   - See DEPLOYMENT_GUIDE.md for details

### Step 3: Deploy Frontend (5 minutes)

1. **Go to [Vercel.com](https://vercel.com/)** (Sign up free with GitHub)

2. **Import Project:**
   - Click "Add New" → "Project"
   - Select your repo
   - Configure:
     ```
     Framework: Vite
     Root Directory: frontend
     Build Command: npm run build
     Output Directory: dist
     ```

3. **Add Environment Variable:**
   ```
   VITE_API_URL = https://your-backend.onrender.com/api
   ```

4. **Deploy!**

### ✅ Done!

Your app is live at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`

## 📖 Need Help?

Read the complete guide: **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

## 💡 Alternative Free Options

### For Backend + Database:
- **Railway**: https://railway.app/ (Free $5/month credit)
- **Fly.io**: https://fly.io/ (Free tier available)
- **Cyclic**: https://cyclic.sh/ (Free tier)

### For Frontend:
- **Netlify**: https://netlify.com/ (Free tier)
- **Cloudflare Pages**: https://pages.cloudflare.com/ (Free)
- **GitHub Pages**: Free but requires static site

### For Database Only:
- **Supabase**: https://supabase.com/ (Free PostgreSQL)
- **PlanetScale**: https://planetscale.com/ (Free MySQL)
- **ElephantSQL**: https://www.elephantsql.com/ (Free PostgreSQL)

## 🎯 Local Development

```powershell
# Backend
cd backend/CRM/project/proj
./mvnw spring-boot:run

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 🐳 Docker Deployment (Optional)

```powershell
# Build and run everything with Docker
docker-compose up --build
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Database: localhost:3306

## 🔄 Update Deployment

```powershell
git add .
git commit -m "Your changes"
git push
```

Both Render and Vercel auto-deploy on push! 🎉

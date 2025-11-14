# Quick Start Guide

## Backend Setup (5 minutes)

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add:

- Your PostgreSQL database URL
- AWS Cognito credentials
- AWS S3 credentials

### 3. Database Setup

```bash
# Run migrations
npm run prisma:migrate

# Generate Prisma Client
npm run prisma:generate

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

### 4. Start Development Server

```bash
npm run dev
```

Server starts at: `http://localhost:5000`

### 5. Test the API

Health Check:

```bash
curl http://localhost:5000/api/v1/health
```

Get Projects (Public):

```bash
curl http://localhost:5000/api/v1/projects
```

## Next Steps

1. **Set up AWS Cognito** - Create a User Pool and configure authentication
2. **Set up AWS S3** - Create a bucket for media storage
3. **Create admin user** - Use Cognito console to create your first admin user
4. **Test protected endpoints** - Use Postman/Thunder Client with Cognito JWT token

## Useful Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Database
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open database GUI
npm run prisma:generate  # Generate Prisma Client

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Production
npm run build            # Build TypeScript
npm start                # Start production server
```

## Project Status

✅ **Completed:**

- Backend structure
- Database schema (Prisma)
- Authentication middleware (AWS Cognito)
- Projects module (full CRUD)
- Blogs module (full CRUD)
- About module
- Services module
- S3 file upload utilities
- Error handling & logging

🚧 **Todo:**

- Complete remaining modules (Skills, Resume components, Testimonials, FAQ, Trash)
- Frontend (Next.js)
- API documentation
- Tests
- Deployment scripts

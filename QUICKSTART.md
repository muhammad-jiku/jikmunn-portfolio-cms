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

⚠️ **Important:** Recent schema updates require migration.

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations (ensure DATABASE_URL is configured in .env)
npm run prisma:migrate

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

**Recent Schema Changes:**

- Projects: Added `techStack` and `tools` JSON fields
- Blogs: Added `topic` and `status` fields
- New `BlogStatus` enum
- Updated `ProjectStatus` enum values
- New `Maintenance` model
- Public/authenticated route separation

**Recent Code Quality Updates:**

- ✅ All TypeScript errors resolved (55+ fixes applied)
- ✅ Consistent error handling patterns
- ✅ Type-safe middleware implementations
- ✅ Production-ready code quality

See `SCHEMA_UPDATES.md` for details.

### 4. Start Development Server

```bash
npm run dev
```

Server starts at: `http://localhost:5000`

#### 5. Test the API

Health Check:

```bash
curl http://localhost:5000/api/v1/health
```

Get Public Projects (PRODUCTION status only, no auth required):

```bash
curl http://localhost:5000/api/v1/projects/public
```

Get All Projects (requires JWT token):

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/api/v1/projects
```

## Helpful Resources

- **API Documentation:** `http://localhost:5000/api/docs` (Swagger UI)
- **Testing Guide:** See `TESTING.md` for Postman/cURL examples
- **Schema Updates:** See `SCHEMA_UPDATES.md` for migration details
- **Server README:** See `server/README.md` for detailed API documentation

## Environment Variables

Key variables needed in `.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_cms

# AWS Cognito
AWS_COGNITO_USER_POOL_ID=your-pool-id
AWS_COGNITO_CLIENT_ID=your-client-id
AWS_REGION=ap-southeast-1
AWS_COGNITO_ISSUER=https://cognito-idp.{region}.amazonaws.com/{userPoolId}

# AWS S3
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

See `server/.env.example` for complete list.

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

✅ **Backend: 100% Complete**

**All Features Implemented:**

- ✅ All 10 content modules (Projects, Blogs, About, Services, Skills, Resume, Testimonials, FAQ, Trash)
- ✅ AWS Cognito authentication with role-based access
- ✅ AWS S3 file upload utilities
- ✅ Comprehensive error handling & logging (Winston + Morgan)
- ✅ Rate limiting & security (Helmet, CORS)
- ✅ Automated cron jobs (daily trash cleanup)
- ✅ Swagger/OpenAPI documentation at `/api/docs`
- ✅ Jest testing framework with unit tests
- ✅ Soft delete with 31-day trash retention
- ✅ Maintenance mode API
- ✅ Development-only endpoints for testing
- ✅ Structured tech stack tracking for projects
- ✅ Blog status and topic categorization

🚧 **Pending:**

- Database migration (configure .env with production credentials)
- Frontend implementation (Next.js)

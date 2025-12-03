# Quick Start Guide

**🎉 Both Backend and Frontend are 100% Complete!**

> 📖 **For detailed implementation guides:**
>
> - [Backend Implementation Phases](docs/Backend_Implementation_Phases.md) - 12 phases, 76 API routes ✅
> - [Frontend Implementation Phases](docs/Frontend_Implementation_Phases.md) - 13 phases, 74 requirements ✅
> - [NFR Verification](docs/NFR_Verification.md) - Non-functional requirements compliance ✅

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

- ✅ All TypeScript errors resolved
- ✅ Eliminated duplicate code (ApiError, pagination helpers, interfaces)
- ✅ Consolidated all utilities into `utils/` directory
- ✅ Removed unused `constants/`, `helpers/`, `interfaces/`, `errors/` directories
- ✅ Updated all import paths to use centralized `utils/`
- ✅ TypeScript compilation: 100% clean

### 4. Git Hooks Setup (Optional but Recommended)

⚡ **Husky + Lint-staged** for automatic code quality checks.

```bash
# Install dependencies (from root directory)
cd ..
npm install

# Husky hooks are now active!
```

> 📖 See [Husky Setup Guide](HUSKY_SETUP.md) for details.

**What you get:**

- **Pre-commit:** Auto-lint and format staged files
- **Pre-push:** TypeScript type checking before push
- **Prevents:** Committing code with errors or bad formatting

**Test it:**

```bash
# Make a change and commit
git add .
git commit -m "test: husky hooks"
# Pre-commit hook runs automatically!
```

### 4. Seed Database with Test Data

Populate your database with sample data:

```bash
npm run seed
```

This will populate your database with test data from `server/prisma/seed-data/`:

- ✅ about.json
- ✅ blogs.json
- ✅ faq.json
- ✅ projects.json
- ✅ resume.json (summary, education, experience, achievements, references)
- ✅ services.json
- ✅ skills.json
- ✅ testimonials.json

The seed script (`server/prisma/seed.ts`) automatically:

- Cleans existing data
- Loads all JSON files
- Creates database records with relationships
- Provides detailed console output
- ✅ Consistent error handling patterns
- ✅ Type-safe middleware implementations
- ✅ Production-ready code quality

See `SCHEMA_UPDATES.md` for details.

### 5. Start Development Server

```bash
npm run dev
```

Server runs on: `http://localhost:5000`

Test it:

```bash
curl http://localhost:5000/api/v1/health
```

### 6. Test API Endpoints

**Three Options:**

**Option 1: Swagger UI (Recommended)** 🌟

```bash
# Server should be running
# Open in browser: http://localhost:5000/api/docs
```

**Option 2: Postman**

1. Import endpoints from Swagger documentation
2. Set up environment with ID token (from Cognito)
3. Test endpoints manually

**Option 3: Automated Tests**

```bash
npm run test              # Run all tests
npm run test:coverage     # With coverage report
npm run test:watch        # Watch mode
```

📖 **For detailed testing guide, see [TESTING.md](./TESTING.md)**

---

## 🚀 Quick Testing Workflow

1. **Seed database**: `npm run seed`
2. **Start server**: `npm run dev`
3. **Open Swagger**: http://localhost:5000/api/docs
4. **Test public endpoints** (no auth needed):
   - GET /api/v1/projects/public
   - GET /api/v1/blogs/public
   - GET /api/v1/about
   - GET /api/v1/skills
   - GET /api/v1/services
5. **Get ID token** from AWS Cognito (use IdToken, not AccessToken)
6. **Authorize in Swagger** (click 🔒 button, enter: `Bearer YOUR_TOKEN`)
7. **Test protected endpoints**:
   - POST /api/v1/projects
   - PUT /api/v1/projects/{id}
   - DELETE /api/v1/projects/{id}
8. **Test trash system**:
   - GET /api/v1/trash
   - POST /api/v1/trash/{id}/restore

---

## 🛠️ Development Commands

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
npm run seed             # Seed database with test data

# Database
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open database GUI
npm run prisma:generate  # Generate Prisma Client

# Testing
npm run test             # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

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

✅ **Frontend: 100% Complete**

**All Features Implemented:**

- ✅ 13 development phases completed (65 functional requirements)
- ✅ 9 non-functional requirements verified (NFR001-NFR009)
- ✅ Authentication with AWS Cognito (login, register, RBAC, protected routes)
- ✅ Complete dashboard with charts, stats, and real-time updates
- ✅ Full CRUD for all 10 content modules
- ✅ Rich text editing, file uploads, drag-drop
- ✅ Dark/Light/System theme modes
- ✅ Real-time features with Socket.IO
- ✅ Performance optimization (ISR, SWR, code splitting, Web Vitals)
- ✅ SEO optimization (metadata, sitemap, Open Graph)
- ✅ Testing: 58 unit tests, 4 E2E specs
- ✅ Deployment ready: AWS Amplify, GitHub Actions CI/CD
- ✅ Error tracking setup (Sentry/CloudWatch)
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Mobile-first responsive design

**🎉 Total: 74/74 Requirements Complete (100%)**

## Next Steps

Now that both backend and frontend are 100% complete:

1. **Deploy Backend** - Set up production server with PostgreSQL and AWS services
2. **Deploy Frontend** - Follow `client/DEPLOYMENT.md` for AWS Amplify deployment
3. **Configure Production** - Set up production environment variables
4. **Enable Monitoring** - Set up Sentry/CloudWatch error tracking
5. **Performance Testing** - Run Lighthouse audits and optimize
6. **Load Testing** - Test scalability with production data
7. **Documentation Review** - Update any deployment-specific documentation

- Database migration (configure .env with production credentials)
- Frontend implementation (Next.js)

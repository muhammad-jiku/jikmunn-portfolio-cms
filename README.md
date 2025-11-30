# Jikmunn Portfolio CMS

A full-stack, device-responsive Content Management System for managing portfolio projects, blogs, services, skills, resume, testimonials, and FAQs.

## 🏗️ Project Structure

```
jikmunn-portfolio-cms/
├── .husky/                        # Git hooks (Husky)
├── docs/                          # Documentation
│   ├── Portfolio_CMS_Backend_PRD.md
│   ├── Backend_Implementation_Phases.md   # 🔥 12-phase backend guide
│   ├── Portfolio_CMS_Frontend_PRD.md
│   ├── Frontend_Implementation_Phases.md  # 🔥 13-phase frontend guide
│   └── Project requirements.txt
├── server/                        # Backend (Node.js + Express + Prisma)
│   ├── src/
│   │   ├── app.ts                    # Express app configuration
│   │   ├── index.ts                  # Server startup
│   │   ├── config/                   # Configuration files
│   │   │   ├── aws.config.ts
│   │   │   ├── cognito.config.ts
│   │   │   ├── database.config.ts
│   │   │   └── index.config.ts
│   │   ├── utils/                    # Utilities (S3, logger, helpers)
│   │   │   ├── helpers.util.ts
│   │   │   ├── logger.util.ts
│   │   │   ├── pagination.util.ts
│   │   │   ├── response.util.ts
│   │   │   └── s3.util.ts
│   │   └── app/
│   │       ├── middleware/           # Auth, validation, error handling
│   │       ├── modules/              # Feature modules
│   │       │   ├── projects/
│   │       │   ├── blogs/
│   │       │   ├── about/
│   │       │   ├── services/
│   │       │   ├── skills/
│   │       │   ├── resume/
│   │       │   ├── testimonials/
│   │       │   ├── faq/
│   │       │   ├── trash/
│   │       │   └── common/           # Shared services
│   │       └── routes/               # API routes
│   ├── prisma/
│   │   └── schema.prisma             # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── client/                        # Frontend (Next.js - Coming soon)
```

## 📚 Documentation

### Quick Reference

- **[Backend Implementation Phases](docs/Backend_Implementation_Phases.md)** - Complete 12-phase backend architecture guide (76 API routes)
- **[Frontend Implementation Phases](docs/Frontend_Implementation_Phases.md)** - Comprehensive 13-phase frontend roadmap (77 requirements)
- **[Backend PRD](docs/Portfolio_CMS_Backend_PRD.md)** - Detailed backend requirements
- **[Frontend PRD](docs/Portfolio_CMS_Frontend_PRD.md)** - Detailed frontend requirements
- **[Backend API Documentation](server/README.md)** - All 76 API endpoints with examples
- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Testing Guide](TESTING.md)** - Comprehensive API testing workflow
- **[Husky Setup Guide](HUSKY_SETUP.md)** - Git hooks for code quality enforcement

## 🛠️ Development Workflow

**Git Hooks (Husky)** - Automated code quality checks enabled!

> 📖 See [Husky Setup Guide](HUSKY_SETUP.md) for complete configuration details.

- ✅ **Pre-commit:** Auto-lint and format code (ESLint + Prettier)
- ✅ **Pre-push:** TypeScript type checking (server + client)
- ✅ **Monorepo Scripts:** Run dev/build/test for both projects

```bash
# Run both server and client concurrently
npm run dev

# Build entire project
npm run build

# Lint everything
npm run lint

# Type check both projects
npm run type-check
```

## 🎉 Project Status

**Backend: 100% Complete** - All 12 phases implemented and production-ready!

> 📖 See [Backend Implementation Phases](docs/Backend_Implementation_Phases.md) for detailed breakdown of all completed features.

- ✅ **10 Content Modules:** Projects, Blogs, About, Services, Skills, Resume (5 sub-modules), Testimonials, FAQ, Trash
- ✅ **Authentication:** AWS Cognito with role-based access control
- ✅ **Infrastructure:** Logging, rate limiting, cron jobs, error handling
- ✅ **Documentation:** Swagger/OpenAPI at `/api/docs`
- ✅ **Testing:** Jest framework with unit tests
- ✅ **Security:** Helmet, CORS, JWT verification, soft delete

## 🚀 Tech Stack

### Backend

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** AWS Cognito (JWT)
- **Storage:** AWS S3
- **Validation:** Zod
- **Logging:** Winston & Morgan
- **Security:** Helmet, CORS, Rate Limiting

### Frontend (In Progress)

- **Framework:** Next.js 16+ (App Router)
- **Styling:** Tailwind CSS v4
- **State Management:** Redux Toolkit with RTK Query
- **UI Components:** Shadcn/ui
- **Theme:** Dark/Light mode with Next Themes
- **Deployment:** AWS Amplify Gen 2

> 📖 See [Frontend Implementation Phases](docs/Frontend_Implementation_Phases.md) for complete 13-phase development roadmap.

## 📋 Features

### ✅ Completed (Backend)

- [x] Project structure setup with TypeScript
- [x] Prisma schema with all modules
- [x] AWS Cognito authentication & JWT verification
- [x] Role-based access control (SUPER_ADMIN, ADMIN, AUTHOR, EDITOR)
- [x] AWS S3 file upload utilities
- [x] Global error handling with Prisma/Zod support
- [x] API rate limiting & security middleware
- [x] Winston/Morgan logging
- [x] **Projects module** - Full CRUD + image/video upload
- [x] **Blogs module** - Full CRUD + pagination + tags
- [x] **About module** - Statistics management
- [x] **Services module** - Full CRUD
- [x] **Skills module** - Full CRUD with progress indicators
- [x] **Resume module** - All 5 sub-modules (Summary, Education, Experience, Achievements, References)
- [x] **Testimonials module** - Full CRUD with platform support (Upwork/LinkedIn)
- [x] **FAQ module** - Ordered Q&A pairs
- [x] **Trash module** - Restore/permanent delete with expiration handling
- [x] Automated cron job for cleaning expired trash (daily at 2:00 AM)
- [x] Soft delete with 31-day trash retention
- [x] **General Backend Features:**
  - Comprehensive logging (Winston with file rotation)
  - HTTP request logging (Morgan)
  - Rate limiting (configurable per IP)
  - Security headers (Helmet)
  - CORS configuration
  - API versioning (/api/v1)
  - Compression middleware
  - Global error handling
- [x] **Production Readiness (Phase 12):**
  - Swagger/OpenAPI documentation (available at /api/docs)
  - Jest testing framework setup
  - Unit tests for utilities
  - .env.example configuration template
- [x] **Development Tools:**
  - Development-only endpoints for user role management (NODE_ENV isolated)
  - Maintenance mode API for displaying system status messages
- [x] **Recent Schema Updates:**
  - BlogStatus enum (IN_PROGRESS, UPDATED, DEVELOPMENT, PRODUCTION)
  - ProjectStatus enum updated (IN_PROGRESS, DEVELOPMENT, PRODUCTION, UPDATED)
  - Tech stack structure for projects (JSON field with categorized technologies)
  - Development tools tracking for projects (JSON field)
  - Blog topic and status fields for better content organization
  - Public/authenticated route separation (/public for unauthenticated users)
- [x] **Code Quality:**
  - All TypeScript errors resolved across codebase
  - Consistent error handling patterns (catchAsync wrapper)
  - Proper middleware return types and type safety
  - Unused parameter warnings fixed
  - Production-ready code quality

### 🚧 In Progress

- [ ] Frontend implementation (Next.js)
- [ ] Database migration with production credentials

### 📹 Upcoming

- [ ] AWS deployment setup
- [ ] Integration & E2E tests
- [ ] CI/CD pipeline

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database
- AWS account (Cognito + S3)

### Backend Setup

1. Navigate to server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure `.env` with your credentials:
   - Database URL
   - AWS Cognito (User Pool ID, Client ID, Region)
   - AWS S3 (Bucket, Access Key, Secret Key)

5. Run database migrations:

```bash
npm run prisma:migrate
```

6. Seed database with test data:

```bash
npm run seed
```

This populates your database with sample data from `server/prisma/seed-data/` (about, blogs, faq, projects, resume, services, skills, testimonials).

7. Start development server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

API documentation available at `http://localhost:5000/api/docs`

### API Endpoints

**Base URL:** `http://localhost:5000/api/v1`

#### Public Endpoints (No Authentication Required)

- `GET /health` - Health check
- `GET /projects/public` - Get all PRODUCTION projects (unauthenticated)
- `GET /projects/public/:id` - Get PRODUCTION project by ID (unauthenticated)
- `GET /blogs/public` - Get all PRODUCTION blogs (unauthenticated)
- `GET /blogs/public/:id` - Get PRODUCTION blog by ID (unauthenticated)
- `GET /about` - Get about statistics
- `GET /services` - Get all services
- `GET /services/:id` - Get service by ID
- `GET /skills` - Get all skills
- `GET /skills/:id` - Get skill by ID
- `GET /resume/summary` - Get resume summary
- `GET /resume/education` - Get all education
- `GET /resume/experience` - Get all experience
- `GET /resume/achievements` - Get all achievements
- `GET /resume/references` - Get all references
- `GET /testimonials` - Get all testimonials
- `GET /testimonials/:id` - Get testimonial by ID
- `GET /faq` - Get all FAQs (ordered)
- `GET /faq/:id` - Get FAQ by ID

#### Authenticated Endpoints (Requires ID Token)

- `GET /projects` - Get all projects (all statuses, requires authentication)
- `GET /projects/:id` - Get project by ID (all statuses, requires authentication)
- `GET /blogs` - Get all blogs (all statuses, requires authentication)
- `GET /blogs/:id` - Get blog by ID (all statuses, requires authentication)

#### Protected Endpoints (Admin/Super Admin only)

- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project (soft delete)
- `POST /projects/:id/images` - Upload project images
- `DELETE /projects/:projectId/images/:imageId` - Delete project image
- `POST /blogs` - Create blog
- `PUT /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog (soft delete)
- `POST /blogs/:id/images` - Upload blog images
- `POST /services` - Create service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service (soft delete)
- `POST /skills` - Create skill
- `PUT /skills/:id` - Update skill
- `DELETE /skills/:id` - Delete skill (soft delete)
- `PUT /about` - Update about statistics
- `POST /about/reset` - Reset about statistics to default
- `POST /resume/summary` - Create resume summary
- `PUT /resume/summary/:id` - Update resume summary
- `DELETE /resume/summary/:id` - Delete resume summary
- `POST /resume/education` - Create education
- `PUT /resume/education/:id` - Update education
- `DELETE /resume/education/:id` - Delete education (soft delete)
- `POST /resume/experience` - Create experience
- `PUT /resume/experience/:id` - Update experience
- `DELETE /resume/experience/:id` - Delete experience (soft delete)
- `POST /resume/achievements` - Create achievement
- `PUT /resume/achievements/:id` - Update achievement
- `DELETE /resume/achievements/:id` - Delete achievement (soft delete)
- `POST /resume/references` - Create reference
- `PUT /resume/references/:id` - Update reference
- `DELETE /resume/references/:id` - Delete reference (soft delete)
- `POST /testimonials` - Create testimonial
- `PUT /testimonials/:id` - Update testimonial
- `DELETE /testimonials/:id` - Delete testimonial (soft delete)
- `POST /faq` - Create FAQ
- `PUT /faq/:id` - Update FAQ
- `DELETE /faq/:id` - Delete FAQ (soft delete)
- `GET /trash` - List all trash items (admin only)
- `GET /trash/:id` - Get trash item by ID (admin only)
- `POST /trash/:id/restore` - Restore item from trash (admin only)
- `DELETE /trash/:id` - Permanently delete trash item (admin only)
- `POST /trash/cleanup` - Cleanup expired trash (super admin only)
- `GET /maintenance/status` - Get system maintenance status (public)
- `PUT /maintenance/toggle` - Toggle maintenance mode (super admin/admin only)
- `GET /dev/users` - List Cognito users with roles (dev mode only)
- `PUT /dev/users/role` - Update user role in Cognito (dev mode only)

## 📚 Documentation

Detailed documentation available:

- [Backend PRD](./docs/Portfolio_CMS_Backend_PRD.md) - Complete backend requirements
- [Frontend PRD](./docs/Portfolio_CMS_Frontend_PRD.md) - Frontend specifications
- [Quick Start Guide](./QUICKSTART.md) - Get started in 5 minutes
- [Testing Guide](./TESTING.md) - API testing with Swagger, Postman, cURL
- [Schema Updates](./SCHEMA_UPDATES.md) - Latest database schema changes

**API Documentation:** Available at `http://localhost:5000/api/docs` (Swagger UI)

## 🔐 Authentication

Uses AWS Cognito ID tokens (contains custom:role). Include in request headers:

```
Authorization: Bearer <your-jwt-token>
```

**Available Roles:**

- `SUPER_ADMIN` - Full access
- `ADMIN` - Manage all content
- `AUTHOR` - Create/edit own content
- `EDITOR` - Edit content

## 🧪 Testing

Test the API with sample data:

```bash
npm run seed              # Populate database with test data
npm run dev               # Start development server
```

Then visit:

- **Swagger UI:** http://localhost:5000/api/docs
- **Prisma Studio:** `npm run prisma:studio`

For comprehensive testing guide, see [TESTING.md](./TESTING.md) and [API_TESTING_STEPS.md](./API_TESTING_STEPS.md).

## 🗄️ Database Schema

Key entities:

- Users (with roles)
- Projects (with category, type, status, images, links, **tech stack**, **development tools**)
- Blogs (with **topic**, **status**, tags, images)
- About (portfolio stats)
- Services (with icons, colors)
- Skills (with progress indicators)
- Resume sections (Summary, Education, Experience, Achievements, References)
- Testimonials (with platform: Upwork/LinkedIn)
- FAQs (with ordering)
- Trash (soft delete recovery with 31-day retention)
- Maintenance (system maintenance mode with messages)

**Recent Enhancements:**

- Projects now support structured tech stack (Frontend, Backend, Database, etc.)
- Projects track development tools used (Code Editor, Version Control, etc.)
- Blogs include topic categorization and lifecycle status tracking
- Maintenance mode for displaying update messages to users

## 🚀 Deployment

Designed for AWS:

- **Backend:** EC2 (with PM2)
- **Database:** RDS PostgreSQL (Multi-AZ)
- **Storage:** S3
- **Auth:** Cognito
- **Frontend:** Amplify
- **Monitoring:** CloudWatch

## 👤 Author

**Muhammad Jiku**

- GitHub: [@muhammad-jiku](https://github.com/muhammad-jiku)

## 📝 License

ISC

# Jikmunn Portfolio CMS

A full-stack, device-responsive Content Management System for managing portfolio projects, blogs, services, skills, resume, testimonials, and FAQs.

## 🏗️ Project Structure

```
jikmunn-portfolio-cms/
├── docs/                          # Documentation
│   ├── Portfolio_CMS_Backend_PRD.md
│   ├── Portfolio_CMS_Frontend_PRD.md
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

### Frontend (Coming Soon)

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **UI Components:** Shadcn/ui
- **Deployment:** AWS Amplify

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

### 🚧 In Progress

- [ ] Frontend implementation (Next.js)

- [ ] Frontend implementation (Next.js)
- [ ] AWS deployment setup
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit & integration tests
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

6. Start development server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### API Endpoints

**Base URL:** `http://localhost:5000/api/v1`

#### Public Endpoints

- `GET /health` - Health check
- `GET /projects` - Get all projects (with pagination)
- `GET /projects/:id` - Get project by ID
- `GET /blogs` - Get all blogs (with pagination & tags)
- `GET /blogs/:id` - Get blog by ID
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

#### Protected Endpoints (Admin/Super Admin only)

- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project (soft delete)
- `POST /blogs` - Create blog
- `PUT /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog (soft delete)
- `POST /services` - Create service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service (soft delete)
- `POST /skills` - Create skill
- `PUT /skills/:id` - Update skill
- `DELETE /skills/:id` - Delete skill (soft delete)
- `PUT /about` - Update about statistics
- `PUT /resume/summary/:id` - Update resume summary
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

## 📚 Documentation

Detailed PRDs are available in the `docs/` folder:

- [Backend PRD](./docs/Portfolio_CMS_Backend_PRD.md)
- [Frontend PRD](./docs/Portfolio_CMS_Frontend_PRD.md)

## 🔐 Authentication

Uses AWS Cognito JWT tokens. Include in request headers:

```
Authorization: Bearer <your-jwt-token>
```

**Available Roles:**

- `SUPER_ADMIN` - Full access
- `ADMIN` - Manage all content
- `AUTHOR` - Create/edit own content
- `EDITOR` - Edit content

## 🗄️ Database Schema

Key entities:

- Users (with roles)
- Projects (with category, type, status, images, links)
- Blogs (with tags, images)
- About (portfolio stats)
- Services (with icons, colors)
- Skills (with progress indicators)
- Resume sections (Summary, Education, Experience, Achievements, References)
- Testimonials (with platform: Upwork/LinkedIn)
- FAQs (with ordering)
- Trash (soft delete recovery)

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

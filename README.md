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
│   │   ├── app/
│   │   │   ├── config/               # Configuration files
│   │   │   ├── middleware/           # Auth, validation, error handling
│   │   │   ├── modules/              # Feature modules
│   │   │   │   ├── projects/
│   │   │   │   ├── blogs/
│   │   │   │   ├── about/
│   │   │   │   ├── services/
│   │   │   │   └── common/           # Shared services
│   │   │   ├── routes/               # API routes
│   │   │   └── utils/                # Utilities (S3, logger, helpers)
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
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

- [x] Project structure setup
- [x] TypeScript configuration
- [x] Prisma schema with all modules
- [x] AWS Cognito authentication middleware
- [x] Role-based access control (Super Admin, Admin, Author, Editor)
- [x] AWS S3 file upload utilities
- [x] Projects module (CRUD + image upload)
- [x] Blogs module (CRUD + image upload)
- [x] About module (statistics management)
- [x] Services module (CRUD)
- [x] Soft delete with trash recovery (31-day retention)
- [x] Error handling & logging
- [x] API rate limiting

### 🚧 In Progress

- [ ] Complete all resume sub-modules (Skills, Education, Experience, Achievements, References)
- [ ] Testimonials module
- [ ] FAQ module
- [ ] Trash management endpoints
- [ ] Admin user management
- [ ] Cron job for auto-deleting expired trash items

### 📅 Upcoming

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
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `GET /blogs` - Get all blogs
- `GET /blogs/:id` - Get blog by ID

#### Protected Endpoints (Require Authentication)

- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `POST /projects/:id/images` - Upload project images
- Similar CRUD for blogs, services, etc.

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

# Portfolio CMS Backend

Backend API for Portfolio CMS built with Node.js, Express.js, Prisma, and PostgreSQL.

## Features

- ✅ Role-based authentication with AWS Cognito
- ✅ RESTful API architecture
- ✅ PostgreSQL database with Prisma ORM
- ✅ AWS S3 for media storage
- ✅ Soft delete with trash recovery (31-day retention)
- ✅ Rate limiting and security best practices
- ✅ Comprehensive logging with Winston
- ✅ TypeScript for type safety

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** AWS Cognito
- **Storage:** AWS S3
- **Validation:** Zod
- **Logging:** Winston & Morgan

## Project Structure

```
server/
├── src/
│   ├── app.ts               # Express app configuration
│   ├── index.ts             # Server startup
│   ├── config/              # Configuration files
│   │   ├── aws.config.ts
│   │   ├── cognito.config.ts
│   │   ├── database.config.ts
│   │   └── index.config.ts
│   ├── utils/               # Utility functions
│   │   ├── helpers.util.ts
│   │   ├── logger.util.ts
│   │   ├── pagination.util.ts
│   │   ├── response.util.ts
│   │   └── s3.util.ts
│   └── app/                 # Application modules
│       ├── middleware/      # Express middleware
│       │   ├── auth.middleware.ts
│       │   ├── errorHandler.middleware.ts
│       │   └── validation.middleware.ts
│       ├── modules/         # Feature modules
│       │   ├── projects/
│       │   ├── blogs/
│       │   ├── about/
│       │   ├── services/
│       │   ├── skills/
│       │   ├── resume/
│       │   ├── testimonials/
│       │   └── common/      # Shared services
│       └── routes/          # API routes
├── prisma/
│   └── schema.prisma        # Database schema
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- AWS account (for Cognito and S3)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Configure your `.env` file with:
   - Database URL
   - AWS Cognito credentials
   - AWS S3 credentials

4. Run Prisma migrations:

```bash
npm run prisma:migrate
```

5. Generate Prisma Client:

```bash
npm run prisma:generate
```

### Development

Run the development server:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### API Endpoints

#### Public Endpoints

- **Health Check:** `GET /api/v1/health`

#### Implemented Modules

- **Projects:** `/api/v1/projects` (Full CRUD + image/video upload)
- **Blogs:** `/api/v1/blogs` (Full CRUD + pagination)
- **About:** `/api/v1/about` (Stats management)
- **Services:** `/api/v1/services` (Full CRUD)
- **Skills:** `/api/v1/skills` (Full CRUD)
- **Resume:** `/api/v1/resume` (All 5 sub-modules: Summary, Education, Experience, Achievements, References)
- **Testimonials:** `/api/v1/testimonials` (Full CRUD with platform support)

#### Coming Soon

- FAQs
- Trash/Recovery

### Scripts

- `yarn dev` / `npm run dev` - Start development server with hot reload
- `yarn build` / `npm run build` - Build TypeScript for production
- `yarn start` / `npm start` - Start production server
- `yarn prisma:generate` - Generate Prisma Client
- `yarn prisma:migrate` - Run database migrations
- `yarn prisma:studio` - Open Prisma Studio (database GUI)
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

## Database Schema

The database includes the following main entities:

- **Users** - Role-based access control (SUPER_ADMIN, ADMIN, AUTHOR, EDITOR)
- **Projects** - Portfolio projects with images, videos, documentation, and categorization
- **Blogs** - Blog posts with tags, images, and video support
- **About** - Portfolio statistics (clients, projects, hours, experience years)
- **Services** - Services offered with icons and descriptions
- **Skills** - Technical skills with progress indicators and icons
- **Resume** - Multiple sections:
  - Summary (contact info and introduction)
  - Education (degree, institution, years)
  - Experience (job title, company, achievements)
  - Achievements (awards, roles, descriptions)
  - References (name, title, company)
- **Testimonials** - Client testimonials with platform (Upwork/LinkedIn) and images
- **FAQs** - Frequently asked questions
- **Trash** - Soft delete recovery system (31-day retention)

## Authentication

This API uses AWS Cognito for authentication. Protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

Roles: SUPER_ADMIN, ADMIN, AUTHOR, EDITOR

## Deployment

Designed for deployment on AWS:

- **API:** AWS EC2 with PM2
- **Database:** AWS RDS (PostgreSQL)
- **Storage:** AWS S3
- **Monitoring:** AWS CloudWatch

## License

ISC

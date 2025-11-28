# Portfolio CMS Backend

Backend API for Portfolio CMS built with Node.js, Express.js, Prisma, and PostgreSQL.

## Features

- ✅ Role-based authentication with AWS Cognito (JWT verification)
- ✅ Real-time notifications with Socket.IO
- ✅ RESTful API architecture
- ✅ PostgreSQL database with Prisma ORM
- ✅ AWS S3 for media storage
- ✅ Soft delete with trash recovery (31-day retention)
- ✅ Automated cron job for cleanup
- ✅ Rate limiting and security best practices
- ✅ Comprehensive logging with Winston
- ✅ Swagger/OpenAPI documentation
- ✅ Jest testing framework
- ✅ TypeScript for type safety
- ✅ Maintenance mode with public status API
- ✅ Development-only endpoints (isolated by NODE_ENV)
- ✅ Structured tech stack tracking for projects
- ✅ Blog status and topic categorization
- ✅ Public/authenticated route separation (PRODUCTION-only for public)
- ✅ All TypeScript errors resolved (production-ready code quality)
- ✅ Consistent error handling with catchAsync pattern
- ✅ Type-safe middleware with proper return types

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** AWS Cognito (JWT)
- **Real-time:** Socket.IO
- **Storage:** AWS S3
- **Validation:** Zod
- **Logging:** Winston & Morgan
- **Documentation:** Swagger/OpenAPI
- **Testing:** Jest + Supertest

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
│   │   ├── socket.config.ts
│   │   └── index.config.ts
│   ├── utils/               # Utility functions
│   │   ├── helpers.util.ts
│   │   ├── logger.util.ts
│   │   ├── pagination.util.ts
│   │   ├── response.util.ts
│   │   ├── socket.util.ts
│   │   └── s3.util.ts
    └── app/                 # Application modules
        ├── middleware/      # Express middleware
        │   ├── auth.middleware.ts
        │   ├── dev.middleware.ts        # Dev-only middleware
        │   ├── errorHandler.middleware.ts
        │   └── validation.middleware.ts
        ├── modules/         # Feature modules
        │   ├── projects/
        │   ├── blogs/
        │   ├── about/
        │   ├── services/
        │   ├── skills/
        │   ├── resume/
        │   ├── testimonials/
        │   ├── faq/
        │   ├── trash/
        │   └── common/      # Shared services, dev & maintenance controllers
        └── routes/          # API routes
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

6. Seed database with test data:

```bash
npm run seed
```

This populates the database with sample data from `prisma/seed-data/` (about, blogs, faq, projects, resume, services, skills, testimonials).

### Development

Run the development server:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### API Endpoints

#### Public Endpoints (No Authentication)

- **Health Check:** `GET /api/v1/health`
- **Public Projects:** `GET /api/v1/projects/public` (PRODUCTION status only)
- **Public Blogs:** `GET /api/v1/blogs/public` (PRODUCTION status only)

#### Implemented Modules

- **Projects:** `/api/v1/projects` (Full CRUD + image/video upload + public routes)
- **Blogs:** `/api/v1/blogs` (Full CRUD + pagination + public routes)
- **About:** `/api/v1/about` (Stats management)
- **Services:** `/api/v1/services` (Full CRUD)
- **Skills:** `/api/v1/skills` (Full CRUD)
- **Resume:** `/api/v1/resume` (All 5 sub-modules: Summary, Education, Experience, Achievements, References)
- **Testimonials:** `/api/v1/testimonials` (Full CRUD with platform support)
- **FAQ:** `/api/v1/faq` (Ordered Q&A pairs)
- **Trash:** `/api/v1/trash` (Restore/permanent delete with cleanup)

#### Maintenance & Development

- **Maintenance Status:** `GET /api/v1/maintenance/status` (public)
- **Toggle Maintenance:** `PUT /api/v1/maintenance/toggle` (super admin/admin)
- **List Dev Users:** `GET /api/v1/dev/users` (development mode only)
- **Update User Role:** `PUT /api/v1/dev/users/role` (development mode only)

## Documentation

- **API Docs:** `http://localhost:5000/api/docs` (Swagger UI)
- **Socket.IO Guide:** See `SOCKET_IO_GUIDE.md` for real-time notifications
- **Testing Guide:** See `../TESTING.md` for API testing instructions
- **Quick Start:** See `../QUICKSTART.md` for setup instructions

## Database Schema Updates

**Recent Changes:**

- **Projects:** Added `techStack` (JSON) and `tools` (JSON) fields for structured technology tracking
- **Blogs:** Added `topic` (String) and `status` (BlogStatus enum) fields
- **ProjectStatus Enum:** Updated values to IN_PROGRESS, DEVELOPMENT, PRODUCTION, UPDATED
- **BlogStatus Enum:** New enum with IN_PROGRESS, UPDATED, DEVELOPMENT, PRODUCTION
- **Maintenance Model:** Added for system maintenance mode

## Authentication with AWS Cognito

This project uses **AWS Cognito** for authentication. There are **no sign-up/sign-in routes** in the backend because AWS Cognito handles all user management operations:

### What Cognito Handles:

- ✅ User registration (sign-up)
- ✅ User login (sign-in)
- ✅ Password reset & forgot password
- ✅ Email verification
- ✅ Token generation and refresh
- ✅ MFA (Multi-factor authentication)
- ✅ Social login (Google, Facebook, etc.)

### Backend Role:

- ✅ Verifies JWT tokens issued by Cognito
- ✅ Checks user roles (SUPER_ADMIN, ADMIN, AUTHOR, EDITOR)
- ✅ Protects routes based on authentication and roles

### Environment Variables:

```env
AWS_COGNITO_USER_POOL_ID=your-pool-id
AWS_COGNITO_CLIENT_ID=your-client-id
AWS_REGION=ap-southeast-1
AWS_COGNITO_ISSUER=https://cognito-idp.{region}.amazonaws.com/{userPoolId}
```

### Using JWT Tokens:

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <jwt-token-from-cognito>
```

### Frontend Implementation:

Frontend should use `amazon-cognito-identity-js` or `aws-amplify` to:

1. Sign up users → Cognito User Pool
2. Sign in users → Get JWT token
3. Make API calls with JWT token in header
4. Refresh tokens when expired

Example:

```typescript
// Frontend authentication
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'your-pool-id',
  ClientId: 'your-client-id',
};

const userPool = new CognitoUserPool(poolData);
// ... sign up, sign in, etc.
```

### Dev-Only Routes:

For managing user roles in development:

- `GET /api/v1/dev/users` - List all Cognito users
- `PUT /api/v1/dev/users/role` - Update user role

## Real-time Notifications with Socket.IO

Socket.IO is integrated for real-time updates when content is created, updated, or deleted.

### Features:

- ✅ Real-time notifications for all CRUD operations
- ✅ Admin-only room for authenticated users
- ✅ 30+ event types (projects, blogs, services, skills, etc.)
- ✅ Auto-reconnection handling
- ✅ CORS configured for frontend

### Event Types:

**Projects:** `project:created`, `project:updated`, `project:deleted`  
**Blogs:** `blog:created`, `blog:updated`, `blog:deleted`  
**Services:** `service:created`, `service:updated`, `service:deleted`  
**Skills:** `skill:created`, `skill:updated`, `skill:deleted`  
**And more...**

### Frontend Connection:

```typescript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('connect', () => {
  socket.emit('join:admin'); // Join admin room
});

socket.on('project:created', data => {
  console.log('New project:', data);
  // Update UI, show notification, etc.
});
```

### Environment Variables:

```env
CLIENT_URL=http://localhost:3000
```

**For complete Socket.IO documentation, see `SOCKET_IO_GUIDE.md`**

## Testing

### Seed Database

Populate database with test data:

```bash
npm run seed
```

The seed script (`prisma/seed.ts`) loads all JSON files from `prisma/seed-data/` and creates database records with proper relationships.

### Run Tests

```bash
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage
```

### Development Commands

```bash
npm run dev               # Start dev server with hot reload
npm run build             # Build TypeScript for production
npm start                 # Start production server
npm run seed              # Seed database with test data
```

### Database Commands

```bash
npm run prisma:generate   # Generate Prisma Client
npm run prisma:migrate    # Run database migrations
npm run prisma:studio     # Open Prisma Studio (database GUI)
```

### Code Quality

```bash
npm run lint              # Run ESLint
npm run format            # Format code with Prettier
```

### API Testing

**Swagger UI:** http://localhost:5000/api/docs (recommended)

**Quick Test:**

```bash
curl http://localhost:5000/api/v1/health
curl http://localhost:5000/api/v1/projects/public
```

For detailed testing guide, see [../TESTING.md](../TESTING.md).

## Database Schema

The database includes the following main entities:

- **Users** - Role-based access control (SUPER_ADMIN, ADMIN, AUTHOR, EDITOR)
- **Projects** - Portfolio projects with images, videos, documentation, categorization, **tech stack**, and **development tools**
- **Blogs** - Blog posts with **topic**, **status**, tags, images, and video support
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
- **Maintenance** - System maintenance mode with status messages

**Key Enums:**

- ProjectStatus: IN_PROGRESS, DEVELOPMENT, PRODUCTION, UPDATED
- BlogStatus: IN_PROGRESS, UPDATED, DEVELOPMENT, PRODUCTION
- ProjectCategory: WEB_APPLICATION, MOBILE_APP_APPLICATION
- UserRole: SUPER_ADMIN, ADMIN, AUTHOR, EDITOR
- TestimonialPlatform: UPWORK, LINKEDIN

## Authentication

This API uses **AWS Cognito** for authentication. All user management (sign-up, sign-in, password reset) is handled by Cognito.

Protected endpoints require a valid JWT token from Cognito:

```
Authorization: Bearer <your-jwt-token>
```

**Roles:** SUPER_ADMIN, ADMIN, AUTHOR, EDITOR

**No backend authentication routes needed** - Frontend authenticates directly with AWS Cognito and passes JWT token to API.

## Deployment

Designed for deployment on AWS:

- **API:** AWS EC2 with PM2
- **Database:** AWS RDS (PostgreSQL)
- **Storage:** AWS S3
- **Monitoring:** AWS CloudWatch

## License

ISC

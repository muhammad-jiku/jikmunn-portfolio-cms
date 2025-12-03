# Portfolio CMS Backend

Backend API for Portfolio CMS built with Node.js, Express.js, Prisma, and PostgreSQL.

> 📖 **For complete implementation details, see [Backend Implementation Phases](../docs/Backend_Implementation_Phases.md)** - 12 phases, 76 routes, production-ready architecture.

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
│   │   ├── swagger.config.ts
│   │   └── index.config.ts
│   ├── utils/               # Utility functions
│   │   ├── cron.util.ts
│   │   ├── helpers.util.ts
│   │   ├── logger.util.ts
│   │   ├── pagination.util.ts
│   │   ├── response.util.ts
│   │   ├── s3.util.ts
│   │   ├── socket.util.ts
│   │   ├── types.util.ts
│   │   └── __tests__/       # Unit tests
│   └── app/                 # Application modules
│       ├── middleware/      # Express middleware
│       │   ├── auth.middleware.ts
│       │   ├── errorHandler.middleware.ts
│       │   ├── rateLimiter.middleware.ts
│       │   └── validate.middleware.ts
│       ├── modules/         # Feature modules
│       │   ├── projects/
│       │   │   ├── projects.controller.ts
│       │   │   ├── projects.service.ts
│       │   │   ├── projects.routes.ts
│       │   │   ├── projects.validation.ts
│       │   │   ├── projects.interface.ts
│       │   │   └── projects.constants.ts
│       │   ├── blogs/
│       │   │   ├── blogs.controller.ts
│       │   │   ├── blogs.service.ts
│       │   │   ├── blogs.routes.ts
│       │   │   ├── blogs.validation.ts
│       │   │   ├── blogs.interface.ts
│       │   │   └── blogs.constants.ts
│       │   ├── about/
│       │   ├── services/
│       │   ├── skills/
│       │   ├── resume/
│       │   │   ├── summary/
│       │   │   ├── education/
│       │   │   ├── experience/
│       │   │   ├── achievements/
│       │   │   └── references/
│       │   ├── testimonials/
│       │   ├── faq/
│       │   ├── trash/
│       │   └── common/      # Shared services (maintenance)
│       └── routes/          # API routes
│           └── index.routes.ts
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Database seeding
│   ├── seed-data/           # JSON seed files
│   └── migrations/          # Migration history
├── logs/                    # Winston logs (gitignored)
├── .env.example
├── package.json
├── jest.config.js
├── eslint.config.mjs
├── tsconfig.json
├── SOCKET_IO_GUIDE.md
└── README.md
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
- **Maintenance Status:** `GET /api/v1/maintenance/status`

#### Implemented Modules

**Projects** - `/api/v1/projects`

- `GET /public` - Get all public projects (PRODUCTION status)
- `GET /public/:id` - Get single public project
- `GET /` - Get all projects (authenticated)
- `POST /` - Create project (ADMIN, SUPER_ADMIN, AUTHOR)
- `GET /:id` - Get project by ID
- `PUT /:id` - Update project (ADMIN, SUPER_ADMIN, AUTHOR)
- `DELETE /:id` - Delete project (ADMIN, SUPER_ADMIN)
- `POST /:id/images` - Upload project images (ADMIN, SUPER_ADMIN, AUTHOR)
- `DELETE /:projectId/images/:imageId` - Delete project image (ADMIN, SUPER_ADMIN, AUTHOR)

**Blogs** - `/api/v1/blogs`

- `GET /public` - Get all public blogs (PRODUCTION status)
- `GET /public/:id` - Get single public blog
- `GET /` - Get all blogs (authenticated)
- `POST /` - Create blog (ADMIN, SUPER_ADMIN, AUTHOR)
- `GET /:id` - Get blog by ID
- `PUT /:id` - Update blog (ADMIN, SUPER_ADMIN, AUTHOR)
- `DELETE /:id` - Delete blog (ADMIN, SUPER_ADMIN)
- `POST /:id/images` - Upload blog images (ADMIN, SUPER_ADMIN, AUTHOR)

**About** - `/api/v1/about`

- `GET /` - Get about stats (public)
- `PUT /` - Update about stats (ADMIN, SUPER_ADMIN)
- `POST /reset` - Reset about stats to default (ADMIN, SUPER_ADMIN)

**Services** - `/api/v1/services`

- `GET /` - Get all services (public)
- `POST /` - Create service (ADMIN, SUPER_ADMIN)
- `GET /:id` - Get service by ID
- `PUT /:id` - Update service (ADMIN, SUPER_ADMIN)
- `DELETE /:id` - Delete service (ADMIN, SUPER_ADMIN)

**Skills** - `/api/v1/skills`

- `GET /` - Get all skills (public)
- `POST /` - Create skill (ADMIN, SUPER_ADMIN)
- `GET /:id` - Get skill by ID
- `PUT /:id` - Update skill (ADMIN, SUPER_ADMIN)
- `DELETE /:id` - Delete skill (ADMIN, SUPER_ADMIN)

**Resume** - `/api/v1/resume`

_Summary:_

- `GET /summary` - Get all summaries (public)
- `GET /summary/:id` - Get summary by ID (public)
- `POST /summary` - Create summary (ADMIN, SUPER_ADMIN)
- `PUT /summary/:id` - Update summary (ADMIN, SUPER_ADMIN)
- `DELETE /summary/:id` - Delete summary (ADMIN, SUPER_ADMIN)

_Education:_

- `GET /education` - Get all education (public)
- `GET /education/:id` - Get education by ID (public)
- `POST /education` - Create education (ADMIN, SUPER_ADMIN)
- `PUT /education/:id` - Update education (ADMIN, SUPER_ADMIN)
- `DELETE /education/:id` - Delete education (ADMIN, SUPER_ADMIN)

_Experience:_

- `GET /experience` - Get all experience (public)
- `GET /experience/:id` - Get experience by ID (public)
- `POST /experience` - Create experience (ADMIN, SUPER_ADMIN)
- `PUT /experience/:id` - Update experience (ADMIN, SUPER_ADMIN)
- `DELETE /experience/:id` - Delete experience (ADMIN, SUPER_ADMIN)

_Achievements:_

- `GET /achievements` - Get all achievements (public)
- `GET /achievements/:id` - Get achievement by ID (public)
- `POST /achievements` - Create achievement (ADMIN, SUPER_ADMIN)
- `PUT /achievements/:id` - Update achievement (ADMIN, SUPER_ADMIN)
- `DELETE /achievements/:id` - Delete achievement (ADMIN, SUPER_ADMIN)

_References:_

- `GET /references` - Get all references (public)
- `GET /references/:id` - Get reference by ID (public)
- `POST /references` - Create reference (ADMIN, SUPER_ADMIN)
- `PUT /references/:id` - Update reference (ADMIN, SUPER_ADMIN)
- `DELETE /references/:id` - Delete reference (ADMIN, SUPER_ADMIN)

**Testimonials** - `/api/v1/testimonials`

- `GET /` - Get all testimonials (public)
- `POST /` - Create testimonial (ADMIN, SUPER_ADMIN)
- `GET /:id` - Get testimonial by ID
- `PUT /:id` - Update testimonial (ADMIN, SUPER_ADMIN)
- `DELETE /:id` - Delete testimonial (ADMIN, SUPER_ADMIN)

**FAQ** - `/api/v1/faq`

- `GET /` - Get all FAQs (public)
- `POST /` - Create FAQ (ADMIN, SUPER_ADMIN)
- `GET /:id` - Get FAQ by ID
- `PUT /:id` - Update FAQ (ADMIN, SUPER_ADMIN)
- `DELETE /:id` - Delete FAQ (ADMIN, SUPER_ADMIN)

**Trash** - `/api/v1/trash`

- `GET /` - Get all trash items (ADMIN, SUPER_ADMIN)
- `GET /:id` - Get trash item by ID (ADMIN, SUPER_ADMIN)
- `POST /:id/restore` - Restore item from trash (ADMIN, SUPER_ADMIN)
- `DELETE /:id` - Permanently delete item (ADMIN, SUPER_ADMIN)
- `POST /cleanup` - Cleanup expired trash (SUPER_ADMIN)

#### Maintenance & Development

**Maintenance** - `/api/v1/maintenance`

- `GET /status` - Get maintenance status (public)
- `PUT /toggle` - Toggle maintenance mode (SUPER_ADMIN, ADMIN)

**Dev Routes** - `/api/v1/dev` (Development mode only)

- `GET /users` - List all Cognito users
- `PUT /users/role` - Update user role

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

- ✅ Verifies ID tokens (containing custom:role) issued by Cognito
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

All protected endpoints require **ID Token** (not Access Token) in Authorization header:

```
Authorization: Bearer <id-token-from-cognito>
```

**Important:** Use the **IdToken** from Cognito response, not AccessToken, because only ID tokens contain the `custom:role` attribute needed for role-based authorization.

### Frontend Implementation:

Frontend should use `amazon-cognito-identity-js` or `aws-amplify` to:

1. Sign up users → Cognito User Pool
2. Sign in users → Get ID token (IdToken from response)
3. Make API calls with ID token in header
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

Protected endpoints require a valid ID token (not Access token) from Cognito:

```
Authorization: Bearer <your-jwt-token>
```

**Roles:** SUPER_ADMIN, ADMIN, AUTHOR, EDITOR

**No backend authentication routes needed** - Frontend authenticates directly with AWS Cognito and passes ID token (IdToken) to API.

## Deployment

Designed for deployment on AWS:

- **API:** AWS EC2 with PM2
- **Database:** AWS RDS (PostgreSQL)
- **Storage:** AWS S3
- **Monitoring:** AWS CloudWatch

## License

ISC

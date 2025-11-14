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
│   ├── app/
│   │   ├── config/          # Configuration files
│   │   ├── middleware/      # Express middleware
│   │   ├── modules/         # Feature modules
│   │   │   ├── projects/
│   │   │   ├── blogs/
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   └── ...
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utility functions
│   └── index.ts             # Application entry point
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

- **Health Check:** `GET /api/v1/health`
- **Projects:** `/api/v1/projects`
- **Blogs:** `/api/v1/blogs`
- **About:** `/api/v1/about`
- **Services:** `/api/v1/services`
- More endpoints coming soon...

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Database Schema

The database includes the following main entities:

- Users (with role-based access)
- Projects (with images and categorization)
- Blogs (with tags and images)
- About (portfolio statistics)
- Services
- Skills
- Resume sections (Summary, Education, Experience, Achievements, References)
- Testimonials
- FAQs
- Trash (soft delete recovery)

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

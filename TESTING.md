# Testing Guide for Portfolio CMS API

## 🚀 Complete Testing Workflow (Step-by-Step)

Follow this guide to test all API endpoints systematically using seed data and Swagger UI.

---

## 📋 Step 1: Prerequisites & Environment Setup

### 1.1 Verify Environment Configuration

```bash
cd server
```

Ensure `.env` file has:

```env
DATABASE_URL="postgresql://..."
AWS_COGNITO_USER_POOL_ID="..."
AWS_COGNITO_CLIENT_ID="..."
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="..."
AWS_S3_BUCKET="..."
```

### 1.2 Install Dependencies

```bash
npm install
```

### 1.3 Database Setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) View database
npm run prisma:studio
```

---

## 📊 Step 2: Seed Database with Test Data

### 2.1 Understanding Seed Data

Your project has seed data files in `server/prisma/seed-data/`:

- `about.json` - Portfolio statistics
- `blogs.json` - Sample blog posts
- `faq.json` - Frequently asked questions
- `projects.json` - Portfolio projects
- `resume.json` - Resume data (education, experience, achievements, references)
- `services.json` - Services offered
- `skills.json` - Technical skills
- `testimonials.json` - Client testimonials

### 2.2 Create Seed Script (If Not Exists)

Create `server/prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.$transaction([
    prisma.projectImage.deleteMany(),
    prisma.blogImage.deleteMany(),
    prisma.project.deleteMany(),
    prisma.blog.deleteMany(),
    prisma.about.deleteMany(),
    prisma.service.deleteMany(),
    prisma.skill.deleteMany(),
    prisma.testimonial.deleteMany(),
    prisma.faq.deleteMany(),
    prisma.reference.deleteMany(),
    prisma.achievement.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.education.deleteMany(),
    prisma.resumeSummary.deleteMany(),
  ]);

  // Load seed data
  const seedDataPath = path.join(__dirname, 'seed-data');

  // Seed About
  const aboutData = JSON.parse(
    fs.readFileSync(path.join(seedDataPath, 'about.json'), 'utf-8')
  );
  await prisma.about.create({ data: aboutData });
  console.log('✅ About data seeded');

  // Seed Skills
  const skillsData = JSON.parse(
    fs.readFileSync(path.join(seedDataPath, 'skills.json'), 'utf-8')
  );
  await prisma.skill.createMany({ data: skillsData });
  console.log('✅ Skills data seeded');

  // Seed Services
  const servicesData = JSON.parse(
    fs.readFileSync(path.join(seedDataPath, 'services.json'), 'utf-8')
  );
  await prisma.service.createMany({ data: servicesData });
  console.log('✅ Services data seeded');

  // Seed FAQ
  const faqData = JSON.parse(
    fs.readFileSync(path.join(seedDataPath, 'faq.json'), 'utf-8')
  );
  await prisma.faq.createMany({ data: faqData });
  console.log('✅ FAQ data seeded');

  // Seed Testimonials
  const testimonialsData = JSON.parse(
    fs.readFileSync(path.join(seedDataPath, 'testimonials.json'), 'utf-8')
  );
  await prisma.testimonial.createMany({ data: testimonialsData });
  console.log('✅ Testimonials data seeded');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 2.3 Add Seed Script to package.json

Add to `scripts` section in `server/package.json`:

```json
"seed": "ts-node prisma/seed.ts"
```

### 2.4 Run Seed Script

```bash
npm run seed
```

Expected output:

```
🌱 Starting database seeding...
✅ About data seeded
✅ Skills data seeded
✅ Services data seeded
✅ FAQ data seeded
✅ Testimonials data seeded
🎉 Database seeding completed!
```

---

## 🖥️ Step 3: Start Development Server

```bash
npm run dev
```

Server will start on: `http://localhost:5000`

Verify server is running:

```bash
curl http://localhost:5000/api/v1/health
```

---

## 📚 Step 4: Test with Swagger UI (Recommended)

### 4.1 Open Swagger UI

Navigate to: **http://localhost:5000/api/docs**

You should see an interactive API documentation interface.

### 4.2 Test Health Endpoint

1. Find `GET /api/v1/health`
2. Click "Try it out"
3. Click "Execute"
4. Verify response:
   ```json
   {
     "success": true,
     "message": "Portfolio CMS API is running"
   }
   ```

---

## 🔓 Step 5: Test Public Endpoints (No Authentication)

### 5.1 Get All Projects (Public)

1. Find `GET /api/v1/projects/public`
2. Click "Try it out"
3. (Optional) Set pagination: `page=1`, `limit=10`
4. Click "Execute"
5. Verify you see seeded projects with `status: PRODUCTION`

### 5.2 Get Single Project (Public)

1. Copy an `id` from the previous response
2. Find `GET /api/v1/projects/public/{id}`
3. Click "Try it out"
4. Paste the `id`
5. Click "Execute"

### 5.3 Test Other Public Endpoints

Repeat the above process for:

- `GET /api/v1/blogs/public` - Public blogs
- `GET /api/v1/skills` - All skills
- `GET /api/v1/services` - All services
- `GET /api/v1/testimonials` - All testimonials
- `GET /api/v1/faq` - All FAQs
- `GET /api/v1/about` - Portfolio statistics
- `GET /api/v1/resume/summary` - Resume summary
- `GET /api/v1/resume/education` - Education history
- `GET /api/v1/resume/experience` - Work experience

---

## 🔐 Step 6: Setup Authentication for Protected Endpoints

### 6.1 Get ID Token from AWS Cognito

**Option A: Using AWS Cognito UI**

1. Go to AWS Cognito Console
2. Select your User Pool
3. Create a test user or use existing
4. Sign in and get the ID token (IdToken field in response)

**Option B: Using AWS CLI**

```bash
aws cognito-idp initiate-auth \
  --auth-flow USER_PASSWORD_AUTH \
  --client-id YOUR_CLIENT_ID \
  --auth-parameters USERNAME=testuser,PASSWORD=TestPass123!
```

Copy the `IdToken` from response.

### 6.2 Add Token to Swagger

1. Click **"Authorize"** button (🔒 top right in Swagger UI)
2. In the popup, enter: `Bearer YOUR_JWT_TOKEN`
3. Click **"Authorize"**
4. Click **"Close"**

Now all protected endpoints will use this token automatically!

---

## ✏️ Step 7: Test Protected CRUD Operations

### 7.1 Create New Project (POST)

1. Find `POST /api/v1/projects`
2. Click "Try it out"
3. Use this sample body:
   ```json
   {
     "title": "Test Project",
     "subtitle": "A test project",
     "description": ["Feature 1", "Feature 2"],
     "category": "WEB_APPLICATION",
     "type": "INTERMEDIATE",
     "status": "DEVELOPMENT",
     "liveLink": "https://example.com",
     "githubClientLink": "https://github.com/user/repo",
     "techStack": ["React", "Node.js"],
     "tools": ["VS Code", "Docker"]
   }
   ```
4. Click "Execute"
5. Copy the `id` from response for next tests

### 7.2 Update Project (PUT)

1. Find `PUT /api/v1/projects/{id}`
2. Click "Try it out"
3. Paste the `id` from previous step
4. Modify the request body:
   ```json
   {
     "status": "PRODUCTION",
     "title": "Updated Test Project"
   }
   ```
5. Click "Execute"

### 7.3 Get All Projects (Authenticated - Shows All Statuses)

1. Find `GET /api/v1/projects`
2. Click "Try it out"
3. Click "Execute"
4. Verify you see projects with ALL statuses (IN_PROGRESS, DEVELOPMENT, PRODUCTION, UPDATED)

### 7.4 Delete Project (Soft Delete)

1. Find `DELETE /api/v1/projects/{id}`
2. Click "Try it out"
3. Paste project `id`
4. Click "Execute"
5. Project moves to trash (soft delete)

---

## 🗑️ Step 8: Test Trash & Restore System

### 8.1 View Trash

1. Find `GET /api/v1/trash`
2. Click "Try it out"
3. Click "Execute"
4. See deleted items with their `entityType`

### 8.2 Restore from Trash

1. Copy a trash item `id`
2. Find `POST /api/v1/trash/{id}/restore`
3. Click "Try it out"
4. Paste the `id`
5. Click "Execute"
6. Item restored to original module

### 8.3 Permanent Delete

1. Find `DELETE /api/v1/trash/{id}`
2. Click "Try it out"
3. Paste trash item `id`
4. Click "Execute"
5. Item permanently deleted from database

---

## 📤 Step 9: Test File Upload Endpoints

### 9.1 Upload Project Images

1. Find `POST /api/v1/projects/{id}/images`
2. Click "Try it out"
3. Paste project `id`
4. Click "Add file" to upload images (minimum 4, maximum 10)
5. Click "Execute"
6. Images uploaded to S3 and URLs saved to database

### 9.2 Upload Blog Images

1. Find `POST /api/v1/blogs/{id}/images`
2. Follow same process as project images

---

## 🧪 Step 10: Test with Postman (Alternative)

### 10.1 Setup Postman Collection

1. Create new Collection: "Portfolio CMS"
2. Add environment variables:
   - `base_url`: `http://localhost:5000`
   - `id_token`: Your ID token from Cognito (IdToken field)

### 10.2 Add Authorization

1. Collection → Authorization tab
2. Type: Bearer Token
3. Token: `{{jwt_token}}`

### 10.3 Create Requests

Create requests following same endpoints from Swagger documentation.

---

## 🧪 Step 11: Run Automated Tests (Jest)

### 11.1 Run All Tests

```bash
npm run test
```

### 11.2 Run with Coverage

```bash
npm run test:coverage
```

### 11.3 Watch Mode (Development)

```bash
npm run test:watch
```

---

## 📊 Step 12: Monitor & Verify

### 12.1 Check Database with Prisma Studio

```bash
npm run prisma:studio
```

Opens GUI at `http://localhost:5555` to view all database tables.

### 12.2 Check Server Logs

Monitor console for:

- Request logs (Morgan)
- Error logs (Winston)
- Database queries (Prisma)

### 12.3 Check S3 Bucket

Verify uploaded files in AWS S3 Console under your configured bucket.

---

## 🎯 Testing Checklist

Mark off as you test:

### Public Endpoints (No Auth)

- [ ] Health check
- [ ] Public projects list
- [ ] Public single project
- [ ] Public blogs list
- [ ] Public single blog
- [ ] About statistics
- [ ] All services
- [ ] All skills
- [ ] All testimonials
- [ ] All FAQs
- [ ] Resume summary
- [ ] Resume education
- [ ] Resume experience

### Protected Endpoints (With Auth)

- [ ] Create project
- [ ] Update project
- [ ] Delete project
- [ ] All projects (all statuses)
- [ ] Create blog
- [ ] Update blog
- [ ] Delete blog
- [ ] All blogs (all statuses)
- [ ] Update about
- [ ] Reset about
- [ ] CRUD services
- [ ] CRUD skills
- [ ] CRUD testimonials
- [ ] CRUD FAQs
- [ ] CRUD resume sections

### Trash System

- [ ] View trash
- [ ] Restore item
- [ ] Permanent delete

### File Uploads

- [ ] Upload project images
- [ ] Upload blog images
- [ ] Delete images

---

## 🛠️ Legacy Documentation

### Getting Started (Old)

---

## Quick Health Check

**Endpoint:** `GET http://localhost:5000/api/v1/health`

**cURL:**

```bash
curl http://localhost:5000/api/v1/health
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Portfolio CMS API is running",
  "timestamp": "2025-11-16T10:00:00.000Z",
  "version": "v1"
}
```

---

## Authentication

### Get ID Token

You need an ID token (not Access token) from AWS Cognito for protected endpoints. ID tokens contain the custom:role attribute.

**Steps:**

1. Sign up/Sign in via AWS Cognito
2. Copy the ID token (IdToken field, NOT AccessToken)
3. Add to Postman:
   - Go to Authorization tab
   - Select "Bearer Token"
   - Paste your token

**Or in Swagger:**

1. Click "Authorize" button (top right)
2. Enter: `Bearer YOUR_JWT_TOKEN`
3. Click "Authorize"

---

## Testing Public Endpoints (No Auth Required)

**Note:** Public endpoints show only PRODUCTION status items.

### 1. Projects (Public)

- `GET /api/v1/projects/public` - List all PRODUCTION projects
- `GET /api/v1/projects/public/:id` - Get single PRODUCTION project

**cURL Example:**

```bash
curl http://localhost:5000/api/v1/projects/public
```

### 2. Blogs (Public)

- `GET /api/v1/blogs/public` - List all PRODUCTION blogs
- `GET /api/v1/blogs/public/:id` - Get single PRODUCTION blog

**cURL Example:**

```bash
curl http://localhost:5000/api/v1/blogs/public
```

## Testing Authenticated Endpoints

**Note:** Authenticated endpoints show ALL status items (IN_PROGRESS, DEVELOPMENT, PRODUCTION, UPDATED).

### 1. Projects (Authenticated)

- `GET /api/v1/projects` - List all projects (all statuses)
- `GET /api/v1/projects/:id` - Get single project (any status)

**cURL Example:**

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/api/v1/projects
```

### 2. Blogs (Authenticated)

- `GET /api/v1/blogs` - List all blogs (all statuses)
- `GET /api/v1/blogs/:id` - Get single blog (any status)

**cURL Example:**

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/api/v1/blogs
```

### 3. About

- `GET /api/v1/about` - Get statistics

### 4. Services

- `GET /api/v1/services` - List all services
- `GET /api/v1/services/:id` - Get single service

### 5. Skills

- `GET /api/v1/skills` - List all skills
- `GET /api/v1/skills/:id` - Get single skill

### 6. Resume

- `GET /api/v1/resume/summary` - Get resume summary
- `GET /api/v1/resume/education` - List education
- `GET /api/v1/resume/experience` - List experience
- `GET /api/v1/resume/achievements` - List achievements
- `GET /api/v1/resume/references` - List references

### 7. Testimonials

- `GET /api/v1/testimonials` - List testimonials
- `GET /api/v1/testimonials/:id` - Get single testimonial

### 8. FAQ

- `GET /api/v1/faq` - List all FAQs
- `GET /api/v1/faq/:id` - Get single FAQ

---

## Testing Protected Endpoints (Auth Required)

### Create Project

**Endpoint:** `POST /api/v1/projects`

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Sample Request Body:** See `postman-sample-data.json` → Projects → Create

### Update Project

**Endpoint:** `PUT /api/v1/projects/:id`

### Delete Project (Soft Delete)

**Endpoint:** `DELETE /api/v1/projects/:id`

---

## Testing Trash & Restore

### List Trash (Admin Only)

**Endpoint:** `GET /api/v1/trash`

### Restore from Trash

**Endpoint:** `POST /api/v1/trash/:id/restore`

### Permanent Delete

**Endpoint:** `DELETE /api/v1/trash/:id`

---

## Common Issues & Solutions

### Issue 1: "401 Unauthorized"

**Solution:** Add valid ID token (not Access token) to Authorization header

### Issue 2: "404 Not Found"

**Solution:** Check endpoint URL and ensure server is running

### Issue 3: "400 Bad Request"

**Solution:** Verify request body matches the validation schema

### Issue 4: "500 Internal Server Error"

**Solution:** Check server logs for error details

---

## Testing Workflow

### For Beginners (Swagger UI):

1. Start server
2. Go to `http://localhost:5000/api/docs`
3. Test public endpoints first (no auth)
4. Get ID token (IdToken) for protected endpoints
5. Click "Authorize" and add token
6. Test create/update/delete operations

### For Postman Users:

1. Use sample data below to test endpoints
2. Set up environment variables (base URL, token)
3. Copy sample JSON payloads for create/update operations

### For Developers (Automated Tests):

```bash
cd server
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## Sample Data for Testing

### Project Creation

**POST** `/api/v1/projects`

```json
{
  "title": "E-Commerce Platform",
  "subtitle": "Full-stack MERN application with payment integration",
  "description": [
    "Built responsive UI with React and TypeScript",
    "Implemented secure payment processing with Stripe",
    "Designed RESTful API with Node.js and Express",
    "Database optimization with MongoDB indexes"
  ],
  "category": "WEB_APPLICATION",
  "type": "ADVANCED",
  "status": "PRODUCTION",
  "liveLink": "https://example-shop.com",
  "githubClientLink": "https://github.com/username/shop-client",
  "githubServerLink": "https://github.com/username/shop-server",
  "videoUrl": "https://youtube.com/watch?v=demo",
  "techStack": {
    "Frontend": "React with TypeScript",
    "Backend": "Node.js with Express",
    "Database": "MongoDB",
    "Authentication": "JWT with bcrypt",
    "Payments": "Stripe API",
    "File Storage": "AWS S3",
    "Deployment": "Docker on AWS EC2"
  },
  "tools": {
    "Code Editor": "VS Code",
    "Version Control": "Git & GitHub",
    "API Testing": "Postman",
    "Database GUI": "MongoDB Compass",
    "Design": "Figma"
  }
}
```

**Status Values:** `IN_PROGRESS`, `DEVELOPMENT`, `PRODUCTION`, `UPDATED`

### Blog Creation

**POST** `/api/v1/blogs`

```json
{
  "title": "Understanding React Server Components",
  "subtitle": "A deep dive into Next.js 13 App Router",
  "description": "React Server Components represent a paradigm shift in how we build React applications. This article explores the benefits, challenges, and practical implementation strategies...",
  "topic": "React & Next.js",
  "tags": ["React", "Next.js", "Server Components", "Performance"],
  "status": "PRODUCTION",
  "videoUrl": "https://youtube.com/watch?v=tutorial"
}
```

**Status Values:** `IN_PROGRESS`, `UPDATED`, `DEVELOPMENT`, `PRODUCTION`

### Service Creation

**POST** `/api/v1/services`

```json
{
  "title": "Full-Stack Web Development",
  "subtitle": "End-to-end web application development",
  "description": [
    "Custom web application development",
    "RESTful API design and implementation",
    "Database design and optimization",
    "Cloud deployment and DevOps"
  ],
  "features": [
    "Responsive Design",
    "Performance Optimization",
    "Security Best Practices",
    "Scalable Architecture"
  ]
}
```

### FAQ Creation

**POST** `/api/v1/faq`

```json
{
  "question": "What technologies do you specialize in?",
  "answer": "I specialize in the MERN stack (MongoDB, Express, React, Node.js) with TypeScript. I also have experience with Next.js, PostgreSQL, Prisma, AWS services, and Docker."
}
```

### Testimonial Creation

**POST** `/api/v1/testimonials`

```json
{
  "clientName": "Sarah Johnson",
  "clientDesignation": "Product Manager at TechCorp",
  "rating": 5,
  "message": "Outstanding work! The portfolio CMS exceeded our expectations. Clean code, great communication, and delivered on time.",
  "platform": "UPWORK",
  "clientImage": "https://example.com/client-photo.jpg"
}
```

**Platform Values:** `UPWORK`, `LINKEDIN`

---

---

## Next Steps

1. ✅ Test all public endpoints
2. ✅ Get authentication working
3. ✅ Test CRUD operations for each module
4. ✅ Test trash & restore functionality
5. ✅ Verify soft delete works
6. ✅ Check cron job logs (trash cleanup)

Once everything works, you're ready to build the frontend! 🚀

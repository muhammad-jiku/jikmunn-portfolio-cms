# Testing Guide for Portfolio CMS API

## Getting Started

### Prerequisites

1. **Start the server:**

   ```bash
   cd server
   npm run dev
   ```

   Server runs on `http://localhost:5000`

2. **Test tools:**
   - **Swagger UI:** `http://localhost:5000/api/docs` (Recommended for beginners!)
   - **Postman:** Import `postman-sample-data.json`
   - **cURL:** Command line testing

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

### Get JWT Token

You need a JWT token from AWS Cognito for protected endpoints.

**Steps:**

1. Sign up/Sign in via AWS Cognito
2. Copy the JWT token
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

**Solution:** Add valid JWT token to Authorization header

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
4. Get JWT token for protected endpoints
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

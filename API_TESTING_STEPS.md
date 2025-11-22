# 🧪 API Testing Guide - Complete Step-by-Step

## Overview

This guide provides a complete walkthrough for testing your Portfolio CMS API endpoints using seed data and Swagger UI.

---

## 🎯 Testing Strategy Summary

| Method         | When to Use                     | Pros                                     |
| -------------- | ------------------------------- | ---------------------------------------- |
| **Swagger UI** | Manual testing, exploration     | ✅ Interactive, no setup, built-in auth  |
| **Postman**    | Complex workflows, team sharing | ✅ Collections, environments, automation |
| **Jest**       | Automated testing, CI/CD        | ✅ Regression testing, code coverage     |

**Recommended Order**: Seed Data → Swagger UI → Jest Tests

---

## 📝 Complete Testing Checklist

### Phase 1: Environment Setup ✅

- [ ] Install dependencies: `npm install`
- [ ] Configure `.env` file with database and AWS credentials
- [ ] Run migrations: `npm run prisma:migrate`
- [ ] Generate Prisma client: `npm run prisma:generate`

### Phase 2: Database Seeding ✅

- [ ] Create `server/prisma/seed.ts` (see TESTING.md)
- [ ] Add seed script to `package.json`: `"seed": "ts-node prisma/seed.ts"`
- [ ] Run seeding: `npm run seed`
- [ ] Verify data in Prisma Studio: `npm run prisma:studio`

### Phase 3: Server Startup ✅

- [ ] Start server: `npm run dev`
- [ ] Verify health endpoint: `curl http://localhost:5000/api/v1/health`
- [ ] Open Swagger UI: http://localhost:5000/api/docs

### Phase 4: Test Public Endpoints (No Auth) ✅

- [ ] GET `/api/v1/health` - Health check
- [ ] GET `/api/v1/projects/public` - Public projects
- [ ] GET `/api/v1/projects/public/{id}` - Single public project
- [ ] GET `/api/v1/blogs/public` - Public blogs
- [ ] GET `/api/v1/blogs/public/{id}` - Single public blog
- [ ] GET `/api/v1/about` - Portfolio statistics
- [ ] GET `/api/v1/skills` - All skills
- [ ] GET `/api/v1/services` - All services
- [ ] GET `/api/v1/testimonials` - All testimonials
- [ ] GET `/api/v1/faq` - All FAQs
- [ ] GET `/api/v1/resume/summary` - Resume summary
- [ ] GET `/api/v1/resume/education` - Education list
- [ ] GET `/api/v1/resume/experience` - Experience list
- [ ] GET `/api/v1/resume/achievements` - Achievements list
- [ ] GET `/api/v1/resume/references` - References list

### Phase 5: Authentication Setup ✅

- [ ] Get JWT token from AWS Cognito
- [ ] Click "Authorize" in Swagger UI (🔒 icon)
- [ ] Enter: `Bearer YOUR_JWT_TOKEN`
- [ ] Confirm authorization works

### Phase 6: Test Protected CRUD Operations ✅

**Projects Module:**

- [ ] POST `/api/v1/projects` - Create project
- [ ] GET `/api/v1/projects` - List all projects (all statuses)
- [ ] GET `/api/v1/projects/{id}` - Get single project
- [ ] PUT `/api/v1/projects/{id}` - Update project
- [ ] DELETE `/api/v1/projects/{id}` - Soft delete project
- [ ] POST `/api/v1/projects/{id}/images` - Upload images (4-10 files)
- [ ] DELETE `/api/v1/projects/{projectId}/images/{imageId}` - Delete image

**Blogs Module:**

- [ ] POST `/api/v1/blogs` - Create blog
- [ ] GET `/api/v1/blogs` - List all blogs (all statuses)
- [ ] GET `/api/v1/blogs/{id}` - Get single blog
- [ ] PUT `/api/v1/blogs/{id}` - Update blog
- [ ] DELETE `/api/v1/blogs/{id}` - Soft delete blog
- [ ] POST `/api/v1/blogs/{id}/images` - Upload images

**About Module:**

- [ ] GET `/api/v1/about` - Get statistics
- [ ] PUT `/api/v1/about` - Update statistics
- [ ] POST `/api/v1/about/reset` - Reset to defaults

**Services Module:**

- [ ] POST `/api/v1/services` - Create service
- [ ] GET `/api/v1/services` - List all services
- [ ] GET `/api/v1/services/{id}` - Get single service
- [ ] PUT `/api/v1/services/{id}` - Update service
- [ ] DELETE `/api/v1/services/{id}` - Delete service

**Skills Module:**

- [ ] POST `/api/v1/skills` - Create skill
- [ ] GET `/api/v1/skills` - List all skills
- [ ] GET `/api/v1/skills/{id}` - Get single skill
- [ ] PUT `/api/v1/skills/{id}` - Update skill
- [ ] DELETE `/api/v1/skills/{id}` - Delete skill

**Testimonials Module:**

- [ ] POST `/api/v1/testimonials` - Create testimonial
- [ ] GET `/api/v1/testimonials` - List all testimonials
- [ ] GET `/api/v1/testimonials/{id}` - Get single testimonial
- [ ] PUT `/api/v1/testimonials/{id}` - Update testimonial
- [ ] DELETE `/api/v1/testimonials/{id}` - Delete testimonial

**FAQ Module:**

- [ ] POST `/api/v1/faq` - Create FAQ
- [ ] GET `/api/v1/faq` - List all FAQs
- [ ] GET `/api/v1/faq/{id}` - Get single FAQ
- [ ] PUT `/api/v1/faq/{id}` - Update FAQ
- [ ] DELETE `/api/v1/faq/{id}` - Delete FAQ

**Resume Module:**

- [ ] PUT `/api/v1/resume/summary` - Update summary
- [ ] POST `/api/v1/resume/education` - Create education
- [ ] PUT `/api/v1/resume/education/{id}` - Update education
- [ ] DELETE `/api/v1/resume/education/{id}` - Delete education
- [ ] POST `/api/v1/resume/experience` - Create experience
- [ ] PUT `/api/v1/resume/experience/{id}` - Update experience
- [ ] DELETE `/api/v1/resume/experience/{id}` - Delete experience
- [ ] POST `/api/v1/resume/achievements` - Create achievement
- [ ] PUT `/api/v1/resume/achievements/{id}` - Update achievement
- [ ] DELETE `/api/v1/resume/achievements/{id}` - Delete achievement
- [ ] POST `/api/v1/resume/references` - Create reference
- [ ] PUT `/api/v1/resume/references/{id}` - Update reference
- [ ] DELETE `/api/v1/resume/references/{id}` - Delete reference

### Phase 7: Test Trash System ✅

- [ ] GET `/api/v1/trash` - List all trash items
- [ ] GET `/api/v1/trash/{id}` - Get single trash item
- [ ] POST `/api/v1/trash/{id}/restore` - Restore from trash
- [ ] DELETE `/api/v1/trash/{id}` - Permanent delete

### Phase 8: Test File Uploads ✅

- [ ] Upload 4-10 project images (minimum/maximum validation)
- [ ] Upload blog images
- [ ] Delete uploaded image
- [ ] Verify files in S3 bucket
- [ ] Check image URLs in database

### Phase 9: Test Pagination & Filtering ✅

**Pagination:**

- [ ] Test `page` parameter (page=1, page=2)
- [ ] Test `limit` parameter (limit=5, limit=10)
- [ ] Test `sortBy` parameter (sortBy=createdAt)
- [ ] Test `sortOrder` parameter (sortOrder=asc, sortOrder=desc)
- [ ] Verify `meta` in response (page, limit, total)

**Filtering:**

- [ ] Test `searchTerm` on searchable fields
- [ ] Test module-specific filters (category, status, platform, etc.)
- [ ] Test combined filters

### Phase 10: Run Automated Tests ✅

- [ ] Run all tests: `npm run test`
- [ ] Check coverage: `npm run test:coverage`
- [ ] Review test results
- [ ] Fix any failing tests

### Phase 11: Verification ✅

- [ ] Check database with Prisma Studio
- [ ] Review server logs (Morgan + Winston)
- [ ] Verify S3 uploads in AWS Console
- [ ] Test error responses (400, 401, 404, 500)
- [ ] Test validation errors (Zod schemas)
- [ ] Test rate limiting (make multiple rapid requests)

---

## 🔧 Quick Commands Reference

```bash
# Setup
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed

# Development
npm run dev
npm run prisma:studio

# Testing
npm run test
npm run test:watch
npm run test:coverage

# Build
npm run build
npm start
```

---

## 🌐 Important URLs

- **API Base**: http://localhost:5000
- **Swagger UI**: http://localhost:5000/api/docs
- **Prisma Studio**: http://localhost:5555
- **Health Check**: http://localhost:5000/api/v1/health

---

## 📚 Additional Resources

- **Complete Testing Guide**: [TESTING.md](./TESTING.md)
- **Quick Start**: [QUICKSTART.md](./QUICKSTART.md)
- **Main README**: [README.md](./README.md)
- **Backend PRD**: [docs/Portfolio_CMS_Backend_PRD.md](./docs/Portfolio_CMS_Backend_PRD.md)

---

## 🎯 Sample Test Data Locations

```
server/prisma/seed-data/
├── about.json          # Portfolio statistics
├── blogs.json          # Sample blog posts
├── faq.json            # FAQs
├── projects.json       # Portfolio projects
├── resume.json         # Resume data (all sections)
├── services.json       # Services offered
├── skills.json         # Technical skills
└── testimonials.json   # Client testimonials
```

---

## ✅ Testing Success Criteria

Your API testing is complete when:

1. ✅ All public endpoints return 200 OK
2. ✅ All protected endpoints work with JWT token
3. ✅ CRUD operations work for all modules
4. ✅ Trash & restore system functions correctly
5. ✅ File uploads work and files appear in S3
6. ✅ Pagination and filtering return correct results
7. ✅ All automated tests pass
8. ✅ Error handling works for invalid requests
9. ✅ Database contains expected seeded data
10. ✅ No TypeScript compilation errors

---

**🎉 Happy Testing!**

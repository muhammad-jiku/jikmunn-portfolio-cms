# **Project Requirements Document: Portfolio CMS (Backend)**

**Tech Stack:**

- Node.js + Express.js
- Prisma ORM
- PostgreSQL
- AWS Cognito (Authentication & Authorization)
- AWS S3 (Media Storage)
- AWS RDS (Database Hosting)
- AWS EC2 (Backend Server Hosting)
- AWS Route 53, VPC, IAM, CloudWatch

---

# **Functional Requirements**

| Requirement ID                     | Description                      | User Story                                               | Expected Behavior                                                          |
| ---------------------------------- | -------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| **AUTHENTICATION & AUTHORIZATION** |                                  |                                                          |                                                                            |
| BR001                              | Cognito User Pool Authentication | As a user, I want secure signup/login using Cognito.     | Backend validates Cognito access tokens using JWKS keys.                   |
| BR002                              | Role-Based Authorization         | As an admin, I want restricted endpoints based on roles. | Middleware checks Cognito role claims: super-admin, admin, author, editor. |
| BR003                              | Token Validation Middleware      | As a system, I must verify JWT tokens.                   | Verifier checks signature, expiration, issuer, and audience.               |
| BR004                              | Secure Refresh Flow              | As a user, I want persistent authentication.             | Relies on Cognito refresh tokens—backend does not store them.              |
| BR005                              | Protected Resource Access        | As a developer, I want clear protected APIs.             | All CRUD routes gated except public GET endpoints.                         |

---

## **PROJECTS MODULE**

| Requirement ID | Description                 | User Story                                  | Expected Behavior                                                          |
| -------------- | --------------------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| BR006          | Create Project              | As an admin, I want to create a project.    | Stores metadata via Prisma; uploads images/video to S3.                    |
| BR007          | Get All Projects            | As a visitor, I want to view all projects.  | Supports pagination, filtering, and searching.                             |
| BR008          | Get Project by ID           | As a visitor, I want full details.          | Returns detailed project with images, documentation, author, etc.          |
| BR009          | Update Project              | As admin, I want to modify project details. | Allows partial updates; updates S3 files if replaced.                      |
| BR010          | Delete Project              | As admin, I want to delete project safely.  | Soft-delete → moves to Trash module with timestamp.                        |
| BR011          | Upload Project Images       | As admin, I want to upload 4–10 images.     | S3 signed URL; paths stored in DB. At least 4 required, up to 10 optional. |
| BR012          | Upload Summary Video        | As admin, I want to upload video.           | S3 upload; DB stores video URL + metadata. Optional but recommended.       |
| BR012a         | Store Project Documentation | As admin, I want to add documentation link. | Stores documentation URL/file reference in DB.                             |
| BR012b         | Store Project Links         | As admin, I want to store project links.    | Stores live link, GitHub client link, GitHub server link separately in DB. |

---

## **BLOGS MODULE**

| Requirement ID | Description    | User Story                               | Expected Behavior                  |
| -------------- | -------------- | ---------------------------------------- | ---------------------------------- |
| BR013          | Create Blog    | As author, I want to publish blogs.      | Stores text, tags, images, video.  |
| BR014          | Get Blogs      | As visitor, I want to browse blogs.      | Supports tag filter + pagination.  |
| BR015          | Get Blog by ID | As visitor, I want full blog details.    | Returns full metadata.             |
| BR016          | Update Blog    | As author/admin, I want to edit blogs.   | Validates ownership (for authors). |
| BR017          | Delete Blog    | As author/admin, I want to delete blogs. | Soft delete → trash.               |

---

## **ABOUT MODULE**

| Requirement ID | Description        | User Story                        | Expected Behavior                       |
| -------------- | ------------------ | --------------------------------- | --------------------------------------- |
| BR018          | Manage About Stats | As admin, I want to update stats. | Stores clients, projects, hours, years. |

---

## **SERVICES MODULE**

| Requirement ID | Description           | User Story                                | Expected Behavior                                                            |
| -------------- | --------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| BR019          | Create Service        | As admin, I want to add services.         | Icon (SVG/image URL), title, subtitle, description, color (hex code) stored. |
| BR020          | Get Services          | As visitor, I want to view services.      | Public endpoint returns all services with styling info.                      |
| BR021          | Update/Delete Service | As admin, I want full CRUD.               | Validated updates; deletes may affect trash.                                 |
| BR021a         | Upload Service Icon   | As admin, I want to upload service icons. | S3 upload for custom icons or stores icon identifier for icon libraries.     |

---

## **SKILLS MODULE**

| Requirement ID | Description       | User Story                              | Expected Behavior                                                         |
| -------------- | ----------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| BR022          | Create Skill      | As admin, I want to add skills.         | Stores icon (SVG/image URL/icon identifier) + progress % + name.          |
| BR023          | Update Skill      | As admin, I want to modify skills.      | Partial updates allowed for name, progress, icon.                         |
| BR024          | Delete Skill      | As admin, I want cleanup.               | Soft delete or permanent delete.                                          |
| BR024a         | Upload Skill Icon | As admin, I want to upload skill icons. | S3 upload for custom icons or stores icon identifier from icon libraries. |

---

## **RESUME MODULE**

| Requirement ID | Description         | User Story                            | Expected Behavior                                                         |
| -------------- | ------------------- | ------------------------------------- | ------------------------------------------------------------------------- |
| BR025          | Manage Summary      | As admin, I want resume summary.      | Stores 2–3 lines + contact info (address, phone, email as bullet points). |
| BR026          | Manage Education    | As admin, I want CRUD.                | Degree, years, institution/university.                                    |
| BR027          | Manage Experience   | As admin, I want jobs + achievements. | Stores job title, company name, years, achievements (3–4 bullet points).  |
| BR028          | Manage Achievements | As admin, I want to add awards.       | Role, years, description (3–4 bullet points).                             |
| BR029          | Manage References   | As admin, I want references.          | Stores name, job title, company name for each reference.                  |

---

## **TESTIMONIALS MODULE**

| Requirement ID | Description             | User Story                                      | Expected Behavior                 |
| -------------- | ----------------------- | ----------------------------------------------- | --------------------------------- |
| BR030          | Create Testimonial      | As admin, I want to add testimonials.           | S3 image + metadata saved.        |
| BR031          | Edit/Delete Testimonial | As admin, I want to update/remove testimonials. | CRUD operations.                  |
| BR032          | Public Testimonials     | As visitor, I want visible testimonials.        | Returns active testimonials list. |

---

## **FAQ MODULE**

| Requirement ID | Description | User Story                     | Expected Behavior           |
| -------------- | ----------- | ------------------------------ | --------------------------- |
| BR033          | Manage FAQ  | As admin, I want CRUD on FAQs. | Stores Q&A sorted by index. |

---

## **TRASH MODULE**

| Requirement ID | Description               | User Story                         | Expected Behavior                               |
| -------------- | ------------------------- | ---------------------------------- | ----------------------------------------------- |
| BR034          | Trash Storage             | As admin, I want to restore items. | Trash table references deleted items' metadata. |
| BR035          | Auto Delete After 31 Days | As system, I want cleanup.         | Cron job permanently deletes expired items.     |

---

## **GENERAL BACKEND FEATURES**

| Requirement ID | Description      | User Story                             | Expected Behavior                          |
| -------------- | ---------------- | -------------------------------------- | ------------------------------------------ |
| BR036          | API Logging      | As dev, I want logs.                   | Morgan/Winston logs stored in CloudWatch.  |
| BR037          | Error Handling   | As user, I want clean error responses. | Global error handler with JSON formatting. |
| BR038          | Input Validation | As dev, I want safe data.              | Zod/express-validator checks.              |
| BR039          | Rate Limiting    | As system, I want to prevent abuse.    | 100 RPM per IP.                            |

---

# **Non-Functional Requirements**

| NFR ID  | Category        | Description                    | Expected Outcome                           |
| ------- | --------------- | ------------------------------ | ------------------------------------------ |
| NFRB001 | Security        | Must follow OWASP API Top 10.  | Protected endpoints and strict validation. |
| NFRB002 | Performance     | APIs under 300ms avg response. | Efficient DB queries + indexes.            |
| NFRB003 | Scalability     | Able to scale horizontally.    | Stateless API + load balancer.             |
| NFRB004 | Maintainability | Clean modular structure.       | Service-layer + modular routing.           |
| NFRB005 | Reliability     | Auto-restart & stable runtime. | PM2/systemd + EC2 auto recovery.           |
| NFRB006 | Observability   | Logs + metrics required.       | CloudWatch dashboards.                     |
| NFRB007 | Backup          | Daily DB backups.              | RDS automated backups.                     |
| NFRB008 | Availability    | 99.9% uptime.                  | Multi-AZ RDS + EC2 health checks.          |

---

# **Technical Implementation Details**

## **Backend Folder Structure**

```
server/
├── app/
│   ├── modules/
│   │   ├── admins/
│   │   │   ├── admins.controller.ts
│   │   │   ├── admins.service.ts
│   │   │   ├── admins.routes.ts
│   │   │   └── admins.validation.ts
│   │   ├── projects/
│   │   │   ├── projects.controller.ts
│   │   │   ├── projects.service.ts
│   │   │   ├── projects.routes.ts
│   │   │   └── projects.validation.ts
│   │   ├── blogs/
│   │   ├── about/
│   │   ├── services/
│   │   ├── skills/
│   │   ├── resume/
│   │   ├── testimonials/
│   │   ├── faq/
│   │   └── trash/
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   └── validation.middleware.ts
│   ├── utils/
│   │   ├── s3.util.ts
│   │   ├── logger.util.ts
│   │   └── response.util.ts
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── cognito.config.ts
│   │   └── aws.config.ts
│   └── routes/
│       └── index.routes.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── index.ts
```

---

## **API Endpoint Structure Example**

### Projects

```
POST   /api/v1/projects
GET    /api/v1/projects
GET    /api/v1/projects/:id
PUT    /api/v1/projects/:id
DELETE /api/v1/projects/:id
```

---

## **Prisma Schema Example (Simplified)**

```prisma
model Project {
  id               String        @id @default(uuid())
  title            String
  subtitle         String?
  description      String[]      // Bullet points
  category         String        // web application, mobile app application
  type             String        // beginner, intermediate, advanced, super-advanced
  status           String        // working, development, production, update
  documentationUrl String?       // Project documentation link
  liveLink         String?       // Live project link
  githubClientLink String?       // GitHub client repository link
  githubServerLink String?       // GitHub server repository link
  images           ProjectImage[]
  videoUrl         String?       // Summary video (optional but necessary)
  authorId         String
  publishedAt      DateTime      @default(now())
  deletedAt        DateTime?
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
}

model ProjectImage {
  id        String   @id @default(uuid())
  url       String
  order     Int      // For carousel ordering
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}
```

---

## **Cognito Token Verification Middleware**

```ts
import { CognitoJwtVerifier } from 'aws-jwt-verify';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const payload = await verifier.verify(token);
    req.user = payload;
    next();
  } catch {
    res.status(403).json({ message: 'Forbidden' });
  }
};
```

---

## **S3 Media Upload Flow**

1. Client requests signed URL
2. Backend returns AWS S3 signed URL
3. Client uploads directly to S3
4. Backend saves file metadata to DB

---

## **Deployment Architecture**

- EC2 → PM2 process manager
- RDS PostgreSQL (Multi-AZ)
- CloudWatch for logs + alarms
- API served behind Application Load Balancer
- S3 for images/videos
- VPC with public/private subnets

---

## **Backend Tech Stack Summary**

| Category        | Technology       |
| --------------- | ---------------- |
| Server          | Express.js       |
| ORM             | Prisma           |
| Database        | PostgreSQL (RDS) |
| Auth            | AWS Cognito      |
| Storage         | AWS S3           |
| Deployment      | AWS EC2          |
| Monitoring      | CloudWatch       |
| Process Manager | PM2              |

---

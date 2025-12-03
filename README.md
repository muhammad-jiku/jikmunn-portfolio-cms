# Jikmunn Portfolio CMS

A full-stack, device-responsive Content Management System for managing portfolio projects, blogs, services, skills, resume, testimonials, and FAQs.

## 🏗️ Project Structure

```
jikmunn-portfolio-cms/
├── .husky/                        # Git hooks (Husky)
├── docs/                          # Documentation
│   ├── Portfolio_CMS_Backend_PRD.md
│   ├── Backend_Implementation_Phases.md   # 🔥 12-phase backend guide
│   ├── Portfolio_CMS_Frontend_PRD.md
│   ├── Frontend_Implementation_Phases.md  # 🔥 13-phase frontend guide
│   └── Project requirements.txt
├── server/                        # Backend (Node.js + Express + Prisma)
│   ├── src/
│   │   ├── app.ts                    # Express app configuration
│   │   ├── index.ts                  # Server startup
│   │   ├── config/                   # Configuration files
│   │   │   ├── aws.config.ts
│   │   │   ├── cognito.config.ts
│   │   │   ├── database.config.ts
│   │   │   ├── socket.config.ts
│   │   │   ├── swagger.config.ts
│   │   │   └── index.config.ts
│   │   ├── utils/                    # Utilities (S3, logger, helpers)
│   │   │   ├── cron.util.ts
│   │   │   ├── helpers.util.ts
│   │   │   ├── logger.util.ts
│   │   │   ├── pagination.util.ts
│   │   │   ├── response.util.ts
│   │   │   ├── s3.util.ts
│   │   │   ├── socket.util.ts
│   │   │   └── types.util.ts
│   │   └── app/
│   │       ├── middleware/           # Auth, validation, error handling
│   │       │   ├── auth.middleware.ts
│   │       │   ├── errorHandler.middleware.ts
│   │       │   ├── rateLimiter.middleware.ts
│   │       │   └── validate.middleware.ts
│   │       ├── modules/              # Feature modules
│   │       │   ├── projects/
│   │       │   │   ├── projects.controller.ts
│   │       │   │   ├── projects.service.ts
│   │       │   │   ├── projects.routes.ts
│   │       │   │   ├── projects.validation.ts
│   │       │   │   ├── projects.interface.ts
│   │       │   │   └── projects.constants.ts
│   │       │   ├── blogs/
│   │       │   │   ├── blogs.controller.ts
│   │       │   │   ├── blogs.service.ts
│   │       │   │   ├── blogs.routes.ts
│   │       │   │   ├── blogs.validation.ts
│   │       │   │   ├── blogs.interface.ts
│   │       │   │   └── blogs.constants.ts
│   │       │   ├── about/
│   │       │   │   ├── about.controller.ts
│   │       │   │   ├── about.service.ts
│   │       │   │   ├── about.routes.ts
│   │       │   │   ├── about.validation.ts
│   │       │   │   └── about.interface.ts
│   │       │   ├── services/
│   │       │   │   ├── services.controller.ts
│   │       │   │   ├── services.service.ts
│   │       │   │   ├── services.routes.ts
│   │       │   │   ├── services.validation.ts
│   │       │   │   └── services.interface.ts
│   │       │   ├── skills/
│   │       │   │   ├── skills.controller.ts
│   │       │   │   ├── skills.service.ts
│   │       │   │   ├── skills.routes.ts
│   │       │   │   ├── skills.validation.ts
│   │       │   │   └── skills.interface.ts
│   │       │   ├── resume/
│   │       │   │   ├── summary/
│   │       │   │   │   ├── summary.controller.ts
│   │       │   │   │   ├── summary.service.ts
│   │       │   │   │   ├── summary.routes.ts
│   │       │   │   │   ├── summary.validation.ts
│   │       │   │   │   └── summary.interface.ts
│   │       │   │   ├── education/
│   │       │   │   │   ├── education.controller.ts
│   │       │   │   │   ├── education.service.ts
│   │       │   │   │   ├── education.routes.ts
│   │       │   │   │   ├── education.validation.ts
│   │       │   │   │   └── education.interface.ts
│   │       │   │   ├── experience/
│   │       │   │   │   ├── experience.controller.ts
│   │       │   │   │   ├── experience.service.ts
│   │       │   │   │   ├── experience.routes.ts
│   │       │   │   │   ├── experience.validation.ts
│   │       │   │   │   └── experience.interface.ts
│   │       │   │   ├── achievements/
│   │       │   │   │   ├── achievements.controller.ts
│   │       │   │   │   ├── achievements.service.ts
│   │       │   │   │   ├── achievements.routes.ts
│   │       │   │   │   ├── achievements.validation.ts
│   │       │   │   │   └── achievements.interface.ts
│   │       │   │   └── references/
│   │       │   │       ├── references.controller.ts
│   │       │   │       ├── references.service.ts
│   │       │   │       ├── references.routes.ts
│   │       │   │       ├── references.validation.ts
│   │       │   │       └── references.interface.ts
│   │       │   ├── testimonials/
│   │       │   │   ├── testimonials.controller.ts
│   │       │   │   ├── testimonials.service.ts
│   │       │   │   ├── testimonials.routes.ts
│   │       │   │   ├── testimonials.validation.ts
│   │       │   │   └── testimonials.interface.ts
│   │       │   ├── faq/
│   │       │   │   ├── faq.controller.ts
│   │       │   │   ├── faq.service.ts
│   │       │   │   ├── faq.routes.ts
│   │       │   │   ├── faq.validation.ts
│   │       │   │   └── faq.interface.ts
│   │       │   ├── trash/
│   │       │   │   ├── trash.controller.ts
│   │       │   │   ├── trash.service.ts
│   │       │   │   ├── trash.routes.ts
│   │       │   │   ├── trash.validation.ts
│   │       │   │   ├── trash.interface.ts
│   │       │   │   └── trash.constants.ts
│   │       │   └── common/           # Shared services
│   │       │       └── maintenance.service.ts
│   │       └── routes/               # API routes
│   │           └── index.routes.ts
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema
│   │   ├── seed.ts                   # Database seeding
│   │   ├── migrations/               # Migration history
│   │   └── seed-data/                # JSON seed files
│   ├── logs/                         # Winston logs (gitignored)
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── eslint.config.mjs
│   └── README.md
└── client/                        # Frontend (Next.js)
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/               # Auth pages
    │   │   │   ├── login/page.tsx
    │   │   │   ├── register/page.tsx
    │   │   │   └── forgot-password/page.tsx
    │   │   ├── dashboard/            # Protected dashboard
    │   │   │   ├── page.tsx          # Main dashboard
    │   │   │   ├── about/page.tsx
    │   │   │   ├── blogs/page.tsx
    │   │   │   ├── faq/page.tsx
    │   │   │   ├── projects/page.tsx
    │   │   │   ├── resume/page.tsx
    │   │   │   ├── services/page.tsx
    │   │   │   ├── skills/page.tsx
    │   │   │   ├── testimonials/page.tsx
    │   │   │   └── trash/page.tsx
    │   │   ├── api/og/               # Open Graph image generator
    │   │   │   └── route.tsx
    │   │   ├── blogs/[id]/page.tsx   # Public blog pages
    │   │   ├── projects/[id]/page.tsx # Public project pages
    │   │   ├── globals.css
    │   │   ├── layout.tsx            # Root layout (with WebVitals)
    │   │   ├── page.tsx              # Home page
    │   │   ├── sitemap.ts            # Dynamic sitemap generation
    │   │   └── robots.ts             # Robots.txt configuration
    │   ├── components/
    │   │   ├── about/AboutForm.tsx
    │   │   ├── auth/
    │   │   │   ├── LoginForm.tsx
    │   │   │   ├── RegisterForm.tsx
    │   │   │   ├── ForgotPasswordForm.tsx
    │   │   │   └── ProtectedRoute.tsx
    │   │   ├── blogs/
    │   │   │   ├── BlogForm.tsx
    │   │   │   └── BlogsTable.tsx
    │   │   ├── dashboard/
    │   │   │   ├── Charts.tsx
    │   │   │   ├── DashboardLayout.tsx
    │   │   │   ├── Sidebar.tsx
    │   │   │   ├── StatCard.tsx
    │   │   │   └── Topbar.tsx
    │   │   ├── faq/
    │   │   │   ├── FAQForm.tsx
    │   │   │   └── FAQTable.tsx
    │   │   ├── projects/
    │   │   │   ├── ProjectForm.tsx
    │   │   │   ├── ProjectsTable.tsx
    │   │   │   └── MediaUpload.tsx
    │   │   ├── providers/
    │   │   │   ├── ReduxProvider.tsx
    │   │   │   ├── ThemeProvider.tsx
    │   │   │   └── SocketProvider.tsx
    │   │   ├── resume/
    │   │   │   ├── ResumeSummaryForm.tsx
    │   │   │   ├── EducationForm.tsx
    │   │   │   ├── ExperienceForm.tsx
    │   │   │   ├── AchievementsForm.tsx
    │   │   │   └── ReferencesForm.tsx
    │   │   ├── services/
    │   │   │   ├── ServiceForm.tsx
    │   │   │   └── ServicesTable.tsx
    │   │   ├── skills/
    │   │   │   ├── SkillForm.tsx
    │   │   │   └── SkillsTable.tsx
    │   │   ├── testimonials/
    │   │   │   ├── TestimonialForm.tsx
    │   │   │   └── TestimonialsTable.tsx
    │   │   ├── trash/TrashTable.tsx
    │   │   ├── ui/
    │   │   │   ├── Toaster.tsx       # Toast notifications (Sonner)
    │   │   │   ├── Skeleton.tsx      # Loading skeletons (5 variants)
    │   │   │   ├── CommandPalette.tsx # Cmd+K navigation
    │   │   │   ├── Animations.tsx    # Framer Motion wrappers
    │   │   │   ├── Form.tsx          # Reusable form components
    │   │   │   ├── WizardForm.tsx    # Multi-step wizard
    │   │   │   └── FileUpload.tsx    # React Dropzone upload
    │   │   ├── performance/
    │   │   │   └── WebVitals.tsx     # Web Vitals monitoring
    │   │   └── notifications/
    │   │       ├── NotificationBell.tsx  # Real-time notification dropdown
    │   │       ├── ActiveUsers.tsx       # Live connection indicator
    │   │       └── EditingIndicator.tsx  # Collaborative editing UI
    │   ├── store/
    │   │   ├── index.ts              # Store configuration
    │   │   ├── hooks.ts              # Typed Redux hooks
    │   │   └── slices/
    │   │       └── authSlice.ts
    │   ├── lib/
    │   │   ├── api/                  # API integration
    │   │   │   ├── about.ts
    │   │   │   ├── blogs.ts
    │   │   │   ├── faq.ts
    │   │   │   ├── projects.ts
    │   │   │   ├── resume.ts
    │   │   │   ├── services.ts
    │   │   │   ├── skills.ts
    │   │   │   ├── testimonials.ts
    │   │   │   └── trash.ts
    │   │   ├── cognito.ts            # AWS Cognito integration
    │   │   ├── permissions.ts        # RBAC helpers
    │   │   ├── socket.ts             # Socket.IO client utility
    │   │   ├── toast.ts              # Toast utility functions
    │   │   ├── accessibility.tsx     # WCAG 2.1 AA utilities
    │   │   ├── lazy.tsx              # Code splitting utilities
    │   │   ├── cache.ts              # Caching strategies (ISR/SWR)
    │   │   ├── performance.ts        # Performance monitoring
    │   │   ├── seo.ts                # SEO metadata utilities
    │   │   ├── client-metadata.ts    # Client-side metadata helpers
    │   │   └── utils.ts              # Utility functions
    │   ├── types/
    │   │   ├── about.ts
    │   │   ├── auth.ts
    │   │   ├── blog.ts
    │   │   ├── faq.ts
    │   │   ├── project.ts
    │   │   ├── resume.ts
    │   │   ├── service.ts
    │   │   ├── skill.ts
    │   │   ├── testimonial.ts
    │   │   └── trash.ts
    │   └── middleware.ts             # Route protection
    ├── public/                       # Static assets
    ├── .env.local.example
    ├── next.config.ts                # Performance optimizations
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── eslint.config.mjs
    ├── package.json
    └── README.md
```

## 📚 Documentation

### Quick Reference

- **[Backend Implementation Phases](docs/Backend_Implementation_Phases.md)** - Complete 12-phase backend architecture guide (76 API routes)
- **[Frontend Implementation Phases](docs/Frontend_Implementation_Phases.md)** - Comprehensive 13-phase frontend roadmap (77 requirements)
- **[Backend PRD](docs/Portfolio_CMS_Backend_PRD.md)** - Detailed backend requirements
- **[Frontend PRD](docs/Portfolio_CMS_Frontend_PRD.md)** - Detailed frontend requirements
- **[Backend API Documentation](server/README.md)** - All 76 API endpoints with examples
- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Testing Guide](TESTING.md)** - Comprehensive API testing workflow
- **[Husky Setup Guide](HUSKY_SETUP.md)** - Git hooks for code quality enforcement

## 📊 Development Progress

### Frontend Implementation Status

- ✅ **Phase 1:** Authentication & Authorization (5/5 FR) - COMPLETE
- ✅ **Phase 2:** Dashboard & Navigation (3/3 FR) - COMPLETE
- ✅ **Phase 3:** Projects Module (6/6 FR) - COMPLETE
- ✅ **Phase 4:** Blogs Module (5/5 FR) - COMPLETE
- ✅ **Phase 5:** Content Modules (14/14 FR) - COMPLETE
- ✅ **Phase 6:** Trash & System Management (5/5 FR) - COMPLETE
- ✅ **Phase 7:** UI/UX Enhancements (7/7 FR) - COMPLETE
- ✅ **Phase 8:** Real-time Features (3/3 FR) - COMPLETE
- ✅ **Phase 9:** Forms & Validation (3/3 FR) - COMPLETE
- ✅ **Phase 10:** Performance Optimization (4/4 FR) - COMPLETE
- ✅ **Phase 11:** SEO & Metadata (3/3 FR) - COMPLETE
- ⏳ **Phase 12:** Testing & Quality (3/3 FR) - PENDING
- ⏳ **Phase 13:** Deployment & DevOps (4/4 FR) - PENDING

**Progress:** 58/65 functional requirements completed (89%)

## 🛠️ Development Workflow

**Git Hooks (Husky)** - Automated code quality checks enabled!

> 📖 See [Husky Setup Guide](HUSKY_SETUP.md) for complete configuration details.

- ✅ **Pre-commit:** Auto-lint and format code (ESLint + Prettier)
- ✅ **Pre-push:** TypeScript type checking (server + client)
- ✅ **Monorepo Scripts:** Run dev/build/test for both projects

```bash
# Run both server and client concurrently
npm run dev

# Build entire project
npm run build

# Lint everything
npm run lint

# Type check both projects
npm run type-check
```

## 🎉 Project Status

**Backend: 100% Complete** - All 12 phases implemented and production-ready!

> 📖 See [Backend Implementation Phases](docs/Backend_Implementation_Phases.md) for detailed breakdown of all completed features.

- ✅ **10 Content Modules:** Projects, Blogs, About, Services, Skills, Resume (5 sub-modules), Testimonials, FAQ, Trash
- ✅ **Authentication:** AWS Cognito with role-based access control
- ✅ **Infrastructure:** Logging, rate limiting, cron jobs, error handling
- ✅ **Documentation:** Swagger/OpenAPI at `/api/docs`
- ✅ **Testing:** Jest framework with unit tests
- ✅ **Security:** Helmet, CORS, JWT verification, soft delete

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

### Frontend (Phase 1-11 ✅ Complete)

- **Framework:** Next.js 16+ (App Router)
- **Styling:** Tailwind CSS v4
- **State Management:** Redux Toolkit with RTK Query
- **Authentication:** AWS Cognito integration
- **UI Components:** Lucide Icons, Custom Components
- **Theme:** Dark/Light/System mode with Next Themes
- **Forms:** React Hook Form + Zod validation
- **File Upload:** React Dropzone (drag-drop, previews)
- **Charts:** Recharts (Area, Bar, Pie)
- **Notifications:** Sonner (Toast notifications)
- **Animations:** Framer Motion (7 animation components)
- **Accessibility:** WCAG 2.1 AA compliance
- **Command Palette:** cmdk (Cmd+K navigation)
- **Real-time:** Socket.IO client (auto-reconnect)
- **Performance:** Web Vitals monitoring, code splitting, caching (ISR/SWR)
- **SEO:** Dynamic metadata, sitemap generation, Open Graph images
- **Deployment:** AWS Amplify Gen 2 (ready)

> 📖 See [Frontend Implementation Phases](docs/Frontend_Implementation_Phases.md) for complete 13-phase development roadmap.

## 📋 Features

### ✅ Completed

**Backend (100% Complete - 76 API Routes):**

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
- [x] **General Backend Features:**
  - Comprehensive logging (Winston with file rotation)
  - HTTP request logging (Morgan)
  - Rate limiting (configurable per IP)
  - Security headers (Helmet)
  - CORS configuration
  - API versioning (/api/v1)
  - Compression middleware
  - Global error handling
- [x] **Production Readiness (Phase 12):**
  - Swagger/OpenAPI documentation (available at /api/docs)
  - Jest testing framework setup
  - Unit tests for utilities
  - .env.example configuration template
- [x] **Development Tools:**
  - Development-only endpoints for user role management (NODE_ENV isolated)
  - Maintenance mode API for displaying system status messages
- [x] **Recent Schema Updates:**
  - BlogStatus enum (IN_PROGRESS, UPDATED, DEVELOPMENT, PRODUCTION)
  - ProjectStatus enum updated (IN_PROGRESS, DEVELOPMENT, PRODUCTION, UPDATED)
  - Tech stack structure for projects (JSON field with categorized technologies)
  - Development tools tracking for projects (JSON field)
  - Blog topic and status fields for better content organization
  - Public/authenticated route separation (/public for unauthenticated users)
- [x] **Code Quality:**
  - All TypeScript errors resolved across codebase

**Frontend (Phase 1-11 Complete):**

**Phase 1: Authentication & Authorization ✅**

- [x] AWS Cognito integration (login, register, logout, password recovery)
- [x] Redux Toolkit store with authentication slice
- [x] Role-based access control matching backend (SUPER_ADMIN, ADMIN, EDITOR, AUTHOR)
- [x] Protected routes with ProtectedRoute component
- [x] Permission helpers (hasRole, isAdmin, isSuperAdmin, canEdit, canCreate)
- [x] Authentication forms with Zod validation:
  - LoginForm (email/password, remember me)
  - RegisterForm (role selection, strong password validation)
  - ForgotPasswordForm (2-step verification with code)
- [x] Authentication pages:
  - /login - Sign in page
  - /register - Account creation
  - /forgot-password - Password recovery
  - /dashboard - Protected dashboard
- [x] Redux providers integrated in root layout
- [x] Next Themes provider for dark/light mode
- [x] TypeScript types for all auth interfaces
- [x] Environment configuration template (.env.local.example)
- [x] ESLint + Prettier passing with 0 errors

**Phase 2: Dashboard & Navigation ✅**

- [x] Interactive dashboard with 8 stat cards showing key metrics
- [x] Charts visualization (Area, Bar, Pie) using Recharts
- [x] Collapsible sidebar navigation with responsive toggle
- [x] Topbar with notifications, theme toggle, and user menu
- [x] DashboardLayout component wrapping all protected pages
- [x] Lucide icons integration throughout UI
- [x] Mobile-responsive hamburger menu

**Phase 3: Projects Module ✅**

- [x] Projects data table with sorting and filtering
- [x] Create/Edit/Delete projects with modal form
- [x] Comprehensive project form fields:
  - Basic info (title, category, description, status)
  - Project details (client, duration, team size)
  - URLs (GitHub, Live demo)
  - Featured project toggle
- [x] Tech stack management (categorized: frontend, backend, database, deployment, tools)
- [x] Features, challenges, and learnings tag management
- [x] MediaUpload component with drag-drop functionality
- [x] Image/video upload with preview and reordering
- [x] Project details page (/dashboard/projects/[id]) with:
  - Media gallery with thumbnail navigation
  - Comprehensive project information display
  - Tech stack categorized display
  - Features, challenges, learnings sections
  - Project timeline and dates
- [x] Public project details page (/projects/[id]) for portfolio visitors:
  - Clean, visitor-friendly design without dashboard UI
  - Full project information display with enhanced styling
  - Media gallery with carousel navigation
  - Tech stack, features, challenges, learnings sections
  - No authentication required
- [x] API integration with backend endpoints (GET, POST, PUT, DELETE)
- [x] Search functionality for filtering projects
- [x] Status badges with color coding

**Phase 4: Blogs Module ✅**

- [x] Blogs data table with sorting and filtering (status, tags, search)
- [x] Create/Edit/Delete blogs with modal form
- [x] Comprehensive blog form fields:
  - Basic info (title, subtitle, topic)
  - Rich text content area (markdown-ready)
  - Tag management with add/remove
  - Status selection (In Progress, Development, Updated, Production)
  - Video URL for explanations
- [x] Blog details page (/dashboard/blogs/[id]) with:
  - Full blog content display
  - Meta information (author, publish date, topic)
  - Tags display
  - Video link
  - Image gallery
  - Timeline information
- [x] Public blog page (/blogs/[id]) for visitors:
  - Clean, reader-friendly design
  - No authentication required
  - Full content display with proper typography
  - Tag navigation
  - Video integration
  - Image gallery with hover effects
- [x] API integration with backend endpoints
- [x] Status-based filtering and statistics
- [x] Blog count by status (total, published, in progress, development)

**Phase 5: Content Modules ✅**

- [x] About statistics management (/dashboard/about):
  - Number of clients, projects, hours of support
  - Years of experience
  - Update and reset functionality
- [x] Services CRUD (/dashboard/services):
  - Icon picker with emoji/URL support (16 preset icons)
  - Color picker with 12 preset colors + custom hex input
  - Service form (title, subtitle, description)
  - Live preview of icon and color
  - Services table with color-coded icons
- [x] Skills management (/dashboard/skills):
  - Progress indicator (0-100% with range slider)
  - Icon picker with 16 skill icons
  - Skills table with visual progress bars
  - Color-coded progress (green 80%+, blue 60%+, yellow 40%+, red <40%)
  - Statistics (total skills, average progress, expert level count)
- [x] Resume module (/dashboard/resume) with 5 sub-sections:
  - **Summary:** Professional summary, address, phone, email
  - **Education:** Degree, years, university (CRUD)
  - **Experience:** Job title, company, years, achievements (CRUD with bullet points)
  - **Achievements:** Role, years, description (CRUD with bullet points)
  - **References:** Name, job title, company (CRUD)
  - All sections with add/edit/delete modals
- [x] Testimonials management (/dashboard/testimonials):
  - Client testimonials with name, job position, image
  - Platform selection (Upwork, LinkedIn, Facebook, Twitter, Instagram, Other)
  - Star ratings (1-5)
  - Featured testimonial toggle
- [x] FAQ management (/dashboard/faq):
  - Question and answer pairs
  - Order management for display sequence
  - Accordion interface for better UX

**Phase 6: Trash & System Management ✅**

- [x] Trash page (/dashboard/trash):
  - View all deleted items with entity type and ID
  - Days remaining counter (31-day auto-delete policy)
  - Color-coded expiry status (green >7 days, orange ≤7 days, red expired)
  - Pagination support for large trash lists
- [x] Restore functionality:
  - Restore deleted items back to their original modules
  - Confirmation dialog before restore
  - Success/error message feedback
- [x] Permanent delete:
  - Double-confirmation for irreversible deletions
  - Warning message about data loss
- [x] Auto-delete warnings:
  - Visual banner warning about 31-day auto-delete policy
  - Days remaining calculation and display
  - Expired item indicators
- [x] Cleanup expired items:
  - Admin function to remove all items older than 31 days
  - Batch deletion with count feedback
  - Confirmation before cleanup execution
- [x] Trash API integration:
  - getAll() with pagination
  - restore() for item recovery
  - permanentlyDelete() for final deletion
  - cleanup() for expired items removal
- [x] TrashTable component with full functionality
- [x] Trash types (Trash, RestoreResult, CleanupResult)
  - Platform selection (Upwork/LinkedIn)
  - Card-based display with quote icon
  - Image fallback with initial letter
- [x] FAQ management (/dashboard/faq):
  - Question/answer pairs
  - Order management for display sequence
  - Accordion interface with expand/collapse
  - Color-coded expansion indicators

**Phase 7: UI/UX Enhancements ✅**

- [x] Toast notifications with Sonner:
  - 7 utility functions (success, error, info, warning, loading, promise, dismiss)
  - Theme-aware with richColors support
  - Auto-dismiss with configurable duration
- [x] Loading skeletons:
  - 5 variants (base, table, card, stat card, form)
  - Animated pulse effect
  - Responsive sizing
- [x] Framer Motion animations:
  - 7 animation components (FadeIn, SlideIn, ScaleIn, StaggerContainer, StaggerItem, AnimatedModal, PageTransition)
  - Customizable duration, delay, and direction
  - Smooth transitions across pages
- [x] Command Palette (Cmd+K):
  - 11 menu items in 4 groups (Navigation, Content, System, User)
  - Keyboard-driven navigation
  - Search functionality
  - Theme-aware modal overlay
- [x] WCAG 2.1 AA accessibility:
  - Focus management (trapFocus utility)
  - Keyboard navigation (handleEnterKey)
  - ARIA labels and descriptions
  - Screen reader utilities (announceToScreenReader)
  - SkipToContent component
  - sr-only CSS utility class
- [x] Dark/Light/System theme integration:
  - Next-themes provider
  - Persistent theme selection
  - Smooth transitions

**Phase 8: Real-time Features ✅**

- [x] Socket.IO client integration:
  - Auto-reconnect with exponential backoff
  - Connection status tracking
  - Authentication with idToken
  - Type-safe event system (35+ event types)
- [x] Real-time notifications:
  - NotificationBell component in Topbar
  - Dropdown with notification history (last 50)
  - Unread counter badge
  - Event icons and color-coding
  - Timestamp formatting (just now, Xm ago, Xh ago)
- [x] Toast notifications on CRUD events:
  - Automatic toast on create/update/delete/restore
  - Event-specific styling and icons
  - Integrated with Sonner toast system
- [x] SocketProvider with React Context API:
  - Centralized Socket.IO connection management
  - Automatic connection on auth state change
  - Event subscription system
  - Notification state management
  - Redux integration for auth tokens
- [x] Collaborative editing indicators:
  - ActiveUsers component showing connection count
  - EditingIndicator showing who's editing
  - Real-time user activity tracking

**Phase 9: Forms & Validation ✅**

- [x] Reusable form components (Form.tsx):
  - FormField wrapper with label, error, description
  - Input with React Hook Form registration
  - Textarea with React Hook Form registration
  - Select with options array
  - Checkbox with label
  - FormButton with loading state and variants
- [x] Multi-step wizard form (WizardForm.tsx):
  - Progress stepper with check icons
  - Connector lines between steps
  - Step labels with descriptions
  - Navigation buttons (Previous/Next/Complete)
  - Keyboard navigation support
  - Step validation and disabled state management
  - StepContent helper component
- [x] File upload with React Dropzone (FileUpload.tsx):
  - Drag & drop support
  - File type validation (accept prop)
  - Size validation (configurable maxSize)
  - Image preview generation
  - Existing files display
  - Remove file functionality
  - Error handling and display
  - Next.js Image component for optimization

**Phase 10: Performance Optimization ✅**

- [x] Next.js configuration optimizations (next.config.ts):
  - Image optimization (AVIF/WebP formats, device sizes, 1-year cache TTL)
  - Remote patterns for AWS S3 images
  - Compiler optimizations (remove console in production)
  - Package import optimization (lucide-react, recharts, framer-motion)
  - Compression enabled
- [x] Code splitting utilities (lazy.tsx):
  - lazyLoad() - Dynamic imports with SSR support
  - lazyLoadClient() - Client-side only lazy loading
  - preloadComponent() - Prefetch for faster transitions
  - lazyLoadMultiple() - Parallel component loading
  - Loading fallbacks with spinners
- [x] Caching strategies (cache.ts):
  - ISR configuration helpers
  - Cache duration constants (static, semi-static, dynamic, realtime)
  - ClientCache class with TTL (Time-To-Live)
  - LRUCache for memory-efficient caching
  - SWR configuration
  - Cache invalidation with wildcard support
- [x] Performance monitoring (performance.ts):
  - PerformanceMarker class for custom timing
  - useRenderTracking() hook for component performance
  - trackAPICall() for API timing
  - getPerformanceMetrics() for navigation/paint metrics
  - Long task observer
- [x] Web Vitals reporting (WebVitals.tsx):
  - Auto-reports CLS, FCP, LCP, TTFB, INP
  - Google Analytics integration ready
  - Custom analytics endpoint support
  - Dynamic import to avoid blocking main bundle

**Phase 11: SEO & Metadata ✅**

- [x] SEO utilities library (seo.ts):
  - generateMetadata() for complete page metadata
  - generateProjectMetadata() for project pages
  - generateBlogMetadata() for blog pages
  - createBreadcrumbStructuredData() for navigation
  - createOrganizationStructuredData() for branding
  - Open Graph and Twitter card support
- [x] Dynamic sitemap generation (sitemap.ts):
  - Fetches all public projects and blogs from database
  - Generates sitemap with proper priorities and change frequencies
  - Includes last modified dates
- [x] Robots.txt configuration (robots.ts):
  - Allows all user agents
  - Disallows admin routes (/dashboard, /api)
  - Includes sitemap URL
- [x] OG image generator (api/og/route.tsx):
  - Dynamic Open Graph image generation
  - Supports blogs and projects with custom styling
  - Displays title, category, and status
- [x] Client-side metadata utilities (client-metadata.ts):
  - updatePageMetadata() for dynamic meta tag updates
  - generateOGImageUrl() for social sharing images
  - generateArticleStructuredData() for rich snippets
  - injectStructuredData() for JSON-LD
- [x] Metadata added to all pages:
  - Root layout with site-wide defaults
  - Home page with custom metadata
  - Auth pages (login, register, forgot-password) with noindex
  - Dashboard layout with noindex
  - Blog and project layouts with category metadata
  - Dynamic blog/project pages with article structured data

### 🚧 In Progress

- [ ] Frontend Phase 12-13: Testing, Deployment
- [ ] Testing (Jest, Playwright)

### 📹 Upcoming

- [ ] AWS deployment setup
- [ ] Integration & E2E tests
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

6. Seed database with test data:

```bash
npm run seed
```

This populates your database with sample data from `server/prisma/seed-data/` (about, blogs, faq, projects, resume, services, skills, testimonials).

7. Start development server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

API documentation available at `http://localhost:5000/api/docs`

### API Endpoints

**Base URL:** `http://localhost:5000/api/v1`

#### Public Endpoints (No Authentication Required)

- `GET /health` - Health check
- `GET /projects/public` - Get all PRODUCTION projects (unauthenticated)
- `GET /projects/public/:id` - Get PRODUCTION project by ID (unauthenticated)
- `GET /blogs/public` - Get all PRODUCTION blogs (unauthenticated)
- `GET /blogs/public/:id` - Get PRODUCTION blog by ID (unauthenticated)
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

#### Authenticated Endpoints (Requires ID Token)

- `GET /projects` - Get all projects (all statuses, requires authentication)
- `GET /projects/:id` - Get project by ID (all statuses, requires authentication)
- `GET /blogs` - Get all blogs (all statuses, requires authentication)
- `GET /blogs/:id` - Get blog by ID (all statuses, requires authentication)

#### Protected Endpoints (Admin/Super Admin only)

- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project (soft delete)
- `POST /projects/:id/images` - Upload project images
- `DELETE /projects/:projectId/images/:imageId` - Delete project image
- `POST /blogs` - Create blog
- `PUT /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog (soft delete)
- `POST /blogs/:id/images` - Upload blog images
- `POST /services` - Create service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service (soft delete)
- `POST /skills` - Create skill
- `PUT /skills/:id` - Update skill
- `DELETE /skills/:id` - Delete skill (soft delete)
- `PUT /about` - Update about statistics
- `POST /about/reset` - Reset about statistics to default
- `POST /resume/summary` - Create resume summary
- `PUT /resume/summary/:id` - Update resume summary
- `DELETE /resume/summary/:id` - Delete resume summary
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
- `GET /maintenance/status` - Get system maintenance status (public)
- `PUT /maintenance/toggle` - Toggle maintenance mode (super admin/admin only)
- `GET /dev/users` - List Cognito users with roles (dev mode only)
- `PUT /dev/users/role` - Update user role in Cognito (dev mode only)

## 📚 Documentation

Detailed documentation available:

- [Backend PRD](./docs/Portfolio_CMS_Backend_PRD.md) - Complete backend requirements
- [Frontend PRD](./docs/Portfolio_CMS_Frontend_PRD.md) - Frontend specifications
- [Quick Start Guide](./QUICKSTART.md) - Get started in 5 minutes
- [Testing Guide](./TESTING.md) - API testing with Swagger, Postman, cURL
- [Schema Updates](./SCHEMA_UPDATES.md) - Latest database schema changes

**API Documentation:** Available at `http://localhost:5000/api/docs` (Swagger UI)

## 🔐 Authentication

Uses AWS Cognito ID tokens (contains custom:role). Include in request headers:

```
Authorization: Bearer <your-jwt-token>
```

**Available Roles:**

- `SUPER_ADMIN` - Full access
- `ADMIN` - Manage all content
- `AUTHOR` - Create/edit own content
- `EDITOR` - Edit content

## 🧪 Testing

Test the API with sample data:

```bash
npm run seed              # Populate database with test data
npm run dev               # Start development server
```

Then visit:

- **Swagger UI:** http://localhost:5000/api/docs
- **Prisma Studio:** `npm run prisma:studio`

For comprehensive testing guide, see [TESTING.md](./TESTING.md) and [API_TESTING_STEPS.md](./API_TESTING_STEPS.md).

## 🗄️ Database Schema

Key entities:

- Users (with roles)
- Projects (with category, type, status, images, links, **tech stack**, **development tools**)
- Blogs (with **topic**, **status**, tags, images)
- About (portfolio stats)
- Services (with icons, colors)
- Skills (with progress indicators)
- Resume sections (Summary, Education, Experience, Achievements, References)
- Testimonials (with platform: Upwork/LinkedIn)
- FAQs (with ordering)
- Trash (soft delete recovery with 31-day retention)
- Maintenance (system maintenance mode with messages)

**Recent Enhancements:**

- Projects now support structured tech stack (Frontend, Backend, Database, etc.)
- Projects track development tools used (Code Editor, Version Control, etc.)
- Blogs include topic categorization and lifecycle status tracking
- Maintenance mode for displaying update messages to users

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

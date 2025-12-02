# Portfolio CMS Frontend

Modern, responsive frontend for Portfolio CMS built with Next.js 16, React 19, and Tailwind CSS v4.

> 📖 **For complete implementation guide, see [Frontend Implementation Phases](../docs/Frontend_Implementation_Phases.md)** - 13 phases, 77 requirements, production-ready roadmap.

## 🚀 Tech Stack

| Category       | Technology            | Purpose                              |
| -------------- | --------------------- | ------------------------------------ |
| **Framework**  | Next.js 16+           | App Router, Server/Client Components |
| **UI Library** | React 19              | Latest React features                |
| **Styling**    | Tailwind CSS v4       | Utility-first CSS with PostCSS       |
| **Components** | Shadcn/ui             | Accessible component library         |
| **State**      | Redux Toolkit         | Global state with RTK Query          |
| **Auth**       | AWS Cognito           | User authentication                  |
| **Real-time**  | Socket.IO             | Live updates                         |
| **Forms**      | React Hook Form + Zod | Type-safe validation                 |
| **Theme**      | Next Themes           | Dark/Light/System modes              |
| **Animations** | Framer Motion         | Smooth transitions                   |
| **Charts**     | Recharts              | Dashboard visualizations             |
| **Deployment** | AWS Amplify Gen 2     | Serverless hosting                   |

## 🎨 Design Inspiration

Based on **Phoenix Admin Dashboard** - modern, dark/light integrated, responsive design.

- Demo: [Phoenix Dashboard](https://prium.github.io/phoenix/v1.24.0/index.html?theme-control=true&color-scheme=dark)

## 📊 Implementation Status

- ✅ **Phase 1:** Authentication (5 FR) - Login, Register, Forgot Password, RBAC, Protected Routes
- ✅ **Phase 2:** Dashboard (3 FR) - Charts, Sidebar, Topbar, Stats Cards
- ✅ **Phase 3:** Projects (6 FR) - Full CRUD, Tech Stack, Media Upload, Public Pages
- ✅ **Phase 4:** Blogs (5 FR) - Full CRUD, Tags, Rich Text, Status Filtering
- ✅ **Phase 5:** Content Modules (14 FR) - About, Services, Skills, Resume (5 sub-modules), Testimonials, FAQ
- ✅ **Phase 6:** Trash Management (5 FR) - Restore, Permanent Delete, Auto-delete Warnings, Cleanup
- ✅ **Phase 7:** UI/UX Enhancements (7 FR) - Toast notifications, Loading skeletons, Framer Motion animations, Command Palette (Cmd+K), WCAG 2.1 AA accessibility
- ✅ **Phase 8:** Real-time Features (3 FR) - Socket.IO integration, Real-time notifications, Collaborative editing indicators
- ✅ **Phase 9:** Forms & Validation (3 FR) - Reusable form components, Multi-step wizard, File upload with React Dropzone
- ✅ **Phase 10:** Performance Optimization (4 FR) - Image optimization, Code splitting, Caching (ISR/SWR), Web Vitals monitoring
- ⏳ **Phase 11-13:** Upcoming features (10 FR)

**Progress:** 55/65 functional requirements (85% complete)

## 🏗️ Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Auth pages: login, register, forgot-password
│   │   ├── dashboard/       # Protected dashboard
│   │   │   ├── about/       # About statistics page
│   │   │   ├── blogs/       # Blogs management
│   │   │   ├── faq/         # FAQ management
│   │   │   ├── projects/    # Projects management
│   │   │   ├── resume/      # Resume management (5 sub-modules)
│   │   │   ├── services/    # Services management
│   │   │   ├── skills/      # Skills management
│   │   │   ├── testimonials/ # Testimonials management
│   │   │   └── trash/       # Trash management
│   │   ├── blogs/[id]/      # Public blog pages
│   │   ├── projects/[id]/   # Public project pages
│   │   ├── layout.tsx       # Root layout with providers
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── about/           # AboutForm
│   │   ├── auth/            # LoginForm, RegisterForm, ForgotPasswordForm, ProtectedRoute
│   │   ├── blogs/           # BlogForm, BlogsTable
│   │   ├── dashboard/       # Charts, DashboardLayout, Sidebar, StatCard, Topbar (with NotificationBell)
│   │   ├── faq/             # FAQForm, FAQTable
│   │   ├── notifications/   # NotificationBell, ActiveUsers, EditingIndicator (Phase 8)
│   │   ├── projects/        # ProjectForm, ProjectsTable, MediaUpload
│   │   ├── providers/       # ReduxProvider, ThemeProvider, SocketProvider (Phase 8)
│   │   ├── resume/          # 5 resume forms (Summary, Education, Experience, Achievements, References)
│   │   ├── services/        # ServiceForm, ServicesTable
│   │   ├── skills/          # SkillForm, SkillsTable
│   │   ├── testimonials/    # TestimonialForm, TestimonialsTable
│   │   ├── trash/           # TrashTable
│   │   ├── ui/              # Toaster, Skeleton, CommandPalette, Animations (Phase 7), Form Components (Phase 9)
│   │   │   ├── Form.tsx            # Reusable form components (FormField, Input, Textarea, Select, Checkbox, FormButton)
│   │   │   ├── WizardForm.tsx      # Multi-step wizard with progress stepper
│   │   │   └── FileUpload.tsx      # File upload with React Dropzone
│   │   └── performance/     # Performance monitoring (Phase 10)
│   │       └── WebVitals.tsx       # Web Vitals reporting
│   ├── store/
│   │   ├── slices/          # authSlice (login, register, logout, etc.)
│   │   ├── index.ts         # Store configuration
│   │   └── hooks.ts         # Typed Redux hooks
│   ├── lib/
│   │   ├── api/             # API integration (about, services, skills, resume, testimonials, faq, projects, blogs, trash)
│   │   ├── cognito.ts       # AWS Cognito integration
│   │   ├── permissions.ts   # RBAC helpers
│   │   ├── socket.ts        # Socket.IO client utility (Phase 8)
│   │   ├── toast.ts         # Toast utility functions (Phase 7)
│   │   ├── accessibility.tsx # WCAG 2.1 AA utilities (Phase 7)
│   │   ├── lazy.tsx         # Code splitting utilities (Phase 10)
│   │   ├── cache.ts         # Caching strategies (Phase 10)
│   │   ├── performance.ts   # Performance monitoring (Phase 10)
│   │   └── utils.ts         # Utility functions
│   ├── types/
│   │   ├── about.ts         # About types
│   │   ├── auth.ts          # Auth types
│   │   ├── blog.ts          # Blog types
│   │   ├── faq.ts           # FAQ types
│   │   ├── project.ts       # Project types
│   │   ├── resume.ts        # Resume types (5 sub-modules)
│   │   ├── service.ts       # Service types
│   │   ├── skill.ts         # Skill types
│   │   ├── testimonial.ts   # Testimonial types
│   │   └── trash.ts         # Trash types
│   └── middleware.ts        # Route protection
├── public/                  # Static assets
├── .env.local.example       # Environment template
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🚦 Getting Started

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Set Up Environment Variables

Create `.env.local` (use `.env.local.example` as template):

```env
# AWS Cognito Configuration
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=your_user_pool_id_here
NEXT_PUBLIC_COGNITO_CLIENT_ID=your_client_id_here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> **Note:** Get your Cognito credentials from AWS Console or from the backend `.env` file.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 4. Test Authentication

1. Navigate to `/register` to create an account
2. Choose a role (AUTHOR, EDITOR, ADMIN, SUPER_ADMIN)
3. Check email for verification code
4. Login at `/login` with your credentials
5. Access protected `/dashboard` after successful login

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🎯 Implementation Status

### Phase 1: Authentication & Authorization ✅ COMPLETE

- [x] AWS Cognito integration (login, register, logout, password recovery)
- [x] Redux Toolkit store with auth slice
- [x] Role-based access control (SUPER_ADMIN, ADMIN, EDITOR, AUTHOR)
- [x] Protected routes with ProtectedRoute component
- [x] Permission helpers (hasRole, isAdmin, canEdit, etc.)
- [x] Authentication forms (Login, Register, ForgotPassword)
- [x] Auth pages: /login, /register, /forgot-password, /dashboard
- [x] TypeScript types and interfaces
- [x] Environment configuration template

### Phase 2: Dashboard & Navigation ✅ COMPLETE

- ✅ Interactive dashboard with charts (Area, Bar, Pie)
- ✅ Collapsible sidebar navigation
- ✅ Topbar with notifications and theme toggle
- ✅ User profile dropdown with logout
- ✅ 8 StatCard components with metrics
- ✅ Responsive mobile layout

### Phase 3: Projects Module ✅ COMPLETE

- ✅ Projects data table with sorting/filtering
- ✅ Create/Edit/Delete projects with modal form
- ✅ MediaUpload component with drag-drop
- ✅ Tech stack, features, challenges, learnings management
- ✅ Project details page with media gallery (dashboard)
- ✅ Public project details page for visitors (/projects/[id])
- ✅ API integration with backend

### Phase 4: Blogs Module ✅ COMPLETE

- ✅ Blogs data table with sorting/filtering by status and tags
- ✅ Create/Edit/Delete blogs with modal form
- ✅ Rich text content area (markdown-ready)
- ✅ Tag and topic management
- ✅ Blog details page (dashboard)
- ✅ Public blog page for visitors (/blogs/[id])
- ✅ API integration with backend
- ✅ Status-based statistics

### Phase 5: Content Modules ✅ COMPLETE

- ✅ About statistics management (clients, projects, hours, experience)
- ✅ Services CRUD with icon picker and color picker
- ✅ Skills management with progress indicators (0-100%)
- ✅ Resume Summary (contact info, professional summary)
- ✅ Resume Education (degree, years, university)
- ✅ Resume Professional Experience (job title, company, achievements)
- ✅ Resume Achievements (role, years, description)
- ✅ Resume References (name, job title, company)
- ✅ Testimonials with platform selection (Upwork/LinkedIn)
- ✅ FAQ management with accordion interface
- ✅ All API integrations complete

### Phase 6: Trash & System Management ✅ COMPLETE

- ✅ Trash page with deleted items table
- ✅ Restore functionality with confirmation
- ✅ Permanent delete with double-confirmation
- ✅ Auto-delete warnings (31-day policy)
- ✅ Days remaining counter with color coding
- ✅ Cleanup expired items (admin function)
- ✅ Trash API integration (getAll, restore, permanentlyDelete, cleanup)
- ✅ TrashTable component with pagination
- ✅ Trash types and interfaces

### Phase 7: UI/UX Enhancements ✅

- ✅ Toast notifications with Sonner (7 utility functions)
- ✅ Loading skeletons (5 variants: base, table, card, stat card, form)
- ✅ Framer Motion animations (7 components: FadeIn, SlideIn, ScaleIn, Stagger, AnimatedModal, PageTransition)
- ✅ Command Palette (Cmd+K navigation with 11 menu items)
- ✅ WCAG 2.1 AA accessibility (focus management, keyboard nav, ARIA labels, screen reader utilities)
- ✅ sr-only CSS utility for screen readers
- ✅ Dark/Light/System theme integration (Next-themes)
- ✅ Responsive design (mobile-first with Tailwind breakpoints)

### Phase 8: Real-time Features ✅

- ✅ Socket.IO client integration with auto-reconnect
- ✅ Real-time notifications with NotificationBell component
- ✅ Toast notifications on CRUD events (create, update, delete, restore)
- ✅ SocketProvider with React Context API
- ✅ Type-safe Socket.IO events (35+ event types)
- ✅ ActiveUsers and EditingIndicator components
- ✅ Integrated with Redux auth store (idToken)

### Phase 9: Forms & Validation ✅

- ✅ Reusable form components (FormField, Input, Textarea, Select, Checkbox, FormButton)
- ✅ Multi-step wizard form with progress stepper (WizardForm.tsx)
- ✅ File upload with React Dropzone (drag-drop, validation, image previews)
- ✅ React Hook Form + Zod integration
- ✅ Error handling and display
- ✅ Loading states for form buttons

### Phase 10: Performance Optimization ✅

- ✅ Next.js Image optimization (AVIF/WebP, device sizes, 1-year cache)
- ✅ Code splitting utilities (lazyLoad, lazyLoadClient, preloadComponent)
- ✅ Caching strategies (ISR config, ClientCache with TTL, LRUCache, SWR config)
- ✅ Performance monitoring (PerformanceMarker, useRenderTracking, trackAPICall)
- ✅ Web Vitals reporting (CLS, FCP, LCP, TTFB, INP)
- ✅ Compiler optimizations (console removal in production)
- ✅ Package import optimization (lucide-react, recharts, framer-motion)
- ✅ Compression enabled for all responses
- ✅ Remote patterns for AWS S3 images

### Phase 11-13: Advanced Features ⏳

- [ ] SEO & metadata management (FR056-FR058)
- [ ] SEO & metadata management (FR056-FR058)
- [ ] Testing (Jest, Playwright) (FR059-FR061)
- [ ] AWS Amplify deployment (FR062-FR065)

> 📖 **See [Frontend Implementation Phases](../docs/Frontend_Implementation_Phases.md) for complete breakdown**

## 📚 Documentation Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Shadcn/ui](https://ui.shadcn.com/docs/installation/next)
- [AWS Amplify](https://docs.amplify.aws/nextjs/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)

## 🤝 Contributing

This project follows the [Frontend Implementation Phases](../docs/Frontend_Implementation_Phases.md). When contributing:

1. Follow the phase-by-phase implementation order
2. Maintain TypeScript strict mode
3. Use Shadcn/ui components
4. Write tests for new features
5. Follow ESLint rules

## 📄 License

See root project LICENSE file.

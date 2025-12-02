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
- ⏳ **Phase 6-13:** Upcoming features (42 FR)

**Progress:** 33/65 functional requirements (51% complete)

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
│   │   │   └── testimonials/ # Testimonials management
│   │   ├── blogs/[id]/      # Public blog pages
│   │   ├── projects/[id]/   # Public project pages
│   │   ├── layout.tsx       # Root layout with providers
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── about/           # AboutForm
│   │   ├── auth/            # LoginForm, RegisterForm, ForgotPasswordForm, ProtectedRoute
│   │   ├── blogs/           # BlogForm, BlogsTable
│   │   ├── dashboard/       # Charts, DashboardLayout, Sidebar, StatCard, Topbar
│   │   ├── faq/             # FAQForm, FAQTable
│   │   ├── projects/        # ProjectForm, ProjectsTable, MediaUpload
│   │   ├── providers/       # ReduxProvider, ThemeProvider
│   │   ├── resume/          # 5 resume forms (Summary, Education, Experience, Achievements, References)
│   │   ├── services/        # ServiceForm, ServicesTable
│   │   ├── skills/          # SkillForm, SkillsTable
│   │   └── testimonials/    # TestimonialForm, TestimonialsTable
│   ├── store/
│   │   ├── slices/          # authSlice (login, register, logout, etc.)
│   │   ├── index.ts         # Store configuration
│   │   └── hooks.ts         # Typed Redux hooks
│   ├── lib/
│   │   ├── api/             # API integration (about, services, skills, resume, testimonials, faq, projects, blogs)
│   │   ├── cognito.ts       # AWS Cognito integration
│   │   ├── permissions.ts   # RBAC helpers
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
│   │   └── testimonial.ts   # Testimonial types
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

### Phase 6-13: Advanced Features ⏳

- [ ] Trash system with restore functionality
- [ ] Real-time features with Socket.IO
- [ ] Performance optimization
- [ ] SEO & metadata management
- [ ] Testing (Jest, Playwright)
- [ ] AWS Amplify deployment

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

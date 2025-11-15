# **Project Requirements Document: Portfolio CMS (Frontend)**

The following table outlines the detailed functional requirements of the **Device-Responsive Portfolio CMS** frontend, built using **Next.js**, **Tailwind CSS**, and **Redux Toolkit**.

This CMS provides a modern, responsive interface for managing and showcasing projects, blogs, skills, services, resumes, testimonials, FAQs, and more — with **role-based access** via **AWS Cognito** (Super Admin, Admin, Author, Editor).

---

## **Functional Requirements**

| Requirement ID                     | Description                     | User Story                                                                                           | Expected Behavior/Outcome                                                                                                                                                                                                                                                                             |
| ---------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AUTHENTICATION & AUTHORIZATION** |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR001                              | User Registration (AWS Cognito) | As a new user, I want to sign up using my email and password, so I can securely access CMS features. | The system provides Cognito-based signup with email verification and role assignment (Author, Editor, Admin, Super Admin).                                                                                                                                                                            |
| FR002                              | User Login                      | As a registered user, I want to log in securely so I can manage my content.                          | System provides Cognito-hosted login flow with JWT management and session persistence.                                                                                                                                                                                                                |
| FR003                              | Role-Based Access Control       | As a user, I want to see UI features according to my role so I can access only what I’m allowed to.  | The frontend dynamically renders menus, modals, and routes based on Cognito role claims.                                                                                                                                                                                                              |
| FR004                              | Password Recovery               | As a user who forgot my password, I want to reset it securely.                                       | Password reset via Cognito password recovery flow (email OTP).                                                                                                                                                                                                                                        |
| FR005                              | Logout                          | As a logged-in user, I want to logout so my session is securely terminated.                          | Tokens are cleared and user is redirected to the login page.                                                                                                                                                                                                                                          |
| **DASHBOARD & NAVIGATION**         |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR006                              | CMS Dashboard Overview          | As an authenticated user, I want to see a dashboard summary of all CMS entities.                     | Dashboard shows counts and charts for Projects, Blogs, Services, Skills, and Resume stats.                                                                                                                                                                                                            |
| FR007                              | Sidebar Navigation              | As a user, I want to easily navigate between CMS modules.                                            | Responsive sidebar with icons and collapsible sections based on role.                                                                                                                                                                                                                                 |
| FR008                              | Topbar                          | As a user, I want quick access to notifications, profile, and theme toggle.                          | Header bar includes user menu, dark/light mode toggle, and quick access actions.                                                                                                                                                                                                                      |
| **PROJECTS MODULE**                |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR009                              | View All Projects               | As an admin, I want to view a list of all projects.                                                  | Displays paginated table/grid of projects with filters and search.                                                                                                                                                                                                                                    |
| FR010                              | Add Project                     | As an admin, I want to add a new project.                                                            | "+" button opens modal form for title, subtitle, category (web/mobile), type (beginner/intermediate/advanced/super-advanced), status (working/development/production/update), description (bullet points), documentation link, live link, GitHub links (client/server), images (4-10), video, author. |
| FR011                              | Edit Project                    | As an admin, I want to edit project details.                                                         | Edit button opens modal pre-filled with data. On save, UI updates instantly (optimistic update).                                                                                                                                                                                                      |
| FR012                              | Delete Project                  | As an admin, I want to delete a project.                                                             | Delete button opens confirmation dialog (trash or cancel).                                                                                                                                                                                                                                            |
| FR013                              | Project Carousel                | As a viewer, I want to browse project images interactively.                                          | Displays up to 10 images, with 4 required; allows user to select which appear in carousel with alignment controls below.                                                                                                                                                                              |
| FR014                              | Project Details Page            | As a visitor, I want to view a single project's details.                                             | Dedicated page with title, subtitle, description (bullets), category, type, status, documentation link, live link, GitHub links, screenshots carousel, and summary video player.                                                                                                                      |
| **BLOGS MODULE**                   |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR015                              | View All Blogs                  | As an admin, I want to see all blog entries.                                                         | Displays list of blogs with title, author, tags, and published date.                                                                                                                                                                                                                                  |
| FR016                              | Add Blog                        | As an author, I want to create a new blog.                                                           | "+" button opens modal with form for title, subtitle, blog topic tags (multi-select/tag input), description (rich text), images (4-10 with carousel), explain video (optional), and publication date.                                                                                                 |
| FR017                              | Edit Blog                       | As an author, I want to edit a blog post.                                                            | Edit button opens modal pre-filled with blog data.                                                                                                                                                                                                                                                    |
| FR018                              | Delete Blog                     | As an author or admin, I want to delete blogs.                                                       | Confirmation dialog before moving to Trash.                                                                                                                                                                                                                                                           |
| FR019                              | Blog Carousel                   | As a visitor, I want to view blog screenshots.                                                       | Carousel for 4–10 images with alignment selector.                                                                                                                                                                                                                                                     |
| **ABOUT MODULE**                   |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR020                              | Manage About Info               | As an admin, I want to update portfolio statistics.                                                  | Form fields to create/update/reset clients, projects, hours, years of experience.                                                                                                                                                                                                                     |
| **SERVICES MODULE**                |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR021                              | View All Services               | As an admin, I want to see all available services.                                                   | Displays list of services with icon, color, title, subtitle, and description.                                                                                                                                                                                                                         |
| FR022                              | Add/Edit/Delete Services        | As an admin, I want to manage services.                                                              | Modal form for CRUD operations with icon picker/uploader, color picker (hex), title, subtitle, description fields, and live preview.                                                                                                                                                                  |
| **SKILLS MODULE**                  |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR023                              | View Skills                     | As a visitor, I want to see skill progress indicators.                                               | Displays skills with icon, name, and progress bar (percentage).                                                                                                                                                                                                                                       |
| FR024                              | Add/Edit/Delete Skills          | As an admin, I want to manage skills.                                                                | Modal for CRUD with name field, progress % slider/input, and icon picker/uploader for custom or library icons.                                                                                                                                                                                        |
| **RESUME MODULE**                  |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR025                              | Manage Resume Summary           | As an admin, I want to update resume summary and contact info.                                       | Form with fields for 2-3 line summary and three bullet points (address, contact number, email).                                                                                                                                                                                                       |
| FR026                              | Manage Education                | As an admin, I want to add or edit education entries.                                                | CRUD form with degree, years, and university/institution fields.                                                                                                                                                                                                                                      |
| FR027                              | Manage Professional Experience  | As an admin, I want to manage job experiences.                                                       | CRUD form with job title, company name, years, and achievements (3-4 bullet points).                                                                                                                                                                                                                  |
| FR028                              | Manage Achievements             | As an admin, I want to list major achievements.                                                      | CRUD form for achievements with role, years, and description (3-4 bullet points).                                                                                                                                                                                                                     |
| FR029                              | Manage References               | As an admin, I want to manage professional references.                                               | CRUD form for reference name, job title, and company name.                                                                                                                                                                                                                                            |
| **TESTIMONIALS MODULE**            |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR030                              | View Testimonials               | As a visitor, I want to read client testimonials.                                                    | Displays testimonial cards with photo, name, role, and platform.                                                                                                                                                                                                                                      |
| FR031                              | Manage Testimonials             | As an admin, I want to add, edit, or delete testimonials.                                            | CRUD forms for testimonials with image upload.                                                                                                                                                                                                                                                        |
| **FAQ MODULE**                     |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR032                              | View FAQ                        | As a visitor, I want to read common questions and answers.                                           | Expandable accordion-style FAQ viewer.                                                                                                                                                                                                                                                                |
| FR033                              | Manage FAQ                      | As an admin, I want to add/edit/delete FAQs.                                                         | CRUD interface for question and answer pairs.                                                                                                                                                                                                                                                         |
| **TRASH MODULE**                   |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR034                              | Trash Management                | As an admin, I want to view and restore deleted items.                                               | Trash page with filters per module, restore or permanently delete.                                                                                                                                                                                                                                    |
| FR035                              | Auto Delete                     | As a system, I want to auto-delete trashed items after 31 days.                                      | UI shows remaining days before deletion.                                                                                                                                                                                                                                                              |
| **GENERAL UI & EXPERIENCE**        |                                 |                                                                                                      |                                                                                                                                                                                                                                                                                                       |
| FR036                              | Dark/Light Mode                 | As a user, I want to toggle dark or light mode.                                                      | Persistent mode stored in localStorage or user settings.                                                                                                                                                                                                                                              |
| FR037                              | Responsive Design               | As a user, I want the CMS to look perfect on any device.                                             | Fully responsive for mobile, tablet, and desktop (Tailwind breakpoints).                                                                                                                                                                                                                              |
| FR038                              | Notifications                   | As a user, I want to see success/error toasts.                                                       | Toast system for CRUD feedback.                                                                                                                                                                                                                                                                       |
| FR039                              | Loading States                  | As a user, I want to see skeletons/spinners when data loads.                                         | Shadcn UI + Tailwind-based skeleton loaders for async states.                                                                                                                                                                                                                                         |
| FR040                              | Accessibility                   | As a user with disabilities, I want to navigate easily.                                              | WCAG-compliant keyboard navigation, ARIA labels, and semantic HTML.                                                                                                                                                                                                                                   |

---

## **Non-Functional Requirements**

| NFR ID | Category        | Description                                              | Expected Outcome                                               |
| ------ | --------------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| NFR001 | Performance     | Pages should load in under 2 seconds on a 4G connection. | Optimized lazy loading and image compression.                  |
| NFR002 | Security        | Follow OWASP best practices for frontend security.       | Prevent XSS, CSRF, and enforce HTTPS-only communication.       |
| NFR003 | Scalability     | Frontend should scale with multiple backend instances.   | Use API endpoints configured for load-balanced environments.   |
| NFR004 | Maintainability | Codebase should follow clean architecture.               | Component-based, reusable, modular code with TypeScript types. |
| NFR005 | Accessibility   | Ensure WCAG 2.1 AA compliance.                           | ARIA labels, keyboard navigation, contrast ratios.             |
| NFR006 | UX Consistency  | All CRUD modals and forms follow consistent design.      | Shared form components and consistent animations.              |
| NFR007 | Localization    | System should be ready for multi-language support.       | Store text labels in JSON for i18n readiness.                  |
| NFR008 | Responsiveness  | Support major devices and browsers.                      | Mobile-first layout and cross-browser testing.                 |
| NFR009 | Reliability     | Offline-first caching strategy for essential pages.      | Use Next.js caching and fallback pages.                        |

---

## **Technical Implementation Details**

### **State Management Architecture**

```typescript
store/
├── index.ts
├── api.ts
├── slices/
│   ├── authSlice.ts
│   ├── projectSlice.ts
│   ├── blogSlice.ts
│   ├── aboutSlice.ts
│   ├── serviceSlice.ts
│   ├── skillSlice.ts
│   ├── resumeSlice.ts
│   ├── testimonialSlice.ts
│   ├── faqSlice.ts
│   └── trashSlice.ts
```

### **API Service Layer**

```typescript
export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/projects',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({ query: () => '/' }),
    getProject: builder.query({ query: (id) => `/${id}` }),
    createProject: builder.mutation({
      query: (body) => ({ url: '/', method: 'POST', body }),
    }),
    updateProject: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/${id}`, method: 'PUT', body }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
    }),
  }),
});
```

### **Component Architecture**

```typescript
client/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── StatsCards.tsx
│   │   │   ├── ActivityGraph.tsx
│   │   │   └── QuickLinks.tsx
│   │   ├── Projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectFormModal.tsx
│   │   │   ├── ProjectDetails.tsx
│   │   │   └── ProjectCarousel.tsx
│   │   ├── Blogs/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogFormModal.tsx
│   │   │   ├── BlogDetails.tsx
│   │   │   └── BlogCarousel.tsx
│   │   ├── About/
│   │   ├── Services/
│   │   ├── Skills/
│   │   ├── Resume/
│   │   ├── Testimonials/
│   │   ├── FAQ/
│   │   ├── Trash/
│   │   └── Shared/
│   │       ├── Layout.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Topbar.tsx
│   │       ├── Modal.tsx
│   │       ├── ConfirmDialog.tsx
│   │       └── ImageUploader.tsx
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── blogs/
│   │   ├── about/
│   │   ├── services/
│   │   ├── skills/
│   │   ├── resume/
│   │   ├── testimonials/
│   │   ├── faq/
│   │   └── trash/
│   ├── store/
│   ├── styles/
│   └── utils/
```

### **Deployment Flow (AWS Amplify)**

1. Connect GitHub repository to Amplify.
2. Configure environment variables.
3. Enable build previews for PRs.
4. Use Amplify’s CI/CD for deployment.
5. Integrate CloudFront CDN.

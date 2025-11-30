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

## 🏗️ Project Structure

```
client/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   ├── store/           # Redux store and slices
│   ├── lib/             # Utility functions
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript definitions
│   └── config/          # Configuration files
├── public/              # Static assets
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

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_COGNITO_USER_POOL_ID=your_pool_id
NEXT_PUBLIC_COGNITO_CLIENT_ID=your_client_id
NEXT_PUBLIC_COGNITO_REGION=us-east-1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 3. Initialize Shadcn/ui

```bash
npx shadcn@latest init
```

Choose:

- Style: **New York**
- Base color: **Slate**
- CSS variables: **Yes**

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm test             # Run Jest tests
npm run test:e2e     # Run Playwright E2E tests
```

## 🎯 Implementation Roadmap

### Phase 1: Authentication & Authorization ⏳

- [ ] AWS Cognito integration
- [ ] Login/Signup pages
- [ ] Role-based access control
- [ ] Password recovery

### Phase 2: Dashboard & Navigation ⏳

- [ ] Interactive dashboard with charts
- [ ] Collapsible sidebar
- [ ] Topbar with notifications

### Phase 3-13: Content Modules & Features ⏳

- [ ] Projects, Blogs, Services, Skills
- [ ] Resume (5 sub-modules)
- [ ] Testimonials, FAQ
- [ ] Trash management
- [ ] Real-time features
- [ ] Performance optimization
- [ ] SEO & Testing
- [ ] Deployment

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

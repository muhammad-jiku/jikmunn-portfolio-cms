import express from 'express';

// Module route imports
import { AboutRoutes } from '../modules/about/about.routes';
import { BlogRoutes } from '../modules/blogs/blogs.routes';
import devRoutes from '../modules/common/dev.routes';
import maintenanceRoutes from '../modules/common/maintenance.routes';
import { FAQRoutes } from '../modules/faq/faq.routes';
import { ProjectRoutes } from '../modules/projects/projects.routes';
import { ResumeRoutes } from '../modules/resume/resume.routes';
import { ServiceRoutes } from '../modules/services/services.routes';
import { SkillRoutes } from '../modules/skills/skills.routes';
import { TestimonialRoutes } from '../modules/testimonials/testimonials.routes';
import { TrashRoutes } from '../modules/trash/trash.routes';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/projects',
    route: ProjectRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/about',
    route: AboutRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/skills',
    route: SkillRoutes,
  },
  {
    path: '/resume',
    route: ResumeRoutes,
  },
  {
    path: '/testimonials',
    route: TestimonialRoutes,
  },
  {
    path: '/faq',
    route: FAQRoutes,
  },
  {
    path: '/trash',
    route: TrashRoutes,
  },
  {
    path: '/maintenance',
    route: maintenanceRoutes,
  },
  {
    path: '/dev',
    route: devRoutes,
  },
];

moduleRoutes.forEach(r => routes.use(r.path, r.route));

// Health check endpoint
routes.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Portfolio CMS API is running',
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || 'v1',
  });
});

export default routes;

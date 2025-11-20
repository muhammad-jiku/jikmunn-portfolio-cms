import { Router } from 'express';
import aboutRoutes from '../modules/about/about.routes';
import blogRoutes from '../modules/blogs/blogs.routes';
import devRoutes from '../modules/common/dev.routes';
import maintenanceRoutes from '../modules/common/maintenance.routes';
import faqRoutes from '../modules/faq/faq.routes';
import projectRoutes from '../modules/projects/projects.routes';
import resumeRoutes from '../modules/resume/resume.routes';
import serviceRoutes from '../modules/services/services.routes';
import skillRoutes from '../modules/skills/skills.routes';
import testimonialRoutes from '../modules/testimonials/testimonials.routes';
import trashRoutes from '../modules/trash/trash.routes';

const router = Router();

// API version prefix
const API_VERSION = process.env.API_VERSION || 'v1';

// Health check
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Portfolio CMS API is running',
    timestamp: new Date().toISOString(),
    version: API_VERSION,
  });
});

// Module routes
router.use('/projects', projectRoutes);
router.use('/blogs', blogRoutes);
router.use('/about', aboutRoutes);
router.use('/services', serviceRoutes);
router.use('/skills', skillRoutes);
router.use('/resume', resumeRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/faq', faqRoutes);
router.use('/trash', trashRoutes);

// Maintenance mode
router.use('/maintenance', maintenanceRoutes);

// Development-only routes (returns 404 in production)
router.use('/dev', devRoutes);

export default router;

import { Router } from 'express';
import aboutRoutes from '../modules/about/about.routes';
import blogRoutes from '../modules/blogs/blogs.routes';
import projectRoutes from '../modules/projects/projects.routes';
import serviceRoutes from '../modules/services/services.routes';
import skillRoutes from '../modules/skills/skills.routes';

const router = Router();

// API version prefix
const API_VERSION = process.env.API_VERSION || 'v1';

// Health check
router.get('/health', (req, res) => {
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

// TODO: Add remaining module routes
// router.use('/resume', resumeRoutes);
// router.use('/testimonials', testimonialRoutes);
// router.use('/faq', faqRoutes);
// router.use('/trash', trashRoutes);

export default router;

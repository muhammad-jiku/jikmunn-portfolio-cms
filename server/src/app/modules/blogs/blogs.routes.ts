import { Router } from 'express';
import multer from 'multer';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  uploadBlogImages,
} from './blogs.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public routes - Only PRODUCTION status blogs visible
router.get('/public', getAllBlogs);
router.get('/public/:id', getBlogById);

// Protected routes - require authentication (shows ALL blogs regardless of status)
router.use(verifyToken);

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'), createBlog);
router.put('/:id', requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'), updateBlog);
router.delete('/:id', requireRole('ADMIN', 'SUPER_ADMIN'), deleteBlog);
router.post(
  '/:id/images',
  requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
  upload.array('images', 10),
  uploadBlogImages
);

export default router;

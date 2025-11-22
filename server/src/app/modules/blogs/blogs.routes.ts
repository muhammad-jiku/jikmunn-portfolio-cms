import { Router } from 'express';
import multer from 'multer';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { BlogControllers } from './blogs.controller';
import {
  createBlogSchema,
  deleteBlogSchema,
  getBlogByIdSchema,
  updateBlogSchema,
  uploadBlogImagesSchema,
} from './blogs.validation';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public routes - Only PRODUCTION status blogs visible
router.route('/public').get(BlogControllers.getAllBlogs);

router.route('/public/:id').get(validate(getBlogByIdSchema), BlogControllers.getBlogById);

// Protected routes - require authentication (shows ALL blogs regardless of status)
router.use(verifyToken);

router
  .route('/')
  .get(BlogControllers.getAllBlogs)
  .post(
    requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
    validate(createBlogSchema),
    BlogControllers.createBlog
  );

router
  .route('/:id')
  .get(validate(getBlogByIdSchema), BlogControllers.getBlogById)
  .put(
    requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
    validate(updateBlogSchema),
    BlogControllers.updateBlog
  )
  .delete(
    requireRole('ADMIN', 'SUPER_ADMIN'),
    validate(deleteBlogSchema),
    BlogControllers.deleteBlog
  );

router
  .route('/:id/images')
  .post(
    requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
    validate(uploadBlogImagesSchema),
    upload.array('images', 10),
    BlogControllers.uploadBlogImages
  );

export const BlogRoutes = router;

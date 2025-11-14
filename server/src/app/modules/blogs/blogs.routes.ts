import { Router } from 'express';
import multer from 'multer';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog, uploadBlogImages } from './blogs.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

router.use(verifyToken);
router.post('/', requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'), createBlog);
router.put('/:id', requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'), updateBlog);
router.delete('/:id', requireRole('ADMIN', 'SUPER_ADMIN'), deleteBlog);
router.post('/:id/images', requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'), upload.array('images', 10), uploadBlogImages);

export default router;

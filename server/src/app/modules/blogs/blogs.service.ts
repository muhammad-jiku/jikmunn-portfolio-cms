// Blog service - similar to projects
import { Prisma } from '@prisma/client';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';

export class BlogService {
  async createBlog(data: any) {
    return await prisma.blog.create({
      data,
      include: { author: { select: { id: true, name: true, email: true } }, images: true },
    });
  }

  async getAllBlogs(params: any, isAuthenticated: boolean = false) {
    const { page, limit, skip, search, tags } = params;
    const where: Prisma.BlogWhereInput = {
      deletedAt: null,
      // If not authenticated, only show PRODUCTION blogs
      ...(!isAuthenticated && { status: 'PRODUCTION' }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { subtitle: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(tags && { tags: { hasSome: tags } }),
    };

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: { select: { id: true, name: true, email: true } },
          images: { orderBy: { order: 'asc' } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.blog.count({ where }),
    ]);

    return { blogs, total, page, limit };
  }

  async getBlogById(id: string, isAuthenticated: boolean = false) {
    const whereCondition: any = { id };

    // If not authenticated, only show PRODUCTION blogs
    if (!isAuthenticated) {
      whereCondition.status = 'PRODUCTION';
      whereCondition.deletedAt = null;
    }

    return await prisma.blog.findUnique({
      where: whereCondition,
      include: {
        author: { select: { id: true, name: true, email: true } },
        images: { orderBy: { order: 'asc' } },
      },
    });
  }

  async updateBlog(id: string, data: any) {
    return await prisma.blog.update({
      where: { id },
      data,
      include: { author: true, images: true },
    });
  }

  async deleteBlog(id: string) {
    const blog = await this.getBlogById(id);
    if (!blog) throw new Error('Blog not found');

    const deletedBlog = await prisma.blog.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await prisma.trash.create({
      data: {
        entityType: 'blogs',
        entityId: id,
        entityData: blog,
        expiresAt: addDays(new Date(), 31),
      },
    });

    return deletedBlog;
  }

  async addBlogImages(blogId: string, images: { url: string; order: number }[]) {
    return await prisma.blogImage.createMany({
      data: images.map(img => ({ ...img, blogId })),
    });
  }

  async deleteBlogImage(imageId: string) {
    return await prisma.blogImage.delete({ where: { id: imageId } });
  }
}

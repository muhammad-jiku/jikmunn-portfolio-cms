import { Prisma } from '@prisma/client';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';

interface CreateProjectData {
  title: string;
  subtitle?: string;
  description: string[];
  category: 'WEB_APPLICATION' | 'MOBILE_APP_APPLICATION';
  type: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'SUPER_ADVANCED';
  status: 'IN_PROGRESS' | 'DEVELOPMENT' | 'PRODUCTION' | 'UPDATED';
  documentationUrl?: string;
  liveLink?: string;
  githubClientLink?: string;
  githubServerLink?: string;
  videoUrl?: string;
  techStack?: Record<string, string>;
  tools?: Record<string, string>;
  authorId: string;
}

interface UpdateProjectData {
  title?: string;
  subtitle?: string;
  description?: string[];
  category?: 'WEB_APPLICATION' | 'MOBILE_APP_APPLICATION';
  type?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'SUPER_ADVANCED';
  status?: 'IN_PROGRESS' | 'DEVELOPMENT' | 'PRODUCTION' | 'UPDATED';
  documentationUrl?: string;
  liveLink?: string;
  githubClientLink?: string;
  githubServerLink?: string;
  videoUrl?: string;
  techStack?: Record<string, string>;
  tools?: Record<string, string>;
}

interface IProjectFilterRequest {
  searchTerm?: string;
  category?: string;
  type?: string;
  status?: string;
}

interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ProjectService {
  /**
   * Create a new project
   */
  async createProject(data: CreateProjectData) {
    return await prisma.project.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        images: true,
      },
    });
  }

  /**
   * Get all projects with pagination and filters
   */
  async getAllProjects(
    filters: IProjectFilterRequest,
    options: IPaginationOptions,
    isAuthenticated: boolean = false
  ) {
    const { searchTerm: search, category, type, status } = filters;
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const where: Prisma.ProjectWhereInput = {
      deletedAt: null, // Only active projects
      // If not authenticated, only show PRODUCTION projects
      ...(!isAuthenticated && { status: 'PRODUCTION' }),
      ...(category && { category: category as any }),
      ...(type && { type: type as any }),
      // If authenticated, allow status filtering
      ...(isAuthenticated && status && { status: status as any }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { subtitle: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          images: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.project.count({ where }),
    ]);

    return {
      data: projects,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get project by ID
   */
  async getProjectById(id: string, isAuthenticated: boolean = false) {
    const whereCondition: any = { id };

    // If not authenticated, only show PRODUCTION projects
    if (!isAuthenticated) {
      whereCondition.status = 'PRODUCTION';
      whereCondition.deletedAt = null;
    }

    return await prisma.project.findUnique({
      where: whereCondition,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  /**
   * Update project
   */
  async updateProject(id: string, data: UpdateProjectData) {
    return await prisma.project.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        images: true,
      },
    });
  }

  /**
   * Soft delete project (move to trash)
   */
  async deleteProject(id: string) {
    // Get project data before deletion
    const project = await this.getProjectById(id);

    if (!project) {
      throw new Error('Project not found');
    }

    // Soft delete the project
    const deletedProject = await prisma.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    // Move to trash
    await prisma.trash.create({
      data: {
        entityType: 'projects',
        entityId: id,
        entityData: project,
        expiresAt: addDays(new Date(), 31), // Auto-delete after 31 days
      },
    });

    return deletedProject;
  }

  /**
   * Add images to project
   */
  async addProjectImages(projectId: string, images: { url: string; order: number }[]) {
    const imageData = images.map(img => ({
      ...img,
      projectId,
    }));

    return await prisma.projectImage.createMany({
      data: imageData,
    });
  }

  /**
   * Delete project image
   */
  async deleteProjectImage(imageId: string) {
    return await prisma.projectImage.delete({
      where: { id: imageId },
    });
  }

  /**
   * Get project images
   */
  async getProjectImages(projectId: string) {
    return await prisma.projectImage.findMany({
      where: { projectId },
      orderBy: {
        order: 'asc',
      },
    });
  }
}

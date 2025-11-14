import { Prisma } from '@prisma/client';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';

interface CreateProjectData {
  title: string;
  subtitle?: string;
  description: string[];
  category: 'WEB_APPLICATION' | 'MOBILE_APP_APPLICATION';
  type: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'SUPER_ADVANCED';
  status: 'WORKING' | 'DEVELOPMENT' | 'PRODUCTION' | 'UPDATE';
  documentationUrl?: string;
  liveLink?: string;
  githubClientLink?: string;
  githubServerLink?: string;
  videoUrl?: string;
  authorId: string;
}

interface UpdateProjectData {
  title?: string;
  subtitle?: string;
  description?: string[];
  category?: 'WEB_APPLICATION' | 'MOBILE_APP_APPLICATION';
  type?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'SUPER_ADVANCED';
  status?: 'WORKING' | 'DEVELOPMENT' | 'PRODUCTION' | 'UPDATE';
  documentationUrl?: string;
  liveLink?: string;
  githubClientLink?: string;
  githubServerLink?: string;
  videoUrl?: string;
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
  async getAllProjects(params: GetProjectsParams) {
    const { page, limit, skip, category, type, status, search } = params;

    const where: Prisma.ProjectWhereInput = {
      deletedAt: null, // Only active projects
      ...(category && { category: category as any }),
      ...(type && { type: type as any }),
      ...(status && { status: status as any }),
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

    return { projects, total, page, limit };
  }

  /**
   * Get project by ID
   */
  async getProjectById(id: string) {
    return await prisma.project.findUnique({
      where: { id },
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
        entityData: JSON.stringify(project),
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

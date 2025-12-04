/* eslint-disable @typescript-eslint/no-explicit-any */
import { emitToAdmins, SocketEvents } from '../config/socket.config';
import { logger } from './logger.util';

/**
 * Helper functions to emit Socket.IO events from controllers
 */

// Projects
export const notifyProjectCreated = (project: any) => {
  try {
    emitToAdmins(SocketEvents.PROJECT_CREATED, {
      message: 'New project created',
      data: project,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting project:created event', error);
  }
};

export const notifyProjectUpdated = (project: any) => {
  try {
    emitToAdmins(SocketEvents.PROJECT_UPDATED, {
      message: 'Project updated',
      data: project,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting project:updated event', error);
  }
};

export const notifyProjectDeleted = (projectId: string) => {
  try {
    emitToAdmins(SocketEvents.PROJECT_DELETED, {
      message: 'Project moved to trash',
      data: { id: projectId },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting project:deleted event', error);
  }
};

// Blogs
export const notifyBlogCreated = (blog: any) => {
  try {
    emitToAdmins(SocketEvents.BLOG_CREATED, {
      message: 'New blog created',
      data: blog,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting blog:created event', error);
  }
};

export const notifyBlogUpdated = (blog: any) => {
  try {
    emitToAdmins(SocketEvents.BLOG_UPDATED, {
      message: 'Blog updated',
      data: blog,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting blog:updated event', error);
  }
};

export const notifyBlogDeleted = (blogId: string) => {
  try {
    emitToAdmins(SocketEvents.BLOG_DELETED, {
      message: 'Blog moved to trash',
      data: { id: blogId },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting blog:deleted event', error);
  }
};

// Services
export const notifyServiceCreated = (service: any) => {
  try {
    emitToAdmins(SocketEvents.SERVICE_CREATED, {
      message: 'New service created',
      data: service,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting service:created event', error);
  }
};

export const notifyServiceUpdated = (service: any) => {
  try {
    emitToAdmins(SocketEvents.SERVICE_UPDATED, {
      message: 'Service updated',
      data: service,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting service:updated event', error);
  }
};

export const notifyServiceDeleted = (serviceId: string) => {
  try {
    emitToAdmins(SocketEvents.SERVICE_DELETED, {
      message: 'Service deleted',
      data: { id: serviceId },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting service:deleted event', error);
  }
};

// Skills
export const notifySkillCreated = (skill: any) => {
  try {
    emitToAdmins(SocketEvents.SKILL_CREATED, {
      message: 'New skill created',
      data: skill,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting skill:created event', error);
  }
};

export const notifySkillUpdated = (skill: any) => {
  try {
    emitToAdmins(SocketEvents.SKILL_UPDATED, {
      message: 'Skill updated',
      data: skill,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting skill:updated event', error);
  }
};

export const notifySkillDeleted = (skillId: string) => {
  try {
    emitToAdmins(SocketEvents.SKILL_DELETED, {
      message: 'Skill deleted',
      data: { id: skillId },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting skill:deleted event', error);
  }
};

// Testimonials
export const notifyTestimonialCreated = (testimonial: any) => {
  try {
    emitToAdmins(SocketEvents.TESTIMONIAL_CREATED, {
      message: 'New testimonial created',
      data: testimonial,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting testimonial:created event', error);
  }
};

export const notifyTestimonialUpdated = (testimonial: any) => {
  try {
    emitToAdmins(SocketEvents.TESTIMONIAL_UPDATED, {
      message: 'Testimonial updated',
      data: testimonial,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting testimonial:updated event', error);
  }
};

export const notifyTestimonialDeleted = (testimonialId: string) => {
  try {
    emitToAdmins(SocketEvents.TESTIMONIAL_DELETED, {
      message: 'Testimonial deleted',
      data: { id: testimonialId },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting testimonial:deleted event', error);
  }
};

// FAQ
export const notifyFAQCreated = (faq: any) => {
  try {
    emitToAdmins(SocketEvents.FAQ_CREATED, {
      message: 'New FAQ created',
      data: faq,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting faq:created event', error);
  }
};

export const notifyFAQUpdated = (faq: any) => {
  try {
    emitToAdmins(SocketEvents.FAQ_UPDATED, {
      message: 'FAQ updated',
      data: faq,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting faq:updated event', error);
  }
};

export const notifyFAQDeleted = (faqId: string) => {
  try {
    emitToAdmins(SocketEvents.FAQ_DELETED, {
      message: 'FAQ deleted',
      data: { id: faqId },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting faq:deleted event', error);
  }
};

// Resume
export const notifyResumeUpdated = (resume: any) => {
  try {
    emitToAdmins(SocketEvents.RESUME_UPDATED, {
      message: 'Resume summary updated',
      data: resume,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting resume:updated event', error);
  }
};

export const notifyEducationCreated = (education: any) => {
  try {
    emitToAdmins(SocketEvents.EDUCATION_CREATED, {
      message: 'New education entry created',
      data: education,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting education:created event', error);
  }
};

export const notifyEducationUpdated = (education: any) => {
  try {
    emitToAdmins(SocketEvents.EDUCATION_UPDATED, {
      message: 'Education entry updated',
      data: education,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting education:updated event', error);
  }
};

export const notifyEducationDeleted = (educationId: string) => {
  try {
    emitToAdmins(SocketEvents.EDUCATION_DELETED, {
      message: 'Education entry deleted',
      data: { id: educationId },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting education:deleted event', error);
  }
};

export const notifyExperienceCreated = (experience: any) => {
  try {
    emitToAdmins(SocketEvents.EXPERIENCE_CREATED, {
      message: 'New experience entry created',
      data: experience,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting experience:created event', error);
  }
};

export const notifyExperienceUpdated = (experience: any) => {
  try {
    emitToAdmins(SocketEvents.EXPERIENCE_UPDATED, {
      message: 'Experience entry updated',
      data: experience,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting experience:updated event', error);
  }
};

export const notifyExperienceDeleted = (experienceId: string) => {
  try {
    emitToAdmins(SocketEvents.EXPERIENCE_DELETED, {
      message: 'Experience entry deleted',
      data: { id: experienceId },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting experience:deleted event', error);
  }
};

export const notifyAchievementCreated = (achievement: any) => {
  try {
    emitToAdmins(SocketEvents.ACHIEVEMENT_CREATED, {
      message: 'New achievement created',
      data: achievement,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting achievement:created event', error);
  }
};

export const notifyAchievementUpdated = (achievement: any) => {
  try {
    emitToAdmins(SocketEvents.ACHIEVEMENT_UPDATED, {
      message: 'Achievement updated',
      data: achievement,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting achievement:updated event', error);
  }
};

export const notifyAchievementDeleted = (achievementId: string) => {
  try {
    emitToAdmins(SocketEvents.ACHIEVEMENT_DELETED, {
      message: 'Achievement deleted',
      data: { id: achievementId },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting achievement:deleted event', error);
  }
};

export const notifyReferenceCreated = (reference: any) => {
  try {
    emitToAdmins(SocketEvents.REFERENCE_CREATED, {
      message: 'New reference created',
      data: reference,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting reference:created event', error);
  }
};

export const notifyReferenceUpdated = (reference: any) => {
  try {
    emitToAdmins(SocketEvents.REFERENCE_UPDATED, {
      message: 'Reference updated',
      data: reference,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting reference:updated event', error);
  }
};

export const notifyReferenceDeleted = (referenceId: string) => {
  try {
    emitToAdmins(SocketEvents.REFERENCE_DELETED, {
      message: 'Reference deleted',
      data: { id: referenceId },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting reference:deleted event', error);
  }
};

// Trash
export const notifyTrashRestored = (item: any) => {
  try {
    emitToAdmins(SocketEvents.TRASH_RESTORED, {
      message: `${item.entityType} restored from trash`,
      data: item,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting trash:restored event', error);
  }
};

export const notifyTrashPermanentlyDeleted = (itemId: string, entityType: string) => {
  try {
    emitToAdmins(SocketEvents.TRASH_PERMANENTLY_DELETED, {
      message: `${entityType} permanently deleted`,
      data: { id: itemId, entityType },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting trash:permanently-deleted event', error);
  }
};

export const notifyTrashCleaned = (count: number) => {
  try {
    emitToAdmins(SocketEvents.TRASH_CLEANED, {
      message: `${count} expired items cleaned from trash`,
      data: { count },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting trash:cleaned event', error);
  }
};

// Maintenance
export const notifyMaintenanceToggled = (status: boolean) => {
  try {
    emitToAdmins(SocketEvents.MAINTENANCE_TOGGLED, {
      message: `Maintenance mode ${status ? 'enabled' : 'disabled'}`,
      data: { maintenanceMode: status },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error emitting maintenance:toggled event', error);
  }
};

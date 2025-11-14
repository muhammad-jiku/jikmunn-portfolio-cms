// Skills, Resume (Summary, Education, Experience, Achievements, References), Testimonials, FAQ, Trash modules
// Similar CRUD pattern - simplified for brevity

import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';

// SKILLS
export class SkillService {
  async createSkill(data: any) {
    return await prisma.skill.create({ data });
  }
  async getAllSkills() {
    return await prisma.skill.findMany({ where: { deletedAt: null } });
  }
  async updateSkill(id: string, data: any) {
    return await prisma.skill.update({ where: { id }, data });
  }
  async deleteSkill(id: string) {
    const skill = await prisma.skill.findUnique({ where: { id } });
    const deleted = await prisma.skill.update({ where: { id }, data: { deletedAt: new Date() } });
    await prisma.trash.create({
      data: {
        entityType: 'skills',
        entityId: id,
        entityData: JSON.stringify(skill),
        expiresAt: addDays(new Date(), 31),
      },
    });
    return deleted;
  }
}

// RESUME SUMMARY
export class ResumeSummaryService {
  async getSummary() {
    const summary = await prisma.resumeSummary.findFirst();
    if (!summary)
      return await prisma.resumeSummary.create({
        data: { summary: '', address: '', phone: '', email: '' },
      });
    return summary;
  }
  async updateSummary(id: string, data: any) {
    return await prisma.resumeSummary.update({ where: { id }, data });
  }
}

// EDUCATION
export class EducationService {
  async createEducation(data: any) {
    return await prisma.education.create({ data });
  }
  async getAllEducation() {
    return await prisma.education.findMany({ where: { deletedAt: null } });
  }
  async updateEducation(id: string, data: any) {
    return await prisma.education.update({ where: { id }, data });
  }
  async deleteEducation(id: string) {
    const education = await prisma.education.findUnique({ where: { id } });
    const deleted = await prisma.education.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await prisma.trash.create({
      data: {
        entityType: 'education',
        entityId: id,
        entityData: JSON.stringify(education),
        expiresAt: addDays(new Date(), 31),
      },
    });
    return deleted;
  }
}

// PROFESSIONAL EXPERIENCE
export class ProfessionalExperienceService {
  async createExperience(data: any) {
    return await prisma.professionalExperience.create({ data });
  }
  async getAllExperiences() {
    return await prisma.professionalExperience.findMany({ where: { deletedAt: null } });
  }
  async updateExperience(id: string, data: any) {
    return await prisma.professionalExperience.update({ where: { id }, data });
  }
  async deleteExperience(id: string) {
    const exp = await prisma.professionalExperience.findUnique({ where: { id } });
    const deleted = await prisma.professionalExperience.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await prisma.trash.create({
      data: {
        entityType: 'experience',
        entityId: id,
        entityData: JSON.stringify(exp),
        expiresAt: addDays(new Date(), 31),
      },
    });
    return deleted;
  }
}

// ACHIEVEMENTS
export class AchievementService {
  async createAchievement(data: any) {
    return await prisma.achievement.create({ data });
  }
  async getAllAchievements() {
    return await prisma.achievement.findMany({ where: { deletedAt: null } });
  }
  async updateAchievement(id: string, data: any) {
    return await prisma.achievement.update({ where: { id }, data });
  }
  async deleteAchievement(id: string) {
    const achievement = await prisma.achievement.findUnique({ where: { id } });
    const deleted = await prisma.achievement.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await prisma.trash.create({
      data: {
        entityType: 'achievements',
        entityId: id,
        entityData: JSON.stringify(achievement),
        expiresAt: addDays(new Date(), 31),
      },
    });
    return deleted;
  }
}

// REFERENCES
export class ReferenceService {
  async createReference(data: any) {
    return await prisma.reference.create({ data });
  }
  async getAllReferences() {
    return await prisma.reference.findMany({ where: { deletedAt: null } });
  }
  async updateReference(id: string, data: any) {
    return await prisma.reference.update({ where: { id }, data });
  }
  async deleteReference(id: string) {
    const reference = await prisma.reference.findUnique({ where: { id } });
    const deleted = await prisma.reference.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await prisma.trash.create({
      data: {
        entityType: 'references',
        entityId: id,
        entityData: JSON.stringify(reference),
        expiresAt: addDays(new Date(), 31),
      },
    });
    return deleted;
  }
}

// TESTIMONIALS
export class TestimonialService {
  async createTestimonial(data: any) {
    return await prisma.testimonial.create({ data });
  }
  async getAllTestimonials() {
    return await prisma.testimonial.findMany({ where: { deletedAt: null } });
  }
  async updateTestimonial(id: string, data: any) {
    return await prisma.testimonial.update({ where: { id }, data });
  }
  async deleteTestimonial(id: string) {
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    const deleted = await prisma.testimonial.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await prisma.trash.create({
      data: {
        entityType: 'testimonials',
        entityId: id,
        entityData: JSON.stringify(testimonial),
        expiresAt: addDays(new Date(), 31),
      },
    });
    return deleted;
  }
}

// FAQ
export class FAQService {
  async createFAQ(data: any) {
    return await prisma.fAQ.create({ data });
  }
  async getAllFAQs() {
    return await prisma.fAQ.findMany({ where: { deletedAt: null }, orderBy: { order: 'asc' } });
  }
  async updateFAQ(id: string, data: any) {
    return await prisma.fAQ.update({ where: { id }, data });
  }
  async deleteFAQ(id: string) {
    const faq = await prisma.fAQ.findUnique({ where: { id } });
    const deleted = await prisma.fAQ.update({ where: { id }, data: { deletedAt: new Date() } });
    await prisma.trash.create({
      data: {
        entityType: 'faqs',
        entityId: id,
        entityData: JSON.stringify(faq),
        expiresAt: addDays(new Date(), 31),
      },
    });
    return deleted;
  }
}

// TRASH
export class TrashService {
  async getAllTrash(entityType?: string) {
    return await prisma.trash.findMany({
      where: entityType ? { entityType } : {},
      orderBy: { deletedAt: 'desc' },
    });
  }

  async restoreItem(id: string) {
    const item = await prisma.trash.findUnique({ where: { id } });
    if (!item) throw new Error('Trash item not found');

    // Parse entity data and restore based on type
    const entityData = JSON.parse(item.entityData);

    // Delete from trash
    await prisma.trash.delete({ where: { id } });

    return { message: 'Item restored (implement specific restore logic per entity type)' };
  }

  async permanentlyDelete(id: string) {
    return await prisma.trash.delete({ where: { id } });
  }

  async cleanupExpired() {
    return await prisma.trash.deleteMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
      },
    });
  }
}

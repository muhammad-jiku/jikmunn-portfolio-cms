import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';

export class ServiceService {
  async createService(data: any) {
    return await prisma.service.create({ data });
  }

  async getAllServices(includeDeleted: boolean = false) {
    return await prisma.service.findMany({
      where: includeDeleted ? {} : { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getServiceById(id: string) {
    return await prisma.service.findUnique({ where: { id } });
  }

  async updateService(id: string, data: any) {
    return await prisma.service.update({ where: { id }, data });
  }

  async deleteService(id: string) {
    const service = await this.getServiceById(id);
    if (!service) throw new Error('Service not found');

    const deleted = await prisma.service.update({ where: { id }, data: { deletedAt: new Date() } });
    await prisma.trash.create({
      data: {
        entityType: 'services',
        entityId: id,
        entityData: service,
        expiresAt: addDays(new Date(), 31),
      },
    });
    return deleted;
  }
}

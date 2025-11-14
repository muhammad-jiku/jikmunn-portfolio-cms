import prisma from '../../../config/database.config';

export class AboutService {
  async getAbout() {
    const about = await prisma.about.findFirst();
    if (!about) {
      return await prisma.about.create({
        data: { numberOfClients: 0, numberOfProjects: 0, hoursOfSupport: 0, yearsOfExperience: 0 },
      });
    }
    return about;
  }

  async updateAbout(id: string, data: any) {
    return await prisma.about.update({ where: { id }, data });
  }

  async resetAbout(id: string) {
    return await prisma.about.update({
      where: { id },
      data: { numberOfClients: 0, numberOfProjects: 0, hoursOfSupport: 0, yearsOfExperience: 0 },
    });
  }
}

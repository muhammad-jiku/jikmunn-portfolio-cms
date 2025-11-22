import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Clear existing data in correct order (respecting foreign key constraints)
    console.log('🗑️  Cleaning existing data...');
    await prisma.$transaction([
      prisma.projectImage.deleteMany(),
      prisma.blogImage.deleteMany(),
      prisma.trash.deleteMany(),
      prisma.reference.deleteMany(),
      prisma.achievement.deleteMany(),
      prisma.professionalExperience.deleteMany(),
      prisma.education.deleteMany(),
      prisma.resumeSummary.deleteMany(),
      prisma.testimonial.deleteMany(),
      prisma.fAQ.deleteMany(),
      prisma.skill.deleteMany(),
      prisma.service.deleteMany(),
      prisma.blog.deleteMany(),
      prisma.project.deleteMany(),
      prisma.about.deleteMany(),
    ]);
    console.log('✅ Existing data cleaned\n');

    // Load seed data path
    const seedDataPath = path.join(__dirname, 'seed-data');

    // Seed About
    console.log('📊 Seeding About data...');
    const aboutData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'about.json'), 'utf-8'));
    await prisma.about.create({ data: aboutData });
    console.log('✅ About data seeded');

    // Seed Skills
    console.log('💻 Seeding Skills data...');
    const skillsData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'skills.json'), 'utf-8'));
    await prisma.skill.createMany({ data: skillsData });
    console.log(`✅ ${skillsData.length} skills seeded`);

    // Seed Services
    console.log('🛠️  Seeding Services data...');
    const servicesData = JSON.parse(
      fs.readFileSync(path.join(seedDataPath, 'services.json'), 'utf-8')
    );
    await prisma.service.createMany({ data: servicesData });
    console.log(`✅ ${servicesData.length} services seeded`);

    // Seed FAQ
    console.log('❓ Seeding FAQ data...');
    const faqData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'faq.json'), 'utf-8'));
    await prisma.fAQ.createMany({ data: faqData });
    console.log(`✅ ${faqData.length} FAQs seeded`);

    // Seed Testimonials
    console.log('💬 Seeding Testimonials data...');
    const testimonialsData = JSON.parse(
      fs.readFileSync(path.join(seedDataPath, 'testimonials.json'), 'utf-8')
    );
    await prisma.testimonial.createMany({ data: testimonialsData });
    console.log(`✅ ${testimonialsData.length} testimonials seeded`);

    // Seed Projects
    console.log('🚀 Seeding Projects data...');
    const projectsData = JSON.parse(
      fs.readFileSync(path.join(seedDataPath, 'projects.json'), 'utf-8')
    );
    for (const project of projectsData) {
      await prisma.project.create({ data: project });
    }
    console.log(`✅ ${projectsData.length} projects seeded`);

    // Seed Blogs
    console.log('📝 Seeding Blogs data...');
    const blogsData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'blogs.json'), 'utf-8'));
    for (const blog of blogsData) {
      await prisma.blog.create({ data: blog });
    }
    console.log(`✅ ${blogsData.length} blogs seeded`);

    // Seed Resume
    console.log('📄 Seeding Resume data...');
    const resumeData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'resume.json'), 'utf-8'));

    // Seed Resume Summary
    if (resumeData.summary) {
      await prisma.resumeSummary.create({ data: resumeData.summary });
      console.log('  ✅ Resume summary seeded');
    }

    // Seed Education
    if (resumeData.education && resumeData.education.length > 0) {
      await prisma.education.createMany({ data: resumeData.education });
      console.log(`  ✅ ${resumeData.education.length} education entries seeded`);
    }

    // Seed Experience
    if (resumeData.experience && resumeData.experience.length > 0) {
      await prisma.professionalExperience.createMany({ data: resumeData.experience });
      console.log(`  ✅ ${resumeData.experience.length} experience entries seeded`);
    }

    // Seed Achievements
    if (resumeData.achievements && resumeData.achievements.length > 0) {
      await prisma.achievement.createMany({ data: resumeData.achievements });
      console.log(`  ✅ ${resumeData.achievements.length} achievements seeded`);
    }

    // Seed References
    if (resumeData.references && resumeData.references.length > 0) {
      await prisma.reference.createMany({ data: resumeData.references });
      console.log(`  ✅ ${resumeData.references.length} references seeded`);
    }

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - About: 1 entry`);
    console.log(`   - Skills: ${skillsData.length} entries`);
    console.log(`   - Services: ${servicesData.length} entries`);
    console.log(`   - FAQs: ${faqData.length} entries`);
    console.log(`   - Testimonials: ${testimonialsData.length} entries`);
    console.log(`   - Projects: ${projectsData.length} entries`);
    console.log(`   - Blogs: ${blogsData.length} entries`);
    console.log(`   - Resume sections: ${Object.keys(resumeData).length} sections`);
    console.log('\n✨ Your database is ready for testing!\n');
  } catch (error) {
    console.error('\n❌ Seeding error:', error);
    throw error;
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

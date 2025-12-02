export enum TestimonialPlatform {
  UPWORK = 'UPWORK',
  LINKEDIN = 'LINKEDIN',
}

export interface Testimonial {
  id: string;
  name: string;
  jobPosition: string;
  imageUrl?: string;
  testimonial: string;
  platform: TestimonialPlatform;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialData {
  name: string;
  jobPosition: string;
  imageUrl?: string;
  testimonial: string;
  platform: TestimonialPlatform;
}

export interface UpdateTestimonialData {
  name?: string;
  jobPosition?: string;
  imageUrl?: string;
  testimonial?: string;
  platform?: TestimonialPlatform;
}

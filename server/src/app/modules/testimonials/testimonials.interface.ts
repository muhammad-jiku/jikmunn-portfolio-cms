export interface ITestimonial {
  id: string;
  name: string;
  jobPosition: string;
  testimonial: string;
  platform: 'UPWORK' | 'LINKEDIN';
  imageUrl?: string | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITestimonialFilters {
  searchTerm?: string;
  platform?: string;
}

export interface ICreateTestimonial {
  name: string;
  jobPosition: string;
  testimonial: string;
  platform: 'UPWORK' | 'LINKEDIN';
  imageUrl?: string;
}

export interface IUpdateTestimonial {
  name?: string;
  jobPosition?: string;
  testimonial?: string;
  platform?: 'UPWORK' | 'LINKEDIN';
  imageUrl?: string;
}

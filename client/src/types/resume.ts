// Resume Summary
export interface ResumeSummary {
  id: string;
  summary: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateResumeSummaryData {
  summary?: string;
  address?: string;
  phone?: string;
  email?: string;
}

// Education
export interface Education {
  id: string;
  degree: string;
  years: string;
  university: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEducationData {
  degree: string;
  years: string;
  university: string;
}

export interface UpdateEducationData {
  degree?: string;
  years?: string;
  university?: string;
}

// Professional Experience
export interface ProfessionalExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  years: string;
  achievements: string[];
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfessionalExperienceData {
  jobTitle: string;
  companyName: string;
  years: string;
  achievements: string[];
}

export interface UpdateProfessionalExperienceData {
  jobTitle?: string;
  companyName?: string;
  years?: string;
  achievements?: string[];
}

// Achievement
export interface Achievement {
  id: string;
  role: string;
  years: string;
  description: string[];
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAchievementData {
  role: string;
  years: string;
  description: string[];
}

export interface UpdateAchievementData {
  role?: string;
  years?: string;
  description?: string[];
}

// Reference
export interface Reference {
  id: string;
  name: string;
  jobTitle: string;
  companyName: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReferenceData {
  name: string;
  jobTitle: string;
  companyName: string;
}

export interface UpdateReferenceData {
  name?: string;
  jobTitle?: string;
  companyName?: string;
}

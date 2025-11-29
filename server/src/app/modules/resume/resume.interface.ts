export interface IResumeSummary {
  id: string;
  summary: string;
  address: string;
  phone: string;
  email: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEducation {
  id: string;
  degree: string;
  years: string;
  university: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  years: string;
  achievements: string[];
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAchievement {
  id: string;
  role: string;
  years: string;
  description: string[];
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReference {
  id: string;
  name: string;
  jobTitle: string;
  companyName: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateResumeSummary {
  summary: string;
  address: string;
  phone: string;
  email: string;
}

export interface IUpdateResumeSummary {
  summary?: string;
  address?: string;
  contactNumber?: string;
  email?: string;
}

export interface ICreateEducation {
  degree: string;
  years: string;
  university: string;
}

export interface IUpdateEducation {
  degree?: string;
  years?: string;
  university?: string;
}

export interface ICreateExperience {
  jobTitle: string;
  companyName: string;
  years: string;
  achievements: string[];
}

export interface IUpdateExperience {
  jobTitle?: string;
  companyName?: string;
  years?: string;
  achievements?: string[];
}

export interface ICreateAchievement {
  role: string;
  years: string;
  description: string[];
}

export interface IUpdateAchievement {
  role?: string;
  years?: string;
  description?: string[];
}

export interface ICreateReference {
  name: string;
  jobTitle: string;
  companyName: string;
}

export interface IUpdateReference {
  name?: string;
  jobTitle?: string;
  companyName?: string;
}

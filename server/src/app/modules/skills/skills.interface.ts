export interface ISkill {
  id: string;
  name: string;
  progress: number;
  iconUrl?: string | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISkillFilters {
  searchTerm?: string;
}

export interface ICreateSkill {
  name: string;
  progress: number;
  iconUrl?: string;
}

export interface IUpdateSkill {
  name?: string;
  progress?: number;
  iconUrl?: string;
}

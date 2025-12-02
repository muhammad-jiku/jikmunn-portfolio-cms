export interface Skill {
  id: string;
  name: string;
  progress: number; // 0-100
  iconUrl: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillData {
  name: string;
  progress: number;
  iconUrl: string;
}

export interface UpdateSkillData {
  name?: string;
  progress?: number;
  iconUrl?: string;
}

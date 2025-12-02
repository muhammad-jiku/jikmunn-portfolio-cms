import { CreateSkillData, Skill, UpdateSkillData } from '@/types/skill';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const skillsApi = {
  // Get all skills
  getSkills: async (): Promise<Skill[]> => {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch skills');
    return response.json();
  },

  // Get single skill
  getSkill: async (id: string): Promise<Skill> => {
    const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch skill');
    return response.json();
  },

  // Create skill
  createSkill: async (data: CreateSkillData): Promise<Skill> => {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create skill');
    return response.json();
  },

  // Update skill
  updateSkill: async (id: string, data: UpdateSkillData): Promise<Skill> => {
    const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update skill');
    return response.json();
  },

  // Delete skill
  deleteSkill: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete skill');
  },
};

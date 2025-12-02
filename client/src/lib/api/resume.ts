import {
  Achievement,
  CreateAchievementData,
  CreateEducationData,
  CreateProfessionalExperienceData,
  CreateReferenceData,
  Education,
  ProfessionalExperience,
  Reference,
  ResumeSummary,
  UpdateAchievementData,
  UpdateEducationData,
  UpdateProfessionalExperienceData,
  UpdateReferenceData,
  UpdateResumeSummaryData,
} from '@/types/resume';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Resume Summary API
export const resumeSummaryApi = {
  get: async (): Promise<ResumeSummary> => {
    const response = await fetch(`${API_BASE_URL}/resume/summary`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch resume summary');
    return response.json();
  },

  update: async (data: UpdateResumeSummaryData): Promise<ResumeSummary> => {
    const response = await fetch(`${API_BASE_URL}/resume/summary`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update resume summary');
    return response.json();
  },
};

// Education API
export const educationApi = {
  getAll: async (): Promise<Education[]> => {
    const response = await fetch(`${API_BASE_URL}/education`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch education');
    return response.json();
  },

  get: async (id: string): Promise<Education> => {
    const response = await fetch(`${API_BASE_URL}/education/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch education');
    return response.json();
  },

  create: async (data: CreateEducationData): Promise<Education> => {
    const response = await fetch(`${API_BASE_URL}/education`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create education');
    return response.json();
  },

  update: async (id: string, data: UpdateEducationData): Promise<Education> => {
    const response = await fetch(`${API_BASE_URL}/education/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update education');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/education/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete education');
  },
};

// Professional Experience API
export const professionalExperienceApi = {
  getAll: async (): Promise<ProfessionalExperience[]> => {
    const response = await fetch(`${API_BASE_URL}/professional-experience`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch experience');
    return response.json();
  },

  get: async (id: string): Promise<ProfessionalExperience> => {
    const response = await fetch(`${API_BASE_URL}/professional-experience/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch experience');
    return response.json();
  },

  create: async (data: CreateProfessionalExperienceData): Promise<ProfessionalExperience> => {
    const response = await fetch(`${API_BASE_URL}/professional-experience`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create experience');
    return response.json();
  },

  update: async (
    id: string,
    data: UpdateProfessionalExperienceData
  ): Promise<ProfessionalExperience> => {
    const response = await fetch(`${API_BASE_URL}/professional-experience/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update experience');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/professional-experience/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete experience');
  },
};

// Achievements API
export const achievementsApi = {
  getAll: async (): Promise<Achievement[]> => {
    const response = await fetch(`${API_BASE_URL}/achievements`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch achievements');
    return response.json();
  },

  get: async (id: string): Promise<Achievement> => {
    const response = await fetch(`${API_BASE_URL}/achievements/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch achievement');
    return response.json();
  },

  create: async (data: CreateAchievementData): Promise<Achievement> => {
    const response = await fetch(`${API_BASE_URL}/achievements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create achievement');
    return response.json();
  },

  update: async (id: string, data: UpdateAchievementData): Promise<Achievement> => {
    const response = await fetch(`${API_BASE_URL}/achievements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update achievement');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/achievements/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete achievement');
  },
};

// References API
export const referencesApi = {
  getAll: async (): Promise<Reference[]> => {
    const response = await fetch(`${API_BASE_URL}/references`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch references');
    return response.json();
  },

  get: async (id: string): Promise<Reference> => {
    const response = await fetch(`${API_BASE_URL}/references/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch reference');
    return response.json();
  },

  create: async (data: CreateReferenceData): Promise<Reference> => {
    const response = await fetch(`${API_BASE_URL}/references`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create reference');
    return response.json();
  },

  update: async (id: string, data: UpdateReferenceData): Promise<Reference> => {
    const response = await fetch(`${API_BASE_URL}/references/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update reference');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/references/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete reference');
  },
};

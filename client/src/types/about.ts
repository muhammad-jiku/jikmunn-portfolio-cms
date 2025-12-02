export interface About {
  id: string;
  numberOfClients: number;
  numberOfProjects: number;
  hoursOfSupport: number;
  yearsOfExperience: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAboutData {
  numberOfClients?: number;
  numberOfProjects?: number;
  hoursOfSupport?: number;
  yearsOfExperience?: number;
}

export interface IAbout {
  id: string;
  numberOfClients: number;
  numberOfProjects: number;
  hoursOfSupport: number;
  yearsOfExperience: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateAbout {
  numberOfClients?: number;
  numberOfProjects?: number;
  hoursOfSupport?: number;
  yearsOfExperience?: number;
}

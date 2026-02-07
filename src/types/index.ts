export interface PortfolioFormData {
  resume: File | null;
  photo: File | null;
  description: string;
  industry: string;
  colorScheme: string;
  fullName: string;
}

export interface GenerateRequest {
  resumeText: string;
  photoBase64: string;
  description: string;
  industry: string;
  colorScheme: string;
  fullName: string;
}

export interface GenerateResponse {
  html: string;
}

export interface PublishResponse {
  pagesUrl: string;
  repoUrl: string;
}

export interface SessionData {
  githubToken: string;
  githubUsername: string;
}

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  preview: string; // tailwind bg class for preview
}

export interface Industry {
  id: string;
  name: string;
  description: string;
}

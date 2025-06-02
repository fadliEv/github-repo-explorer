export interface RepoModel {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language?: string | null;
  html_url: string;
}

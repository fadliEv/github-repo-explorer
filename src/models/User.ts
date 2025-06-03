import type { RepoModel } from "./Repo";

export interface UserModel {
  id: number;
  login: string;
  avatar_url: string;
  name?: string;
  location?: string | null;
  followers?: number;
  repos_url: string;
  repos: RepoModel[];
}

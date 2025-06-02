import type RepoModel from "./Repo";

export interface UserModel {
  username: string;
  repos: RepoModel[];
}

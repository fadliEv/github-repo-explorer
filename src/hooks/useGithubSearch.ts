import { useState } from 'react';
import type { UserModel } from '../models/User';
import type { RepoModel } from '../models/Repo';
import { searchUsers, getUserRepos, getUserDetails } from '../services/githubService';

type UserWithRepos = UserModel & { repos: RepoModel[]; name?: string; location?: string | null; followers?: number };

export const useGitHubSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserWithRepos[]>([]);

  const search = async (keyword: string) => {
    setLoading(true);
    setError(null);

    try {
      const basicUsers = await searchUsers(keyword);

      const detailedUsers = await Promise.all(
        basicUsers.map(async (user) => {
          const details = await getUserDetails(user.login);
          const repos = await getUserRepos(user.login);
          return { ...user, ...details, repos };
        })
      );

      setUsers(detailedUsers);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, search };
};

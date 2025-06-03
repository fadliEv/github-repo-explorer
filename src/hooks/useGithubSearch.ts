import { useState } from 'react';
import type { UserModel } from '../models/User';
import type { PaginationParams } from '../models/Pagination';
import { searchUsers, getUserDetails, getUserRepos } from '../services/githubService';

type UserWithRepos = UserModel & { repos: any[]; name?: string; location?: string | null; followers?: number };

export const useGitHubSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserWithRepos[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const itemsPerPage = Number(import.meta.env.VITE_ITEMS_PER_PAGE) || 5;

  const search = async (newKeyword: string, pageNumber: number = 1) => {
    if (!newKeyword.trim()) return;
    setLoading(true);
    setError(null);

    try {
      setKeyword(newKeyword);
      setPage(pageNumber);

      const pagination: PaginationParams = {
        page: pageNumber,
        per_page: itemsPerPage,
      };

      const { items: fetchedUsers, total_count } = await searchUsers(newKeyword, pagination);

      const detailedUsers = await Promise.all(
        fetchedUsers.map(async (user) => {
          const details = await getUserDetails(user.login);          
          return { ...user, ...details, repos : [] };
        })
      );

      setUsers(detailedUsers);
      setTotalCount(total_count);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUsers([]);
    setTotalCount(0);
    setPage(1);
    setKeyword('');
    setError(null);
    setLoading(false);
  };

  const updateUserRepos = (login: string, repos: any[]) => {
    setUsers(prev =>
      prev.map(user =>
        user.login === login ? { ...user, repos } : user
      )
    );
  };

  return { users, totalCount, loading, error, page, itemsPerPage, keyword, search, setPage, reset, updateUserRepos };
};

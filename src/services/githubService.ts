import type { PaginationParams, PaginationResponse } from '../models/Pagination';
import apiClient from './apiClient';
import type { UserModel } from '../models/User';
import type { RepoModel } from '../models/Repo';

export const searchUsers = async (
  keyword: string,
  pagination: PaginationParams
): Promise<PaginationResponse<UserModel>> => {
  try {
    const res = await apiClient.get('/search/users', {
      params: {
        q: keyword,
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    const users = res.data.items.map((u: any) => ({
      id: u.id,
      login: u.login,
      avatar_url: u.avatar_url,
      repos_url: u.repos_url,
    }));

    return { items: users, total_count: res.data.total_count };
  } catch (error) {
    console.error('searchUsers error:', error);
    throw new Error('Failed to fetch users');
  }
};

export const getUserDetails = async (login: string): Promise<Partial<UserModel>> => {
  try {
    const res = await apiClient.get(`/users/${login}`);
    return {
      name: res.data.name,
      location: res.data.location,
      followers: res.data.followers,
    };
  } catch (error) {
    console.error('getUserDetails error:', error);
    throw new Error('Failed to fetch user details');
  }
};

export const getUserRepos = async (login: string, page = 1, per_page = 5): Promise<RepoModel[]> => {
  try {
    const res = await apiClient.get(`/users/${login}/repos`, {
      params: { page, per_page },
    });
    return res.data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      html_url: repo.html_url,
    }));
  } catch (error) {
    console.error(`getUserRepos error for ${login}:`, error);
    throw new Error('Failed to fetch repos');
  }
};

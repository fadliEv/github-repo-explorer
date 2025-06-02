import axios from 'axios';
import type { UserModel } from '../models/User';
import type { RepoModel } from '../models/Repo';

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 8000,
  headers: { Accept: 'application/vnd.github.v3+json' },
});

export const searchUsers = async (keyword: string): Promise<UserModel[]> => {
  try {
    const res = await githubAPI.get('/search/users', {
      params: { q: keyword, per_page: 5 },
    });
    // res.data.items adalah array user dari API
    return res.data.items.map((u: any) => ({
      id: u.id,
      login: u.login,
      avatar_url: u.avatar_url,
      repos_url: u.repos_url,
    }));
  } catch (error) {
    console.error('searchUsers error:', error);
    throw new Error('Failed to fetch users');
  }
};

export const getUserDetails = async (login: string): Promise<Partial<UserModel>> => {
  try {
    const res = await githubAPI.get(`/users/${login}`);
    return {
      name: res.data.name,
      location: res.data.location,
      followers: res.data.followers,
    };
  } catch (error) {
    console.error('getUserDetails error:', error);
    return {};
  }
};

export const getUserRepos = async (login: string): Promise<RepoModel[]> => {
  try {
    const res = await githubAPI.get(`/users/${login}/repos`);
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

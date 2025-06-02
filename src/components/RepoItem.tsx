import type { FC } from 'react'
import type RepoModel from '../models/Repo';
import { StarIcon } from '@heroicons/react/16/solid';

const RepoItem: FC<{ repo: RepoModel }> = ({ repo }) => {
  return (
    <div className="repo-item-container">
      <div>
        <div className="repo-title">{repo.name}</div>
        <div className="repo-description">{repo.description}</div>
      </div>
      <div className="repo-stars">
        <StarIcon className="w-5 h-5" />
        <span>{repo.stargazersCount}</span>
      </div>
    </div>
  );
};

export default RepoItem;

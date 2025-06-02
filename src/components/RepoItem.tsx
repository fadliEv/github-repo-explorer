import type { FC } from 'react'
import type RepoModel from '../models/Repo';
import { StarIcon } from '@heroicons/react/16/solid';

const RepoItem: FC<{ repo: RepoModel }> = ({ repo }) => {
  return (
    <div className="repo-item">
        <div>
            <div className="repo-title">{repo.name}</div>
            <div className="repo-description">{repo.description}</div>
        </div>
        <div className="repo-stars flex items-center gap-1">
            <span>{repo.stargazersCount}</span>
            <StarIcon className="w-5 h-5 text-yellow-400" />
        </div>
    </div>
  );
};

export default RepoItem;

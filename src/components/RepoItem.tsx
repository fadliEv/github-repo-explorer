import type { FC } from 'react'
import type RepoModel from '../models/Repo';

const RepoItem: FC<{ repo: RepoModel }> = ({ repo }) => {
  return (
    <div className="repo-item">
        <div>
            <div className="repo-title">{repo.name}</div>
            <div className="repo-description">{repo.description}</div>
        </div>
        <div className="repo-stars flex items-center gap-1">
            *
            <span>{repo.stargazersCount}</span>
        </div>
    </div>
  );
};

export default RepoItem;

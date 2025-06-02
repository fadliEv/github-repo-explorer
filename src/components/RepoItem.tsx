import type { FC } from 'react';
import { StarIcon } from '@heroicons/react/16/solid';
import type { RepoModel } from '../models/Repo';

const RepoItem: FC<{ repo: RepoModel }> = ({ repo }) => {
  return (
    <div className="repo-item-container">
      <div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-title hover:underline"
        >
          {repo.name}
        </a>
        <div className="repo-description">{repo.description}</div>
      </div>
      <div className="repo-stars">
        <StarIcon className="w-5 h-5" />
        <span>{repo.stargazers_count}</span>
      </div>
    </div>
  );
};

export default RepoItem;

import type { FC } from 'react';
import { StarIcon } from '@heroicons/react/16/solid';
import type { RepoModel } from '../models/Repo';

const RepoItem: FC<{ repo: RepoModel }> = ({ repo }) => {
  const truncate = (text: string | null | undefined, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

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
        <div className="repo-description">{truncate(repo.description, 100)}</div>
      </div>
      <div className="repo-stars">
        <StarIcon className="w-5 h-5" />
        <span>{repo.stargazers_count}</span>
      </div>
    </div>
  );
};

export default RepoItem;

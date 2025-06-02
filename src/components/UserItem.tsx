import { useState, type FC } from 'react';
import type { UserModel } from '../models/User';
import RepoItem from './RepoItem';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';

const UserItem: FC<UserModel> = ({ login, name, location, followers, repos, avatar_url }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className="user-item-container"
        onClick={() => setExpanded(p => !p)}
      >
        <span className="user-name">{name}</span>
        {expanded ? (
          <ChevronUpIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-gray-600" />
        )}
      </div>
      {expanded && (
        <div className="repo-wrapper">
          {repos.map(repo => (
            <RepoItem key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserItem;

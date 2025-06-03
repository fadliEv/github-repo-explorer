import { useState, type FC } from 'react';
import type { UserModel } from '../models/User';
import RepoItem from './RepoItem';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';

const UserItem: FC<UserModel> = ({ login, name, location, followers, repos, avatar_url }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className="user-item-container flex items-center gap-4 cursor-pointer"
        onClick={() => setExpanded(p => !p)}
      >
        <img
          src={avatar_url}
          alt={login}
          className="w-12 h-12 rounded-full"
          loading="lazy"
        />
        <div className="flex-grow">
          <div className="user-name text-lg font-semibold">{name || login}</div>
          <div className="text-sm text-gray-500">{location || 'Location tidak tersedia'}</div>
          <div className="text-xs text-gray-400">{followers} followers</div>
        </div>
        {expanded ? (
          <ChevronUpIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-gray-600" />
        )}
      </div>

      {expanded && (
        <div className="repo-wrapper mt-2">
          {repos.length > 0 ? (
            repos.map(repo => <RepoItem key={repo.id} repo={repo} />)
          ) : (
            <p className="empty-message">Repositori belum tersedia.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserItem;

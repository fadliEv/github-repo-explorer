import { useState, useEffect, type FC } from 'react';
import type { UserModel } from '../models/User';
import RepoItem from './RepoItem';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { getUserRepos } from '../services/githubService';
import Loading from './Loading';

type UserItemProps = UserModel & {
  updateUserRepos: (login: string, repos: any[]) => void;
};

const UserItem: FC<UserItemProps> = ({
  login,
  name,
  location,
  followers,
  repos = [],
  avatar_url,
  updateUserRepos,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [localRepos, setLocalRepos] = useState(repos);

  useEffect(() => {
    setLocalRepos(repos);
  }, [repos]);

  const handleToggle = async () => {
    setExpanded(prev => !prev);

    if (!expanded && localRepos.length === 0) {      
      setLoadingRepos(true);
      try {
        const fetchedRepos = await getUserRepos(login);
        setLocalRepos(fetchedRepos);
        updateUserRepos(login, fetchedRepos);
      } catch {      
      } finally {
        setLoadingRepos(false);
      }
    }
  };

  return (
    <div>
      <div
        className="user-item-container flex items-center gap-4 cursor-pointer"
        onClick={handleToggle}
      >
        <img
          src={avatar_url}
          alt={login}
          className="w-12 h-12 rounded-full"
          loading="lazy"
        />
        <div className="flex-grow">
          <div className="user-name text-lg font-semibold">{name || login}</div>
          <div className="text-sm text-gray-500">{location || 'Location not available'}</div>
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
          {loadingRepos ? (
            <Loading />
          ) : localRepos.length > 0 ? (
            localRepos.map(repo => <RepoItem key={repo.id} repo={repo} />)
          ) : (
            <p className="empty-message">No repositories available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserItem;

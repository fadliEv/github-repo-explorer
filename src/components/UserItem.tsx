import { useState, useEffect, useRef, type FC } from 'react';
import type { UserModel } from '../models/User';
import RepoItem from './RepoItem';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { getUserRepos } from '../services/githubService';
import Loading from './Loading';
import type { RepoModel } from '../models/Repo';

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
  const [localRepos, setLocalRepos] = useState<RepoModel[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 7;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLocalRepos(repos);
  }, [repos]);

  const loadRepos = async (nextPage: number) => {
    setLoadingRepos(true);
    try {
      const newRepos = await getUserRepos(login, nextPage, perPage);
      setLocalRepos(prev => [...prev, ...newRepos]);
      updateUserRepos(login, [...localRepos, ...newRepos]);
      setHasMore(newRepos.length === perPage);
    } catch (err) {      
      setHasMore(false);
    } finally {
      setLoadingRepos(false);
    }
  };

  const handleToggle = async () => {
    setExpanded(!expanded);
    if (!expanded && localRepos.length === 0) {
      await loadRepos(1);
      setPage(2);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current || loadingRepos || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadRepos(page);
      setPage(prev => prev + 1);
    }
  };

  return (
    <div>
      <div
        className="user-item-container flex items-center gap-4 cursor-pointer"
        onClick={handleToggle}
      >
        <img src={avatar_url} alt={login} className="w-12 h-12 rounded-full" loading="lazy" />
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
        <div
          className="repo-wrapper"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {loadingRepos && localRepos.length === 0 && <Loading />}

          {!loadingRepos && localRepos.length === 0 && (
            <p className="empty-message">No repositories available.</p>
          )}

          {localRepos.map(repo => (
            <RepoItem key={repo.id} repo={repo} />
          ))}

          {loadingRepos && localRepos.length > 0 && <Loading />}

          {!hasMore && localRepos.length > 0 && (
            <p className="text-center text-sm text-gray-500">No more repositories</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserItem;

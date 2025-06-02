import { useState } from 'react';
import type { UserModel } from '../models/User';
import type { FC } from 'react'
import RepoItem from './RepoItem';


const UserItem: FC<UserModel> = ({ username, repos }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className="user-item"
        onClick={() => setExpanded(prev => !prev)}        
      >
        <span className="user-name">{username}</span>
        <span>{expanded ? '<' : '>'}</span>
      </div>
      {expanded && (
        <div className="user-item-expanded">
          <div className="repo-list">
             {repos.map(repo => (
              <RepoItem key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserItem;

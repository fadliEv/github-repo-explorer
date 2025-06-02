import { useState, type FC } from 'react'
import UserItem from './UserItem';
import type { UserModel } from '../models/User';

type UserListProps = {
  users: UserModel[];
};

const UserList: FC<UserListProps> = ({users}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="user-list">
        {users.map(user => (
            <div>
                <div
                    className="user-item"
                    onClick={() => setExpanded(prev => !prev)}        
                >
                    <span className="user-name">{user.username}</span>
                    <span>{expanded ? '<' : '>'}</span>
                </div>
                {expanded && (
                    <div className="user-item-expanded">
                    <div className="repo-list">
                        {user.repos.map(repo => (
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
                        ))}
                    </div>
                    </div>
                )}
            </div>
        ))}
        </div>
    );
};

export default UserList;

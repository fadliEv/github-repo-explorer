import type { FC } from 'react';
import UserItem from './UserItem';
import type { UserModel } from '../models/User';
import Loading from './Loading';

type UserListProps = {
  users: UserModel[];
  loading: boolean;
  error: string | null;
  updateUserRepos: (login: string, repos: any[]) => void;
};

const UserList: FC<UserListProps> = ({ users, loading, error, updateUserRepos }) => {
  if (loading)
    return (
      <div className="user-list-empty">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="user-list-empty">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );

  if (users.length === 0)
    return (
      <div className="user-list-empty">
        <p className="empty-message">No search results found</p>
      </div>
    );

  return (
    <div className="user-list">
      {users.map(user => (
        <UserItem key={user.login} {...user} updateUserRepos={updateUserRepos} />
      ))}
    </div>
  );
};

export default UserList;

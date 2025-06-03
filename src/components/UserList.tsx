import type { FC } from 'react';
import UserItem from './UserItem';
import type { UserModel } from '../models/User';

type UserListProps = {
  users: UserModel[];
};

const UserList: FC<UserListProps> = ({ users }) => {
  if (users.length === 0) {
    return <div className="user-list">
      <p className="empty-message">Belum melakukan pencarian atau data kosong.</p>
    </div>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <UserItem
          key={user.login}
          {...user}
        />
      ))}
    </div>
  );
};

export default UserList;

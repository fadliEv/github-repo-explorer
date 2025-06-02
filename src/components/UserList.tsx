import type { FC } from 'react'
import UserItem from './UserItem';
import type { UserModel } from '../models/User';

type UserListProps = {
  users: UserModel[];
};

const UserList: FC<UserListProps> = ({users}) => {
  return (
    <div className="user-list">
      {users.map(user => (
        <UserItem
          key={user.username}
          username={user.username}
          repos={user.repos}
        />
      ))}
    </div>
  );
};

export default UserList;

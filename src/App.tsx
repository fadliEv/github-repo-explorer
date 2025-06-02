import React, { useState } from 'react';
import InputUsername from './components/InputUsername';
import UserList from './components/UserList';
import type { UserModel } from './models/User';


const dummyUsers: UserModel[] = [
  {
    username: 'bosque',
    repos: [
      {
        id: 1,
        name: 'awesome-project',
        description: 'My awesome project repo',
        stargazersCount: 42,
      },
      {
        id: 2,
        name: 'react-lib',
        description: 'Reusable React components',
        stargazersCount: 10,
      },
    ],
  },
  {
    username: 'dev123',
    repos: [
      {
        id: 3,
        name: 'api-server',
        description: 'Backend API server',
        stargazersCount: 7,
      },
    ],
  },
];

const App: React.FC = () => {
  const [users, setUsers] = useState<UserModel[]>(dummyUsers);

  const handleSearch = (username: string) => {};

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">GitHub User Search</h1>
      <InputUsername onSearch={handleSearch} />
      <UserList users={users} />
    </div>
  );
};

export default App;

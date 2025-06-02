import React from 'react';
import InputUsername from './components/InputUsername';
import UserList from './components/UserList';
import { useGitHubSearch } from './hooks/useGithubSearch';


const App: React.FC = () => {
  const { users, loading, error, search } = useGitHubSearch();

  return (
    <div className="app-background">
      <div className="app-card">
        <h1 className="app-title">GitHub User Search</h1>
        <InputUsername onSearch={search} />
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <UserList users={users} />
      </div>
    </div>
  );
};

export default App;

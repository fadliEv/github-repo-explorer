import React from 'react';
import InputUsername from './components/InputUsername';
import UserList from './components/UserList';
import Pagination from './components/Pagination';
import { useGitHubSearch } from './hooks/useGithubSearch';

const App: React.FC = () => {
  const { users, totalCount, loading, error, page, itemsPerPage, keyword, search, setPage, reset} = useGitHubSearch();

  const handleSearch = (newKeyword: string) => {
    search(newKeyword, 1);
  };

  const handlePageChange = (newPage: number) => {
    search(keyword, newPage);
  };

  const handleReset = () => {
    reset()
  };

  return (
    <div className="app-background">
      <div className="app-card">
        <h1 className="app-title">GitHub User Search</h1>
        <InputUsername onSearch={handleSearch} onReset={handleReset} />
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <UserList users={users} />
        <Pagination
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default App;

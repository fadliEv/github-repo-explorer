import React from 'react';
import InputUsername from './components/InputUsername';
import UserList from './components/UserList';
import Pagination from './components/Pagination';
import { useGitHubSearch } from './hooks/useGithubSearch';
import Loading from './components/Loading';

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
        <UserList users={users} loading={loading} error={error} />
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

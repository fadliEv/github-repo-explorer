import React from 'react';
import InputUsername from './components/InputUsername';
import UserList from './components/UserList';
import Pagination from './components/Pagination';
import { useGitHubSearch } from './hooks/useGithubSearch';
import PreviewKeyword from './components/PreviewKeyword';

const App: React.FC = () => {
  const { users, totalCount, loading, error, page, itemsPerPage, keyword, search, reset, updateUserRepos} = useGitHubSearch();

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
        <PreviewKeyword keyword={users ? keyword : ""}/>
        <UserList
          users={users}
          loading={loading}
          error={error}
          updateUserRepos={updateUserRepos}
        />
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

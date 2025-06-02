import React, { useState } from 'react';
import InputUsername from './components/InputUsername';

const App: React.FC = () => {  

  const handleSearch = (username: string) => {};

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">GitHub User Search</h1>
      <InputUsername onSearch={handleSearch} />      
    </div>
  );
};

export default App;

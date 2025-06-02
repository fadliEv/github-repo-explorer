import React, { useState } from 'react';
import type { FC } from 'react'

type InputUsernameProps = {
  onSearch: (username: string) => void;
};

const InputUsername: FC<InputUsernameProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-4">
      <input
        type="text"
        placeholder="Enter username"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="input-username"        
      />
      <button
        type="submit"
        className="btn-search"        
      >
        Search
      </button>
    </form>
  );
};

export default InputUsername;

import React, { useState, type FC } from 'react';

type InputUsernameProps = {
  onSearch: (username: string) => void;
};

const InputUsername: FC<InputUsernameProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input
        type="text"
        placeholder="Enter username"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="input-text"
      />
      <button type="submit" className="input-btn">
        Search
      </button>
    </form>
  );
};

export default InputUsername;

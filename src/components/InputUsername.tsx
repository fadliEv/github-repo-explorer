import React, { useState, type FC } from 'react';
import { ArrowPathIcon } from '@heroicons/react/16/solid';


type InputUsernameProps = {
  onSearch: (username: string) => void;
  onReset?: () => void;
};

const InputUsername: FC<InputUsernameProps> = ({ onSearch, onReset }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  const handleReset = () => {
    setInput('');
    if (onReset) onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="input-container items-center">
      <input
        type="text"
        placeholder="Enter username"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="input-text flex-grow"
        autoFocus
      />
      <div className='flex'>
      <button type="submit" className="input-btn w-5/6">
        Search
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="input-btn flex justify-center items-center ms-1 w-1/6"
      >
         <ArrowPathIcon className="h-5 w-5" />
      </button>
      </div>      
    </form>
  );
};

export default InputUsername;

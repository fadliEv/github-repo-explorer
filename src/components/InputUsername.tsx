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
    if (input.trim().length >= 3) onSearch(input.trim());
  };

  const handleReset = () => {
    setInput('');
    if (onReset) onReset();
  };

  const isInputValid:Boolean = input.trim().length >= 3;

  const baseBtnClass = 'input-btn transition flex justify-center items-center';

  const searchBtnClass = `${baseBtnClass} w-5/6 ${
    isInputValid ? 'hover:bg-blue-600 cursor-pointer' : 'opacity-50 cursor-not-allowed'
  }`;

  const resetBtnClass = `${baseBtnClass} w-1/6 ms-1 ${
    isInputValid ? 'hover:bg-blue-600 cursor-pointer' : 'opacity-50 cursor-not-allowed'
  }`;

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
     <button
        type="submit"
        className={searchBtnClass}
        disabled={!isInputValid}
      >
        Search
      </button>

      <button
        type="button"
        onClick={handleReset}
        className={resetBtnClass}
        disabled={!isInputValid}
      >
        <ArrowPathIcon className="h-5 w-5" />
      </button>
      </div>      
    </form>
  );
};

export default InputUsername;

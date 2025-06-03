import { type FC } from 'react';

type KeywordProps = {
  keyword: String;
};

const PreviewKeyword: FC<KeywordProps> = ({ keyword }) => {
  return (
    <>
      {keyword && <p className="text-gray-400 italic my-2">Showing users for "{keyword}"</p>}    
    </>
  );
};

export default PreviewKeyword;

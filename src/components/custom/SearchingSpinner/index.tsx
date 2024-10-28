

import React, { useEffect, useState } from 'react';

const SearchingSpinner = () => {
  const [showTeamB, setShowTeamB] = useState(false);
//for the demo purpose
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeamB(true);
    }, 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loader relative">
      <span></span>
      {showTeamB && (
        <div className='w-20 h-20 bg-black rounded-full absolute right-10 p-6 text-white font-bold'>TeamB</div>
      )}
    </div>
  );
}

export default SearchingSpinner;


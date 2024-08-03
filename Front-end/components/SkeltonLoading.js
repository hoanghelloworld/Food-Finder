import React from 'react';

function SkeltonLoading() {
  return (
    <div className='animate-pulse flex flex-col items-center justify-center w-[195px] h-[200px] p-2 rounded-lg shadow-md mb-1 bg-gray-300 mt-[20px]'>
      <div className='w-full h-32 bg-gray-400 mb-2'></div>
      <div className='w-3/4 h-4 bg-gray-400 mb-1'></div>
      <div className='w-1/2 h-4 bg-gray-400'></div>
    </div>
  );
}

export default SkeltonLoading;

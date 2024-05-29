import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="flex gap-5 mt-3 flex-col">
      <div className="w-full rounded-md h-6 bg-gray-300 animate-pulse"></div>
      <div className="w-full rounded-md h-6 bg-gray-300 animate-pulse"></div>
      <div className="w-full rounded-md h-6 bg-gray-300 animate-pulse"></div>
      <div className="w-full rounded-md h-6 bg-gray-300 animate-pulse"></div>
      <div className="w-full rounded-md h-6 bg-gray-300 animate-pulse"></div>
      <div className="w-full rounded-md h-6 bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export default SkeletonLoader;
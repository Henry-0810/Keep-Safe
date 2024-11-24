import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 p-4 font-sans text-white">
      <div className="text-center">
        <p className="text-xl mb-4">Loading...</p>
        <div className="animate-spin border-8 border-t-8 border-gray-500 rounded-full w-16 h-16 mx-auto mt-4 bg-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

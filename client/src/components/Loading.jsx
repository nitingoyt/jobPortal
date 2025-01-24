import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin" style={{ marginTop: '-10%' }}></div>
    </div>
  );
};

export default Loading;

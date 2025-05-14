
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative bg-gradient-to-br from-indigo-400 to-blue-600 w-16 h-16 rounded-lg flex items-center justify-center shadow-lg">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full binary-bg"></div>
        </div>
        
        {/* Circuit-like patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-2 left-2 w-3 h-3 border rounded-full border-indigo-300"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border rounded-full border-indigo-300"></div>
          <div className="absolute top-2 right-6 w-2 h-2 border-t border-r border-indigo-300"></div>
          <div className="absolute bottom-2 left-6 w-2 h-2 border-b border-l border-indigo-300"></div>
        </div>
        
        <span className="text-white text-2xl font-bold font-mono relative">
          TMC
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-indigo-200 rounded-full animate-ping"></span>
        </span>
        
        <div className="absolute -bottom-1 -right-1 bg-amber-300 w-6 h-6 rounded-sm flex items-center justify-center animate-pulse">
          <span className="text-indigo-900 text-xs font-bold">$</span>
        </div>
      </div>
      
      <h1 className="mt-2 text-xl font-bold flex items-center">
        <span className="text-indigo-300 mr-1">TRUE</span>
        <span className="text-white">MONEY</span>
        <span className="text-indigo-300 ml-1">CATCHER</span>
      </h1>
      
      <div className="text-xs flex items-center space-x-2 mt-1 text-indigo-200/90">
        <span className="bg-indigo-500/30 px-1.5 py-0.5 rounded font-mono">v2.1</span>
        <span>ระบบดักซองอังเปาอัตโนมัติ</span>
      </div>
    </div>
  );
};

export default Logo;

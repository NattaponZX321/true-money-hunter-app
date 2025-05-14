
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative bg-gradient-to-br from-blue-500 to-indigo-700 w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-pulse-scale">
        <span className="text-white text-2xl font-bold">TMC</span>
        <div className="absolute -bottom-1 -right-1 bg-amber-300 w-6 h-6 rounded-full flex items-center justify-center animate-glow">
          <span className="text-slate-800 text-xs font-bold">$</span>
        </div>
      </div>
      <h1 className="mt-2 text-xl font-bold gradient-text">TrueMoney Catcher</h1>
      <p className="text-sm text-blue-300">ดักซองอังเปาแบบมืออาชีพ</p>
    </div>
  );
};

export default Logo;

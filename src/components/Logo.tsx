
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
<<<<<<< HEAD
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 w-16 h-16 rounded-lg flex items-center justify-center shadow-lg border border-gray-700 overflow-hidden">
=======
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 w-16 h-16 rounded-lg flex items-center justify-center shadow-lg border border-gray-700">
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full binary-bg"></div>
        </div>
        
        {/* Circuit-like patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-2 left-2 w-3 h-3 border rounded-full border-blue-400"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border rounded-full border-blue-400"></div>
          <div className="absolute top-2 right-6 w-2 h-2 border-t border-r border-blue-400"></div>
          <div className="absolute bottom-2 left-6 w-2 h-2 border-b border-l border-blue-400"></div>
        </div>
        
<<<<<<< HEAD
        {/* Use the downloaded image as background */}
        <img 
          src="/icons/app-icon.png" 
          alt="Cybersafe Gift TW" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-10"
        />
        
        <span className="text-white text-2xl font-bold font-mono relative z-20">
        </span>
        
        <div className="absolute -bottom-3 -right-3 bg-red-600 w-6 h-6 rounded-sm flex items-center justify-center animate-pulse z-20">
          <span className="text-white text-xs font-bold">C<span style={{ fontSize: '0.8em' }}>s</span></span>
        </div>
      </div>
      
      <h1 className="mt-2 text-lg font-bold flex items-center flex-wrap justify-center">
        <span className="text-blue-400">CYBERSAFE</span>
        <span className="text-white mx-1">GIFT</span>
        <span className="text-blue-400">TW</span>
        <span className="text-white ml-1">TELEGRAM</span>
      </h1>
      
      <div className="text-xs flex items-center space-x-2 mt-1 text-gray-300/90">
        <span className="bg-gray-700/50 px-1.5 py-0.5 rounded font-mono">v3.0</span>
        <span>ดักซองผ่าน Telegram</span>
=======
        <span className="text-white text-2xl font-bold font-mono relative">
          TMC
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></span>
        </span>
        
        <div className="absolute -bottom-1 -right-1 bg-amber-300 w-6 h-6 rounded-sm flex items-center justify-center animate-pulse">
          <span className="text-gray-900 text-xs font-bold">$</span>
        </div>
      </div>
      
      <h1 className="mt-2 text-xl font-bold flex items-center">
        <span className="text-blue-400 mr-1">TRUE</span>
        <span className="text-white">MONEY</span>
        <span className="text-blue-400 ml-1">CATCHER</span>
      </h1>
      
      <div className="text-xs flex items-center space-x-2 mt-1 text-gray-300/90">
        <span className="bg-gray-700/50 px-1.5 py-0.5 rounded font-mono">v2.1</span>
        <span>ระบบดักซองอังเปาอัตโนมัติ</span>
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a
      </div>
    </div>
  );
};

export default Logo;

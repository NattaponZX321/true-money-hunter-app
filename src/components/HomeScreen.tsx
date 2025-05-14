
import React, { useState, useEffect } from 'react';
import { checkApiHealth } from '../services/api';
import { CheckCircle, XCircle, ArrowRight, Activity, Search, Terminal, Lock, AlertTriangle } from 'lucide-react';

const HomeScreen: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [apiStatus, setApiStatus] = useState<boolean | null>(null);
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkApiHealth();
      setApiStatus(status);
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    
    // Update the time every second for the cyber clock
    const timeInterval = setInterval(() => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString());
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="animate-fade-in space-y-4 cyber-grid">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="text-blue-400 font-mono text-xs flex items-center">
          <Terminal size={12} className="mr-1" />
          <span>SYSTEM.CONSOLE</span>
        </div>
        <div className="text-blue-400 font-mono text-xs">
          {timeString}
        </div>
      </div>
      
      <div className="cyber-card digital-noise shimmer">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold gradient-text flex items-center cyber-line">
            <Activity size={18} className="mr-2 text-blue-400" />
            SYSTEM STATUS
          </h2>
          <div className="flex items-center">
            {apiStatus === null ? (
              <span className="text-amber-300 text-sm flex items-center bg-amber-900/30 px-2 py-0.5 rounded-md">
                <div className="highlight-dot mr-2"></div>
                SCANNING...
              </span>
            ) : apiStatus ? (
              <span className="text-green-400 text-sm flex items-center bg-green-900/30 px-2 py-0.5 rounded-md">
                <CheckCircle size={14} className="mr-1" />
                CONNECTED
              </span>
            ) : (
              <span className="text-red-400 text-sm flex items-center bg-red-900/30 px-2 py-0.5 rounded-md">
                <XCircle size={14} className="mr-1" />
                OFFLINE
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-3 text-xs text-blue-300/70 font-mono border-t border-blue-500/20 pt-2">
          <div className="flex justify-between">
            <span>Latency:</span>
            <span className="text-blue-400">{apiStatus ? '24ms' : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>Security:</span>
            <span className="text-green-400">Encrypted</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div 
          className="cyber-card hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer hover:scale-[1.02] duration-300"
          onClick={() => onNavigate('register')}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full mx-auto flex items-center justify-center mb-2">
              <Plus size={24} className="text-blue-400" />
            </div>
            <h3 className="font-semibold text-blue-100">ADD NUMBER</h3>
            <p className="text-xs text-blue-300/70 mt-1 font-mono">Register new phone</p>
            <div className="mt-2 text-blue-400 flex items-center justify-center text-sm">
              <span>START</span>
              <ArrowRight size={14} className="ml-1" />
            </div>
          </div>
        </div>

        <div 
          className="cyber-card hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer hover:scale-[1.02] duration-300"
          onClick={() => onNavigate('status')}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-blue-500/20 rounded-full mx-auto flex items-center justify-center mb-2">
              <Search size={24} className="text-indigo-400" />
            </div>
            <h3 className="font-semibold text-blue-100">CHECK STATUS</h3>
            <p className="text-xs text-blue-300/70 mt-1 font-mono">Monitor & verify</p>
            <div className="mt-2 text-indigo-400 flex items-center justify-center text-sm">
              <span>SCAN</span>
              <ArrowRight size={14} className="ml-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="cyber-card matrix-bg shimmer relative overflow-hidden">
        <div className="absolute top-5 right-5 text-yellow-500">
          <AlertTriangle size={24} className="opacity-60" />
        </div>
        
        <div className="absolute top-2 left-2 flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
        
        <div className="pt-5">
          <div className="flex items-center space-x-2 mb-2">
            <Lock size={18} className="text-yellow-500" />
            <h3 className="text-lg font-bold text-yellow-500">SECURE SYSTEM</h3>
          </div>
          
          <p className="text-sm mb-4 text-blue-100 font-mono border-l-2 border-yellow-500/50 pl-3">
            Auto-capture TrueMoney red packets with our advanced interception system.
          </p>
          
          <button 
            onClick={() => onNavigate('help')} 
            className="bg-yellow-500/10 text-yellow-500 text-sm font-mono px-4 py-2 rounded border border-yellow-500/30 hover:bg-yellow-500/20 transition-colors flex items-center"
          >
            <Terminal size={14} className="mr-2" />
            ACCESS DOCUMENTATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

function Plus(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

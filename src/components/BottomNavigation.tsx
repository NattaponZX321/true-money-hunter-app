
import React from 'react';
import { Home, Plus, Search, HelpCircle } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'register', label: 'ADD', icon: Plus },
    { id: 'status', label: 'STATUS', icon: Search },
    { id: 'help', label: 'HELP', icon: HelpCircle },
  ];

  return (
    <div className="bottom-nav shadow-lg backdrop-blur-md bg-slate-900/80">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => setActiveTab(item.id)}
        >
          <div className={`relative ${
            activeTab === item.id 
              ? 'before:absolute before:w-7 before:h-0.5 before:bg-blue-400 before:bottom-0 before:-mb-1.5 before:rounded-full before:left-1/2 before:-translate-x-1/2 before:shadow-[0_0_8px_rgba(59,130,246,0.6)]' 
              : ''
          }`}>
            <item.icon 
              size={18} 
              className={`nav-icon ${activeTab === item.id ? 'text-blue-400' : ''} transition-all duration-300`} 
            />
          </div>
          <span className="transition-all duration-300 text-[10px] font-mono tracking-wider mt-0.5">
            {item.label}
          </span>
          
          {activeTab === item.id && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-8 h-0.5 bg-blue-400/50 rounded-full blur-sm"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;

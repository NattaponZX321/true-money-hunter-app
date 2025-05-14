
import React from 'react';
import { Home, Plus, Search, HelpCircle } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'หน้าหลัก', icon: Home },
    { id: 'register', label: 'เพิ่มเบอร์', icon: Plus },
    { id: 'status', label: 'เช็คสถานะ', icon: Search },
    { id: 'help', label: 'วิธีใช้', icon: HelpCircle },
  ];

  return (
    <div className="bottom-nav shadow-lg">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => setActiveTab(item.id)}
        >
          <div className={`relative ${activeTab === item.id ? 'before:absolute before:w-full before:h-0.5 before:bg-blue-400 before:bottom-0 before:-mb-2 before:rounded-full before:shadow-md before:shadow-blue-400/50' : ''}`}>
            <item.icon 
              size={20} 
              className={`nav-icon ${activeTab === item.id ? 'text-blue-400' : ''} transition-all duration-300`} 
            />
          </div>
          <span className="transition-all duration-300">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;

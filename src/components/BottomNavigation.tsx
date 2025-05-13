
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
          <item.icon size={20} className={`nav-icon ${activeTab === item.id ? 'text-tmoney-red' : ''}`} />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;

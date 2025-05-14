
import React, { useState, useEffect } from 'react';
import { checkApiHealth } from '../services/api';
import { CheckCircle, XCircle, ArrowRight, Activity, Search } from 'lucide-react';

const HomeScreen: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [apiStatus, setApiStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkApiHealth();
      setApiStatus(status);
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in space-y-4">
      <div className="glass-card shimmer">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold gradient-text flex items-center">
            <Activity size={20} className="mr-2 text-blue-400" />
            สถานะ API
          </h2>
          <div className="flex items-center">
            {apiStatus === null ? (
              <span className="text-amber-300 text-sm flex items-center">
                <div className="highlight-dot mr-2"></div>
                กำลังตรวจสอบ...
              </span>
            ) : apiStatus ? (
              <span className="text-green-400 text-sm flex items-center">
                <CheckCircle size={16} className="mr-1" />
                ใช้งานได้
              </span>
            ) : (
              <span className="text-red-400 text-sm flex items-center">
                <XCircle size={16} className="mr-1" />
                ไม่สามารถเชื่อมต่อได้
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div 
          className="glass-card hover:shadow-lg transition-all cursor-pointer hover:scale-105 duration-300 glowing-border"
          onClick={() => onNavigate('register')}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full mx-auto flex items-center justify-center mb-2">
              <Plus size={24} className="text-blue-400" />
            </div>
            <h3 className="font-semibold text-white">เพิ่มเบอร์ดักซอง</h3>
            <p className="text-xs text-blue-200/70 mt-1">ลงทะเบียนเบอร์ใหม่</p>
            <div className="mt-2 text-blue-400 flex items-center justify-center text-sm">
              <span>เริ่มเลย</span>
              <ArrowRight size={14} className="ml-1" />
            </div>
          </div>
        </div>

        <div 
          className="glass-card hover:shadow-lg transition-all cursor-pointer hover:scale-105 duration-300 glowing-border"
          onClick={() => onNavigate('status')}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-blue-500/20 rounded-full mx-auto flex items-center justify-center mb-2">
              <Search size={24} className="text-indigo-400" />
            </div>
            <h3 className="font-semibold text-white">เช็คสถานะ</h3>
            <p className="text-xs text-blue-200/70 mt-1">ตรวจสอบยอดและหมดอายุ</p>
            <div className="mt-2 text-indigo-400 flex items-center justify-center text-sm">
              <span>ตรวจสอบ</span>
              <ArrowRight size={14} className="ml-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="angpao-card tech-glow animate-float shimmer">
        <div className="absolute top-2 right-2 opacity-20">
          <div className="w-16 h-16 rounded-full border-4 border-amber-300"></div>
        </div>
        
        <h3 className="text-lg font-bold mb-3">
          <span className="gold-accent">✨ ดักซองอังเปาอัตโนมัติ</span>
        </h3>
        
        <p className="text-sm mb-4 text-blue-100">
          เพียงลงทะเบียนเบอร์โทรศัพท์ ระบบจะดักซองอังเปา TrueMoney ให้คุณโดยอัตโนมัติ
        </p>
        
        <button 
          onClick={() => onNavigate('help')} 
          className="bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition-colors border border-white/10"
        >
          เรียนรู้เพิ่มเติม
        </button>
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

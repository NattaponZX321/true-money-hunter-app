
import React, { useState, useEffect } from 'react';
import { checkApiHealth } from '../services/api';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

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
      <div className="card-container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">สถานะ API</h2>
          <div className="flex items-center">
            {apiStatus === null ? (
              <span className="text-yellow-500 text-sm flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                กำลังตรวจสอบ...
              </span>
            ) : apiStatus ? (
              <span className="text-green-500 text-sm flex items-center">
                <CheckCircle size={16} className="mr-1" />
                ใช้งานได้
              </span>
            ) : (
              <span className="text-red-500 text-sm flex items-center">
                <XCircle size={16} className="mr-1" />
                ไม่สามารถเชื่อมต่อได้
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600">
          ระบบดักซองอังเปา TrueMoney พร้อมให้บริการ เพียงลงทะเบียนเบอร์โทรศัพท์ของคุณและรับเงินจากซองอังเปาโดยอัตโนมัติ
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div 
          className="card-container bg-gradient-to-br from-red-50 to-white hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onNavigate('register')}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-2">
              <Plus size={24} className="text-tmoney-red" />
            </div>
            <h3 className="font-semibold">เพิ่มเบอร์ดักซอง</h3>
            <p className="text-xs text-gray-500 mt-1">ลงทะเบียนเบอร์ใหม่</p>
            <div className="mt-2 text-tmoney-red flex items-center justify-center text-sm">
              <span>เริ่มเลย</span>
              <ArrowRight size={14} className="ml-1" />
            </div>
          </div>
        </div>

        <div 
          className="card-container bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onNavigate('status')}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-2">
              <Search size={24} className="text-blue-500" />
            </div>
            <h3 className="font-semibold">เช็คสถานะ</h3>
            <p className="text-xs text-gray-500 mt-1">ตรวจสอบยอดและหมดอายุ</p>
            <div className="mt-2 text-blue-500 flex items-center justify-center text-sm">
              <span>ตรวจสอบ</span>
              <ArrowRight size={14} className="ml-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="angpao-card">
        <div className="absolute top-2 right-2 opacity-20">
          <div className="w-16 h-16 rounded-full border-4 border-tmoney-gold"></div>
        </div>
        
        <h3 className="text-lg font-bold mb-3">
          <span className="gold-accent">✨ ดักซองอังเปาอัตโนมัติ</span>
        </h3>
        
        <p className="text-sm mb-4">
          เพียงลงทะเบียนเบอร์โทรศัพท์ ระบบจะดักซองอังเปา TrueMoney ให้คุณโดยอัตโนมัติ
        </p>
        
        <button 
          onClick={() => onNavigate('help')} 
          className="bg-white text-tmoney-red text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
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

function Search(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

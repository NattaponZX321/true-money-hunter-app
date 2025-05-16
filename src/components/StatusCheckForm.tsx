
import React, { useState } from 'react';
import { checkStatusByApiKey, checkStatusByPhone } from '../services/api';
import { isValidThaiPhone, isValidApiKey, formatThaiDate, formatRemainingTime } from '../utils/validators';
import Swal from 'sweetalert2';

interface StatusData {
  success: boolean;
  message: string;
  phone?: string;
  totalAmount?: number;
  expiresAt?: string;
  remainingTime?: {
    days: number;
    hours: number;
    minutes: number;
  };
}

const StatusCheckForm: React.FC = () => {
  const [input, setInput] = useState('');
  const [checkType, setCheckType] = useState<'phone' | 'apiKey'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [error, setError] = useState('');

  const validateInput = (): boolean => {
    setError('');

    if (checkType === 'phone' && !isValidThaiPhone(input)) {
      setError('เบอร์โทรศัพท์ไม่ถูกต้อง กรุณาใช้รูปแบบ 0[6-9]xxxxxxxx');
      return false;
    }

    if (checkType === 'apiKey' && !isValidApiKey(input)) {
      setError('กรุณากรอก API key');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInput()) {
      return;
    }

    setIsLoading(true);
    setStatusData(null);

    try {
      let response;
      
      if (checkType === 'apiKey') {
        response = await checkStatusByApiKey(input);
      } else {
        response = await checkStatusByPhone(input);
      }

      if (response.success) {
        setStatusData(response);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ไม่พบข้อมูล',
          text: response.message || 'กรุณาตรวจสอบข้อมูลที่กรอกและลองใหม่อีกครั้ง',
          confirmButtonColor: '#E21C23',
        });
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองอีกครั้งในภายหลัง',
        confirmButtonColor: '#E21C23',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="card-container mb-4">
        <h2 className="text-xl font-bold mb-4">เช็คสถานะการดักซอง</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex space-x-2 mb-3">
              <button
                type="button"
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  checkType === 'phone' ? 'bg-tmoney-red text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setCheckType('phone')}
              >
                เช็คด้วยเบอร์โทร
              </button>
              <button
                type="button"
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  checkType === 'apiKey' ? 'bg-tmoney-red text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setCheckType('apiKey')}
              >
                เช็คด้วย API Key
              </button>
            </div>

            <label htmlFor="statusInput" className="form-label">
              {checkType === 'phone' ? 'เบอร์โทรศัพท์' : 'API Key'}
            </label>
            <input
              id="statusInput"
              type={checkType === 'phone' ? 'tel' : 'text'}
              className="form-input"
              placeholder={checkType === 'phone' ? 'เช่น 0812345678' : 'กรอก API key ของคุณ'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {error && <p className="form-error">{error}</p>}
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังตรวจสอบ...
              </>
            ) : (
              'ตรวจสอบ'
            )}
          </button>
        </form>
      </div>

      {statusData && statusData.success && (
        <div className="angpao-card animate-fade-in">
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            <div className="w-full h-full border-4 border-tmoney-gold rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-4 border-tmoney-gold rounded-full"></div>
          </div>
          
          <h3 className="text-lg font-bold mb-3 gold-accent">ข้อมูลการดักซอง</h3>
          
          <div className="mb-2 flex items-center">
            <span className="text-white/70 w-32">เบอร์โทรศัพท์:</span>
            <span className="font-semibold">{statusData.phone}</span>
          </div>
          
          <div className="mb-2 flex items-center">
            <span className="text-white/70 w-32">ยอดเงินที่ดักได้:</span>
            <span className="font-semibold gold-accent">{statusData.totalAmount} บาท</span>
          </div>
          
          <div className="mb-2 flex items-center">
            <span className="text-white/70 w-32">วันหมดอายุ:</span>
            <span className="font-semibold">
              {statusData.expiresAt ? formatThaiDate(statusData.expiresAt) : '-'}
            </span>
          </div>
          
          <div className="mb-1 flex items-center">
            <span className="text-white/70 w-32">เวลาคงเหลือ:</span>
            <span className="font-semibold">
              {statusData.remainingTime ? formatRemainingTime(statusData.remainingTime) : '-'}
            </span>
          </div>
          
          <div className="mt-4 text-right">
            <span className="status-badge bg-green-700 text-white">
              ใช้งานได้
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusCheckForm;

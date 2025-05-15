
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { checkStatusByApiKey, checkStatusByPhone, checkApiHealth } from '../services/api';
import { isValidThaiPhone, isValidApiKey, formatThaiDate, formatRemainingTime } from '../utils/validators';
import { formatRemainingTimeRealtime, formatTimeSegment } from '../utils/timeFormatter';
import Swal from 'sweetalert2';
import { CheckCircle, XCircle, User, CreditCard, Calendar, Clock, Gift } from 'lucide-react';
import './StatusCheckForm.css';
=======
import React, { useState } from 'react';
import { checkStatusByApiKey, checkStatusByPhone } from '../services/api';
import { isValidThaiPhone, isValidApiKey, formatThaiDate, formatRemainingTime } from '../utils/validators';
import Swal from 'sweetalert2';
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a

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
<<<<<<< HEAD
  const [currentRemainingTime, setCurrentRemainingTime] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (statusData?.remainingTime) {
      // Initialize the countdown timer with seconds
      const initialTime = {
        days: statusData.remainingTime.days,
        hours: statusData.remainingTime.hours,
        minutes: statusData.remainingTime.minutes,
        seconds: 0 // Initialize seconds
      };
      
      setCurrentRemainingTime(initialTime);
      
      // Update countdown every second
      const timer = setInterval(() => {
        setCurrentRemainingTime(prevTime => {
          if (!prevTime) return null;
          
          // Calculate new time (reduce by one second)
          let newSeconds = prevTime.seconds - 1;
          let newMinutes = prevTime.minutes;
          let newHours = prevTime.hours;
          let newDays = prevTime.days;
          
          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes -= 1;
          }
          
          if (newMinutes < 0) {
            newMinutes = 59;
            newHours -= 1;
          }
          
          if (newHours < 0) {
            newHours = 23;
            newDays -= 1;
          }
          
          // Stop countdown if all zero
          if (newDays < 0 || (newDays === 0 && newHours === 0 && newMinutes === 0 && newSeconds === 0)) {
            clearInterval(timer);
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }
          
          return { days: newDays, hours: newHours, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000); // Update every second
      
      return () => clearInterval(timer);
    }
  }, [statusData]);
=======
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a

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
<<<<<<< HEAD
        <div className="status-info-card animate-fade-in">
=======
        <div className="angpao-card animate-fade-in">
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            <div className="w-full h-full border-4 border-tmoney-gold rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-4 border-tmoney-gold rounded-full"></div>
          </div>
          
<<<<<<< HEAD
          <div className="status-info-header">
            <span className="status-info-icon">
              <Gift size={24} color="#FFD700" />
            </span>
            <h3 className="status-info-title">ข้อมูลการดักซอง</h3>
          </div>
          
          <div className="info-row">
            <div className="info-label">
              <User size={16} className="mr-2" />
              เบอร์โทรศัพท์
            </div>
            <div className="info-value">{statusData.phone}</div>
          </div>
          
          <div className="info-row">
            <div className="info-label">
              <CreditCard size={16} className="mr-2" />
              ยอดเงินที่ดักได้
            </div>
            <div className="info-value gold">{statusData.totalAmount || "0"} บาท</div>
          </div>
          
          <div className="info-row">
            <div className="info-label">
              <Calendar size={16} className="mr-2" />
              วันหมดอายุ
            </div>
            <div className="info-value">
              {statusData.expiresAt ? formatThaiDate(statusData.expiresAt) : '-'}
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-label">
              <Clock size={16} className="mr-2" />
              เวลาคงเหลือ
            </div>
            <div className="info-value">
              {currentRemainingTime ? (
                <div className="digital-time">
                  <span className="countdown-number">{currentRemainingTime.days}</span>
                  <span className="time-divider">วัน</span>
                  <span className="countdown-number">{formatTimeSegment(currentRemainingTime.hours)}</span>
                  <span className="time-divider">:</span>
                  <span className="countdown-number">{formatTimeSegment(currentRemainingTime.minutes)}</span>
                  <span className="time-divider">:</span>
                  <span className="countdown-number animated-count">{formatTimeSegment(currentRemainingTime.seconds)}</span>
                </div>
              ) : (
                statusData.remainingTime ? formatRemainingTime(statusData.remainingTime) : '-'
              )}
            </div>
          </div>
          
          <div className="status-badge-container">
            <span className="status-badge-active">
              <CheckCircle size={16} className="mr-2" />
=======
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
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a
              ใช้งานได้
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusCheckForm;

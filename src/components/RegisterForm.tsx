
import React, { useState } from 'react';
import { submitPhone } from '../services/api';
import { isValidThaiPhone, isValidApiKey } from '../utils/validators';
import Swal from 'sweetalert2';
import { Smartphone, Key, CheckCircle } from 'lucide-react';

const RegisterForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ phone: '', apiKey: '' });

  const validateForm = (): boolean => {
    const newErrors = { phone: '', apiKey: '' };
    let isValid = true;

    if (!isValidThaiPhone(phone)) {
      newErrors.phone = 'เบอร์โทรศัพท์ไม่ถูกต้อง กรุณาใช้รูปแบบ 0[6-9]xxxxxxxx';
      isValid = false;
    }

    if (!isValidApiKey(apiKey)) {
      newErrors.apiKey = 'กรุณากรอก API key';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await submitPhone(phone, apiKey);
      
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ!',
          text: response.message,
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
        setPhone('');
        setApiKey('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: response.message,
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองอีกครั้ง',
        confirmButtonColor: '#3b82f6',
        background: '#1e293b',
        color: '#ffffff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card animate-fade-in">
      <h2 className="text-xl font-bold mb-6 gradient-text">ลงทะเบียนเบอร์ดักซอง</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mb-4 relative">
          <label htmlFor="phone" className="form-label">
            เบอร์โทรศัพท์
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <Smartphone size={18} />
            </div>
            <input
              id="phone"
              type="tel"
              className="form-input pl-10"
              placeholder="เช่น 0812345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>
        
        <div className="mb-6 relative">
          <label htmlFor="apiKey" className="form-label">
            API Key
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <Key size={18} />
            </div>
            <input
              id="apiKey"
              type="text"
              className="form-input pl-10"
              placeholder="กรอก API key ของคุณ"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          {errors.apiKey && <p className="form-error">{errors.apiKey}</p>}
        </div>
        
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังลงทะเบียน...
            </>
          ) : (
            <>
              <CheckCircle size={18} className="mr-2" />
              ลงทะเบียน
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

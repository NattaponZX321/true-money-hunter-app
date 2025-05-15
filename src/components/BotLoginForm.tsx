
import React, { useState } from 'react';
import { Smartphone, Lock, LogIn } from 'lucide-react';
import Swal from 'sweetalert2';
import { Input } from './ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { botLogin, botVerify } from '../services/api';
import { isValidThaiPhone } from '../utils/validators';

const BotLoginForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ phone: '' });

  const validatePhone = (): boolean => {
    if (!phone.startsWith('+66') || phone.length !== 12) {
      setErrors({ phone: 'กรุณาใส่เบอร์โทรในรูปแบบ +66xxxxxxxxx' });
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await botLogin(phone);
      
      if (response.success) {
        setShowVerificationStep(true);
        Swal.fire({
          icon: 'success',
          title: 'ส่งรหัสยืนยันแล้ว!',
          text: 'กรุณาตรวจสอบ SMS และกรอกรหัสยืนยันเพื่อเข้าสู่ระบบบอท',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: response.message || 'ไม่สามารถส่งรหัสยืนยันได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง',
        confirmButtonColor: '#3b82f6',
        background: '#1e293b',
        color: '#ffffff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      Swal.fire({
        icon: 'error',
        title: 'รหัสไม่ถูกต้อง',
        text: 'กรุณากรอกรหัสยืนยัน 6 หลัก',
        confirmButtonColor: '#3b82f6',
        background: '#1e293b',
        color: '#ffffff',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await botVerify(phone, code);
      
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ!',
          text: response.message || 'คุณได้เข้าสู่ระบบบอทเรียบร้อยแล้ว',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
        // Reset form after successful verification
        setPhone('');
        setCode('');
        setShowVerificationStep(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: response.message || 'รหัสยืนยันไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง',
        confirmButtonColor: '#3b82f6',
        background: '#1e293b',
        color: '#ffffff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setShowVerificationStep(false);
    setCode('');
  };

  // For OTP input handling
  const handleOTPChange = (value: string) => {
    setCode(value);
  };

  return (
    <div className="glass-card animate-fade-in">
      <h2 className="text-xl font-bold mb-6 gradient-text">
        {showVerificationStep ? 'ยืนยันการเข้าสู่ระบมบอท' : 'เข้าสู่ระบบบอท'}
      </h2>

      {!showVerificationStep ? (
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div className="mb-4 relative">
            <label htmlFor="phone" className="form-label">
              เบอร์โทรศัพท์ (+66)
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <Smartphone size={18} />
              </div>
              <input
                id="phone"
                type="tel"
                className="form-input pl-10"
                placeholder="+66987456321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errors.phone && <p className="form-error">{errors.phone}</p>}
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังส่งรหัส...
              </>
            ) : (
              <>
                <LogIn size={18} className="mr-2" />
                ส่งรหัสยืนยัน
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifySubmit} className="space-y-5">
          <div className="mb-4">
            <label className="form-label">รหัสยืนยัน</label>
            <div className="flex justify-center my-4">
              <InputOTP maxLength={6} value={code} onChange={handleOTPChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="flex justify-between">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={handleBackToPhone}
              disabled={isLoading}
            >
              ย้อนกลับ
            </button>
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
                <>
                  <Lock size={18} className="mr-2" />
                  ยืนยันรหัส
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BotLoginForm;

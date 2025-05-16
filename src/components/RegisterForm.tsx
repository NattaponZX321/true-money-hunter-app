
import React, { useState, useEffect } from 'react';
import { submitPhone, initiateLoginBot, verifyBotOtp, generateApiKey } from '../services/api';
import { isValidThaiPhone } from '../utils/validators';
import Swal from 'sweetalert2';
import { Smartphone, Bot, RefreshCw, CheckCircle, Key } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

const RegisterForm: React.FC = () => {
  // Registration form states
  const [phone, setPhone] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ phone: '', apiKey: '' });
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  
  // Bot login states
  const [botPhone, setBotPhone] = useState('');
  const [code, setCode] = useState('');
  const [isBotLoading, setIsBotLoading] = useState(false);
  const [awaitingOtp, setAwaitingOtp] = useState(false);
  const [botError, setBotError] = useState('');
  const [botLoggedIn, setBotLoggedIn] = useState(false);
  
  // UI states
  const [activeSection, setActiveSection] = useState<'register' | 'botLogin'>('register');

  // Registration form validation
  const validateForm = (): boolean => {
    const newErrors = { phone: '', apiKey: '' };
    let isValid = true;

    if (!isValidThaiPhone(phone)) {
      newErrors.phone = 'เบอร์โทรศัพท์ไม่ถูกต้อง กรุณาใช้รูปแบบ 0[6-9]xxxxxxxx';
      isValid = false;
    }

    if (!apiKey.trim()) {
      newErrors.apiKey = 'กรุณากรอกหรือสร้าง API key';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Generate API key handler
  const handleGenerateApiKey = async () => {
    setIsGeneratingKey(true);
    
    try {
      const response = await generateApiKey();
      
      if (response.success) {
        setApiKey(response.apiKey);
        Swal.fire({
          icon: 'success',
          title: 'สร้าง API Key สำเร็จ!',
          text: 'API Key ถูกสร้างขึ้นและเพิ่มลงในฟอร์มแล้ว',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: response.message || 'ไม่สามารถสร้าง API Key ได้ กรุณาลองอีกครั้ง',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองอีกครั้ง',
        confirmButtonColor: '#3b82f6',
        background: '#1e293b',
        color: '#ffffff',
      });
    } finally {
      setIsGeneratingKey(false);
    }
  };

  // Registration form submit handler
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

  // Bot login phone submit handler
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone format
    if (!isValidThaiPhone(botPhone) && !botPhone.startsWith('+')) {
      setBotError('เบอร์โทรศัพท์ไม่ถูกต้อง กรุณาใช้รูปแบบ 0[6-9]xxxxxxxx หรือ +66xxxxxxxxx');
      return;
    }
    
    setIsBotLoading(true);
    setBotError('');
    
    try {
      // Format phone number if needed (ensure +66 format)
      const formattedPhone = botPhone.startsWith('+') ? botPhone : `+66${botPhone.slice(1)}`;
      
      const response = await initiateLoginBot(formattedPhone);
      
      if (response.success) {
        setAwaitingOtp(true);
        Swal.fire({
          icon: 'success',
          title: 'ส่งรหัส OTP สำเร็จ!',
          text: 'กรุณาตรวจสอบ SMS และกรอกรหัส OTP ที่ได้รับ',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
      } else {
        setBotError(response.message || 'เกิดข้อผิดพลาดในการส่ง OTP กรุณาลองอีกครั้ง');
      }
    } catch (error) {
      setBotError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองอีกครั้ง');
    } finally {
      setIsBotLoading(false);
    }
  };

  // Bot login OTP submit handler
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setBotError('รหัส OTP ต้องมี 6 หลัก');
      return;
    }
    
    setIsBotLoading(true);
    setBotError('');
    
    try {
      // Format phone number if needed (ensure +66 format)
      const formattedPhone = botPhone.startsWith('+') ? botPhone : `+66${botPhone.slice(1)}`;
      
      const response = await verifyBotOtp(formattedPhone, code);
      
      if (response.success) {
        setBotLoggedIn(true);
        setActiveSection('register');
        
        Swal.fire({
          icon: 'success',
          title: 'ล็อกอินบอทสำเร็จ!',
          text: response.message || 'บอทเริ่มทำงานแล้ว',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
        
        // Reset form after successful verification
        setBotPhone('');
        setCode('');
        setAwaitingOtp(false);
      } else {
        setBotError(response.message || 'รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      }
    } catch (error) {
      setBotError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองอีกครั้ง');
    } finally {
      setIsBotLoading(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    setIsBotLoading(true);
    setBotError('');
    
    try {
      // Format phone number if needed (ensure +66 format)
      const formattedPhone = botPhone.startsWith('+') ? botPhone : `+66${botPhone.slice(1)}`;
      
      const response = await initiateLoginBot(formattedPhone);
      
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'ส่งรหัส OTP ใหม่สำเร็จ!',
          text: 'กรุณาตรวจสอบ SMS และกรอกรหัส OTP ที่ได้รับ',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
      } else {
        setBotError(response.message || 'เกิดข้อผิดพลาดในการส่ง OTP กรุณาลองอีกครั้ง');
      }
    } catch (error) {
      setBotError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองอีกครั้ง');
    } finally {
      setIsBotLoading(false);
    }
  };

  // Reset OTP form
  const handleBackToPhone = () => {
    setAwaitingOtp(false);
    setCode('');
    setBotError('');
  };

  // Tab navigation
  const renderTabButtons = () => (
    <div className="flex bg-gray-800/50 rounded-lg p-1 mb-4">
      <button 
        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${activeSection === 'register' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
        onClick={() => setActiveSection('register')}
      >
        ลงทะเบียน
      </button>
      <button 
        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${activeSection === 'botLogin' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
        onClick={() => setActiveSection('botLogin')}
      >
        ล็อกอินบอท
      </button>
    </div>
  );

  // Content rendering based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'register':
        return (
          <form onSubmit={handleSubmit} className="space-y-5">
            {!botLoggedIn && (
              <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-md p-3 mb-4">
                <p className="text-yellow-300 text-sm flex items-center">
                  <Bot size={16} className="mr-2" />
                  กรุณาล็อกอินบอทก่อนลงทะเบียนเบอร์รับซอง
                </p>
              </div>
            )}
            
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
            
            <div className="mb-4 relative">
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
                  className="form-input pl-10 pr-28"
                  placeholder="API Key สำหรับการลงทะเบียน"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded"
                  onClick={handleGenerateApiKey}
                  disabled={isGeneratingKey}
                >
                  {isGeneratingKey ? 'กำลังสร้าง...' : 'สร้าง Key'}
                </button>
              </div>
              {errors.apiKey && <p className="form-error">{errors.apiKey}</p>}
              <p className="text-xs text-gray-400 mt-2">
                * เลือกสร้าง API key ใหม่หรือใช้ API key ที่มีอยู่แล้ว
              </p>
            </div>
            
            <button type="submit" className="btn-primary" disabled={isLoading || !botLoggedIn}>
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
        );
        
      case 'botLogin':
        return (
          !awaitingOtp ? (
            // Phone input form
            <form onSubmit={handlePhoneSubmit} className="space-y-5">
              <div className="mb-4 relative">
                <label htmlFor="botPhone" className="form-label">
                  เบอร์โทรศัพท์
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                    <Smartphone size={18} />
                  </div>
                  <input
                    id="botPhone"
                    type="tel"
                    className="form-input pl-10"
                    placeholder="เช่น +66987456321"
                    value={botPhone}
                    onChange={(e) => setBotPhone(e.target.value)}
                  />
                </div>
                {botError && <p className="form-error">{botError}</p>}
                
                <p className="text-xs text-gray-400 mt-2">
                  * กรุณาใส่เบอร์โทรศัพท์ในรูปแบบ +66 เช่น +66987456321
                </p>
              </div>
              
              <button type="submit" className="btn-primary" disabled={isBotLoading}>
                {isBotLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังส่ง OTP...
                  </>
                ) : (
                  <>
                    <Bot size={18} className="mr-2" />
                    ส่งรหัส OTP
                  </>
                )}
              </button>
            </form>
          ) : (
            // OTP verification form
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div className="mb-6">
                <label htmlFor="otp" className="form-label mb-3">
                  รหัส OTP
                </label>
                <div className="relative flex justify-center">
                  <InputOTP maxLength={6} value={code} onChange={setCode}>
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
                {botError && <p className="form-error">{botError}</p>}
                
                <div className="flex justify-between text-xs text-gray-400 mt-3">
                  <button 
                    type="button" 
                    className="text-blue-500 hover:text-blue-400"
                    onClick={handleBackToPhone}
                  >
                    แก้ไขเบอร์โทรศัพท์
                  </button>
                  <button 
                    type="button" 
                    className="text-blue-500 hover:text-blue-400 flex items-center"
                    onClick={handleResendOtp}
                    disabled={isBotLoading}
                  >
                    {isBotLoading ? 'กำลังส่ง...' : (
                      <>
                        <RefreshCw size={12} className="mr-1" />
                        ส่งรหัสใหม่
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <button type="submit" className="btn-primary" disabled={isBotLoading}>
                {isBotLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังยืนยัน...
                  </>
                ) : (
                  <>
                    <Bot size={18} className="mr-2" />
                    ยืนยันรหัส OTP
                  </>
                )}
              </button>
            </form>
          )
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="glass-card animate-fade-in">
      <h2 className="text-xl font-bold mb-6 gradient-text">
        จัดการบริการ True Money Catcher
      </h2>
      
      {renderTabButtons()}
      {renderContent()}
    </div>
  );
};

export default RegisterForm;

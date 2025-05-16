
import React, { useState } from 'react';
import { submitPhone, initiateLoginBot, verifyBotOtp, generateApiKey } from '../services/api';
import { isValidThaiPhone } from '../utils/validators';
import Swal from 'sweetalert2';
import { Phone, Key, CheckCircle, RefreshCw } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

const RegisterForm: React.FC = () => {
  // Form steps
  enum Step {
    BotPhone = 1,
    BotOTP = 2,
    RegisterPhone = 3,
  }

  // States
  const [currentStep, setCurrentStep] = useState<Step>(Step.BotPhone);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Bot login states
  const [botPhone, setBotPhone] = useState('');
  const [code, setCode] = useState('');
  
  // Registration form states
  const [phone, setPhone] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  // Step 1: Submit bot phone
  const handleBotPhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone format
    if (!isValidThaiPhone(botPhone) && !botPhone.startsWith('+')) {
      setError('เบอร์โทรศัพท์ไม่ถูกต้อง กรุณาใช้รูปแบบ 0[6-9]xxxxxxxx หรือ +66xxxxxxxxx');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Format phone number if needed (ensure +66 format)
      const formattedPhone = botPhone.startsWith('+') ? botPhone : `+66${botPhone.slice(1)}`;
      
      const response = await initiateLoginBot(formattedPhone);
      
      if (response.success) {
        setCurrentStep(Step.BotOTP);
        Swal.fire({
          icon: 'success',
          title: 'ส่งรหัส OTP สำเร็จ!',
          text: 'กรุณาตรวจสอบ SMS และกรอกรหัส OTP ที่ได้รับ',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
      } else {
        setError(response.message || 'เกิดข้อผิดพลาดในการส่ง OTP กรุณาลองอีกครั้ง');
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองอีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('รหัส OTP ต้องมี 6 หลัก');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Format phone number if needed (ensure +66 format)
      const formattedPhone = botPhone.startsWith('+') ? botPhone : `+66${botPhone.slice(1)}`;
      
      const response = await verifyBotOtp(formattedPhone, code);
      
      if (response.success) {
        setCurrentStep(Step.RegisterPhone);
        
        Swal.fire({
          icon: 'success',
          title: 'ล็อกอินบอทสำเร็จ!',
          text: 'กรุณาลงทะเบียนเบอร์รับซองและ API Key',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
        
        // Auto generate API key after successful login
        handleGenerateApiKey();
      } else {
        setError(response.message || 'รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองอีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Register phone with API key
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidThaiPhone(phone)) {
      setError('เบอร์โทรศัพท์ไม่ถูกต้อง กรุณาใช้รูปแบบ 0[6-9]xxxxxxxx');
      return;
    }

    if (!apiKey.trim()) {
      setError('กรุณากรอกหรือสร้าง API key');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await submitPhone(phone, apiKey);
      
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'ลงทะเบียนสำเร็จ!',
          text: response.message || 'เบอร์โทรศัพท์ถูกลงทะเบียนในระบบแล้ว',
          confirmButtonColor: '#3b82f6',
          background: '#1e293b',
          color: '#ffffff',
        });
        
        // Reset all form
        setPhone('');
        setApiKey('');
        setBotPhone('');
        setCode('');
        setCurrentStep(Step.BotPhone);
      } else {
        setError(response.message || 'เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองอีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');
    
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
        setError(response.message || 'เกิดข้อผิดพลาดในการส่ง OTP กรุณาลองอีกครั้ง');
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองอีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  // Go back step
  const handleBackStep = () => {
    if (currentStep === Step.BotOTP) {
      setCurrentStep(Step.BotPhone);
      setCode('');
    } else if (currentStep === Step.RegisterPhone) {
      setCurrentStep(Step.BotOTP);
      setPhone('');
      setApiKey('');
    }
    setError('');
  };

  // Generate API key
  const handleGenerateApiKey = async () => {
    setIsGeneratingKey(true);
    setError('');
    
    try {
      const response = await generateApiKey();
      
      if (response.success) {
        setApiKey(response.apiKey);
      } else {
        setError(response.message || 'ไม่สามารถสร้าง API Key ได้ กรุณาลองอีกครั้ง');
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองอีกครั้ง');
    } finally {
      setIsGeneratingKey(false);
    }
  };

  // Progress indicator
  const renderProgressIndicator = () => (
    <div className="flex justify-between mb-6">
      {[Step.BotPhone, Step.BotOTP, Step.RegisterPhone].map((step) => (
        <div 
          key={step} 
          className="flex flex-col items-center"
          onClick={() => {
            if (step < currentStep) {
              setCurrentStep(step);
              setError('');
            }
          }}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === step 
              ? 'bg-blue-500 text-white' 
              : currentStep > step 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-700 text-gray-400'
          }`}>
            {currentStep > step ? <CheckCircle size={16} /> : step}
          </div>
          <span className={`text-xs mt-1 ${
            currentStep === step 
              ? 'text-blue-400'
              : currentStep > step
              ? 'text-green-400'
              : 'text-gray-500'
          }`}>
            {step === Step.BotPhone ? 'เบอร์บอท' : step === Step.BotOTP ? 'รหัส OTP' : 'ลงทะเบียน'}
          </span>
        </div>
      ))}

      <div className="absolute left-1/4 top-11 w-1/4 h-0.5 bg-gray-700">
        <div className={`h-full bg-green-500 transition-all duration-300 ${
          currentStep > Step.BotPhone ? 'w-full' : 'w-0'
        }`}></div>
      </div>

      <div className="absolute right-1/4 top-11 w-1/4 h-0.5 bg-gray-700">
        <div className={`h-full bg-green-500 transition-all duration-300 ${
          currentStep > Step.BotOTP ? 'w-full' : 'w-0'
        }`}></div>
      </div>
    </div>
  );
  
  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case Step.BotPhone:
        return (
          <form onSubmit={handleBotPhoneSubmit} className="space-y-5">
            <div className="mb-4">
              <label htmlFor="botPhone" className="form-label">
                เบอร์โทรศัพท์บอท
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                  <Phone size={18} />
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
              
              <p className="text-xs text-gray-400 mt-2">
                * กรุณาใส่เบอร์โทรศัพท์ในรูปแบบ +66 เช่น +66987456321
              </p>
            </div>
            
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังส่ง OTP...
                </>
              ) : (
                'ส่งรหัส OTP'
              )}
            </button>
          </form>
        );
        
      case Step.BotOTP:
        return (
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
              
              <div className="flex justify-between text-xs text-gray-400 mt-3">
                <button 
                  type="button" 
                  className="text-blue-500 hover:text-blue-400"
                  onClick={handleBackStep}
                >
                  แก้ไขเบอร์โทรศัพท์
                </button>
                <button 
                  type="button" 
                  className="text-blue-500 hover:text-blue-400 flex items-center"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                >
                  {isLoading ? 'กำลังส่ง...' : (
                    <>
                      <RefreshCw size={12} className="mr-1" />
                      ส่งรหัสใหม่
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังยืนยัน...
                </>
              ) : (
                'ยืนยันรหัส OTP'
              )}
            </button>
          </form>
        );
        
      case Step.RegisterPhone:
        return (
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div className="mb-4">
              <label htmlFor="phone" className="form-label">
                เบอร์รับซองอั่งเปา
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                  <Phone size={18} />
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
            </div>
            
            <div className="mb-4">
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
              
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <button 
                  type="button" 
                  className="text-blue-500 hover:text-blue-400"
                  onClick={handleBackStep}
                >
                  กลับไปหน้าก่อนหน้า
                </button>
              </div>
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
                'ลงทะเบียน'
              )}
            </button>
          </form>
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
      
      <div className="relative">
        {renderProgressIndicator()}
      </div>
      
      {error && <p className="form-error mb-4">{error}</p>}
      
      {renderCurrentStep()}
    </div>
  );
};

export default RegisterForm;

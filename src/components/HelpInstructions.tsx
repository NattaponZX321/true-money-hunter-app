
import React from 'react';

const HelpInstructions: React.FC = () => {
  return (
    <div className="card-container animate-fade-in">
      <h2 className="text-xl font-bold mb-4">วิธีใช้งาน</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-tmoney-red mb-2">1. สร้าง API Key</h3>
          <div className="bg-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto">
            <code>curl https://4c78f910-fb19-49ef-b670-077fb079f6f8-00-1qignk7q963ov.pike.replit.dev/generate-key</code>
          </div>
          <p className="text-sm mt-2 text-gray-600">
            ใช้คำสั่ง curl หรือเว็บบราวเซอร์เพื่อสร้าง API Key ใหม่ คัดลอก API Key ที่ได้เพื่อใช้ในขั้นตอนถัดไป
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-tmoney-red mb-2">2. ลงทะเบียนเบอร์โทรศัพท์</h3>
          <p className="text-sm text-gray-600">
            ไปที่แท็บ "เพิ่มเบอร์" และกรอกเบอร์โทรศัพท์ของคุณในรูปแบบไทย (เช่น 0812345678) พร้อมกับ API Key ที่ได้จากขั้นตอนที่ 1
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-tmoney-red mb-2">3. ตรวจสอบสถานะ</h3>
          <p className="text-sm text-gray-600">
            ไปที่แท็บ "เช็คสถานะ" และเลือกวิธีการตรวจสอบโดย:
          </p>
          <ul className="list-disc pl-5 mt-1 text-sm text-gray-600">
            <li>กรอกเบอร์โทรศัพท์ที่ลงทะเบียนไว้ หรือ</li>
            <li>กรอก API Key ที่ใช้ในการลงทะเบียน</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-tmoney-red mb-2">4. ดูข้อมูลการดักซอง</h3>
          <p className="text-sm text-gray-600">
            เมื่อตรวจสอบสำเร็จ ระบบจะแสดงข้อมูลต่อไปนี้:
          </p>
          <ul className="list-disc pl-5 mt-1 text-sm text-gray-600">
            <li>เบอร์โทรศัพท์ที่ลงทะเบียน</li>
            <li>จำนวนเงินที่ดักซองได้ (ถ้ามี)</li>
            <li>วันและเวลาหมดอายุ</li>
            <li>เวลาที่เหลือก่อนหมดอายุ</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-tmoney-red mb-2">5. การหมดอายุ</h3>
          <p className="text-sm text-gray-600">
            API Key และการลงทะเบียนเบอร์จะหมดอายุหลังจากเวลาที่กำหนด คุณสามารถลงทะเบียนใหม่โดยทำตามขั้นตอนที่ 1-2 อีกครั้ง
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpInstructions;

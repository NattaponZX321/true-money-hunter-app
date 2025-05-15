<<<<<<< HEAD
import React from 'react';
import { Info, Smartphone, CheckSquare, Clock, MessageCircle, Shield } from 'lucide-react';
=======

import React from 'react';
import { Info, Database, Smartphone, CheckSquare, Clock } from 'lucide-react';
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a

const HelpInstructions: React.FC = () => {
  return (
    <div className="glass-card animate-fade-in">
      <h2 className="text-xl font-bold mb-6 gradient-text flex items-center">
        <Info size={20} className="mr-2 text-blue-400" />
        วิธีใช้งาน
      </h2>
<<<<<<< HEAD
        <div className="space-y-6">
        <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center">
            <Smartphone size={18} className="mr-2" />
            1. ลงทะเบียนเบอร์โทรศัพท์
          </h3>
          <p className="text-sm text-gray-300">
            ไปที่แท็บ "เพิ่มเบอร์" และกรอกเบอร์โทรศัพท์ของคุณในรูปแบบไทย (เช่น 0812345678) พร้อมกับรหัสที่ได้จาก Telegram Bot
=======
      
      <div className="space-y-6">
        <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center">
            <Database size={18} className="mr-2" />
            1. สร้าง API Key
          </h3>
          <div className="bg-slate-800/80 p-3 rounded-lg text-sm font-mono overflow-x-auto border border-blue-500/10">
            <code className="text-blue-200">curl https://4c78f910-fb19-49ef-b670-077fb079f6f8-00-1qignk7q963ov.pike.replit.dev/generate-key</code>
          </div>
          <p className="text-sm mt-2 text-gray-300">
            ใช้คำสั่ง curl หรือเว็บบราวเซอร์เพื่อสร้าง API Key ใหม่ คัดลอก API Key ที่ได้เพื่อใช้ในขั้นตอนถัดไป
          </p>
        </div>
        
        <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center">
            <Smartphone size={18} className="mr-2" />
            2. ลงทะเบียนเบอร์โทรศัพท์
          </h3>
          <p className="text-sm text-gray-300">
            ไปที่แท็บ "เพิ่มเบอร์" และกรอกเบอร์โทรศัพท์ของคุณในรูปแบบไทย (เช่น 0812345678) พร้อมกับ API Key ที่ได้จากขั้นตอนที่ 1
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a
          </p>
        </div>
        
        <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center">
            <CheckSquare size={18} className="mr-2" />
<<<<<<< HEAD
            2. ตรวจสอบสถานะ
          </h3>
          <p className="text-sm text-gray-300">
            ไปที่แท็บ "สถานะ" และเลือกวิธีการตรวจสอบโดย:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-300 space-y-1">
            <li>กรอกเบอร์โทรศัพท์ที่ลงทะเบียนไว้ หรือ</li>
            <li>กรอกรหัสที่ได้จาก Telegram Bot</li>
=======
            3. ตรวจสอบสถานะ
          </h3>
          <p className="text-sm text-gray-300">
            ไปที่แท็บ "เช็คสถานะ" และเลือกวิธีการตรวจสอบโดย:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-300 space-y-1">
            <li>กรอกเบอร์โทรศัพท์ที่ลงทะเบียนไว้ หรือ</li>
            <li>กรอก API Key ที่ใช้ในการลงทะเบียน</li>
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a
          </ul>
        </div>
        
        <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center">
<<<<<<< HEAD
            <Clock size={18} className="mr-2" />
            3. รับซองอังเปาอัตโนมัติผ่าน Telegram
          </h3>
          <p className="text-sm text-gray-300">
            เมื่อระบบดักจับซองอังเปาได้ คุณจะได้รับการแจ้งเตือนและเงินจะถูกโอนเข้าบัญชีตามเบอร์ที่ลงทะเบียนไว้ ตรวจสอบข้อความใน Telegram เพื่อดูรายละเอียดเพิ่มเติม
          </p>
        </div>
        
        <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center">
=======
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a
            <CheckSquare size={18} className="mr-2" />
            4. ดูข้อมูลการดักซอง
          </h3>
          <p className="text-sm text-gray-300">
            เมื่อตรวจสอบสำเร็จ ระบบจะแสดงข้อมูลต่อไปนี้:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-300 space-y-1">
            <li>เบอร์โทรศัพท์ที่ลงทะเบียน</li>
            <li>จำนวนเงินที่ดักซองได้ (ถ้ามี)</li>
            <li>วันและเวลาหมดอายุ</li>
            <li>เวลาที่เหลือก่อนหมดอายุ</li>
          </ul>
        </div>
<<<<<<< HEAD

        <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center">
            <Shield size={18} className="mr-2" />
            5. ตัดขาดบริการจากกู้เกิ้ล
          </h3>
          <p className="text-sm text-gray-300">
            แอปนี้ไม่มีการเชื่อมต่อหรือใช้บริการจากกูเกิ้ลในทุกกรณี:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-300 space-y-1">
            <li>ไม่มีการบันทึกเบอร์โทรศัพท์ผ่านบริการของกูเกิ้ล</li>
            <li>ไม่มีการใช้คีย์หรือ API ใดๆ ของกูเกิ้ล</li>
            <li>ข้อมูลทั้งหมดถูกเก็บแยกอิสระจากบริการของกูเกิ้ล</li>
            <li>การสื่อสารทั้งหมดดำเนินการผ่าน Telegram เท่านั้น</li>
          </ul>
=======
        
        <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center">
            <Clock size={18} className="mr-2" />
            5. การหมดอายุ
          </h3>
          <p className="text-sm text-gray-300">
            API Key และการลงทะเบียนเบอร์จะหมดอายุหลังจากเวลาที่กำหนด คุณสามารถลงทะเบียนใหม่โดยทำตามขั้นตอนที่ 1-2 อีกครั้ง
          </p>
>>>>>>> 5be0146a4321e621a5343044c0835e856c1fda2a
        </div>
      </div>
    </div>
  );
};

export default HelpInstructions;

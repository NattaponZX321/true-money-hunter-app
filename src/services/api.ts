
import axios from 'axios';

const API_BASE_URL = 'https://4c78f910-fb19-49ef-b670-077fb079f6f8-00-1qignk7q963ov.pike.replit.dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitPhone = async (phone: string, apiKey: string) => {
  try {
    const response = await api.post('/submit-phone', { phone, apiKey });
    return response.data;
  } catch (error) {
    console.error('Error submitting phone:', error);
    return {
      success: false,
      message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง',
    };
  }
};

export const checkStatusByApiKey = async (apiKey: string) => {
  try {
    const response = await api.get(`/status/${apiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error checking status by API key:', error);
    return {
      success: false,
      message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง',
    };
  }
};

export const checkStatusByPhone = async (phone: string) => {
  try {
    const response = await api.get(`/status-by-phone/${phone}`);
    // Remove apiKey from response to not display it in UI
    const { apiKey, ...data } = response.data;
    return data;
  } catch (error) {
    console.error('Error checking status by phone:', error);
    return {
      success: false,
      message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง',
    };
  }
};

export const checkApiHealth = async () => {
  try {
    await api.get('/');
    return true;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export default api;

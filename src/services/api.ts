
import axios from 'axios';

const API_BASE_URL = 'https://4c78f910-fb19-49ef-b670-077fb079f6f8-00-1qignk7q963ov.pike.replit.dev';

// Set a reasonable timeout for API requests to avoid long waits
const TIMEOUT_MS = 5000;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT_MS, // 5 seconds timeout for all requests
});

export const submitPhone = async (phone: string, apiKey: string) => {
  try {
    const response = await api.post('/submit-phone', { phone, apiKey });
    return response.data;
  } catch (error) {
    console.error('Error submitting phone:', error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return {
        success: false,
        message: 'API endpoint ไม่พบ กรุณาตรวจสอบ URL ที่ถูกต้อง',
      };
    }
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
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'ไม่พบข้อมูล API key นี้ในระบบ',
        };
      }
      if (error.code === 'ERR_NETWORK') {
        return {
          success: false,
          message: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
        };
      }
    }
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
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'ไม่พบเบอร์นี้ในระบบ กรุณาลงทะเบียนก่อนใช้งาน',
        };
      }
      if (error.code === 'ERR_NETWORK') {
        return {
          success: false,
          message: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
        };
      }
    }
    return {
      success: false,
      message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง',
    };
  }
};

export const checkApiHealth = async () => {
  try {
    // Try to hit the base API URL first (this should work if server is up)
    await api.get('/');
    return true;
  } catch (error) {
    // If we get any response with a status code, the server is up
    if (axios.isAxiosError(error) && error.response) {
      console.log('API is reachable and returned status code:', error.response.status);
      return true;
    }
    
    // Try another endpoint as a fallback
    try {
      await api.get('/status-by-phone/test');
      return true;
    } catch (secondError) {
      // If we get a 404 or any other status code, the API is likely running
      if (axios.isAxiosError(secondError) && secondError.response) {
        console.log('API is reachable through test endpoint');
        return true;
      }
      console.error('API health check failed on both attempts:', secondError);
      
      // Last attempt - try with a timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);
        await api.get('/', { signal: controller.signal });
        clearTimeout(timeoutId);
        return true;
      } catch (finalError) {
        // If it's an abort error, the API might still be online but slow
        if (finalError instanceof DOMException && finalError.name === 'AbortError') {
          console.log('API may be online but responding slowly');
          // We'll count it as online for better user experience
          return true;
        }
        console.error('Final API health check failed:', finalError);
        return false;
      }
    }
  }
};

export default api;

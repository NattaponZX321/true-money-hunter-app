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

export const botLogin = async (phone: string) => {
  try {
    const response = await api.post('/bot-login', { phone });
    return response.data;
  } catch (error) {
    console.error('Error during bot login:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'API endpoint ไม่พบ กรุณาตรวจสอบ URL ที่ถูกต้อง',
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

export const botVerify = async (phone: string, code: string) => {
  try {
    const response = await api.post('/bot-login', { phone, code });
    return response.data;
  } catch (error) {
    console.error('Error during bot verification:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'API endpoint ไม่พบ กรุณาตรวจสอบ URL ที่ถูกต้อง',
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
    // Using a known valid endpoint instead of root path
    await api.get('/status-by-phone/test');
    return true;
  } catch (error) {
    // If we get a 404 specifically, the API is likely running but the endpoint doesn't exist
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log('API is reachable but returned 404. This is expected for test endpoints.');
      return true;
    }
    console.error('API health check failed:', error);
    return false;
  }
};

export default api;

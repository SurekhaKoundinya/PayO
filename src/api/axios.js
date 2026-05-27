import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const api = axios.create({
  baseURL: 'http://payo-new.duckdns.org:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ FIXED (async + no error)
export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.log('GetToken error:', error);
    return null;

  }
};

// ✅ REQUEST INTERCEPTOR (no change needed, just safe)
api.interceptors.request.use(
  async (config) => {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const token = credentials.password;
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.log('Interceptor error:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

export default api;
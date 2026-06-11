import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const api = axios.create({
  baseURL: 'https://shadily-hazard-widget.ngrok-free.dev',
  timeout: 60000,
   headers: {
    'Accept': 'application/json',
  }
});

api.interceptors.request.use(
  async config => {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      config.headers.Authorization = `Bearer ${credentials.password}`;
    }

    console.log('REQUEST URL =>', `${config.baseURL}${config.url}`);
    console.log('METHOD =>', config.method);
    console.log('HEADERS =>', config.headers);

    return config;
  },
  error => Promise.reject(error),
);

export default api;

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
// api.interceptors.request.use(
//   async (config) => {
//     try {
//       const credentials = await Keychain.getGenericPassword();

//       if (credentials) {
//         const token = credentials.password;
//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       return config;
//     } catch (error) {
//       console.log('Interceptor error:', error);
//       return config;
//     }
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
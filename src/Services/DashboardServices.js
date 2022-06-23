import axios from 'axios';

import { toast } from 'react-toastify';

export const getSpree = () => async () => {
  try {
    const response = await axios.get(`/api/spree`);
    const data = response.data;
    return data;
  } catch (e) {
    console.log('e getSpree :::', e.response.data.message);
    if (e.response.data.message === 'Unauthorized Request') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    }
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const getTop5User = (value) => async () => {
  try {
    const response = await axios.get(`/api/user/spree/${value}`);
    const { data } = response.data;
    return data;
  } catch (e) {
    console.log('e getTop5User :::', e.response.data.message);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

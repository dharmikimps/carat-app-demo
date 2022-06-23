import axios from 'axios';
import { login } from '../Actions/Login';
import { toast } from 'react-toastify';

export const loginAuth = (value) => async (dispatch) => {
  try {
    let response;
    if (value && value.username && value.password) {
      response = await axios.post(`/api/auth/login`, value);
    } else {
      response = await axios.post(`/api/auth/socialLogin`, value);
    }
    const { data } = response.data;
    dispatch(login(data));
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data.token;
    toast.success(response.data.message);
    return data;
  } catch (e) {
    console.log('e :::', e);
    toast.error(e.response.data.message);
    return false;
  }
};

export const forgotAuth = (value) => async () => {
  try {
    const body = { email: value.email };
    const response = await axios.post(`/api/auth/forgot-password`, body);
    const data = response.data;
    toast.success(response.data.message);
    return data;
  } catch (e) {
    console.log('e forgot :::', e.response);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const getAdminData = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/user/me`);
    const { data } = response.data;
    dispatch(login(data));
    return data;
  } catch (e) {
    console.log('e getAdminData :::', e.response);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const logout = () => async () => {
  try {
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast.success('Logout successfully');
    return true;
  } catch (e) {
    console.log('e logout :::', e.response);
    toast.error(e.response.data.message);
    return 'Logout Error.';
  }
};

export const changePassword = (value) => async () => {
  try {
    const body = {
      current_password: value.currentPassword,
      new_password: value.newPassword,
      confirm_password: value.confirmNewPassword
    };
    const response = await axios.post(`/api/auth/changePassword`, body);
    toast.success('Password changed successfully!!');
    return response;
  } catch (e) {
    console.log('e :::', e);
    toast.error(e.response.data.message);
    return false;
  }
};

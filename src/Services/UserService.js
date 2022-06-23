import axios from 'axios';
import { toast } from 'react-toastify';

export const editUserInformation = (value) => async () => {
  try {
    const valueObj = {
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName
    };

    const response = await axios.put(`/api/auth/userUpdate`, valueObj);
    toast.success('User profile updated successfully');
    return response;
  } catch (e) {
    console.log('e editDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

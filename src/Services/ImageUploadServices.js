import axios from 'axios';
import { toast } from 'react-toastify';

export const imageUpload = (imageObj) => async () => {
  try {
    const response = await axios.post(`/api/media/upload`, imageObj);
    const data = response.data;
    toast.success(response.data.message);
    return data.data;
  } catch (e) {
    console.log('e imageUpload :::', e.response);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

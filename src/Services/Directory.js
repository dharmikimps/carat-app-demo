import axios from 'axios';
import { toast } from 'react-toastify';

export const getDirectory = () => async () => {
  try {
    const response = await axios.get(`/api/shop`);
    const data = response.data;
    return data.data;
  } catch (e) {
    console.log('e getDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const createNewDirectory = (value) => async () => {
  try {
    const valueObj = {
      spree: value.spree,
      name: value.dirName,
      secondary_category: value.dirCategory,
      tagline: value.dirTagline,
      description: value.dirDescription,
      featured_image: value.bannerImage,
      logo: value.logo,
      number_carats_checkin: value.caratValue,
      isActive: value.active,
      isHidden: value.hidden,
      website: value.website,
      loginType: 'web'
    };
    const response = await axios.post(`/api/shop`, valueObj);
    const data = response.data;
    toast.success('Successfully add new directory.');
    return data.data;
  } catch (e) {
    console.log('e createNewDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const editDirectory = (value) => async () => {
  try {
    const valueObj = {
      spree: value.spree,
      name: value.dirName,
      secondary_category: value.dirCategory,
      tagline: value.dirTagline,
      description: value.dirDescription,
      featured_image: value.bannerImage,
      logo: value.logo,
      number_carats_checkin: value.caratValue,
      isActive: value.active,
      isHidden: value.hidden,
      website: value.website,
      loginType: 'web'
    };
    const response = await axios.put(`/api/shop/${value.id}`, valueObj);
    const data = response.data;
    toast.success('Updated directory.');
    return data.data;
  } catch (e) {
    console.log('e editDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const deleteDirectory = (value) => async () => {
  try {
    const response = await axios.post(`/api/shop/delete/${value}`);
    const data = response.data;
    toast.success('Shop Deleted Successfully');
    return data.data;
  } catch (e) {
    console.log('e deleteDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

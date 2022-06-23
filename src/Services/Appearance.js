import axios from 'axios';
import { toast } from 'react-toastify';

export const editAppearance = (value) => async () => {
  try {
    const valueObj = {
      logo: value.logo,
      secondary_logo: value.secondary_logo,
      featured_image: value.featured_image,
      primary_color: value.primary_color,
      secondary_color: value.secondary_color,
      background_color: value.background_color,
      opacity: value.opacity,
      name: value.name,
      address: value.address,
      website: value.website,
      aboutUs: value.aboutUs,
      partnerName: value.partnerName,
      stamp_value: value.stamp_value,
      caratId: value.caratId,
      latitude: value.latitude,
      longitude: value.longitude
    };

    const response = await axios.put(`/api/spree/${value.id}`, valueObj);
    const data = response.data;
    toast.success('Appearance updated successfully');
    return data.data;
  } catch (e) {
    console.log('e editDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

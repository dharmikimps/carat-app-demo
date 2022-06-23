import axios from 'axios';
import { toast } from 'react-toastify';

export const editInformation = (value) => async () => {
  try {
    const valueObj = {
      name: value.eventName,
      websiteContact: value.contactWebsite,
      address: value.address,
      websiteAbout: value.aboutUrl,
      website: value.websiteHomePageUrl,
      aboutUs: value.websiteAboutPageUrl,
      description: value.eventDescription,
      facebookLink: value.facebookPageUrl,
      instagramLink: value.instagramPageUrl,
      linkedIn: value.linkedinPageUrl,
      twitterLink: value.twitterPageUrl,
      partnerName: value.partnerName,
      primary_color: value.primary_color,
      secondary_color: value.secondary_color,
      background_color: value.background_color,
      stamp_value: value.stamp_value,
      caratId: value.caratId,
      latitude: value.latitude,
      longitude: value.longitude
    };

    const response = await axios.put(`/api/spree/${value.id}`, valueObj);
    const data = response.data;
    toast.success('Information updated successfully');
    return data.data;
  } catch (e) {
    console.log('e editDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

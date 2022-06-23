import axios from 'axios';
import { toast } from 'react-toastify';

export const editRewardDescription = (value) => async () => {
  try {
    const valueObj = {
      infoExploreText: value.explore,
      infoEarnCaratsText: value.earningCarats,
      name: value.name,
      address: value.address,
      website: value.website,
      aboutUs: value.aboutUs,
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
    toast.success('Rewards Description updated successfully');
    return data.data;
  } catch (e) {
    console.log('e editDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const editPrizeDetails = (value) => async () => {
  try {
    const valueObj = {
      spree_prize_details: value.prizeDetails,
      prize_bronze_description: value.bronzeDetails,
      prize_silver_description: value.silverDetails,
      prize_gold_description: value.goldDetails,
      prize_bronze_number_carats: value.bronzeCarat,
      prize_silver_number_carats: value.silverCarat,
      prize_gold_number_carats: value.goldCarat,
      name: value.name,
      address: value.address,
      website: value.website,
      aboutUs: value.aboutUs,
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
    toast.success('Prize Details updated successfully');
    return data.data;
  } catch (e) {
    console.log('e editDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

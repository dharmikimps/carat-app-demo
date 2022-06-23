import axios from 'axios';
import { toast } from 'react-toastify';

export const getMessageList = (spreeValue, userId) => async () => {
  try {
    const response = await axios.get(`/api/message?spree=${spreeValue}&userId=${userId}`);
    const data = response.data;
    return data.data;
  } catch (e) {
    console.log('e getMessageList::: ', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const createNewMessage = (value) => async () => {
  try {
    const valueObj = {
      spree: value.spree,
      title: value.subjectLine,
      description: value.bodyText,
      message_link: value.messageLink,
      message_link_text: value.messageLinkLabel,
      start_date: value.startDate,
      end_date: value.endDate,
      text_color: value.primaryColor,
      background_color: value.backgroundColor,
      users: value.users,
      isNotificationSent: value.isNotificationSent
    };
    const response = await axios.post(`/api/message`, valueObj);

    const data = response.data;
    toast.success(response.data.message);
    return data.data;
  } catch (e) {
    console.log('e createNewDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const editMessage = (value) => async () => {
  try {
    const valueObj = {
      spree: value.spree,
      title: value.subjectLine,
      description: value.bodyText,
      message_link: value.messageLink,
      message_link_text: value.messageLinkLabel,
      start_date: value.startDate,
      end_date: value.endDate,
      text_color: value.primaryColor,
      background_color: value.backgroundColor,
      users: value.users,
      isNotificationSent: value.isNotificationSent,
      loginType: 'web'
    };

    const response = await axios.put(`/api/message/${value.id}`, valueObj);
    const data = response.data;
    toast.success('Message Updated.');
    return data.data;
  } catch (e) {
    console.log('e editDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const deleteMessage = (valueArr) => async () => {
  try {
    const response = await axios.post(`/api/message/delete`, valueArr);
    const data = response.data;
    toast.success(data.message);
    return data.data;
  } catch (e) {
    console.log('e deleteDirectory :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const getUserSpree = (value) => async () => {
  try {
    const response = await axios.get(`/api/user/spree/${value}`);
    const data = response.data;
    return data.data;
  } catch (error) {
    console.log('Error from fetching data in ', error);
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

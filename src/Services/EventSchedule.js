import axios from 'axios';
import { toast } from 'react-toastify';

export const eventScheduleSaveChanges = (value) => async () => {
  try {
    const valueObj = {
      spree: value.spree,
      date: value.date,
      logo: value.logo,
      featured_image: value.image,
      primary_color: value.color,
      numberOfDays: value.days
    };
    const response = await axios.post(`/api/event/event-schedule`, valueObj);
    const data = response.data;
    toast.success('Save Event.');
    return data.data;
  } catch (e) {
    console.log('e eventScheduleSaveChanges :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const createNewEvent = (value) => async () => {
  try {
    const valueObj = {
      spree: value.spree,
      day: value.eventDay,
      event_name: value.eventName,
      time: value.eventTime,
      subtitle: value.subtitle,
      description: value.eventDescription,
      learnMore: value.learnMoreLink,
      active: value.active
    };
    const response = await axios.post(`/api/event/new-event`, valueObj);
    const data = response.data;
    toast.success('New Event added successfully');
    return data.data;
  } catch (e) {
    console.log('e createNewEvent :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const getEvent = (value) => async () => {
  try {
    const response = await axios.get(`/api/event/get-event/${value}`);
    const data = response.data;
    return data.data;
  } catch (e) {
    console.log('e getEvent :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const deleteEvent = (value) => async () => {
  try {
    console.log('value deleteEvent :::', value);
    const response = await axios.post(`/api/event/delete-event/`, {
      id: value.id,
      spree: value.spree
    });
    const data = response.data;
    toast.success('Event Deleted Successfully');
    return data.data;
  } catch (e) {
    console.log('e deleteEvent :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const getEventDataById = (value) => async () => {
  try {
    console.log('value getEventDataById spree :::', value);
    const response = await axios.post(`/api/event/get-event-id`, {
      id: value.id,
      spree: value.spree
    });
    const data = response.data;
    return data;
  } catch (e) {
    console.log('e getEventDataById :::', e);
    {
      value.id !== null && toast.error(e.response.data.message);
    }
    return e.response.data;
  }
};

export const editEventData = (value) => async () => {
  try {
    console.log('value editEventData :::', value);
    const valueObj = {
      spree: value.spree,
      id: value.id,
      time: value.eventTime,
      event_name: value.eventName,
      subtitle: value.subtitle,
      description: value.eventDescription,
      day: value.eventDay,
      learnMore: value.learnMoreLink,
      active: value.active
    };
    const response = await axios.post(`/api/event/edit-event`, valueObj);
    const data = response.data;
    console.log('value editEventData :::', data.data);
    toast.success('Event Updated successfully.');
    return data;
  } catch (e) {
    console.log('e editEventData :::', e);
    {
      value.id !== null && toast.error(e.response.data.message);
    }
    return e.response.data;
  }
};

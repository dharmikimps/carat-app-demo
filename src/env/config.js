/* eslint-disable no-undef */
export const baseUrl =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const client_id = process.env.REACT_APP_CLIENT_ID;

export const serverLink =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_SERVER_IP
    : process.env.REACT_APP_SERVER_PROD_LINK;
export const serverIp = process.env.REACT_APP_SERVER_IP || '';

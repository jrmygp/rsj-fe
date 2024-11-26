import Cookies from 'js-cookie';

export const setCookie = (accesstoken) => {
  Cookies.set('scrt', accesstoken, { expires: 7, path: '/' });
};

export const getCookie = () => {
  return Cookies.get('scrt');
};

export const deleteCookie = () => {
  Cookies.remove('scrt', { path: '/' });
};

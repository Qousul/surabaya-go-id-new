import axiosConfig from 'utils/axios.config';

export const getMenus = async () => {
  const getData = await axiosConfig(true).get(`menus`)
  .then((v) => {
    return v.data;
  }).catch((err: any) => {
    console.log('Getting Error', err);
  });
  return getData;
};
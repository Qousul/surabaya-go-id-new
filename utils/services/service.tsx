import axiosConfig from 'utils/axios.config';

export const getServices = async () => {
  const getData = await axiosConfig(true).get(`service`)
  .then((v) => {
    return v.data;
  }).catch((err: any) => {
    console.log('Getting Error', err);
  });
  return getData;
};
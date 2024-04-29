import axiosConfig from 'utils/axios.config';

export const getData = async (
  page: number = 1,
  target: string,
  limit: number = 10,
) => {
  if (!target) {
    return;
  };

  const getData = await axiosConfig(false).get(`${target}?per_page=${limit}&page=${page}`)
  .then((v) => {
    return v.data;
  }).catch((err: any) => {
    console.log('Getting Error', err);
  });
  return getData;
};

export const getDetail = async (id: number, target: string) => {
  const getData = await axiosConfig(false).get(`${target}-detail?id=${id}`)
  .then((v) => {
    return v.data;
  }).catch((err: any) => {
    console.log('Getting Error', err);
  });
  return getData;
};
import axiosConfig from 'utils/axios.config';

export const getNews = async (
  page: number = 1,
  search: string = '',
  limit: number = 10,
  category: string = '',
) => {
  const getData = await axiosConfig(true)
  .get(`news?per_page=${limit}&page=${page}&title=${search}${category ? `&category=${category}` : ''}`)
  .then((v) => {
    return v.data;
  }).catch((err: any) => {
    console.log('Getting Error', err);
  });
  return getData;
};

export const getDetail = async (id: number) => {
  const getData = await axiosConfig(true).get(`news-detail?id=${id}`)
  .then((v) => {
    return v.data;
  }).catch((err: any) => {
    console.log('Getting Error', err);
  });
  return getData;
};
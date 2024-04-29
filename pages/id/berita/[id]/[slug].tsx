import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { StatusCodes } from 'http-status-codes';
import replaceAllInserter from 'string.prototype.replaceall';
import { NewsType } from 'components/home.section3';
import Detail from 'components/detail';
import { getDetail } from 'utils/services/news';

interface Props {
  detail: NewsType;
};

const NewsDetail: NextPage<Props> = ({ detail }: Props) => {
  console.log('detail', detail);
  const [ news, setNews ] = React.useState<NewsType[]>([]);
  const [ loading, setLoading ] = React.useState(true);
  const data = React.useMemo(() => {
    const dataDetail = detail;
    dataDetail.content = replaceAllInserter(dataDetail.content, `src="../../`, process.env.NEXT_PUBLIC_IMG ? `src="https://surabaya.go.id/` : `src="/../../`);
    dataDetail.content = replaceAllInserter(dataDetail.content, `href="../../`, `href="/../../`);
    return dataDetail;
  }, [detail]);
  const getData = async () => {
    setLoading(true);
    const fetchData = await fetch(`/api/data/news?page=1&category=berita`, { method: 'GET' });
    const results = await fetchData.json();
    console.log('results', results);
    if (fetchData.status == StatusCodes.OK) {
      if (results.data && results.data.data && results.data.data.length > 0) {
        setNews(results.data.data);
      } else {
        setNews(null);
      };
    };
    setLoading(false);
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Pemerintah Kota Surabaya</title>
        <meta name="description" content="Pemerintah Kota Surabaya" />
      </Head>
      <Detail
        news={data}
        others={news}
        pageTitle="Berita"
        route="berita"
        loadingDetail={false}
        loading={loading}
      />
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { id } = query;
  const detail = await getDetail(parseInt(id as string));
  
  return {
    props: {
      detail,
    },
  };
};

export default NewsDetail;

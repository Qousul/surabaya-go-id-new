import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import replaceAllInserter from 'string.prototype.replaceall';
import Layout from 'components/layout';
import PagesTitle from 'components/pages.title';
import Article from 'components/article';
import { NewsType } from 'components/home.section3';
import { getDetail } from 'utils/services/pages';

interface Props {
  detail: NewsType;
};

const Pages: NextPage<Props> = ({ detail }: Props) => {
  // const content = React.useMemo(() => detail.content.replace(new RegExp('\\src="../../', 'gm'), `src="https://surabaya.go.id/`), [detail]);
  const content = React.useMemo(() => {
      const replaceData = replaceAllInserter(detail.content, `src="../../`, process.env.NEXT_PUBLIC_IMG ? `src="https://surabaya.go.id/` : `src="/../../`);
      return replaceAllInserter(replaceData, `href="../../`, `href="/../../`);
  }, [detail]);
  return (
    <React.Fragment>
      <Head>
        <title>Pemerintah Kota Surabaya</title>
        <meta name="description" content="Pemerintah Kota Surabaya" />
      </Head>
      <Layout paddingY={15}>
        <PagesTitle text={detail.title} />
      </Layout>
      <Layout paddingY={0} maxWidth="md">
        <Article text={content} paddingY={8} />
      </Layout>
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

export default Pages;

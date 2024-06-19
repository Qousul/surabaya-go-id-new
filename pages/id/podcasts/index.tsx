import React from 'react';
import {
  Box,
  Skeleton,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { StatusCodes } from 'http-status-codes';
import Layout from 'components/layout';
import Title from 'components/title';
import MediaHeader from 'components/media.header';
// import MediaCount from 'components/media.count';
import { NewsType } from 'components/home.section3';
import MediaPodcastList from 'components/media.podcast.list';
import Pagination from 'components/pagination';
// import Element4 from 'public/images/icon/element_4.svg';
import { AccessibilityContext } from 'contexts/accessibility';

// const count = [{
//   text: 'PODCASTS',
//   total: 120,
// }];

interface Props {};

const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundImage: theme.palette.mode == "dark" ?
  `url('/images/batik.png')` :  
  `linear-gradient(
   rgba(255, 255, 255, 0.75), 
   rgba(255, 255, 255, 0.75)
 ), url('/images/batik.png')`,
  position: 'relative',
  '& .wrapper-svg-section1': {
    position: 'absolute',
    top: 0,
    right: '100%',
    transform: 'translate(50%, -30%)',
    zIndex: -1,
    '& svg': {
      width: theme.spacing(50),
      '& path': {
        stroke: `${theme.palette.secondary.main} !important`,
      },
    },
  },
  '&.negative': {
    '& .wrapper-svg-section4': {
      '& svg': {
        '& circle': {
          stroke: `${theme.palette.common.white} !important`,
        },
      },  
    },  
  },
  [theme.breakpoints.down('sm')]: {
    '& .wrapper-svg-section1, & .wrapper-svg-section4': {
      display: 'none',
    },
  },
}));

const Podcasts: NextPage<Props> = () => {
  const router = useRouter();
  const accessibility = React.useContext(AccessibilityContext);
  const [ podcasts, setPodcasts ] = React.useState<NewsType[]>([]);
  const [ loading, setLoading ] = React.useState(true);
  const [ count, setCount ] = React.useState(null);
  const current = React.useMemo(() => (router.query.page ? parseInt(router.query.page as string) : 1), [router.query.page]);
  const getData = async (pageParams: number) => {
    setLoading(true);
    const fetchData = await fetch(`/api/data/webdisplay?page=${pageParams}&limit=14&target=podcasts`, { method: 'GET' });
    const results = await fetchData.json();
    console.log('results', results);
    if (fetchData.status == StatusCodes.OK) {
      if (results && results.data && results.data.data && results.data.data.length > 0) {
        setPodcasts(results.data.data);
        // const totalPage = results.data.total / results.data.records;
        // setCount(Math.ceil(totalPage));
        setCount(5);
      } else {
        setPodcasts(null);
        setCount(0);
      };
    };
    setLoading(false);
  };
  const handleNextPrev = React.useCallback((p: number) => {
    const page = count ? p < 1 ? 1 : p : 1;
    router.push(
      `/id/podcasts?page=${page}`,
      `/id/podcasts?page=${page}`,
      { shallow: true },
    );
  }, [count, router.query]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getData(router.query.page ? parseInt(router.query.page as string) : 1);
  }, [router.query]);
  return (
    <React.Fragment>
      <Head>
        <title>Pemerintah Kota Surabaya</title>
        <meta name="description" content="Pemerintah Kota Surabaya" />
      </Head>
      <BoxStyled
        overflow="hidden"
        className={accessibility.css.negative ? 'negative' : ''}
        style={{paddingTop: '7rem',}}
      >
        <Layout paddingY={2}>
          <>
            {/* <Box className="wrapper-svg-section1">
              <Element4 />
            </Box> */}
            <Title text="Podcast" roundedBg={true}/>
            <MediaHeader
              text="Dengarkan Informasi mengenai kota Surabaya"
              description="dengan narasumber yang terpercaya."
            />
            {/* <MediaCount data={count} /> */}
            {loading ? (
                <Grid container spacing={3} marginTop={3}>
                  {[...new Array(9)].map((_v, i) => (
                    <Grid key={i} item xs={12} sm={4}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={400}
                        sx={{
                          borderRadius: 4,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <MediaPodcastList data={podcasts} />
              )}
            <Box marginTop={5} marginBottom={3}>
              <Pagination total={count} current={current} loading={loading} clickNextPrev={handleNextPrev} />
            </Box>
          </>
        </Layout>
      </BoxStyled>
    </React.Fragment>
  );
};

export default Podcasts;
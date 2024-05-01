import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// import { Menu as MenuType } from 'components/header';
import Layout from 'components/layout';
import Title from 'components/title';
import HomeSection1 from 'components/home.section1';
import HomeSection2 from 'components/home.section2';
import HomeSection3 from 'components/home.section3';
import HomeSection4 from 'components/home.section4';
import HomeSection5 from 'components/home.section5';
import Element1 from 'public/images/icon/element_1.svg';
import Element2 from 'public/images/icon/element_2.svg';
import Element4 from 'public/images/icon/element_4.svg';
import { getCarousel } from 'utils/services/home';
import { getNews } from 'utils/services/news';
import { getAgenda } from 'utils/services/agenda';
import { getServices } from 'utils/services/service';
import { SliderType } from 'components/home.section1';
import { NewsType } from 'components/home.section3';

export interface News {
  title: string;
  description?: string;
  image: string;
  date: string;
};

export interface Service {
  title: string;
};

interface Props {
  carousel: SliderType[];
  news: NewsType[];
  agenda: NewsType[];
  services: NewsType[];
};

const BoxStyled1 = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.grey.A100,
  background: `linear-gradient(0deg, ${theme.palette.mode == 'dark' ? theme.palette.background.paper : theme.palette.common.white} 85%, ${theme.palette.grey.A100} 100%)`,
  '& .wrapper-svg1, & .wrapper-svg2': {
    position: 'absolute',
    zIndex: 0,
    '& svg': {
      height: '100%',
    },
  },
  '& .wrapper-svg1': {
    height: theme.spacing(75),
    width: theme.spacing(75),
    bottom: 0,
    left: 0,
    transform: 'translate(-55%, 50%)',
    '& svg circle': {
      stroke: `${theme.palette.secondary.main} !important`,
    },
  },
  '& .wrapper-svg2': {
    bottom: 0,
    right: 0,
    height: theme.spacing(50),
    width: theme.spacing(50),
    transform: 'translate(70%, 0)',
    '& svg': {
      '& path': {
        stroke: `${theme.palette.primary.main} !important`,
      },
    },
  },
  '& .box-section4': {
    backgroundColor: theme.palette.mode == 'dark' ? theme.palette.background.paper : theme.palette.grey[100],
  },
  '& .box-inner': {
    position: 'relative',
    zIndex: 0,
    backgroundColor: theme.palette.mode == 'dark' ? theme.palette.grey.A100 : theme.palette.primary.main,
    '& .wrapper-svg4, & .wrapper-svg5': {
      position: 'absolute',
      zIndex: 0,
      '& svg': {
        height: '100%',
      },
    },
    '& .wrapper-svg4': {
      height: theme.spacing(75),
      width: theme.spacing(75),
      top: 0,
      right: 0,
      transform: 'translate(55%, -50%)',
      '& svg circle': {
        fill: `${theme.palette.secondary.main} !important`,
      },
    },
    '& .wrapper-svg5': {
      bottom: 0,
      left: 0,
      height: theme.spacing(50),
      width: theme.spacing(50),
      transform: 'translate(-55%, 50%)',
      '& svg path': {
        stroke: `${theme.palette.secondary.main} !important`,
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .wrapper-svg1, & .wrapper-svg2, & .wrapper-svg4, & .wrapper-svg5': {
      display: 'none',
    },
  },
}));

const Home: NextPage<Props> = ({
  carousel,
  news,
  agenda,
  services,
}: Props) => {
  console.log('services', services);

  return (
    <React.Fragment>
      <Head>
        <title>Pemerintah Kota Surabaya</title>
        <meta name="description" content="Pemerintah Kota Surabaya" />
        <script type="text/javascript" async src="https://widget.kominfo.go.id/gpr-widget-kominfo.min.js"></script>
      </Head>
      <HomeSection1 data={carousel}/>
      <Layout paddingY={0}>
        <HomeSection2 />
      </Layout>
      <BoxStyled1>
        <Layout>
          <>
            {/* <Box className="wrapper-svg1">
              <Element1 />
            </Box>
            <Box className="wrapper-svg2">
              <Element4 />
            </Box> */}
            <HomeSection3 data={news} />
          </>
        </Layout>
        <Box className="box-section4">
          <Layout>
            <>
              <HomeSection4 data={agenda} />
              <Title
                text="Pelayanan Pemerintah Kota Surabaya"
                paddingY={0}
              />
            </>
          </Layout>
        </Box>
        <Box className="box-inner">
          <Layout paddingY={0}>
            <>
              {/* <Box className="wrapper-svg4">
                <Element2 />
              </Box>
              <Box className="wrapper-svg5">
                <Element4 />
              </Box> */}
              <HomeSection5 data={services} />
            </>
          </Layout>
        </Box>
      </BoxStyled1>
    </React.Fragment>
  );
};

export const getServerSideProps = async () => {
  const [carouselData, news, agenda, services] = await Promise.all([
    getCarousel(),
    getNews(1, '', 15, 'berita'),
    getAgenda(),
    getServices(),
  ]);
  let carousel = [];
  if (carouselData && carouselData.length > 0) {
    const slicedArray = carouselData.slice(0, 5);
    carousel = slicedArray;
  };

  return {
    props: {
      carousel,
      news: news?.data || [],
      agenda: agenda?.data || [],
      services: services || [],
    },
  };
};

export default Home;

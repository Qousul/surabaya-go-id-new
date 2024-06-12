import React, { memo } from 'react';
import {
  Box,
  Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// import CarouselContent from 'components/carousel.content';
import Title from 'components/title';
import { NewsType } from 'components/home.section3';
import { BreakpointsContext } from 'contexts/breakpoints';
import CarouselContentLPVideo from './carousel.contentLPVideo';
import { hijauRamadhan } from 'styles/theme';

import { StatusCodes } from 'http-status-codes';

interface Props {
  data: NewsType[];
};

const BoxStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  // backgroundColor: theme.palette.mode == 'dark' ? theme.palette.grey.A100 : theme.palette.primary.main,
  borderRadius: theme.spacing(2),
  // padding: theme.spacing(8, 3),
  marginBottom: theme.spacing(12),
  '& .MuiGrid-container': {
    position: 'relative',
    zIndex: 1,
  },
  '& .slick-arrow': {
    top: '50%',
    '&.prev': {
      left: theme.spacing(-3),
    },
    '&.next': {
      right: theme.spacing(-3),
    },
  },
  '& a': {
    // color: `${theme.palette.common.white} !important`,
    color: `${hijauRamadhan} !important`,
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(5, 0),
    '& .slick-arrow': {
      '&.prev': {
        left: theme.spacing(0),
      },
      '&.next': {
        right: theme.spacing(0),
      },
    },  
  },
}));

// const HomeSection6: React.FunctionComponent<Props> = ({ data }: Props) => {
const HomeSection6 = () => {
  const { downSm } = React.useContext(BreakpointsContext);
  // const loading = false;

  const [ videos, setVideos ] = React.useState<NewsType[]>([]);
  const [ loading, setLoading ] = React.useState(false);
  const [ count, setCount ] = React.useState(null);

  const getData = async (pageParams: number) => {
    setLoading(true);
    const fetchData = await fetch(`/api/data/webdisplay?page=${pageParams}&target=videos`, { method: 'GET' });
    const results = await fetchData.json();
    console.log('results', results);
    if (fetchData.status == StatusCodes.OK) {
      if (results && results.data && results.data.data && results.data.data.length > 0) {
        setVideos(results.data.data);
        const totalPage = results.data.total / results.data.records;
        setCount(Math.ceil(totalPage));
      } else {
        setVideos(null);
        setCount(0);
      };
    };
    setLoading(false);
  };

  React.useEffect(() => {
    getData(1);
  }, []);

  return (
    <>
    <Title colortext='#fff' text="Video" iconJudul='/images/icon/accent/accentIco1.svg'/>
    <BoxStyled>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          sx={{
            borderRadius: 3,
            bgcolor: 'rgba(0, 0, 0, 0.1)',
          }}
        />
      ) : (
        <CarouselContentLPVideo
          data={videos}
          gridSpacing={2}
          gridImage={12}
          gridContent={12}
          truncateTitle={40}
          withDescription={false}
          slidesToShow={downSm ? 1 : 3}
          route="videos"
        />
      )}
    </BoxStyled>
    </>
  );
};

HomeSection6.defaultProps = {};

export default memo(HomeSection6);
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

const HomeSection6: React.FunctionComponent<Props> = ({ data }: Props) => {
  const { downSm } = React.useContext(BreakpointsContext);
  const loading = false;
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
          data={data}
          gridSpacing={2}
          gridImage={12}
          gridContent={12}
          truncateTitle={40}
          withDescription={false}
          
          slidesToShow={downSm ? 1 : 3}
          route="agenda"
        />
      )}
    </BoxStyled>
    </>
  );
};

HomeSection6.defaultProps = {};

export default memo(HomeSection6);
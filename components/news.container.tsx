import React, { memo } from 'react';
import {
  Box,
} from '@mui/material';
// import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { NewsType } from 'components/home.section3';
// import NewsItem from 'components/news.item';
// import Title from 'components/title';
import CarouselContentLP from './carousel.contentLP';
// import { fontSize } from 'styles/theme';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Props {
  data: NewsType[];
};

export const BoxStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3.5),
  borderRadius: theme.spacing(2),
  height: '100%',
  '& .slick-arrow': {
    top: '33%',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 0, 3),
  },
}));

export const BoxStyled2 = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 0, 3),
  },
}));

const NewsContainer: React.FunctionComponent<Props> = ({ data }: Props) => {
  // const router = useRouter();
  const { downSm } = React.useContext(BreakpointsContext);
  // const handleOnClick = React.useCallback(() => router.push('/id/berita', '/id/berita'), []);
  return (
    <BoxStyled2 sx={{ backgroundColor: `rgba(0,0,0,0)` }}>
      {/* {data.length > 0 &&
        <Box marginTop={2}>
          <NewsItem
            data={data[0]}
            gridImage={6}
            gridContent={6}
            gridSpacing={2}
            fontSizeTitle={fontSize + (downSm ? 0 : 8)}
            route="berita"
          />
        </Box>
      } */}
      <Box marginTop={downSm ? 3 : 0}>
        <CarouselContentLP data={data.slice(1)} slidesToShow={1} withDescription={false} route="berita" />
      </Box>
    </BoxStyled2>
  );
};

NewsContainer.defaultProps = {};

export default memo(NewsContainer);
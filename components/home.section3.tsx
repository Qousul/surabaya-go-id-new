import React, { memo } from 'react';
import {
  Grid,
  Box,
  Skeleton,
} from '@mui/material';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Title from 'components/title';
import NewsContainer from 'components/news.container';
// import NewsContainer2 from 'components/news.container2';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Category {
  alias: string;
  created_at: string;
  description?: string;
  id: number;
  locale: string;
  name: string;
  parent_id?: string;
  updated_at: string;
};

export interface NewsType {
  category?: Category[];
  content?: string;
  content_type?: string;
  created_at: string;
  feature_image: string;
  id?: number;
  id_lama?: number;
  locale?: string;
  name?: string;
  parent_id?: number;
  post_type?: string;
  status?: string;
  tag?: Category[];
  title: string;
  updated_at?: string;
  user_id?: number;
  viewed_count?: number;
};

interface Props {
  data: NewsType[];
};

const BoxStyled = styled(Box)(({ theme }) => ({
  '& .MuiGrid-container': {
    position: 'relative',
    zIndex: 1,
  },
  '& .wrapper-svg-section3': {
    position: 'absolute',
    top: theme.spacing(3),
    right: `calc(100% + ${theme.spacing(2)})`,
    '& svg': {
      width: 50,
      '& circle': {
        fill: `${theme.palette.primary.main} !important`,
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .wrapper-svg-section3': {
      display: 'none',
    },
    '& .slick-arrow': {
      display: 'none',
    },
  },
}));

const HomeSection3: React.FunctionComponent<Props> = ({ data }: Props) => {
  const router = useRouter();
  const loading = false;
  const { downSm } = React.useContext(BreakpointsContext);
  const handleOnClick = React.useCallback(() => router.push('/id/berita', '/id/berita'), []);
  return (
    <>
      {data &&
        <BoxStyled>
          <Title text="Berita Terbaru" buttonText="lihat semua" onClick={handleOnClick} iconJudul='/images/icon/accent/accentIco1.svg'/>
          <Grid container spacing={downSm ? 0 : 4} alignItems="stretch">
            <Grid item xs={12} sm={8}>
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={340}
                  sx={{
                    borderRadius: 3,
                  }}
                />
              ) : (
                <>
                  {data.length > 0 &&
                    <NewsContainer data={data.slice(0, 7)} />
                  }
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* {loading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{
                    borderRadius: 3,
                  }}
                />
              ) : (
                <>
                  {data.length > 0 &&
                    <NewsContainer2 data={data.slice(7, 12)} />
                  }
                </>
              )} */}
              <div id="gpr-kominfo-widget-container"></div>
            </Grid>
          </Grid>
        </BoxStyled>
      }
    </>
  );
};

HomeSection3.defaultProps = {};

export default memo(HomeSection3);
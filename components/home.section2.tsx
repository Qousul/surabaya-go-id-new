import React, { memo } from "react";
import {
  Grid,
  Box,
  Typography,
  CardActionArea,
  // Skeleton,
} from "@mui/material";
import Link from "next/link";
import CarouselItem from "components/carousel.item";
import _ from "lodash";
import { styled } from "@mui/material/styles";
// import CarouselSmall from 'components/carousel.small';
import { Menu as MenuType } from "components/header";
import { fontSize, borderRadius, hijauRamadhan } from "styles/theme";
import { BreakpointsContext } from "contexts/breakpoints";
import { MenuContext } from "contexts/menu";
import Title from 'components/title';
import useTextToSpeech from "hooks/useTextToSpeech";
import { Container } from "@mui/material";
import Layout from "components/layout";

interface Props { }

const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  borderRadius: "50px",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    borderRadius: theme.spacing(borderRadius),
    "& .MuiTypography-root": {
      fontSize: fontSize + 4,
      "& span": {
        fontSize: fontSize + 14,
      },
    },
  },
}));

const BoxStyled2 = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  borderRadius: "50px",
  border: theme.palette.mode == 'dark' ? `1px solid ${theme.palette.common.white}` : `1px solid ${hijauRamadhan}`,
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    borderRadius: theme.spacing(borderRadius),
    "& .MuiTypography-root": {
      fontSize: fontSize + 4,
      "& span": {
        fontSize: fontSize + 14,
      },
    },
  },
}));

const Typography1 = styled(Typography)(({theme})=>({
  color: theme.palette.mode == 'dark' ? theme.palette.common.white : hijauRamadhan,
}));

const BoxCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode == 'dark' ? theme.palette.grey.A100 : theme.palette.common.white,
  display: "flex",
  borderRadius: "50px",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    borderRadius: theme.spacing(borderRadius),
    "& .MuiTypography-root": {
      fontSize: fontSize + 4,
      "& span": {
        fontSize: fontSize + 14,
      },
    },
  },
}));

function findMenu(array: MenuType[], title: string) {
  let object = null;
  array.some(function f(a: MenuType) {
    const isInclude = a.title.toLowerCase().includes(title.toLowerCase());
    if (isInclude) {
      object = a;
      return true;
    }
    if (Array.isArray(a.child)) {
      return a.child.some(f);
    }
  });
  return object;
}

const HomeSection2: React.FunctionComponent<Props> = () => {
  const { downSm, downMd } = React.useContext(BreakpointsContext);
  const { loading, menu } = React.useContext(MenuContext);
  const { textToSpeech } = useTextToSpeech();
  const whatsInSurabaya: MenuType[] = React.useMemo(() => {
    if (!loading) {
      const result = findMenu(menu, "Ada Apa di Surabaya");
      return menu.length > 0 ? (result ? result["child"] : []) : [];
    } else {
      return [];
    }
  }, [loading, menu]);
  console.log("whatsInSurabaya", whatsInSurabaya);

  return (
    // <Box sx={{ padding: `5rem 0` }}>
    <BoxCard
      sx={{
        padding: `2rem 2rem`,
        // backgroundColor: `#fff`,
        margin: 0,
        borderRadius: `3rem`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Layout>
        <>
          <Grid container spacing={2} alignItems="stretch" overflow={downSm ? 'hidden' : 'visible'}>


            <Grid item md={4} xs={12}>
              <BoxStyled height={downMd ? '10rem' : '100%'} sx={{
                backgroundImage: `url("/images/photos/balaiKotaMalam.png")`,
                backgroundSize: downMd ? `cover` : `auto 100%`,
                backgroundPosition: `center center`
              }}>
              </BoxStyled>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                  <BoxStyled height={downSm ? 'auto' : '100%'} sx={{ borderRadius: '100px', padding: `2rem 0` }}>
                    <Typography
                      onMouseEnter={(e) => textToSpeech(e, true)}
                      sx={!downMd && {
                        textOrientation: 'sideways',
                        writingMode: 'vertical-lr',
                        textTransform: 'uppercase',
                        fontSize:`15pt`,
                      }}
                      color={`white`}
                      >
                      <b>Tentang Surabaya</b>
                    </Typography>
                  </BoxStyled>
                </Grid>

                <Grid item xs={12} md={10}>
                  <BoxStyled2 height={downSm ? 'auto' : '100%'} sx={{ backgroundColor: `rgba(0, 0, 0, 0)`, padding: `2rem` }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <img src="/images/icon/accent/accentIco1.svg" alt="" />
                      <img src="/images/icon/accent/accentIco2.svg" alt="" />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography1 onMouseEnter={(e) => textToSpeech(e, true)} style={{ fontSize: `16px` }}>
                        Surabaya adalah ibu kota Provinsi Jawa Timur yang menjadi pusat pemerintahan dan perekonomian dari Provinsi Jawa Timur. Kota ini terbagi menjadi 31 kecamatan dan 154 kelurahan. Kota ini, yang dikenal dengan nilai kepahlawanan, memiliki sejarah panjang yang terkait dengan peristiwa heroik seperti peristiwa pertempuran 10 November 1945. Sebagai pelabuhan penting sejak zaman Majapahit hingga masa kolonial Belanda, Surabaya terus memainkan peran vital dalam perdagangan dan sejarah Indonesia.
                      </Typography1>
                    </Grid>
                  </Grid>
                </BoxStyled2>
              </Grid>

              <Grid item xs={12} md={10} sx={{ order: downMd ? 3 : 2 }}>
                <BoxStyled height={downSm ? 'auto' : '100%'}>
                  {whatsInSurabaya.map((v, i) => (
                    <Link key={i} href={v.url ? v.url : '#'} passHref>
                      {/* <Link key={i} href={/id/page/0/${v.id}/${_.kebabCase(v.title)}} passHref> */}
                      <CardActionArea component="a" target='_blank' sx={{ borderRadius: 4 }}>
                        <CarouselItem
                          src={`/images/icon/menu/${v.icon ? v.icon : `${_.snakeCase(v.title)}.svg`}`}
                          text={v.title}
                        />
                      </CardActionArea>
                    </Link>
                  ))}
                </BoxStyled>
              </Grid>

              <Grid item xs={12} md={2} sx={{ order: downMd ? 2 : 3 }}>
                <BoxStyled2 height={downSm ? 'auto' : '100%'} sx={{ backgroundColor: `rgba(0, 0, 0, 0)`, borderRadius: `100px`, padding: `2rem 0` }}>
                <Typography1
                  onMouseEnter={(e) => textToSpeech(e, true)}
                  sx={!downMd && {
                    textOrientation: 'sideways',
                    writingMode: 'vertical-lr',
                    textTransform: 'uppercase',
                    fontSize:`15pt`,
                  }}>
                  <b>Ada Apa Di Surabaya</b>
                </Typography1>
              </BoxStyled2>
            </Grid>

          </Grid>
        </Grid >

      </Grid >
    </>
      </Layout >
    </BoxCard >
    // </Box>
  );
};

HomeSection2.defaultProps = {};

export default memo(HomeSection2);

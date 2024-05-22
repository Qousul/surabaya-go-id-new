import React, { memo } from "react";
import {
  Box,
  // List,
  Grid,
  Typography,
  // ListItem,
  // ListItemButton,
  // ListItemText,
} from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { NewsType } from "components/home.section3";
import { hijauRamadhan, fontSize, borderRadius } from "styles/theme";
// import { ButtonStyled } from 'components/title';
// import Element3 from 'public/images/icon/element_3.svg';
import Title from "components/title";
import { BreakpointsContext } from "contexts/breakpoints";
import { AccessibilityContext } from "contexts/accessibility";
import useTextToSpeech from "hooks/useTextToSpeech";
import { Container } from "@mui/material";
import Layout from "components/layout";

import { StatusCodes } from 'http-status-codes';
import whatDayId from "what-day-id";
import TimeAgo from "javascript-time-ago";
import id from "javascript-time-ago/locale/id";
import _ from "lodash";

TimeAgo.addLocale(id);
const timeAgo = new TimeAgo("id-ID");

// interface Props {
//   data: NewsType[];
// }

// const paddingList = 4;
// const transition = 0.1;

// const BoxStyled = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(6, 0),
// }));

const BoxStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'dark'? "ffffff" : theme.palette.primary.main,
  fontSize: theme.breakpoints.values.md ? fontSize + 50 : fontSize + 80,
  fontFamily: 'serif',
  fontStyle : `italic`,
  margin: `0 1.5rem`,
  marginTop: `1.5rem`,
  textAlign: `center`,
  display: `flex`,
  alignItems: `center`,
  // fontWeight: 625,
}));

const CardStyled = styled(Box)(({ theme }) => ({
  width: `100%`,
  height: `100%`,
  perspective: `1000px`,
  '&:hover': {
    '& .card-inner': {
      transform: `rotateY(180deg)`,
    }
  }
}));

const CardInner = styled(Box)(({ theme }) => ({
  width: `100%`,
  height: `100%`,
  position: `relative`,
  transformStyle: `preserve-3d`,
  transition: `transform 0.999s`,
}));

const CardFront = styled(Box)(({ theme }) => ({
  position: `absolute`,
  width: `100%`,
  height: `100%`,
  backfaceVisibility: `hidden`,
  backgroundColor: `#6A2C70`,
  color: `#fff`,
  display: `flex`,
  alignItems: `center`,
  overflow: `hidden`,
  borderRadius: `15px`,
  justifyContent: `center`,
  fontSize: `24px`,
  transform: `rotateY(0deg)`,
}));

const CardBack = styled(Box)(({ theme }) => ({
  position: `absolute`,
  width: `100%`,
  height: `100%`,
  backfaceVisibility: `hidden`,
  backgroundColor: theme.palette.mode === `light`? hijauRamadhan : `#20576F`,
  color: `#fff`,
  border: `10px solid ${theme.palette.mode === `light`? hijauRamadhan : `#20576F`}`,
  borderRadius: `15px`,
  justifyContent: `center`,
  fontSize: `24px`,
  transform: `rotateY(180deg)`,
  padding: `1rem`
}));

const BoxCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode == 'dark' ? theme.palette.grey.A100 : theme.palette.common.white,
  display: "flex",
  flexDirection: `column`,
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

// const HomeSection5: React.FunctionComponent<Props> = ({ data }: Props) => {
const HomeSection5 = () => {
  const { downSm } = React.useContext(BreakpointsContext);
  const { downMd } = React.useContext(BreakpointsContext);
  const accessibility = React.useContext(AccessibilityContext);

  const [photos, setPhotos] = React.useState<NewsType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(null);
  const getData = async (pageParams: number) => {
    setLoading(true);
    const fetchData = await fetch(`/api/data/webdisplay?page=${pageParams}&target=infografis`, { method: 'GET' });
    const results = await fetchData.json();
    console.log('results', results);
    if (fetchData.status == StatusCodes.OK) {
      if (results && results.data && results.data.data && results.data.data.length > 0) {
        setPhotos(results.data.data);
        const totalPage = results.data.total / results.data.records;
        setCount(Math.ceil(totalPage));
      } else {
        setPhotos(null);
        setCount(0);
      };
    };
    setLoading(false);
  };
  React.useEffect(() => {
    getData(1);
    console.log(photos[0])
  }, []);

  const { textToSpeech } = useTextToSpeech();  

  return (
    <BoxCard
      sx={{
        overflow: `hidden`,
        padding: downSm ? `1rem 0rem` : `3rem 0rem`
      }}
    >
      <>
        {!loading && (
          <>
            <Box
              sx={{
                display: `flex`,
                justifyContent: `center`,
                width: downSm ? `300%` : downMd ? `225%` : `115%`,
              }}
            >

              {photos.slice(0, 4).map((v, i) => {

                return (
                  <>
                    {
                      downMd ?
                      i === 2 && (<TypographyStyled style={{fontSize: downSm && fontSize + 15, margin:`0 1rem`}}>Bangga</TypographyStyled>)
                      :
                      i === 1 && (<TypographyStyled>Bangga</TypographyStyled>)
                    }
                    {
                      i < 12 && (

                        <Box
                          sx={{
                            minWidth: downSm ? `100px` : downMd? `225px` : `325px`,
                            minHeight: downSm ? `50px` : `125px`,
                            marginRight: downSm ? i === 1 ? 0 : `0.5rem` : downMd ? i === 1 ? 0 : `1.5rem` : i === 0 ? 0 : `1.5rem`,
                            marginTop: downSm? `0.5rem` : `1.5rem`,
                          }}
                        >
                          <Link
                            href={`/id/photos/${v.id ? v.id : "0"}/${v.name ? _.kebabCase(v.name) : "test-post"}`}
                            key={i}
                          >
                            <a>
                              <CardStyled>
                                <CardInner className="card-inner">
                                  <CardFront>
                                    <Box sx={{
                                      height: `100%`,
                                      width: `100%`,
                                      backgroundImage: `url(https://webdisplay.surabaya.go.id/${v.feature_image})`,
                                      backgroundSize: `cover`,
                                    }}></Box>
                                  </CardFront>
                                  <CardBack>
                                    <Typography sx={{ fontSize: fontSize - 6, }}>{v.title}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: fontSize - 7, }}>
                                      {`${whatDayId(
                                        new Date(v.created_at)
                                      )} | ${timeAgo.format(new Date(v.created_at))}`}
                                    </Typography>
                                  </CardBack>
                                </CardInner>
                              </CardStyled>
                            </a>
                          </Link>
                        </Box>
                      )
                    }
                  </>
                );
              })}
            </Box>
            <Box
              sx={{
                display: `flex`,
                justifyContent: `center`,
                width: downSm ? `300%` : downMd ? `225%` : `115%`,
              }}
            >

              {photos.slice(4, 8).map((v, i) => {

                return (
                  <>
                    {
                      downMd ?
                      i === 2 && (<TypographyStyled style={{fontSize: downSm && fontSize + 15, margin:`0 1rem`}}>Menyapa</TypographyStyled>)
                      :
                      i === 3 && (<TypographyStyled>Menyapa</TypographyStyled>)
                    }
                    {
                      i < 12 && (

                        <Box
                          sx={{
                            minWidth: downSm ? `100px` : downMd? `225px` : `325px`,
                            minHeight: downSm ? `50px` : `125px`,
                            marginRight: downSm ? i === 1 ? 0 : `0.5rem` : downMd ? i === 1 ? 0 : `1.5rem` : i === 2 ? 0 : `1.5rem`,
                            marginTop: downSm? `0.5rem` : `1.5rem`,
                          }}
                        >
                          <Link
                            href={`/id/photos/${v.id ? v.id : "0"}/${v.name ? _.kebabCase(v.name) : "test-post"}`}
                            key={i}
                          >
                            <a>
                              <CardStyled>
                                <CardInner className="card-inner">
                                  <CardFront>
                                    <Box sx={{
                                      height: `100%`,
                                      width: `100%`,
                                      backgroundImage: `url(https://webdisplay.surabaya.go.id/${v.feature_image})`,
                                      backgroundSize: `cover`,
                                    }}></Box>
                                  </CardFront>
                                  <CardBack>
                                    <Typography sx={{ fontSize: fontSize - 6, }}>{v.title}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: fontSize - 7, }}>
                                      {`${whatDayId(
                                        new Date(v.created_at)
                                      )} | ${timeAgo.format(new Date(v.created_at))}`}
                                    </Typography>
                                  </CardBack>
                                </CardInner>
                              </CardStyled>
                            </a>
                          </Link>
                        </Box>
                      )
                    }
                  </>
                );
              })}
            </Box>
            <Box
              sx={{
                display: `flex`,
                justifyContent: `center`,
                width: downSm ? `300%` : downMd ? `225%` : `115%`,
              }}
            >

              {photos.slice(8, 12).map((v, i) => {

                return (
                  <>
                    {
                      downMd ?
                      i === 2 && (<TypographyStyled style={{fontSize: downSm && fontSize + 15, margin:`0 1rem`}}>Warga</TypographyStyled>)
                      :
                      i === 1 && (<TypographyStyled>Warga</TypographyStyled>)
                    }
                    {
                      i < 12 && (

                        <Box
                          sx={{
                            minWidth: downSm ? `100px` : downMd? `225px` : `325px`,
                            minHeight: downSm ? `50px` : `125px`,
                            marginRight: downSm ? i === 1 ? 0 : `0.5rem` : downMd ? i === 1 ? 0 : `1.5rem` : i === 0 ? 0 : `1.5rem`,
                            marginTop: downSm? `0.5rem` : `1.5rem`,
                          }}
                        >
                          <Link
                            href={`/id/photos/${v.id ? v.id : "0"}/${v.name ? _.kebabCase(v.name) : "test-post"}`}
                            key={i}
                          >
                            <a>
                              <CardStyled>
                                <CardInner className="card-inner">
                                  <CardFront>
                                    <Box sx={{
                                      height: `100%`,
                                      width: `100%`,
                                      backgroundImage: `url(https://webdisplay.surabaya.go.id/${v.feature_image})`,
                                      backgroundSize: `cover`,
                                    }}></Box>
                                  </CardFront>
                                  <CardBack>
                                    <Typography sx={{ fontSize: fontSize - 6, }}>{v.title}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: fontSize - 7, }}>
                                      {`${whatDayId(
                                        new Date(v.created_at)
                                      )} | ${timeAgo.format(new Date(v.created_at))}`}
                                    </Typography>
                                  </CardBack>
                                </CardInner>
                              </CardStyled>
                            </a>
                          </Link>
                        </Box>
                      )
                    }
                  </>
                );
              })}
            </Box>
          </>
        )}

      </>
    </BoxCard>
  );
};

HomeSection5.defaultProps = {};

export default memo(HomeSection5);

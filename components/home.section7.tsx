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

const CardStyled = styled(Box)(({ theme }) => ({
  width: `100%`,
  height: `200px`,
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
  borderRadius: `10px`,
  justifyContent: `center`,
  fontSize: `24px`,
  transform: `rotateY(0deg)`,
}));

const CardBack = styled(Box)(({ theme }) => ({
  position: `absolute`,
  width: `100%`,
  height: `100%`,
  backfaceVisibility: `hidden`,
  backgroundColor: hijauRamadhan,
  color: `#fff`,
  border: `10px solid ${hijauRamadhan}`,
  borderRadius: `10px`,
  justifyContent: `center`,
  fontSize: `24px`,
  transform: `rotateY(180deg)`,
  padding: `1rem`
}));

const BoxCard = styled(Box)(({theme})=>({
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

// const HomeSection5: React.FunctionComponent<Props> = ({ data }: Props) => {
const HomeSection5 = () => {
  const { downSm } = React.useContext(BreakpointsContext);
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
  // const loading = false;
  return (
    <BoxCard
      sx={{
        padding: `2rem 2rem`,
        margin: 0,
        borderRadius: `3rem`,
      }}
    >
      <Layout>
        <>
          {/* <BoxStyled className={accessibility.css.negative ? "negative" : ""}> */}
          <Title
            text="Foto"
            iconJudul="/images/icon/accent/accentIco1.svg"
          />
          {!loading && (
            <Box
              sx={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `center`,
              }}
            >

              <Grid container spacing={2}>

                {photos.map((v, i) => {

                  return i <= 5 && (
                    <Grid item xs={4} key={i}>
                    <Link
                    href={`/id/photos/${v.id ? v.id : "0"}/${
                      v.name ? _.kebabCase(v.name) : "test-post"
                    }`}
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
                            <Typography>{v.title}</Typography>
                            <Typography variant="caption">
                              {`${whatDayId(
                                new Date(v.created_at)
                              )} | ${timeAgo.format(new Date(v.created_at))}`}
                            </Typography>
                          </CardBack>
                        </CardInner>
                      </CardStyled>
                    </a></Link>
                    </Grid>
                  );
                })}
              </Grid>

            </Box>
          )}
          {/* </BoxStyled> */}
        </>
      </Layout>
    </BoxCard>
  );
};

HomeSection5.defaultProps = {};

export default memo(HomeSection5);

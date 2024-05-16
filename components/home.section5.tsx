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
import { hijauRamadhan, fontSize, borderRadius, } from "styles/theme";
// import { ButtonStyled } from 'components/title';
// import Element3 from 'public/images/icon/element_3.svg';
import Title from "components/title";
import { BreakpointsContext } from "contexts/breakpoints";
import { AccessibilityContext } from "contexts/accessibility";
import useTextToSpeech from "hooks/useTextToSpeech";
import { Container } from "@mui/material";
import Layout from "components/layout";

interface Props {
  data: NewsType[];
}

// const paddingList = 4;
// const transition = 0.1;

// const BoxStyled = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(6, 0),
// }));
const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  borderRadius: "50px",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  // "& .MuiTypography-root": {
  //   fontSize: fontSize + 6,
  //   fontWeight: 300,
  //   color: theme.palette.common.white,
  //   lineHeight: 1.2,
  //   "& span": {
  //     display: "block",
  //     fontWeight: 800,
  //     fontSize: fontSize + 18,
  //   },
  // },
  // [theme.breakpoints.down("sm")]: {
  //   borderRadius: theme.spacing(borderRadius),
  //   "& .MuiTypography-root": {
  //     fontSize: fontSize + 4,
  //     "& span": {
  //       fontSize: fontSize + 14,
  //     },
  //   },
  // },
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

const Typography1 = styled(Typography)(({theme})=>({
  color: theme.palette.mode == 'dark' ? theme.palette.common.white : hijauRamadhan,
}));

const HomeSection5: React.FunctionComponent<Props> = ({ data }: Props) => {
  const { downSm } = React.useContext(BreakpointsContext);
  const accessibility = React.useContext(AccessibilityContext);
  const { textToSpeech } = useTextToSpeech();
  const loading = false;
  return (
    <BoxCard
      sx={{
        margin: 0,
        borderRadius: `3rem`,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      }}
    >
      <Layout>
        <>
          {/* <BoxStyled className={accessibility.css.negative ? "negative" : ""}> */}
            <Title
              text="Pelayanan Pemerintah Kota Surabaya"
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
                {data.length > 0 &&
                  data.map((v, i) => (
                    <Link href={v.content} passHref key={i}>
                      <Grid
                        container
                        spacing={0}
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                          margin: `30px 10px`,
                          maxWidth: !downSm ? `200px` : `100px`,
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display: `flex`,
                            justifyContent: `center`,
                            alignItems: `center`,
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: `#99723D`,
                              width: !downSm ? `100px` : `75px`,
                              height: !downSm ? `100px` : `75px`,
                              borderRadius: `100%`,
                              display: `flex`,
                              justifyContent: `center`,
                              alignItems: `center`,
                            }}
                          >
                            <img
                              src={`/images/icon/ico-pelayanan/${v.name}.svg`}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography1
                            onMouseEnter={(e) => textToSpeech(e, true)}
                            style={{
                              textAlign: "center",
                              textTransform: "uppercase",
                              // color: hijauRamadhan,
                              fontSize: downSm && `8pt`,
                              marginTop: downSm && "0.5rem",
                            }}
                          >
                            {v.title}
                          </Typography1>
                        </Grid>
                      </Grid>
                    </Link>
                  ))}
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

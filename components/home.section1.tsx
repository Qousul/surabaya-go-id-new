import React, { memo, useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { heightHeader } from "styles/theme";
// import CarouselMain from 'components/carousel.main';
import Layout from "components/layout";
import Search from "components/search";
import { fontSize } from "styles/theme";
import LogoLine from "public/images/icon/lineart-sby.svg";
import Batik from "public/images/batik.png";
// import Element1 from 'public/images/icon/element_1.svg';
// import Element2 from 'public/images/icon/element_2.svg';
// import Element3 from 'public/images/icon/element_3.svg';
import Sbytxt from "public/images/icon/surabaya.svg";
import SbytxtLg from "public/images/icon/surabaya-lg.svg";
import { BreakpointsContext } from "contexts/breakpoints";
import { AccessibilityContext } from "contexts/accessibility";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { Height } from '@mui/icons-material';

export interface SliderType {
  content?: string;
  content_type?: string;
  created_at?: string;
  feature_image: string;
  id: number;
  id_lama?: number;
  locale?: string;
  name?: string;
  parent_id?: number;
  post_type?: string;
  status?: string;
  title?: string;
  updated_at?: string;
  user_id?: number;
  viewed_count?: number;
}

interface Props {
  data: SliderType[];
}

const StackedCard = styled(Card)(({ theme, index }) => ({
  border: "10px solid white",
  borderRadius : "50px",
  transition: "transform 0.5s ease-in-out",
  width: "300px",
  height: "450px",
  // marginInline: "-75px",
  transform: `rotate(${
    index === 0
      ? -14
      : index === 1
      ? -5
      : index === 2
      ? 0
      : index === 3
      ? 5
      : 14
  }deg) translateY(${
    index === 0 || index === 4 ? "50px" : index === 2 ? "-10px" : "0"
  })`,
  "&:hover": {
    transform: "none",
    zIndex: 1,
    // width: "225px",
    // height: "325px",
    transition: "transform 0.5s",
  },
  [theme.breakpoints.down("sm")]: {
    height: "150px",
    borderRadius : "20px",
    border: "5px solid white",
    // width:"50px",
  },
}));

const StackedCardMedia = styled(CardMedia)(({ theme }) => ({
  height: "100%",
  objectFit: "cover",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: `120vh`,
  backgroundImage: `url(/images/bg-hero.png)`,
  backgroundPosition: `center`,
  backgroundSize: `cover`,
  backgroundRepeat: `repeat`,
  backgroundBlendMode: `screen`,
  backgroundColor:
    theme.palette.mode == "dark"
      ? theme.palette.background.paper
      : theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  "& .wrapper-svg1, & .wrapper-svg1 div, & .wrapper-svg3, & .wrapper-svg3 div":
    {
      position: "absolute",
      height: "92%",
      width: "100%",
      zIndex: 0,
      "& svg": {
        height: "100%",
      },
    },
  "& .wrapper-svg1, & .wrapper-svg1 div": {
    left: 0,
    bottom: 10,
    "& svg": {
      transform: "translateX(65%)",
      "& circle": {
        fill: `${theme.palette.primary.main} !important`,
      },
    },
  },
  "& .wrapper-svg3, & .wrapper-svg3 div": {
    left: 0,
    top: 0,
    textAlign: "right",
    "& svg": {
      transform: "translate(20%, -68%)",
      "& circle": {
        stroke: `${theme.palette.primary.main} !important`,
      },
    },
    [theme.breakpoints.down("xl")]: {
      height: "75%",
    },
  },
  "& .typo1": {
    fontSize: fontSize + 70,
    textTransform: "uppercase",
    fontWeight: 900,
    textAlign: "center",
    lineHeight: 1,
    color:
      theme.palette.mode == "dark"
        ? theme.palette.background.paper
        : theme.palette.primary.main,
    WebkitTextStroke: `2px ${theme.palette.primary.main}`,
    WebkitTextFillColor:
      theme.palette.mode == "dark"
        ? theme.palette.background.paper
        : theme.palette.grey[200],
    "&.negative": {
      WebkitTextStroke: `2px ${theme.palette.common.white}`,
    },
  },
  "& .wrapper-svg2": {
    textAlign: "right",
    "& svg": {
      height: 86,
      transform: "scale(2) translateY(38%) rotate(90deg)",
      transformOrigin: "right top",
      "& circle": {
        fill: `${theme.palette.primary.main} !important`,
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: `calc(100vh - ${70}px)`,
    "& .wrapper-svg1, & .wrapper-svg3": {
      display: "none",
    },
    "& .wrapper-svg2": {
      "& svg": {
        height: 65,
      },
    },
    "& .typo1": {
      fontSize: fontSize + 34,
    },
  },
}));

const HomeSection1: React.FunctionComponent<Props> = ({ data }: Props) => {
  const { downSm, downXl } = React.useContext(BreakpointsContext);
  const accessibility = React.useContext(AccessibilityContext);
  const [margin, setMargin] = useState("-75px");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > 0) {
        if(-75 + currentPosition < -20){
          setMargin(`${-75 + currentPosition}px`,);
        }else if(-75 + currentPosition > -20){
          setMargin("-20px");
        }
      } else {
        setMargin("-75px");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledBox>
      <Layout maxWidth={downXl ? "lg" : "xl"}>
        <Box
          // display="grid"
          alignItems="center"
          justifyContent={downSm ? "center" : "center"}
          flexWrap="wrap"
          // paddingX={5}
        >
          <Box
            flexGrow="1"
            paddingLeft={downSm ? 0 : 3}
            paddingTop={downSm ? 5 : 7}
          >
            <Box
              display="grid"
              justifyContent="center"
              padding={3}
              // flexWrap="wrap"
              // className="wrapper-svg"
            >
               {isMobile ? (
        <Sbytxt/>
      ) : (
        <SbytxtLg/>
      )}
            </Box>
            <Typography
              textAlign="center"
              fontSize={downSm ? 24 - 1 : 24}
              fontWeight={500}
              lineHeight={1.5}
              color={`#ffffff`}
            >
              {`Gotong royong menuju kota dunia yang maju,`}
              <br />
              {`humanis, dan berkelanjutan`}
            </Typography>
            <Box display="flex" justifyContent="center" marginTop={3}>
              <Search />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop={4}
              padding={5}
              // flexWrap="wrap"
            >
              {data.map((v, index) => (
                <StackedCard
                  key={index}
                  // sx={{ width: 200, height: 300, m: -2 }}
                  key={index}
                  index={index}
                  sx={{
                    marginInline: margin,
                    [theme.breakpoints.down('sm')]: {
                      margin: '-20px',
                    },
                  }}
                >
                  <StackedCardMedia
                    image={`https://surabaya.go.id${v.feature_image}`} // Ubah URL gambar sesuai kebutuhan Anda
                  />
                </StackedCard>
              ))}
            </Box>
          </Box>
        </Box>
      </Layout>
    </StyledBox>
  );
};

HomeSection1.defaultProps = {};

export default memo(HomeSection1);

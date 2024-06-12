import React, { memo } from "react";
import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
// import CarouselContent from 'components/carousel.content';
import Title from "components/title";
import { NewsType } from "components/home.section3";
import { BreakpointsContext } from "contexts/breakpoints";
import CarouselContentLP2 from "./carousel.contentLP2";
import { hijauRamadhan } from "styles/theme";
import { useRouter } from "next/router";
import { Padding } from "@mui/icons-material";

interface Props {
  data: NewsType[];
}

const BoxStyled = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  // backgroundColor: theme.palette.mode == 'dark' ? theme.palette.grey.A100 : theme.palette.primary.main,
  borderRadius: theme.spacing(2),
  // padding: theme.spacing(8, 3),
  marginBottom: theme.spacing(12),
  "& .MuiGrid-container": {
    position: "relative",
    zIndex: 1,
  },
  "& .slick-arrow": {
    top: "50%",
    "&.prev": {
      left: theme.spacing(-3),
    },
    "&.next": {
      right: theme.spacing(-3),
    },
  },
  "& a": {
    // color: `${theme.palette.common.white} !important`,
    color: `${hijauRamadhan} !important`,
  },
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(5, 0),
    "& .slick-arrow": {
      "&.prev": {
        left: theme.spacing(0),
      },
      "&.next": {
        right: theme.spacing(0),
      },
    },
  },
}));

const HomeSection4: React.FunctionComponent<Props> = ({ data }: Props) => {
  const { downSm } = React.useContext(BreakpointsContext);
  const loading = false;

  const router = useRouter();
  const handleOnClick = React.useCallback(
    () => router.push("/id/agenda", "/id/agenda"),
    []
  );

  return (
    <>
      <Title
        colortext="#fff"
        text="Agenda Terbaru"
        iconJudul="/images/icon/accent/accentIco1.svg"
        buttonText="Lihat Agenda"
        onClick={handleOnClick}
      />
      <BoxStyled>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={150}
            sx={{
              borderRadius: 3,
              bgcolor: "rgba(0, 0, 0, 0.1)",
            }}
          />
        ) : (
          <CarouselContentLP2
            data={data}
            gridContent={6}
            gridImage={6}
            slidesToShow={downSm ? 1 : 3}
            gridSpacing={2}
            route="agenda"
            withDescription={false}
            truncateTitle={60}
          />
        )}
      </BoxStyled>
    </>
  );
};

HomeSection4.defaultProps = {};

export default memo(HomeSection4);

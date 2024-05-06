import React, { memo } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import whatDayId from "what-day-id";
import _ from "lodash";
import TimeAgo from "javascript-time-ago";
import id from "javascript-time-ago/locale/id";
import { NewsType } from "components/home.section3";
import {
  fontSize as fontSizeDef,
  borderRadius,
  coklatKece,
  hijauRamadhan,
} from "styles/theme";
import { truncateText } from "utils/truncate";
import { iconSurabaya } from "styles/theme";
import PlayIcon from "public/images/icon/play_video.svg";
import SurabayaIcon from "public/images/icon/mobile/surabaya.svg";
import { AccessibilityContext } from "contexts/accessibility";
import useTextToSpeech from "hooks/useTextToSpeech";

TimeAgo.addLocale(id);
const timeAgo = new TimeAgo("id-ID");

interface Props {
  data: NewsType;
  gridImage?: number;
  gridContent?: number;
  gridSpacing?: number;
  fontSizeTitle?: number;
  fontSizeDate?: number;
  truncateTitle?: number;
  truncateDescription?: number;
  withDescription?: boolean;
  withIconSurabaya?: boolean;
  withPlay?: boolean;
  sizePlay?: number;
  route: string;
}

export const fontSizeDateInit = fontSizeDef - 2;
const sizeIcon = 26;

const BoxStyled = styled(Box)(({ theme }) => ({
  height: "100%",
  borderRadius: "20px",
  padding: "15px",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey.A100
      : theme.palette.common.white, // Set background color to white
  "& a": {
    textDecoration: "none",
    color: theme.palette.text.primary,
    height: "100%",
    "& .content-img": {
      "& img": {
        width: "100%",
        aspectRatio: "3/2",
        objectFit: "cover",
        display: "block",
        borderRadius: theme.spacing(borderRadius),
      },
      "& .wrapper-svg": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    },
    "& .icon-surabaya": iconSurabaya(sizeIcon),
  },
}));

const Typography1Styled = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  textTransform: "uppercase",
  color:
    theme.palette.mode === "dark" ? theme.palette.common.white : hijauRamadhan,
}));

const Typography2 = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  textTransform: "uppercase",
  color:
    theme.palette.mode === "dark" ? theme.palette.common.white : hijauRamadhan,
}));

const NewsItem: React.FunctionComponent<Props> = ({
  data,
  gridImage,
  gridContent,
  gridSpacing,
  fontSizeTitle,
  fontSizeDate,
  truncateTitle,
  truncateDescription,
  withDescription,
  withIconSurabaya,
  withPlay,
  sizePlay,
  route,
}: Props) => {
  const accessibility = React.useContext(AccessibilityContext);
  const { textToSpeech } = useTextToSpeech();
  const description = React.useMemo(
    () =>
      withDescription ? truncateText(data.content, truncateDescription) : "",
    [data, truncateDescription]
  );
  const marginTop = React.useMemo(
    () => (withDescription ? 1.3 : 0.6),
    [withDescription]
  );
  const isWebdisplay = React.useMemo(
    () => route == "videos" || route == "photos",
    [route]
  );
  return (
    <BoxStyled>
      <Link
        href={`/id/${route}/${data.id ? data.id : "0"}/${
          data.name ? _.kebabCase(data.name) : "test-post"
        }`}
      >
        <a>
          <Grid container spacing={gridSpacing}>
            <Grid item sm={gridImage}>
              <Box
                position="relative"
                className="content-img"
                sx={{
                  "& .wrapper-svg": {
                    width: sizePlay,
                    height: sizePlay,
                  },
                }}
              >
                <img
                  src={`${
                    isWebdisplay
                      ? "https://webdisplay.surabaya.go.id"
                      : "https://surabaya.go.id"
                  }${data.feature_image}`}
                />
                {withPlay && (
                  <Box
                    className="wrapper-svg"
                    sx={{
                      "& svg": {
                        width: `${sizePlay}px`,
                        height: `${sizePlay}px`,
                      },
                    }}
                  >
                    <PlayIcon />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item sm={gridContent}>
              <Box className="inner" display="flex" alignItems="flex-start">
                {withIconSurabaya && (
                  <Box>
                    <Box
                      className="icon-surabaya"
                      sx={{
                        bgcolor: accessibility.css.negative
                          ? `${coklatKece} !important`
                          : null,
                      }}
                    >
                      <Box
                        className="wrapper-svg"
                        sx={{
                          "& svg": {
                            width: `${sizeIcon}px`,
                            height: `${sizeIcon}px`,
                            "& path": accessibility.css.negative
                              ? {
                                  fill: "black !important",
                                }
                              : null,
                          },
                        }}
                      >
                        <SurabayaIcon />
                      </Box>
                    </Box>
                  </Box>
                )}
                <Box
                  flexGrow="1"
                  paddingY={1}
                  sx={{
                    "& svg": {
                      width: `${sizeIcon}px`,
                      height: `${sizeIcon}px`,
                      "& path": accessibility.css.negative
                        ? {
                            fill: "black !important",
                          }
                        : null,
                    },
                  }}
                >
                  <Typography1Styled
                    fontSize={fontSizeTitle + accessibility.fontSize}
                    marginBottom={marginTop}
                    className="title"
                    onMouseEnter={() => textToSpeech(data.title, false)}
                  >
                    {truncateText(data.title, truncateTitle)}
                  </Typography1Styled>
                  {description && withDescription && (
                    <Typography
                      className="description"
                      sx={{
                        fontSize: fontSizeDef + accessibility.fontSize,
                      }}
                    >
                      {description}
                    </Typography>
                  )}
                  <Typography2
                    fontSize={fontSizeDate + accessibility.fontSize}
                    marginTop={marginTop}
                    className="date"
                    onMouseEnter={(e) => textToSpeech(e, true)}
                  >
                    {`${whatDayId(
                      new Date(data.created_at)
                    )} | ${timeAgo.format(new Date(data.created_at))}`}
                  </Typography2>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </a>
      </Link>
    </BoxStyled>
  );
};

NewsItem.defaultProps = {
  gridImage: 12,
  gridContent: 12,
  gridSpacing: 0,
  fontSizeTitle: fontSizeDef,
  fontSizeDate: fontSizeDateInit,
  truncateTitle: 25,
  truncateDescription: 170,
  withDescription: true,
  withIconSurabaya: false,
  withPlay: false,
  sizePlay: 50,
};

export default memo(NewsItem);

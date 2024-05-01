import React, { memo } from 'react';
import {
  // Grid,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import whatDayId from 'what-day-id';
import _ from 'lodash';
import TimeAgo from 'javascript-time-ago';
import id from 'javascript-time-ago/locale/id';
import { NewsType } from 'components/home.section3';
import { fontSize as fontSizeDef, borderRadius } from 'styles/theme';
// import { truncateText } from 'utils/truncate';
import { iconSurabaya } from 'styles/theme';
// import PlayIcon from 'public/images/icon/play_video.svg';
// import SurabayaIcon from 'public/images/icon/mobile/surabaya.svg';
import { AccessibilityContext } from 'contexts/accessibility';
import useTextToSpeech from 'hooks/useTextToSpeech';

TimeAgo.addLocale(id);
const timeAgo = new TimeAgo('id-ID');

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
};

export const fontSizeDateInit = fontSizeDef - 2;
const sizeIcon = 26;

const BoxStyled = styled(Box)(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  borderRadius: theme.spacing(borderRadius),
  '& a': {
    textDecoration: 'none',
    color: `white`,
    // backgroundColor: theme.palette.mode == 'dark' ? theme.palette.grey.A100 : theme.palette.common.white,
    height: '100%',
    '& .content-img': {
      '& img': {
        width: '100%',
        aspectRatio: '3/2',
        objectFit: 'cover',
        display: 'block',
      },
      '& .wrapper-svg': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
    '& .icon-surabaya': iconSurabaya(sizeIcon),
  },
}));

const Typography1Styled = styled(Typography)(() => ({
  fontWeight: 800,
  textTransform: 'uppercase',
}));

const NewsItem: React.FunctionComponent<Props> = ({
  data,
  // gridImage,
  // gridContent,
  // gridSpacing,
  fontSizeTitle,
  fontSizeDate,
  // truncateTitle,
  // truncateDescription,
  withDescription,
  // withIconSurabaya,
  // withPlay,
  sizePlay,
  route,
}: Props) => {
  const accessibility = React.useContext(AccessibilityContext);
  const { textToSpeech } = useTextToSpeech();
  // const description = React.useMemo(() => withDescription ? truncateText(data.content, truncateDescription) : '', [data, truncateDescription]);
  const marginTop = React.useMemo(() => withDescription ? 1.3 : 0.6, [withDescription]);
  const isWebdisplay = React.useMemo(() => route == 'videos' || route == 'photos', [route]);
  return (
    <BoxStyled>
      <Link href={`/id/${route}/${data.id ? data.id : '0'}/${data.name ? _.kebabCase(data.name) : 'test-post'}`}>
        <a>
          <Box
            position="relative"
            className="content-img"
            sx={{
              '& .wrapper-svg': {
                width: sizePlay,
                height: sizePlay,
              },
              backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(18,18,18,100)), url(${isWebdisplay ? 'https://webdisplay.surabaya.go.id' : 'https://surabaya.go.id'}${data.feature_image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: `2rem`
            }}
          >
            <Box className="inner" display="flex" alignItems="flex-start" sx={{ marginTop: `60%` }}>
              <Box flexGrow="1">
                <Typography1Styled
                  fontSize={fontSizeTitle + accessibility.fontSize + 10}
                  marginBottom={marginTop}
                  className="title"
                  onMouseEnter={() => textToSpeech(data.title, false)}
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {data.title}
                </Typography1Styled>
                <Typography
                  fontSize={fontSizeDate + accessibility.fontSize + 8}
                  marginTop={marginTop}
                  className="date"
                  onMouseEnter={(e) => textToSpeech(e, true)}
                >
                  {`${whatDayId(new Date(data.created_at))} | ${timeAgo.format(new Date(data.created_at))}`}
                </Typography>
              </Box>
            </Box>
          </Box>
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
import React, { memo } from 'react';
import {
  Button,
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { fontSize, hijauRamadhan } from 'styles/theme';
import { StyledBox as StyledBoxArrow } from 'styles/carousel';
import { Arrow } from 'components/carousel.small';
import ViewIcon from 'public/images/icon/view_all.svg';
import { ColorModeContext } from 'contexts/colorMode';
import { BreakpointsContext } from 'contexts/breakpoints';
import { AccessibilityContext } from 'contexts/accessibility';
import useTextToSpeech from 'hooks/useTextToSpeech';

interface Props {
  text: string;
  colortext?: string;
  iconJudul?: string;
  iconJudul2?: string;
  buttonText?: string;
  paddingY?: number;
  paddingX?: number;
  withBackground?: boolean;
  justifyContent?: string;
  roundedBg?: boolean;
  onBack?: () => any;
  onClick?: () => any;
};

const BoxStyled = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  '& .MuiTypography-root': {
    textTransform: 'uppercase',
    fontWeight: 800,
  },
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
  fontWeight: 700,
  textTransform: 'none',
  color: theme.palette.mode == 'dark' ? theme.palette.background.paper : theme.palette.text.primary,
  borderRadius: theme.spacing(5),
  padding: theme.spacing(0.6, 2),
  minHeight: 'inherit',
  display: 'flex',
  alignItems: 'center',
  '& .wrapper-svg': {
    height: fontSize + 10,
    overflow: 'hidden',
    marginRight: theme.spacing(1),
    '& svg path': {
      fill: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.4, 1),
  },
}));

const Title: React.FunctionComponent<Props> = ({
  text,
  iconJudul,
  iconJudul2,
  buttonText,
  paddingY,
  paddingX,
  withBackground,
  justifyContent,
  colortext,
  roundedBg,
  onBack,
  onClick,
}: Props) => {
  const { mode } = React.useContext(ColorModeContext);
  const { downSm } = React.useContext(BreakpointsContext);
  const accessibility = React.useContext(AccessibilityContext);
  const { textToSpeech } = useTextToSpeech();
  // const handleBack = React.useCallback(() => {}, []);
  return (
    <BoxStyled
      paddingY={paddingY}
      paddingX={paddingX}
      sx={{
        // backgroundColor: withBackground ? 'secondary.main' : 'transparent',
        backgroundColor: withBackground ? 'secondary.main' : 'transparent',
        borderRadius: withBackground ? 2 : 0,
        justifyContent,
      }}
    >
      <StyledBoxArrow
        display="flex"
        alignItems="center"
        className="back-button"
      >

        {onBack &&
          <Arrow
            size={(fontSize + 25).toString()}
            className="slick-arrow prev"
            onClick={onBack}
          />
        }

        { (iconJudul || iconJudul2) &&
          <>
            <img src={iconJudul} style={{ marginRight: '0.7rem', maxHeight: '25px' }} />
            <img src={iconJudul2} style={{ marginRight: '0.7rem', maxHeight: '25px' }} />
          </>
        }
        
        <Typography
          onMouseEnter={(e) => textToSpeech(e, true)}
          sx={{
            color: roundedBg? `white` : withBackground ? mode == 'dark' ? 'primary.main' : 'text.primary' : colortext,
            fontSize: {
              xs: (fontSize + 2) + accessibility.fontSize,
              sm: (fontSize + 4) + accessibility.fontSize,
            },
            backgroundColor: roundedBg? hijauRamadhan : `transparent`,
            padding: roundedBg? `0.5rem 1rem` : 0,
            borderRadius: roundedBg? `100rem` : 0,
          }}
        >
          {text}
        </Typography>
      </StyledBoxArrow>

      {buttonText &&
        <ButtonStyled
          variant="contained"
          disableElevation
          color="secondary"
          onClick={onClick}
          sx={{
            fontSize: (downSm ? fontSize - 2 : fontSize + 1) + accessibility.fontSize,
            whiteSpace: 'nowrap',
            bgcolor: accessibility.css.negative ? 'common.white' : null,
            '&:hover': {
              bgcolor: accessibility.css.negative ? 'common.white' : 'secondary.main',
              boxShadow: `0 3px 3px 0 rgba(0, 0, 0, 0.1)`,
            },
          }}
        >
          <Box className="wrapper-svg"
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& svg': {
                height: `${fontSize + (downSm ? 5 : 10)}px`,
              },
            }}
          >
            <ViewIcon />
          </Box>
          <Box sx={{color:`#003f5a`}}>
          {buttonText}
          </Box>
        </ButtonStyled>
      }

    </BoxStyled>
  );
};

Title.defaultProps = {
  paddingY: 4,
  paddingX: 0,
  withBackground: false,
  justifyContent: 'space-between',
};

export default memo(Title);
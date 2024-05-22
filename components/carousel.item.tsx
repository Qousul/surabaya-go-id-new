import React, { memo } from 'react';
import {
  Typography,
} from '@mui/material';
import { fontSize, hijauRamadhan } from 'styles/theme';
import { AccessibilityContext } from 'contexts/accessibility';
import { BreakpointsContext } from 'contexts/breakpoints';
import { ColorModeContext } from 'contexts/colorMode';
import useTextToSpeech from 'hooks/useTextToSpeech';

interface Props {
  src: string;
  text?: string;
  onClick?(): any;
};

const CarouselItem: React.FunctionComponent<Props> = ({
  src,
  text,
  onClick,
}: Props) => {
  const accessibility = React.useContext(AccessibilityContext);
  const { downMd } = React.useContext(BreakpointsContext);
  const { downSm } = React.useContext(BreakpointsContext);
  const { mode } = React.useContext(ColorModeContext);
  const { textToSpeech } = useTextToSpeech();
  const handleClick = React.useCallback(() => {
    if (onClick) {
      onClick();
    };
  }, []);
  return (
    <div className="items" onClick={handleClick} style={{
      display:`flex`,
      flexDirection:`column`,
      justifyContent:`center`,
      alignItems:`center`,
      textAlign:`center`,
      borderLeft:`${text === `Bisnis dan Investasi` ? `1px` : `0px`} solid ${mode === 'light'? hijauRamadhan : `white`}`,
      borderRight:`${text === `Bisnis dan Investasi` ? `1px` : `0px`} solid ${mode === 'light'? hijauRamadhan : `white`}`,
      }}>
      
      <object type="image/svg+xml" data={src} id="svg-object" style={{
        maxHeight: downMd ? `2rem` : `5rem`,
        marginBottom: downMd? `1rem` : `3rem`,
        fill : `white`
      }}></object>

      {text &&
        <Typography
          onMouseEnter={(e) => textToSpeech(e, true)}
          style={{
            fontSize:downSm?`10pt`:(fontSize + 2) + accessibility.fontSize  
          }}
          color={mode === 'light'? hijauRamadhan : `white`}
        >
          {text}
        </Typography>
      }

    </div>
  );
};

CarouselItem.defaultProps = {};

export default memo(CarouselItem);

import React, { memo } from 'react';
import {
  Typography,
} from '@mui/material';
import { fontSize } from 'styles/theme';
import { AccessibilityContext } from 'contexts/accessibility';
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
      padding:`0px 2rem`,
      borderLeft:`${text === `Bisnis dan Investasi` ? `1px` : `0px`} solid white`,
      borderRight:`${text === `Bisnis dan Investasi` ? `1px` : `0px`} solid white`
      }}>
      
      <img src={src} style={{
        maxHeight: `5rem`,
        marginBottom: `3rem`
      }}/>

      {text &&
        <Typography
          onMouseEnter={(e) => textToSpeech(e, true)}
          sx={{
            fontSize: (fontSize + 2) + accessibility.fontSize,
          }}
        >
          {text}
        </Typography>
      }

    </div>
  );
};

CarouselItem.defaultProps = {};

export default memo(CarouselItem);

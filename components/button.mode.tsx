import React, { memo } from 'react';
import {
  Switch,
} from '@mui/material';
import { ColorModeContext } from 'contexts/colorMode';
import { styled } from '@mui/material/styles';
import { AccessibilityContext } from 'contexts/accessibility';

interface Props {};

const circle = 20;
const width = circle * 2.5;
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: width,
  height: circle,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    '&.Mui-checked': {
      transform: `translateX(${width - circle}px)`,
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.secondary.main,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: circle,
    height: circle,
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSwitch-track': {
    borderRadius: circle,
    backgroundColor: theme.palette.secondary.main,
  },
  '&.negative': {
    '& .MuiSwitch-switchBase': {
      '&.Mui-checked': {
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.primary.main,
        },
        '& .MuiSwitch-thumb': {
          backgroundColor: theme.palette.common.white,
        },
      },
    },  
  },
}));

const ButtonMode: React.FunctionComponent<Props> = () => {
  const { mode, setColorMode } = React.useContext(ColorModeContext);
  const accessibility = React.useContext(AccessibilityContext);
  const handleChange = React.useCallback(() => {
    setColorMode();
  }, [setColorMode]);
  const isDarkMode = React.useMemo(() => mode == 'light' ? false : true, [mode]);
  return (
    <AntSwitch
      checked={isDarkMode}
      onChange={handleChange}
      className={accessibility.css.negative ? 'negative' : ''}
    />
  );
};

ButtonMode.defaultProps = {
  paddingY: 5,
};

export default memo(ButtonMode);
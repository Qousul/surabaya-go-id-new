import React, { memo } from 'react';
import {
  Button,
} from '@mui/material';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { fontSize, coklatKece } from 'styles/theme';
import { AccessibilityContext } from 'contexts/accessibility';
import useTextToSpeech from 'hooks/useTextToSpeech';

interface Props {
  title: string;
  url?: string;
  icon?: string;
  index: number;
  isSelected?: boolean;
  withChevron?: boolean;
  onClick?: (i: number) => any;
};

// function checkIcon(name: string) {
//   const filename = name.replace(/\.[^/.]+$/, '');
//   const check = availableIcon.includes(filename);
//   return check;
// };

const HeaderButton: React.FunctionComponent<Props> = ({
  title,
  url,
  icon,
  index,
  isSelected,
  withChevron,
  onClick,
}: Props) => {
  const { textToSpeech } = useTextToSpeech();
  // const isIcon = React.useMemo(() => checkIcon(icon), [icon]);
  const [ isCorrupted, setIsCorrupted ] = React.useState(false);
  const accessibility = React.useContext(AccessibilityContext);
  return (
    <Link href={url ? url : '#'} passHref>
      <Button
        variant="contained"
        disableElevation
        component="a"
        className={isSelected ? 'active' : ''}
        onClick={() => onClick ? onClick(index) : null}
        startIcon={isCorrupted ? null : <img src={`/images/icon/menu/${icon}`} height={fontSize + 10} onError={() => setIsCorrupted(true)} />}
        endIcon={withChevron ? <ChevronRightIcon /> : null}
        sx={accessibility.css.negative ? {
          color: `rgba(255, 255, 255, 0.3) !important`,
          backgroundColor: `rgba(255, 255, 255, 0.1) !important`,
          '&.active': {
            color: `${coklatKece} !important`,
          },
        } : null}
      >
        <span onMouseEnter={(e) => textToSpeech(e, true)}>{title}</span>
      </Button>
    </Link>
  );
};

HeaderButton.defaultProps = {
  withChevron: true,
  isSelected: false,
};

export default memo(HeaderButton);
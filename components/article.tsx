import React, { memo } from 'react';
import {
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { fontSize } from 'styles/theme';
import { AccessibilityContext } from 'contexts/accessibility';

interface Props {
  text?: string;
  className?: string;
  paddingY?: number;
};

const BoxStyled = styled(Box)(({ theme }) => ({
  '& .description': {
    '& h1, & h2, & h3, & h4, & h5, & h6, & p': {
      marginTop: 0,
      marginBottom: 0,
      '& b, & strong': {
        fontWeight: 900,
      },
    },
  },
  '&.webdisplay': {
    '& .description': {
      '& h1, & h2, & h3, & h4, & h5, & h6, & p': {
        marginBottom: theme.spacing(2),
      },
    },
  },
}));

const Article: React.FunctionComponent<Props> = ({ text, className, paddingY }: Props) => {
  const accessibility = React.useContext(AccessibilityContext);
  return (
    <BoxStyled
      className={className}
      sx={{
        paddingY,
        fontSize: (fontSize + 2) + accessibility.fontSize,
      }}
    >
      <div className="description" dangerouslySetInnerHTML={{__html: text}} />
    </BoxStyled>
  );
};

Article.defaultProps = {
  paddingY: 0,
  className: '',
};

export default memo(Article);
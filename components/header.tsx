import React, { memo } from 'react';
import {
  Box,
  AppBar,
  useScrollTrigger,
  Slide,
  // Typography,
  Toolbar,
  Skeleton,
  Grid,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { heightHeader } from 'styles/theme';
import { fontSize } from 'styles/theme';
import { BreakpointsContext } from 'contexts/breakpoints';
import ButtonMode from 'components/button.mode';
import { MenuContext } from 'contexts/menu';
import { AccessibilityContext } from 'contexts/accessibility';
import HeaderDialog from 'components/header.dialog';
import BottomNav from 'components/bottomNav';
import useTextToSpeech from 'hooks/useTextToSpeech';
import { hijauRamadhan } from 'styles/theme';
// import data from 'data/menu.json';

export interface Menu {
  id?: number;
  title: string;
  url: string;
  level?: number;
  icon?: string;
  child: Menu[];
};

interface Props {
  window?: () => Window;
  opacity: number;
  children?: React.ReactElement;
};

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export const Logo = React.memo(() => {
  const router = useRouter();
  // const { downSm } = React.useContext(BreakpointsContext);
  const accessibility = React.useContext(AccessibilityContext);
  return (
    <Box
      display="flex"
      alignItems="center"
      onClick={() => router.push('/')}
      sx={{
        cursor: 'pointer',
        filter: `grayscale(${accessibility.css.grayscale ? '100%' : '0'})`,
      }}
    >
      <img src={`/images/logo/logo-surabaya.png`} height={40} />
      {/*{!downSm &&
        <Typography
          marginLeft={1.5}
          fontWeight={600}
          fontSize={(fontSize - 3) + accessibility.fontSize}
          textTransform="uppercase"
          sx={{
            color: 'text.primary',
            whiteSpace: 'nowrap',
          }}
        >
          {`Pemerintah Kota Surabaya`}
        </Typography>
      }*/}
    </Box>
  );
});

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  // backgroundColor: theme.palette.grey.A100,
  // background: theme.palette.mode == 'dark' ? theme.palette.background.paper : `linear-gradient(0deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey.A100} 65%)`,

  backgroundColor: 'rgba(255,255,255,0)',

  minHeight: heightHeader,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    minHeight: 70,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '& a': {
    margin: theme.spacing(0, 1.5),
    textDecoration: 'none',
    // color: theme.palette.text.primary,
    color: 'white',
    fontWeight: 600,
    textTransform: 'uppercase',
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    
    '&.active': {
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down(theme.breakpoints.values.sm + 424)]: { // 1024
      margin: theme.spacing(0, 1),
      padding: theme.spacing(0.5, 1),
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 0.5),
      padding: theme.spacing(0.5),
    },
  },
  '&.negative': {
    '& a.active': {
      color: theme.palette.common.white,
    },
  },
}));

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const router = useRouter();
  const { opacity } = props;
  const { downMd } = React.useContext(BreakpointsContext);
  const { loading, menu } = React.useContext(MenuContext);
  const accessibility = React.useContext(AccessibilityContext);
  const { textToSpeech } = useTextToSpeech();
  console.log('loading', loading);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [menuSelected, setMenuSelected] = React.useState([]);
  const handleClickMenu = React.useCallback((e: any, i: number) => {
    e.preventDefault();
    setOpen(true);
    setSelected(i);
    setMenuSelected(menu[i]['child']);
  }, [menu, selected]);
  const handleClose = React.useCallback(() => {
    setOpen(false);
    setSelected(null);
  }, []);
  return (
    <>
      <HideOnScroll {...props}>
        <AppBarStyled
          elevation={0}

          sx={{
            filter: `grayscale(${accessibility.css.grayscale ? '100%' : '0'})`,
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            marginTop='40px'
            width='80%'
            
            paddingLeft={downMd ? 2 : 4}
            paddingRight={4}
            sx={
            router.pathname === "/" ? {
              opacity,
              background: 'rgba(18, 18, 18, 0.25)',
              borderRadius: '50px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(158, 158, 158, 0.75)'
            } : {
              opacity,
              background: hijauRamadhan,
              borderRadius: '50px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.75)'
            }
          }
          >
            {!downMd ? (
              <>
                {loading ? (
                  <Grid container spacing={3} width="50%">
                    {[...new Array(3)].map((_v, i) => (
                      <Grid key={i} item sm={4}>
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={26}
                          sx={{
                            borderRadius: 2,
                            marginLeft: 1,
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <StyledToolbar
                    className={accessibility.css.negative ? 'negative' : ''}
                    sx={{
                      '& a': {
                        fontSize: (fontSize - 2) + accessibility.fontSize,
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                      },
                    }}
                  >
                    <Box>
                      <Logo />
                    </Box>
                    {menu.map((v: any, i: number) => (
                      <Link key={i} href={v.url}>
                        <a onClick={(e) => handleClickMenu(e, i)} className={selected == i ? 'active' : ''}>
                          <span onMouseEnter={(e) => textToSpeech(e, true)}>{v.title}</span>
                          <ExpandMoreIcon fontSize="medium"/>
                        </a>
                      </Link>
                    ))}
                    <ButtonMode />
                  </StyledToolbar>
                )}
              </>
            ) : (
              <>
                <StyledToolbar 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width:'100%',
                  }}>
                  <Box>
                    <Logo/>
                  </Box>
                  <ButtonMode />
                </StyledToolbar>
              </>
            )}
          </Box>
        </AppBarStyled>
      </HideOnScroll>
      {menu.length > 0 &&
        <HeaderDialog
          menu={menuSelected}
          open={open}
          onClose={handleClose}
        />
      }
      {downMd &&
        <BottomNav
          selected={selected}
          onClick={handleClickMenu}
          onClose={handleClose}
        />
      }
    </>
  );
};

Header.defaultProps = {};

export default memo(Header);
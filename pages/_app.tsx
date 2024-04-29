import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import {
  Box,
  PaletteMode,
} from '@mui/material';
// import { useRouter } from 'next/router';
import _ from 'lodash';
import { setCookies, getCookie } from 'cookies-next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { StatusCodes } from 'http-status-codes';
import getDesign from 'styles/theme';
import createEmotionCache from 'styles/createEmotionCache';
import Header from 'components/header';
import Footer from 'components/footer';
import Accessibility from 'components/accessibility';
// import Loading from 'components/loading';
// import { heightHeader } from 'styles/theme';
import { BreakpointsContext } from 'contexts/breakpoints';
import { MenuContext } from 'contexts/menu';
import { ColorModeContext } from 'contexts/colorMode';
import { AccessibilityContext } from 'contexts/accessibility';
import useAccessibility from 'hooks/useAccessibility';
import useMediaQuery from '@mui/material/useMediaQuery';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
};

const customCssNegative = 'body > * {color: #fdd300 !important}';
const customCssUnderline = 'body a {text-decoration: underline !important}';

export default function MyApp(props: MyAppProps) {
  // const router = useRouter();
  const [ mode, setMode ] = React.useState<PaletteMode>('light');
  // const [ pageLoading, setPageLoading ] = React.useState(false);
  const accessibility = useAccessibility();
  const [ loadingMenu, setLoadingMenu ] = React.useState(true);
  const [ load, setLoad ] = React.useState(true);
  const [ menu, setMenu ] = React.useState([]);

  const theme = createTheme(getDesign(mode, accessibility.css.negative));
  const down400 = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm - 200));
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));
  const downXl = useMediaQuery(theme.breakpoints.down('xl'));
  const setColorMode = React.useCallback((value?: PaletteMode) => {
    const change: PaletteMode = mode == 'light' ? 'dark' : 'light';
    setMode(value ? value : change);
    setCookies('theme', value ? value : change);
    if (change == 'light' && accessibility.css.negative) accessibility.setCss({ ...accessibility.css, negative: false });
  }, [mode, accessibility.css]);
  const getDataMenu = async () => {
    const fetchData = await fetch(`/api/data/menu`, { method: 'GET' });
    const results = await fetchData.json();
    if (fetchData.status == StatusCodes.OK) {
      if (results.data && results.data.length > 0) {
        const menuData: any = results.data.map((v: any) => {
          v.icon = _.snakeCase(v.title) + '.svg';
          v.child.map((x: any) => {
            x.icon = _.snakeCase(x.title) + '.svg';
            x.child && x.child.length > 0 && x.child.map((y: any) => {
              y.icon = _.snakeCase(y.title) + '.svg';
              return y;
            });  
            return x;
          });
          return v;
        });
        setMenu(menuData);
      };
    };
    setLoadingMenu(false);
  };
  React.useEffect(() => {
    getDataMenu();
  }, []);
  React.useEffect(() => {
    const timer1 = setTimeout(() => setLoad(false), 2000);
    const themeCookie: any = getCookie('theme');
    setMode(themeCookie ? themeCookie : 'light');
    return () => {
      clearTimeout(timer1);
      setLoad(false);
    };
  }, []);
  // React.useEffect(() => {
  //   if (!load) {
  //     const handleStart = () => { setPageLoading(true); };
  //     const handleComplete = () => { setPageLoading(false); };
  //     router.events.on('routeChangeStart', handleStart);
  //     router.events.on('routeChangeComplete', handleComplete);
  //     router.events.on('routeChangeError', handleComplete);
  //   };
  // }, [router, load]);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Pemerintah Kota Surabaya</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        {accessibility.css.negative &&
          <style>{customCssNegative}</style>
        }
        {accessibility.css.underline &&
          <style>{customCssUnderline}</style>
        }
      </Head>
      <AccessibilityContext.Provider
        value={{
          fontSize: accessibility.fontSize,
          setFontSize: accessibility.setFontSize,
          css: accessibility.css,
          setCss: accessibility.setCss,
          speech: accessibility.speech,
          setSpeech: accessibility.setSpeech,
        }}
      >
        <MenuContext.Provider
          value={{
            loading: loadingMenu,
            menu: menu,
          }}
        >
          <ColorModeContext.Provider
            value={{
              mode,
              setColorMode,      
            }}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <BreakpointsContext.Provider
                value={{
                  down400,
                  downSm,
                  downMd,
                  downLg,
                  downXl,
                }}
              >
                {/* <Loading load={load} /> */}
                {!load && <Header opacity={load ? 0 : 1} />}
                <Accessibility />
                <Box
                  display={load ? 'none' : 'flex'}
                  flexDirection="column"
                  minHeight={load ? 0 : '100vh'}
                  // paddingTop={`${downSm ? 70 : heightHeader}px`}
                  overflow={load ? 'hidden' : 'visible'}
                  height={load ? 0 : 'auto'}
                  sx={{
                    backgroundColor: mode == 'dark' ? theme.palette.background.paper : theme.palette.common.white,
                    opacity: load ? 0 : 1,
                    filter: `grayscale(${accessibility.css.grayscale ? '100%' : '0'})`,
                  }}
                  >
                  <Component {...pageProps} />
                </Box>
                {!load && <Footer load={load} />}
              </BreakpointsContext.Provider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </MenuContext.Provider>
      </AccessibilityContext.Provider>
    </CacheProvider>
  );
};
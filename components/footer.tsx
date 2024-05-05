import React, { memo } from 'react';
import {
  Box,
  Grid,
  Container,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { fontSize, hijauRamadhan } from 'styles/theme';
import { Logo } from 'components/header';
import Search from 'components/search';
import dataContact from 'data/footer/contact.json';
import dataSocialMedia from 'data/footer/social_media.json';
import Email from 'public/images/icon/footer/email.svg';
import Contact from 'public/images/icon/footer/contact.svg';
import Location from 'public/images/icon/footer/location.svg';
import Facebook from 'public/images/icon/social_media/facebook.svg';
import Twitter from 'public/images/icon/social_media/xtwitter.svg';
import Instagram from 'public/images/icon/social_media/instagram.svg';
import Youtube from 'public/images/icon/social_media/youtube.svg';
import Tiktok from 'public/images/icon/social_media/tiktok.svg';
import LogoCc from 'public/images/logo_cc.svg';
import { BreakpointsContext } from 'contexts/breakpoints';
import { AccessibilityContext } from 'contexts/accessibility';
import useTextToSpeech from 'hooks/useTextToSpeech';

interface Props {
  load: boolean;
};

const heightCopy = fontSize + 16;
const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(7, 0),
  overflow: 'hidden',
  '& .contact': {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    '& .MuiGrid-container': {
      '& .MuiGrid-item': {
        '& svg': {
          '& path': {
            fill: theme.palette.primary.main,
          },
        },
        '&:nth-of-type(2)': {
          '& svg': {
            '& path': {
              '&:nth-of-type(2)': {
                stroke: theme.palette.primary.main,
              },
            },
          },
        },
      },
    },
  },
  '& .social-media': {
    '& a': {
      display: 'block',
      margin: theme.spacing(0, 2.5),
      '&:first-of-type': {
        marginLeft: 0,
      },
      '& svg': {
        '& path': {
          fill: theme.palette.primary.main,
        },
      },
    },
  },
  '& .copy': {
    '& .wrapper-svg': {
      height: heightCopy,
      overflow: 'hidden',
      marginRight: theme.spacing(1),
      '& svg': {
        '& path': {
          fill: theme.palette.text.primary,
        },
      },
    },
  },
  '&.negative': {
    '& .contact': {
      borderBottom: `2px solid ${theme.palette.common.white}`,
      '& .MuiGrid-container': {
        '& .MuiGrid-item': {
          '& svg': {
            '& path': {
              fill: theme.palette.common.white,
            },
          },
          '&:nth-of-type(2)': {
            '& svg': {
              '& path': {
                '&:nth-of-type(2)': {
                  stroke: theme.palette.common.white,
                },
              },
            },
          },
        },
      },
    },
    '& .social-media': {
      '& a': {
        '& svg': {
          '& path': {
            fill: theme.palette.common.white,
          },
        },
      },
    },
  },
}));

const Footer: React.FunctionComponent<Props> = ({ load }: Props) => {
  const { downSm } = React.useContext(BreakpointsContext);
  const { downMd } = React.useContext(BreakpointsContext);
  const accessibility = React.useContext(AccessibilityContext);
  const { textToSpeech } = useTextToSpeech();
  return (
    <StyledContainer
      maxWidth={false}
      className={accessibility.css.negative ? 'negative' : ''}
      sx={{
        display: load ? 'none' : 'block',
        filter: `grayscale(${accessibility.css.grayscale ? '100%' : '0'})`,
      }}
    >
      <Container
        maxWidth="lg"
      >
        <Grid container spacing={downMd?12:2}>
          <Grid item xs={12} md={4}>
            <Grid container spacing={3} 
              direction={downMd? "column" : "row"}
              justifyContent={downMd? "center" : "flex-start"}
              alignItems="center"
            >
              <Grid item xs={4} md={12}>
                <Logo />
              </Grid>
              <Grid item xs={4} md={12}>
                <Typography variant='subtitle2' align={downMd? 'center' : 'left'}>Dikelola oleh Bidang Informasi dan Komunikasi Publik serta Statistik Dinas Komunikasi dan Informatika Kota Surabaya</Typography>
              </Grid>
              <Grid item xs={4} md={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {dataSocialMedia.map((v, i) => (
                    <Link key={i} href={v.link}>
                      <a target="_blank">
                        <Box className="wrapper-svg"
                          sx={{
                            '& svg': {
                              height: fontSize + 16,
                              '& path': {
                                fill: hijauRamadhan,
                              },
                            },
                            margin: downMd? `0 1rem` : `0 1rem 0 0`
                          }}
                        >
                          {
                            v.title == 'Facebook'
                              ? <Facebook />
                              : v.title == 'Twitter'
                                ? <Twitter />
                                : v.title == 'Instagram'
                                  ? <Instagram />
                                  : v.title == 'Youtube'
                                  ? <Youtube/>
                                  : <Tiktok/>
                          }
                        </Box>
                      </a>
                    </Link>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              {dataContact.map((v) => (
                <>
                  <Grid item xs={12} md={3}>
                    <Box className="wrapper-svg"
                      sx={{
                        height: `100%`,
                        '& svg': {
                          height: fontSize + 30,
                          '& path': {
                            fill: hijauRamadhan,
                          },
                        },
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `center`,
                      }}
                    >
                      {v.img == 'user.svg' ? <Email /> : v.img == 'contact.svg' ? <Contact /> : <Location />}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography
                      onMouseEnter={(e) => textToSpeech(e, true)}
                      fontSize={(fontSize - 2) + accessibility.fontSize}
                      textAlign={downMd?"center":"start"}
                      marginTop={1}
                      marginBottom={downSm ? 2 : 1}
                      sx={{
                        whiteSpace: 'pre-line',
                        lineHeight: 1.3,
                      }}
                    >
                      {v.description}
                    </Typography>
                  </Grid>
                </>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor:`primary.main`,
                    borderRadius:`100px`,
                  }}>
                  <Search isFooter={true} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent : downMd?`center` : `flex-start`,
                    marginBottom: downMd? `3rem` : `0`
                  }}
                >
                  <Box className="wrapper-svg"
                    sx={{
                      '& svg': {
                        height: heightCopy,
                      },
                      marginRight: `0.5rem`,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <LogoCc />
                  </Box>
                  <Typography
                    fontSize={fontSize + 2}
                  >
                    {`${new Date().getFullYear()} Pemerintah Kota Surabaya`}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* <Box display="flex" justifyContent="center">
          <Logo />
        </Box>

        <Box className="contact">
          <Grid container spacing={2} paddingY={5} paddingX={3}>
            {dataContact.map((v, i) => (
              <Grid
                key={i}
                item
                xs={12}
                sm={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Box className="wrapper-svg"
                  sx={{
                    '& svg': {
                      height: fontSize + 30,
                    }
                  }}
                >
                  {v.img == 'user.svg' ? <User /> : v.img == 'contact.svg' ? <Contact /> : <Location />}
                </Box>
                <Typography
                  onMouseEnter={(e) => textToSpeech(e, true)}
                  fontSize={(fontSize - 2) + accessibility.fontSize}
                  textAlign="center"
                  marginTop={1}
                  marginBottom={downSm ? 2 : 1}
                  sx={{
                    whiteSpace: 'pre-line',
                    lineHeight: 1.3,
                  }}
                >
                  {v.description}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Grid container spacing={3} marginTop={4} alignItems="center">
          <Grid
            item
            className="social-media"
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: downSm ? 'center' : 'flex-start',
            }}
          >
            {dataSocialMedia.map((v, i) => (
              <Link key={i} href={v.link}>
                <a target="_blank">
                  <Box className="wrapper-svg"
                    sx={{
                      '& svg': {
                        height: fontSize + 16,
                      }
                    }}
                  >
                    {
                      v.title == 'Facebook'
                      ? <Facebook />
                      : v.title == 'Twitter'
                      ? <Twitter />
                      : v.title == 'Instagram'
                      ? <Instagram />
                      : <Youtube />
                    }
                  </Box>
                </a>
              </Link>
            ))}
          </Grid>
          <Grid
            item
            sm={6}
            sx={{
              display: downSm ? 'none' : 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Search isFooter={true} />
          </Grid>
        </Grid>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="copy"
          marginTop={4}
          marginBottom={downSm ? 5 : 0}
        >
          <Box className="wrapper-svg"
            sx={{
              '& svg': {
                height: heightCopy,
              }
            }}
          >
            <LogoCc />
          </Box>
          <Typography
            fontSize={fontSize + 2}
          >
            {`${new Date().getFullYear()} Pemerintah Kota Surabaya`}
          </Typography>
        </Box>
         */}
      </Container>
    </StyledContainer>
  );
};

Footer.defaultProps = {};

export default memo(Footer);
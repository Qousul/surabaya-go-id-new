import React, { memo } from 'react';
import {
  Box,
} from '@mui/material';
import Slider from 'react-slick';
import { fontSize, hijauRamadhan } from 'styles/theme';
import { StyledBox } from 'styles/carousel';
import { BreakpointsContext } from 'contexts/breakpoints';
import { NewsType } from 'components/home.section3';
import NewsItem from 'components/news.item';
import NewsItem2 from './news.itemLP';
import { Arrow } from 'components/carousel.small';
// import Element3 from 'public/images/icon/element_3.svg';

interface Props {
  data: NewsType[];
  slidesToShow?: number;
  gridSpacing?: number;
  truncateTitle?: number;
  fontSizeProps?: number;
  withDescription?: boolean;
  gridImage?: number;
  gridContent?: number;
  truncateDescription?: number;
  withThumbnail?: boolean;
  route: string;
  isSmall?: boolean;
  padding?:number;
};

const defGridSpacing = 1;
const defTruncateTitle = 30;
const defFontSizeProps = (fontSize - 1);
export const defFontSizeDate = (fontSize - 4);

const CarouselContent: React.FunctionComponent<Props> = ({
  data,
  slidesToShow,
  gridSpacing,
  truncateTitle,
  truncateDescription,
  fontSizeProps,
  withDescription,
  gridImage,
  gridContent,
  withThumbnail,
  route,
  isSmall,
  padding,
}: Props) => {
  const slider = React.useRef<Slider>(null);
  const sliderThumb = React.useRef<Slider>(null);
  const { downLg } = React.useContext(BreakpointsContext);
  const settings = {
    adaptiveHeight:true,
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: false,
    beforeChange: (_current: number, next: number) => {
      if (withThumbnail) {
        sliderThumb.current.slickGoTo(next);
      };
    },
  };
  const settingsThumb = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: data.length < 4 ? data.length : 4,
    slidesToScroll: 1,
    autoplay: false,
    draggable: false,
  };
  const handleNextPrev = React.useCallback((isNext: boolean) => {
    if (isNext) {
      slider.current.slickNext();
    } else {
      slider.current.slickPrev();
    };
  }, []);
  return (
    <>
      <StyledBox className="">
       
        <Slider ref={slider} {...settings}>
          {data.map((v, i) => (
            <NewsItem2
              key={i}
              data={v}
              gridSpacing={gridSpacing}
              truncateTitle={truncateTitle}
              fontSizeTitle={fontSizeProps}
              fontSizeDate={defFontSizeDate}
              withDescription={withDescription}
              gridImage={gridImage}
              gridContent={gridContent}
              truncateDescription={truncateDescription}
              route={route}
              height={40}
            />
          ))}
        </Slider>
      </StyledBox>
      {withThumbnail &&
        <StyledBox className="content thumb">
           <Arrow
          size={(fontSize + (downLg ? 18 : 25)).toString()}
          className="slick-arrow prev"
          onClick={() => handleNextPrev(false)}
        />
          <Slider ref={sliderThumb} {...settingsThumb}>
            {data.map((v, i) => (
              <NewsItem
                key={i}
                data={v}
                gridSpacing={defGridSpacing}
                truncateTitle={defTruncateTitle}
                fontSizeTitle={defFontSizeProps}
                fontSizeDate={defFontSizeDate-2}
                withDescription={false}
                route={route}
                isSmallCard={isSmall}
              />
            
            ))}
          </Slider>
          <Arrow
          size={(fontSize + (downLg ? 18 : 25)).toString()}
          className="slick-arrow next"
          onClick={() => handleNextPrev(true)}
        />
        </StyledBox>
      }
    </>
  );
};

CarouselContent.defaultProps = {
  slidesToShow: 3,
  gridSpacing: defGridSpacing,
  truncateTitle: defTruncateTitle,
  fontSizeProps: defFontSizeProps,
  withDescription: true,
  gridImage: 12,
  gridContent: 12,
  truncateDescription: 90,
  withThumbnail: false,
  isSmall: false,
  padding:0,
};

export default memo(CarouselContent);

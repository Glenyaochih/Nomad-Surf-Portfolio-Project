import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import DarkButtonLinearG from '../button/DarkButtonLinearG';
// swiper css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-fade';

//輪播方式
const carouselData = [
  {
    image: 'img/homePage/banner-01.webp',
    content: [{ ch: '遊牧馳騁在浪端' }, { en: 'EXPOLRE THE TOP' }],
  },
  {
    image: 'img/homePage/banner-02.webp',
    content: [{ ch: '舊貨放送日' }, { en: 'EARTH DAY| 80% DISCOUNT!' }],
  },
  {
    bg_slogan: true,
    image: 'img/homePage/banner-03.webp',
    content: [
      { ch: '6/8一起保衛海洋' },
      { ch: '這天不衝浪，捲手淨灘去' },
      { en: 'World Ocean Day' },
    ],
  },
];

export default function HomePageBannerCarousel() {
  return (
    <div>
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{ 576: { navigation: true, slidesPerView: 1 } }}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={2000}
        effect='fade'
      >
        {carouselData.map((carousel, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className='banner-carousel'
                style={{
                  backgroundImage: `url(${carousel.image})`,
                }}
              >
                <div
                  className='position-relative w-100 h-100'
                  style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                >
                  {carousel.bg_slogan && (
                    <div className='container-fluid'>
                      <div className='position-absolute d-sm-flex justify-content-center text-white text-opacity-25 pt-13 pt-sm-18 w-100'>
                        <h1 className=' big-slogan'>Nomadic Surf,</h1>
                        <h1 className=' big-slogan'>No More Dirt </h1>
                      </div>
                    </div>
                  )}
                  <div className='container'>
                    <div className='d-flex flex-sm-column justify-content-center'>
                      <div className='text-white d-flex flex-column   justify-content-center align-items-center  gap-3 gap-sm-7 top-space'>
                        {carousel.content.map((text, index) => {
                          return text.ch ? (
                            <h1
                              key={index}
                              className='fs-4 fs-sm-1 text-center'
                              lang='zh-TW'
                            >
                              {text.ch}
                            </h1>
                          ) : (
                            <h1
                              key={index}
                              className='fs-4 fs-sm-1 text-center'
                              lang='en'
                            >
                              {text.en}
                            </h1>
                          );
                        })}
                        <DarkButtonLinearG
                          btnName={'了解更多'}
                          btnType={'btn-dark'}
                          btnBorderColor={'border-white'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

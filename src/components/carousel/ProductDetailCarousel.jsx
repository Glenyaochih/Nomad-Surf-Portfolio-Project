import { useState } from 'react';
import { Pagination, Navigation } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';

export default function ProductDetailCarousel() {
  const [carouselData] = useState([
    {
      image: '/public/products/short-board-01-Isometric-projection.png',
    },
    {
      image: '/public/products/short-board-01-bottom-view.png',
    },
    {
      image: 'public/products/short-board-01-front-view.png',
    },
  ]);

  return (
    <div className='pt-7 pb-11 '>
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {carouselData.map((slide, index) => (
          <SwiperSlide className='rounded-5' key={index}>
            <div>
              <img
                className='rounded-5 w-100'
                src={slide.image}
                alt='Card-1-img'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

import { useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import ProductListCard from '../card/ProductListCard';

export default function RecommendCarousel({ titleZhTW, title, background }) {
  const [tempData] = useState([
    {
      title: 'Islandsurfboards',
      grade: '初階板',
      price: 29999,
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/glenyao-e1435.appspot.com/o/surfboard%2FSE_InfFT_C_D_BL%E5%89%AF%E6%9C%AC.png?alt=media&token=518ec9f5-5486-4905-a01e-1262420c5d1b',
    },
    {
      title: 'Islandsurfboards',
      grade: '初階板',
      price: 29999,
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/glenyao-e1435.appspot.com/o/surfboard%2FTJ_Twinzer_H_D.webp?alt=media&token=c22def54-971b-450a-85b7-c0af84cc427e',
    },
    {
      title: 'Islandsurfboards',
      grade: '初階板',
      price: 29999,
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/glenyao-e1435.appspot.com/o/surfboard%2FRM_MachadoCado_H_D.webp?alt=media&token=e74afa3c-3020-4028-95db-4f64ae327151',
    },
  ]);

  return (
    <>
      <div className={`bg-${background}`}>
        <div className='container'>
          <div className='py-7 py-sm-14 latest-board'>
            <h6 className='text-center fs-sm-4 mb-5' lang='zh-TW'>
              {titleZhTW} <span>{title}</span>
            </h6>
            <Swiper
              slidesPerView={1}
              breakpoints={{
                576: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
            >
              {tempData.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductListCard item={item} cardBackground={background} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import ProductListCard from '../card/ProductListCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsAsync,
  setRecommend,
} from '../../redux/slice/front/products/frontProductsSlice';
import { selectRecommendedProducts } from '../../redux/slice/front/products/frontProductsSelectors';

export default function RecommendCarousel({
  titleZhTW,
  title,
  background,
  recommendType,
}) {
  const dispatch = useDispatch();
  const products = useSelector(selectRecommendedProducts);

  useEffect(() => {
    dispatch(setRecommend({ recommendType }));
    dispatch(getProductsAsync());
  }, [dispatch, recommendType]);

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
              {products?.map((item, index) => (
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

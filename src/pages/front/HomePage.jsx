import HomePageBannerCarousel from '../../components/carousel/HomePageBannerCarousel';
import DarkButtonLinearG from '../../components/button/DarkButtonLinearG';
import RecommendCarousel from '../../components/carousel/RecommendCarousel';
import PickYourTimeAndGo from '../../components/layout/PickYourTimeAndGo';
import LevelEntranceCard01 from '../../components/card/LevelEntranceCard01';
import LevelEntranceCard02 from '../../components/card/LevelEntranceCard02';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProductsAsync } from '../../redux/slice/front/products/frontProductsSlice';
import { getCartAsync } from '../../redux/slice/front/cart/cartSlice';

const partners = [
  'img/homePage/partners-01.webp',
  'img/homePage/partners-02.webp',
  'img/homePage/partners-03.webp',
  'img/homePage/partners-04.webp',
  'img/homePage/partners-05.webp',
  'img/homePage/partners-06.webp',
  'img/homePage/partners-07.webp',
  'img/homePage/partners-08.webp',
];
export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
    dispatch(getCartAsync());
  }, [dispatch]);
  return (
    <>
      <section>
        <HomePageBannerCarousel />
      </section>
      <section>
        <RecommendCarousel
          titleZhTW={'衝浪板'}
          title={'Latest'}
          recommendType={'latest'}
        />
      </section>
      <section>
        <LevelEntranceCard01
          data={{
            level01: '初階板',
            level02: 'BEGGINER',
            title01: '浮力大、易站立，新手友善，讓你輕鬆享',
            title02: '受衝浪樂趣，快速建立信心！',
            backgroundImg: 'img/homePage/grade-01.webp',
            grade: 'C',
          }}
        />
        <LevelEntranceCard02
          data={{
            level01: '中階板',
            level02: 'INTERMEDIATE',
            title01: '兼具穩定與靈活，適合進階玩家挑戰更多',
            title02: '動作，提升衝浪技巧！',
            backgroundImg: 'img/homePage/grade-02.webp',
            grade: 'B',
          }}
        />
        <LevelEntranceCard01
          data={{
            level01: '高階板',
            level02: 'ADVANCE',
            title01: '速度快、操控強，適合經驗豐富的衝浪',
            title02: '者，挑戰更刺激的浪點與極限動作！',
            backgroundImg: 'img/homePage/grade-03.webp',
            grade: 'A',
          }}
        />
      </section>
      <section>
        <div className='bg-black'>
          <div className='container'>
            <div className='py-15 py-sm-14'>
              <div className='d-flex justify-content-center flex-column align-items-center'>
                <h4 className='text-white mb-7 mb-sm-11 fs-lg-2' lang='zh-TW'>
                  更多選擇 符合你的預期
                </h4>
                <DarkButtonLinearG
                  btnName={'所有商品'}
                  btnType={'btn-dark'}
                  destination={'/products'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <PickYourTimeAndGo />
      </section>
      <section>
        <div className='container partners py-14'>
          <h4 lang='zh-TW' className='text-center mb-11'>
            合作夥伴 <span lang='en'>Partners</span>
          </h4>
          <div className='row row-cols-3 row-cols-sm-8 gy-3'>
            {partners.map((partner, index) => {
              return (
                <div className='col' key={partner}>
                  <img src={partner} alt={`partner${index}`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

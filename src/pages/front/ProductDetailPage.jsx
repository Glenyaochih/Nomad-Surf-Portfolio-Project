import { Link, useParams } from 'react-router-dom';
import DarkButtonLinearG from '../../components/button/DarkButtonLinearG';
import RecommendCarousel from '../../components/carousel/RecommendCarousel';
import PickYourTimeAndGo from '../../components/layout/PickYourTimeAndGo';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSingleProductAsync } from '../../redux/slice/front/products/frontProductsSlice';
import {
  selectFrontProduct,
  selectProductLoading,
} from '../../redux/slice/front/products/frontProductsSelectors';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import {
  getCartAsync,
  postCartAsync,
} from '../../redux/slice/front/cart/cartSlice';
import ScreenLoading from '../../components/loadings/ScreenLoading';
import { selectCartLoading } from '../../redux/slice/front/cart/cartSelectors';
import ButtonLoading from '../../components/loadings/ButtonLoading';

// 商品詳情頁面組件
export default function ProductDetailPage() {
  const dispatch = useDispatch();

  const product = useSelector(selectFrontProduct);
  const productLoading = useSelector(selectProductLoading);
  const cartLoading = useSelector(selectCartLoading);
  const { id: product_id } = useParams();
  const [buyItNow, setBuyItNow] = useState(false);
  const [cartOption, setCartOption] = useState({
    product_id: '',
    qty: 1,
    size: '',
    color: '',
  });

  //處理購物車品項的選項收集
  const handleAddCartOptionChange = (e) => {
    const { name, value } = e.target;
    setCartOption((prevOption) => {
      return {
        ...prevOption,
        [name]: value,
      };
    });
  };
  // 加入購物車
  const handleAddCart = () => {
    dispatch(postCartAsync(cartOption));
  };

  // 獲取單一產品資料
  useEffect(() => {
    dispatch(getSingleProductAsync(product_id));
    dispatch(getCartAsync());
  }, [product_id, dispatch]);

  //寫入productId

  useEffect(() => {
    if (product.id) {
      setCartOption((prevOption) => ({
        ...prevOption,
        product_id: product.id,
      }));
    }
  }, [product.id]);

  // 組件渲染
  return (
    <>
      {/* 產品規格與內容主容器 */}
      <div className='product-spec d-flex flex-column h-100'>
        <div className='container flex-grow-1'>
          {/* 主要內容區塊 */}
          <section className='flex-grow-1'>
            <div className='row row-cols-1 row-cols-sm-2 h-100'>
              {/* 左側圖片顯示區塊 */}
              <div className='col h-100'>
                {/*===== 圖片區塊 =====*/}
                <div className='d-flex flex-column h-100'>
                  {/* 麵包屑導航 */}
                  <section>
                    <div className='py-4'>
                      <nav aria-label='breadcrumb'>
                        <ol className='breadcrumb'>
                          <li className='breadcrumb-item'>
                            <Link className='fs-8' to={'/'} lang='zh-TW'>
                              首頁
                            </Link>
                          </li>
                          <li className='breadcrumb-item ' aria-current='page'>
                            <Link className='fs-8' to={'/products'}>
                              所有商品
                            </Link>
                          </li>
                          <li
                            className='breadcrumb-item  fs-8'
                            aria-current='page'
                          >
                            衝浪板
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </section>
                  {/* 商品圖片輪播區塊 */}
                  <section>
                    <div className='mh-100  overflow-y-auto  flex-grow-1'>
                      {/* Swiper 輪播組件 */}
                      <Swiper
                        className='overflow-y-box'
                        modules={[Pagination]}
                        pagination={{
                          clickable: true,
                        }}
                        direction='vertical' // 設定為垂直方向
                        releaseOnEdges={true}
                      >
                        {/* 遍歷產品圖片並渲染 SwiperSlide */}
                        {product?.imagesUrl?.map((img, index) => {
                          return (
                            <SwiperSlide
                              key={index}
                              className='d-flex align-items-center' // 圖片置中
                            >
                              <img
                                src={img}
                                alt='surfboard-image'
                                className='object-fit-cover w-100' // 圖片適應容器
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </section>
                </div>
              </div>
              {/* 右側商品選項與說明區塊 */}
              <div className='col d-flex flex-column h-100'>
                {/*===== 選項區塊 =====*/}

                {/* 商品詳細資訊與選項滾動區塊 */}
                <div
                  className='py-7 py-sm-11 px-sm-7 overflow-y-scroll  overflow-y-box flex-grow-1'
                  style={{ maxHeight: '880px' }}
                >
                  {/* 產品標題與等級資訊 */}
                  <section>
                    <div>
                      <h5 className='mb-3'>{product.title}</h5>
                      <h6 className='mb-7' lang='zh-TW'>
                        {/* 根據產品等級顯示不同顏色徽章 */}
                        <span
                          style={{
                            backgroundColor:
                              product.grade === 'A'
                                ? '#B0E2FF'
                                : product.grade === 'B'
                                  ? '#F8D598'
                                  : '#C5DCBB',
                          }}
                          className='fs-7 badge fw-normal'
                        >
                          {product.grade === 'A'
                            ? '高階板'
                            : product.grade === 'B'
                              ? '中階板'
                              : '低階板'}
                        </span>
                      </h6>
                      {/* 產品內容描述 */}
                      <p className='mb-7' lang='zh-TW'>
                        {product.content}
                      </p>
                    </div>
                  </section>
                  {/* 商品選項區塊 (Fin系統, 顏色, 尺寸) */}
                  <hr />
                  <section>
                    <div>
                      {/* Fin系統選項 */}
                      <div className='mb-7'>
                        <p className='text-neutral-60 mb-3'>FIn系統</p>
                        <div>
                          {/* Futures 選項 */}
                          <input
                            type='radio'
                            className='btn-check'
                            name='options-base'
                            id='option5'
                            autoComplete='off'
                          />
                          <label
                            className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal me-3'
                            htmlFor='option5'
                          >
                            Futures
                          </label>
                          {/* FCS II 選項 */}
                          <input
                            type='radio'
                            className='btn-check '
                            name='options-base'
                            id='option6'
                            autoComplete='off'
                          />
                          <label
                            className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal text-neutral-60'
                            htmlFor='option6'
                          >
                            FCS II
                          </label>
                        </div>
                      </div>

                      {/* 顏色選項 */}
                      <div className='mb-7'>
                        <p className='text-neutral-60 mb-3'>顏色</p>
                        <div className='container'>
                          <div className='row row-cols-10'>
                            {/* 遍歷顏色並渲染選項 */}
                            {product?.colors?.map((color, index) => {
                              return (
                                <div className='col' key={index}>
                                  <div>
                                    <input
                                      type='radio'
                                      className='btn-check color-input rounded-50'
                                      value={color.colorName}
                                      name='color'
                                      id={`color-option-${index}`}
                                      autoComplete='off'
                                      onChange={handleAddCartOptionChange}
                                    />
                                    <label
                                      style={{
                                        background: color.colorCode,
                                      }}
                                      className='btn btn-outline-dark btn-sm px-2 fw-normal rounded-50 color-label'
                                      htmlFor={`color-option-${index}`}
                                    ></label>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      {/* 尺寸選項 */}
                      <div className='mb-7'>
                        <p className='text-neutral-60 mb-3'>尺寸</p>
                        <div className='container'>
                          <div className='row row-cols-6 row-cols-sm-10 gx-2 gy-2'>
                            {/* 遍歷尺寸並渲染選項 */}
                            {product?.sizes?.map((size, index) => {
                              const resize =
                                size?.size?.match(/^\d+'\d+"/) ||
                                size?.size?.match(/^\d+'/);
                              return (
                                <div className='col' key={index}>
                                  <div className='w-100'>
                                    <input
                                      onChange={handleAddCartOptionChange}
                                      type='radio'
                                      className='btn-check '
                                      value={resize}
                                      name='size'
                                      id={`size-option-${index}`}
                                      autoComplete='off'
                                    />
                                    <label
                                      className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal w-100'
                                      htmlFor={`size-option-${index}`}
                                    >
                                      {resize}
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <hr className='mb-7' /> {/* 分隔線 */}
                  {/* 價格與購買按鈕區塊 */}
                  <section>
                    <div className='mb-7'>
                      <p className='mb-3 text-neutral-60 '>
                        原價 $ {product.origin_price?.toLocaleString()}
                      </p>
                      <h5>售價 {product.price?.toLocaleString()}</h5>
                    </div>
                    <div className='d-flex mb-7'>
                      <div className='w-100 position-relative'>
                        {buyItNow ? (
                          <></>
                        ) : (
                          <div className='position-absolute top-50 start-85 translate-middle'>
                            <ButtonLoading
                              loadingSource={cartLoading}
                              size={20}
                              color={'black'}
                            />
                          </div>
                        )}

                        <div className='d-grid me-3'>
                          {/* 加入購物車按鈕 */}
                          <DarkButtonLinearG
                            event={handleAddCart}
                            btnName={'加入購物車'}
                            btnType={'btn-dark'}
                            disabled={cartLoading}
                          />
                        </div>
                      </div>
                      <div className='w-75 position-relative'>
                        {buyItNow ? (
                          <div className='position-absolute top-50 start-85 translate-middle'>
                            <ButtonLoading
                              loadingSource={cartLoading}
                              size={20}
                              color={'black'}
                            />
                          </div>
                        ) : (
                          <></>
                        )}

                        <div className='d-grid'>
                          {/* 直接購買按鈕 */}
                          <Link
                            lang='zh-TW'
                            className='btn btn-outline-dark btn-lg fs-7 fs-sm-6 rounded-pill'
                            onClick={() => {
                              (handleAddCart(), setBuyItNow(true));
                            }}
                            to={'/cart'}
                          >
                            直接購買
                          </Link>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* 尺寸說明表格 */}
                  <section>
                    <div>
                      <p className='text-neutral-60 mb-3'>尺寸說明</p>
                      <div className='overflow-x-scroll overflow-y-box'>
                        <table className='table table-container table-hover'>
                          <thead>
                            <tr className='text-center'>
                              <th scope='col' style={{ width: '80px' }}>
                                長度
                              </th>
                              <th scope='col' style={{ width: '80px' }}>
                                寬度
                              </th>
                              <th scope='col' style={{ width: '80px' }}>
                                厚度
                              </th>
                              <th scope='col' style={{ width: '80px' }}>
                                浮力
                              </th>
                              <th scope='col' style={{ width: '250px' }}>
                                FIN系統
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className='text-center'>
                              <td>'8'</td>
                              <td>21 1/4</td>
                              <td>2 4/3</td>
                              <td>41 ltr</td>
                              <td>
                                7" Single & FCS2 Performer 65kg Quad Rears
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div>
                      <p className='text-neutral-60 mb-3'>運送方式 </p>
                      <p
                        className='mb-3'
                        style={{ lineHeight: '1.5', letterSpacing: '2%' }}
                      >
                        衝浪板有特殊運輸。從施工到運輸的預計時間可能在 6 到 12
                        週之間。如有任何疑問，請聯絡
                        customercare@lightning---bolt.com由於衝浪板是定制的,我們不會退回。在此查看有關運送和退貨的所有資訊。
                      </p>
                      <p>
                        由於衝浪板是定制的,我們不會退回。在此查看有關運送和退貨的所有資訊。
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* 推薦商品輪播區塊 */}
        <section>
          <RecommendCarousel
            titleZhTW={'更多推薦'}
            background={'neutral-10'}
            recommendType={'more_recommend'}
          />
        </section>
        {/* 'Pick Your Time And Go' 組件 */}
        <section>
          <PickYourTimeAndGo />
        </section>
        <ScreenLoading loadingSource={productLoading} size={25} />
      </div>
    </>
  );
}

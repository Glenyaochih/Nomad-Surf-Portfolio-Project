import { Link, useParams } from 'react-router-dom';
import DarkButtonLinearG from '../../components/button/DarkButtonLinearG';
import RecommendCarousel from '../../components/carousel/RecommendCarousel';
import PickYourTimeAndGo from '../../components/layout/PickYourTimeAndGo';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSingleProductAsync } from '../../redux/slice/front/products/frontProductsSlice';
import { selectFrontProduct } from '../../redux/slice/front/products/frontProductsSelectors';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// 商品詳情頁面組件
export default function ProductDetailPage() {
  // 從 URL 參數中獲取產品 ID
  const { id: product_id } = useParams();
  const dispatch = useDispatch();
  // 從 Redux store 中選取當前產品資料
  const product = useSelector(selectFrontProduct);

  // 獲取單一產品資料的副作用
  useEffect(() => {
    dispatch(getSingleProductAsync(product_id));
  }, [product_id, dispatch]);

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
                  <section className='flex-grow-1'>
                    <div className='mh-100  overflow-y-auto'>
                      {/* Swiper 輪播組件 */}
                      <Swiper
                        modules={[Pagination]}
                        pagination={{
                          clickable: true,
                        }}
                        direction='vertical' // 設定為垂直方向
                        style={{
                          maxHeight: '880px', // 設定最大高度以避免無限拉伸
                        }}
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
                  style={{ maxHeight: '100%' }}
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
                                      className='btn-check color-input'
                                      name='color-options-base'
                                      id={`color-option-${index}`}
                                      autoComplete='off'
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
                          <div className='row row-cols-6 row-cols-sm-10 gx-1'>
                            {/* 遍歷尺寸並渲染選項 */}
                            {product?.sizes?.map((size, index) => {
                              const resize =
                                size?.size?.match(/^\d+'\d+"/) ||
                                size?.size?.match(/^\d+'/);
                              return (
                                <div className='col' key={index}>
                                  <div>
                                    <input
                                      type='radio'
                                      className='btn-check '
                                      value={resize}
                                      name='size-options-base'
                                      id={`size-option-${index}`}
                                      autoComplete='off'
                                    />
                                    <label
                                      className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal '
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
                      <p className='mb-3'>原價 $ {product.origin_price}</p>
                      <h5>售價 {product.price}</h5>
                    </div>
                    {/* 購物車與直接購買按鈕 */}
                    <div className='d-flex mb-7'>
                      <div className='w-100'>
                        <div className='d-grid me-3'>
                          {/* 加入購物車按鈕 */}
                          <DarkButtonLinearG
                            btnName={'加入購物車'}
                            btnType={'btn-dark'}
                          />
                        </div>
                      </div>
                      <div className='w-75'>
                        <div className='d-grid'>
                          {/* 直接購買按鈕 */}
                          <button
                            lang='zh-TW'
                            className='btn btn-outline-dark btn-lg fs-7 fs-sm-6 rounded-pill'
                          >
                            直接購買
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* 尺寸說明表格 */}
                  <section>
                    <div>
                      <p className='text-neutral-60 mb-3'>尺寸說明</p>
                      <div className='overflow-x-scroll overflow-y-box'>
                        <table className='table '>
                          <thead>
                            <tr>
                              <th scope='col'>長度</th>
                              <th scope='col'>寬度</th>
                              <th scope='col'>厚度</th>
                              <th scope='col'>浮力</th>
                              <th scope='col'>FIN系統</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                              <td>@mdo</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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
      </div>
    </>
  );
}

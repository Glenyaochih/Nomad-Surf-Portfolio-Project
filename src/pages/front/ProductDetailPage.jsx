import DarkButtonLinearG from '../../components/button/DarkButtonLinearG';
import RecommendCarousel from '../../components/carousel/RecommendCarousel';
import PickYourTimeAndGo from '../../components/layout/PickYourTimeAndGo';

export default function ProductDetailPage() {
  return (
    <>
      <div className='product-spec'>
        <div className='container'>
          <section>
            <div className='row row-cols-1 row-cols-sm-2'>
              <div className='col'>
                {/*===== 圖片區塊 =====*/}
                <section>
                  <div className='py-4'>
                    <nav aria-label='breadcrumb'>
                      <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>
                          <a className='fs-8' href='#' lang='zh-TW'>
                            首頁
                          </a>
                        </li>
                        <li className='breadcrumb-item ' aria-current='page'>
                          <a className='fs-8' href='#'>
                            所有商品
                          </a>
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
                <section>
                  <div>
                    <img
                      src='https://firebasestorage.googleapis.com/v0/b/glenyao-e1435.appspot.com/o/surfboard%2FRM_MachadoCado_H_D.webp?alt=media&token=e74afa3c-3020-4028-95db-4f64ae327151'
                      className=' object-fit-contain '
                      alt='longBoard'
                    />
                  </div>
                </section>
              </div>
              <div className='col'>
                {/*===== 選項區塊 =====*/}

                <div className='py-7 py-sm-11 px-sm-7 overflow-y-scroll  overflow-y-box'>
                  <section>
                    <div>
                      <div>
                        <h5 className='mb-3'>
                          islandsurfboards <br /> GO Surfboard(標題)
                        </h5>
                        <h6 className='mb-7' lang='zh-TW'>
                          <span className='fs-7 badge text-bg-success-20 fw-normal'>
                            初階板
                          </span>
                        </h6>
                        <p className='mb-7' lang='zh-TW'>
                          這是一款經典的單蹼衝浪長板。對於那些尋求中小浪經典衝浪的人來說，這款長板是理想的選擇。尾巴較寬，非常適合下落膝等動作，再加上寬大的鼻子，可以提供更長、更穩定的鼻騎。
                        </p>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div>
                      <div className='mb-7'>
                        <p className='text-neutral-60 mb-3'>FIn系統</p>
                        <div>
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

                      <div className='mb-7'>
                        <p className='text-neutral-60 mb-3'>顏色</p>
                        <div className='container'>
                          <div className='row row-cols-10'>
                            <div className='col'>
                              <div>
                                <input
                                  type='radio'
                                  className='btn-check color-input'
                                  name='color-options-base'
                                  id='color-option'
                                  autoComplete='off'
                                />
                                <label
                                  style={{
                                    background: 'rgba(255, 233, 239, 1)',
                                  }}
                                  className='btn btn-outline-dark btn-sm px-2 fw-normal rounded-50 color-label'
                                  htmlFor='color-option'
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mb-7'>
                        <p className='text-neutral-60 mb-3'>尺寸</p>
                        <div className='container'>
                          <div className='row row-cols-6 row-cols-sm-10 gx-1'>
                            <div className='col'>
                              <div>
                                <input
                                  type='radio'
                                  className='btn-check '
                                  name='size-options-base'
                                  id='size-option'
                                  autoComplete='off'
                                />
                                <label
                                  className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal '
                                  htmlFor='size-option'
                                >
                                  5’0
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <hr className='mb-7' />
                  <section>
                    <div className='mb-7'>
                      <p className='mb-3'>原價 $ 9999</p>
                      <h5>售價 $ 5999</h5>
                    </div>
                    <div className='d-flex mb-7'>
                      <div className='w-100'>
                        <div className='d-grid me-3'>
                          <DarkButtonLinearG
                            btnName={'加入購物車'}
                            btnType={'btn-dark'}
                          />
                        </div>
                      </div>
                      <div className='w-75'>
                        <div className='d-grid'>
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
        <section>
          <RecommendCarousel titleZhTW={'更多推薦'} background={'neutral-10'} />
        </section>
        <section>
          <PickYourTimeAndGo />
        </section>
      </div>
    </>
  );
}

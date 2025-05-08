import { MdOutlineArrowForward } from 'react-icons/md';

const service = [
  { title: '查詢最佳衝浪時機', img: 'img/homePage/wave-condition.webp' },
  {
    title: '查離我最近的沖澡地點',
    img: 'img/homePage/shower-stop.webp',
  },
];

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
  return (
    <>
      <section>
        {/* 拆組件 */}
        <div>
          <div
            className='banner-carousel'
            style={{
              backgroundImage: 'url(img/homePage/banner-01.webp)',
            }}
          >
            <div
              className='position-relative w-100 h-100'
              style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            >
              <div className='container'>
                <div className='d-flex justify-content-center '>
                  <div className='text-white d-flex flex-column   justify-content-center align-items-center  gap-3 gap-sm-7 top-space'>
                    <h1 className='fs-4 fs-md-1 '>遊牧馳騁在浪端 </h1>
                    <h1 className='fs-4 fs-md-1' lang='en'>
                      EXPOLRE THE TOP
                    </h1>
                    <button className='btn btn-dark btn-lg border border-white icon-link icon-link-hover fs-7 fs-sm-6'>
                      了解更多
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='bi ms-3 fs-5'
                        viewBox='0 0 15 15'
                        aria-hidden='true'
                      >
                        <path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <div className='py-7 py-sm-14 latest-board'>
            <h6 className='text-center fs-sm-4 mb-5' lang='zh-TW'>
              衝浪板 <span lang='en'>Latest</span>
            </h6>
            <div className='row row-cols-1 row-cols-sm-4'>
              <div className='col'>
                <div className='card border-0 pt-sm-13 pb-sm-11'>
                  <img
                    src='https://firebasestorage.googleapis.com/v0/b/glenyao-e1435.appspot.com/o/surfboard%2FRM_MachadoCado_H_D.webp?alt=media&token=e74afa3c-3020-4028-95db-4f64ae327151'
                    className='card-img-top object-fit-scale'
                    alt='longBoard'
                  />
                  <div className='card-body pt-3 pb-0'>
                    <div className='mb-3'>
                      <h6 className='mb-3'>
                        <span className='fs-7 badge text-bg-success-20 fw-normal'>
                          初階板
                        </span>
                      </h6>
                      <h5 className='card-title mb-3'>Islandsurfboards</h5>
                      <p className='fs-6'>$29999</p>
                    </div>
                    <button className='btn border-0  p-0 fw-normal text-primary-100 fs-7 icon-link icon-link-hover fs-sm-6'>
                      來去看看
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='bi ms-3 fs-5'
                        viewBox='0 0 15 15'
                        aria-hidden='true'
                      >
                        <path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>
          <div
            className='grade position-relative'
            style={{
              backgroundImage: 'url(img/homePage/grade-01.webp)',
            }}
          >
            <div className=' w-100 h-100 filter-r ' style={{ zIndex: '100' }}>
              <div
                className='position-absolute bottom-0 end-50 h-100 w-100'
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  zIndex: '0',
                }}
              ></div>
              <div className='container px-9'>
                <div className='d-flex  align-items-center '>
                  <div className=' d-flex flex-column justify-content-center gap-3 gap-sm-7 top-space-l'>
                    <h4 className='fs-sm-2'>
                      初階板<span lang='en'>BEGGINER</span>
                    </h4>
                    <h6 lang='zh-TW' className='fs-7 fs-sm-6'>
                      浮力大、易站立，新手友善，讓你輕鬆享
                      <br className='d-none d-md-block' />
                      受衝浪樂趣，快速建立信心！
                    </h6>
                    <div>
                      <button
                        lang='zh-TW'
                        type='button'
                        className='btn btn-dark btn-lg border border-white icon-link icon-link-hover fs-7 fs-sm-6'
                      >
                        來去探索
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='bi ms-3 fs-5'
                          viewBox='0 0 15 15'
                          aria-hidden='true'
                        >
                          <path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className='mid-grade'
            style={{
              backgroundImage: 'url(img/homePage/grade-02.webp)',
            }}
          >
            <div className='position-relative w-100 h-100 filter-l'>
              <div className='container px-9'>
                <div className='d-flex align-items-center flex-sm-row-reverse'>
                  <div className=' d-flex flex-column justify-content-center gap-3 gap-sm-7 top-space-r '>
                    <h4 className='fs-sm-2'>
                      中階板
                      <span lang='en'>INTERMEDIATE</span>
                    </h4>
                    <h6 lang='zh-TW' className='fs-7 fs-sm-6'>
                      兼具穩定與靈活，適合進階玩家挑戰更多
                      <br className='d-none d-md-block' />
                      動作，提升衝浪技巧！
                    </h6>
                    <div>
                      <button
                        lang='zh-TW'
                        type='button'
                        className='btn btn-dark btn-lg border border-white icon-link icon-link-hover fs-7 fs-sm-6'
                      >
                        來去探索
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='bi ms-3 fs-5'
                          viewBox='0 0 15 15'
                          aria-hidden='true'
                        >
                          <path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className='grade'
            style={{
              backgroundImage: 'url(img/homePage/grade-03.webp)',
            }}
          >
            <div className='position-relative w-100 h-100 filter-l'>
              <div className='container px-9'>
                <div className='d-flex  align-items-center'>
                  <div className=' d-flex flex-column justify-content-center   gap-3 gap-sm-7 top-space-l '>
                    <h4 className='fs-sm-2' lang='zh-TW'>
                      高階板<span lang='en'>ADVANCE</span>
                    </h4>
                    <h6 lang='zh-TW' className='fs-7 fs-sm-6'>
                      速度快、操控強，適合經驗豐富的衝浪
                      <br className='d-none d-md-block' />
                      者，挑戰更刺激的浪點與極限動作！
                    </h6>
                    <div>
                      <button
                        lang='zh-TW'
                        type='button'
                        className='btn btn-dark btn-lg border border-white icon-link icon-link-hover fs-7 fs-sm-6'
                      >
                        來去探索
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='bi ms-3 fs-5'
                          viewBox='0 0 15 15'
                          aria-hidden='true'
                        >
                          <path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='bg-black'>
          <div className='container'>
            <div className='py-15 py-sm-14'>
              <div className='d-flex justify-content-center flex-column align-items-center'>
                <h4 className='text-white mb-7 mb-sm-11 fs-lg-2' lang='zh-TW'>
                  更多選擇 符合你的預期
                </h4>
                <button
                  lang='zh-TW'
                  type='button'
                  className='btn btn-dark btn-lg  border border-white icon-link icon-link-hover fs-7 fs-sm-6'
                >
                  所有商品
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='bi ms-3 fs-5'
                    viewBox='0 0 15 15'
                    aria-hidden='true'
                  >
                    <path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='bg-neutral-40 py-7 py-sm-14'>
          <div className='container'>
            <div className='mb-7'>
              <h4 className='text-center' lang='zh-TW '>
                隨時出發 <span lang='en'>Pick Your time and GO!</span>
              </h4>
            </div>
            <div className='row row-cols-1 row-cols-sm-2 gy-7'>
              {service.map((item, index) => {
                return (
                  <div className='col' key={index}>
                    <div className='card text-bg-dark rounded-4 wave-condition'>
                      <img
                        src={item.img}
                        className='card-img object-fit-cover rounded-4 '
                        alt='wave-condition'
                      />
                      <div className='card-img-overlay p-0 d-flex align-items-center'>
                        <div className='ms-7'>
                          <h5 className='card-title mb-5'>{item.title}</h5>
                          <button className='btn border-0  p-0 fw-normal text-primary-100 fs-7 icon-link icon-link-hover fs-sm-6'>
                            來去看看
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='bi ms-3 fs-5'
                              viewBox='0 0 15 15'
                              aria-hidden='true'
                            >
                              <path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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

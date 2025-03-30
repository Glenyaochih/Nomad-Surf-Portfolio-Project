import { BsTwitterX, BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function OceanFooter() {
  const aboutRoutes = [
    { path: '/about', name: '關於我們' },
    { path: '/', name: '海上之翼製作組' },
    { path: '/', name: '加入海上團隊' },
    { path: '/', name: '聯絡海上之翼' },
    { path: '/admin', name: '後台管理' },
  ];
  return (
    <>
      <div className='footerBg'>
        <div className='container d-flex flex-column'>
          <div className='footerHeader'>
            <p className='fw-bold fs-lg-3 h7'>海上之翼 Wings of the Sea</p>
          </div>

          <div className='footerContent row flex-sm-row-reverse flex-column'>
            <div className='community col-sm-4 col-12 d-flex flex-column gap-5  mb-sm-0 mb-13'>
              <div className='d-sm-block d-none align-self-end'>
                <p>追蹤我們</p>
              </div>
              <div className='d-flex gap-sm-7 gap-4 align-self-sm-end align-self-start'>
                <BsFacebook size={24} />
                <BsInstagram size={24} />
                <BsTwitterX size={24} />
                <BsYoutube size={24} />
                <i className='icon24 bi bi-youtube'></i>
              </div>
            </div>

            <div className='webMap col-sm-8 col-12 d-flex justify-content-sm-between flex-column flex-sm-row'>
              <div>
                <p className='fw-bold mb-sm-5 mb-3'>關於我們</p>
                <div className='d-flex flex-column gy-2'>
                  {aboutRoutes.map((route) => {
                    return (
                      <p className='py-1 py-sm-2'>
                        <Link to={route.path}>{route.name}</Link>
                      </p>
                    );
                  })}
                </div>
              </div>
              <hr className='d-sm-none' />
              <div>
                <p className='fw-bold mb-sm-5 mb-3'>商品</p>
                <div className='d-flex flex-column g-2'>
                  <p className='py-1 py-sm-2'>
                    <a href='/pages/productNew.html'>衝浪板</a>
                  </p>
                  <p className='py-1 py-sm-2'>
                    <a href='#'>配件</a>
                  </p>
                  <p className='py-1 py-sm-2'>
                    <a href='#'>周邊</a>
                  </p>
                </div>
              </div>
              <hr className='d-sm-none' />
              <div>
                <p className='fw-bold mb-sm-5 mb-3'>衝浪資訊</p>
                <div className='d-flex flex-column g-2'>
                  <p className='py-1 py-sm-2'>
                    <a href='waveCondition.html'>全台浪點</a>
                  </p>
                  <p className='py-1 py-sm-2'>
                    <a href='#'>沖澡地圖</a>
                  </p>
                  <p className='py-1 py-sm-2'>
                    <a href='#'>衝浪板功能介紹</a>
                  </p>
                  <p className='py-1 py-sm-2'>
                    <a href='#'>衝浪板配件介紹</a>
                  </p>
                  <p className='py-1 py-sm-2'>
                    <a href='#'>衝浪禮儀</a>
                  </p>
                  <p className='py-1 py-sm-2'>
                    <a href='#'>如何找到合適的浪</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='copyright d-flex flex-column flex-sm-row gap-2'>
            <p>Copyright © 2024 Wings of the Sea. All rights reserved.</p>
            <div className='d-flex flex-column flex-sm-row'>
              <p className='fs-8'>法律聲明．隱私權政策．Cookie 使用條款．</p>
              <p className='fs-8'>Cookie 可訪問性政策</p>
            </div>
          </div>
          <p className='fs-7 fs-lg-6 text-accent-200'>
            本網站僅做個人作品測試使用，不提供任何商業用途使用。
          </p>
        </div>
      </div>
    </>
  );
}

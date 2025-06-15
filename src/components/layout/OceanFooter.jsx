import { useRef } from 'react';
import { BsTwitterX, BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';

import { Link } from 'react-router-dom';

export default function OceanFooter() {
  const aboutRoutes = [{ path: 'admin', name: '後台管理入口' }];
  const productRoutes = [
    { path: '/products', name: '衝浪板' },
    { path: '/', name: '配件' },
    { path: '/', name: '周邊' },
  ];
  const surfInfRoutes = [
    { path: '/wave', name: '全台浪點' },
    { path: '/shower-map', name: '沖澡地圖' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className='footerBg py-7'>
        <div className='container d-flex flex-column'>
          <div className='d-flex justify-content-between align-items-center mb-9 mb-sm-12'>
            <div className='footerHeader d-flex align-items-center'>
              <div className='p-1'>
                <img src='img/logo/nomad-logo-white.svg' alt='nomad-logo-sm' />
              </div>
              <div>
                <p
                  style={{ letterSpacing: '0.15rem', lineHeight: '1.2' }}
                  className='fs-5 ps-2'
                >
                  NOMAD SURFER
                </p>
              </div>
            </div>
            <div>
              <a
                className='d-flex flex-column align-items-center px-3 py-4 btn fs-7'
                onClick={scrollToTop}
              >
                <MdOutlineKeyboardArrowUp />
                <p className='d-none d-sm-block'>回到頂端</p>
              </a>
            </div>
          </div>

          <div className='flex-column'>
            <div className='d-flex justify-content-sm-between flex-column flex-sm-row'>
              <div className='d-flex flex-column flex-sm-row gap-sm-14'>
                <div className='mb-7'>
                  <p className='fw-semibold pb-sm-5'>關於我們</p>
                  <div className='d-flex flex-column gap-sm-2'>
                    {aboutRoutes.map((route) => {
                      return (
                        <p key={route.name} className='py-2'>
                          <Link to={route.path}>{route.name}</Link>
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className='mb-7'>
                  <p className='fw-semibold pb-sm-5'>商品</p>
                  <div className='d-flex flex-column gap-sm-2'>
                    {productRoutes.map((route) => {
                      return (
                        <p key={route.name} className='py-2'>
                          <Link to={route.path}>{route.name}</Link>
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className='mb-7'>
                  <p className='fw-semibold pb-sm-5'>衝浪資訊</p>
                  <div className='d-flex flex-column gap-sm-2 '>
                    {surfInfRoutes.map((route) => {
                      return (
                        <p key={route.name} className='py-2'>
                          <Link to={route.path}>{route.name}</Link>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='pb-7'>
                <div className='pb-3 pb-sm-5'>
                  <p className='text-sm-end'>追蹤我們</p>
                </div>
                <div className='d-flex gap-sm-7 gap-7  text-white me-auto'>
                  <BsFacebook size={24} />
                  <BsInstagram size={24} />
                  <BsTwitterX size={24} />
                  <BsYoutube size={24} />
                </div>
              </div>
            </div>
          </div>
          <div className=' d-flex flex-column flex-sm-row gap-2 fs-9 '>
            <p>Copyright © 2024 Wings of the Sea. All rights reserved.</p>
            <div className='d-flex flex-column flex-sm-row'>
              <p>網站電商僅作為Demo不具商業目的</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

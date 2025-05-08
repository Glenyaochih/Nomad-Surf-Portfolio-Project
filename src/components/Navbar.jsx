import { NavLink } from 'react-router-dom';
import { MdOutlineSearch, MdOutlineShoppingCart, MdMenu } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
export default function TestNavbar() {
  const routes = [
    { path: '/', name: '最新衝浪板' },
    { path: '/products', name: '所有商品' },
    { path: 'wave', name: '即時浪況' },
    { path: '/article', name: '沖澡地圖' },
  ];

  const routes_mobile = [
    { path: '/cart', name: '購物車' },
    { path: '/member', name: '會員登入' },
  ];

  return (
    <>
      <div className='bg-dark text-white py-2 '>
        <h6 className='fs-8 text-center'>
          夏季熱血促銷 |滿千免運，現在買板送腳繩 ; 購買兩萬以上的衝浪板，鰭
          (FINs) 打8折
        </h6>
      </div>
      <nav className='navbar navbar-expand-lg bg-body-tertiary sticky-top py-lg-4 navbar-cust shadow-sm'>
        <div className='container'>
          <a className='navbar-brand p-2' href='#'>
            <img
              className='logo-img'
              src='img/logo/nomad-logo-black.svg'
              alt='nomad-logo-sm'
            />
          </a>
          {/* 手機版手機版搜尋與購物車 */}
          <ul className='d-flex d-md-none ms-auto'>
            <li>
              <a href='' className='p-3'>
                <MdOutlineSearch />
              </a>
            </li>
            <li>
              <a href='' className='p-3'>
                <MdOutlineShoppingCart />
              </a>
            </li>
          </ul>
          <button
            className='navbar-toggler p-3'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
            aria-controls='offcanvasNavbar'
            aria-label='Toggle navigation'
          >
            <MdMenu />
          </button>
          <div
            className='offcanvas offcanvas-end'
            tabIndex='-1'
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
          >
            <div className='offcanvas-header p-2'>
              <a className='navbar-brand p-2' href='#'>
                <img
                  style={{ width: '42px', height: '42px' }}
                  src='img/logo/nomad-logo.svg'
                  alt='nomad-logo-sm'
                />
              </a>

              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            <div className='offcanvas-body px-7 py-3'>
              <ul className='navbar-nav  pe-3 me-auto '>
                {routes.map((route) => {
                  return (
                    <li className='nav-item ' key={route.path}>
                      <NavLink
                        className='nav-link py-3 py-lg-5 px-lg-4'
                        to={route.path}
                      >
                        <h6 className='fw-semibold'>{route.name}</h6>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <hr />
              <ul className='navbar-nav d-sm-none'>
                {routes_mobile.map((route) => {
                  return (
                    <li className='nav-item' key={route.path}>
                      <NavLink className='nav-link' to={route.path}>
                        <h6 className='fw-semibold'>{route.name}</h6>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <ul className=' d-none d-lg-flex align-items-center ms-auto gap-7'>
                <li>
                  <a href='' className='p-3'>
                    <MdOutlineSearch />
                  </a>
                </li>
                <li>
                  <a href='' className='p-3'>
                    <FiUser />
                  </a>
                </li>
                <li>
                  <a href='' className='p-3'>
                    <MdOutlineShoppingCart />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

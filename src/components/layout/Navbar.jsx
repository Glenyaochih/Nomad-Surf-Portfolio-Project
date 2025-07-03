import { NavLink } from 'react-router-dom';
import { MdOutlineSearch, MdOutlineShoppingCart, MdMenu } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import NavbarMarquee from '../carousel/Marquee';
import { setResetFilters } from '../../redux/slice/front/products/frontProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../redux/slice/front/cart/cartSelectors';

export default function TestNavbar() {
  const dispatch = useDispatch();
  const cartList = useSelector(selectCart);
  const routes = [
    {
      path: '/',
      name: '最新衝浪板',
      event: () => {
        dispatch(setResetFilters());
      },
    },
    { path: 'products', name: '所有商品', event: '' },
    { path: 'wave', name: '即時浪況', event: '' },
    {
      path: 'shower-map',
      name: '沖澡地圖',
      event: '',
    },
  ];

  const mobile_routes = [
    { path: '/cart', name: '購物車' },
    { path: '/member', name: '會員登入' },
  ];

  return (
    <>
      <NavbarMarquee />
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
          <ul className='d-flex align-items-center d-md-none ms-auto'>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                }}
                href='#'
                className='p-3'
              >
                <MdOutlineSearch />
              </a>
            </li>
            <li>
              <NavLink to={'/cart'} className='p-3'>
                <div className='position-relative'>
                  <MdOutlineShoppingCart />
                  {cartList?.carts?.length > 0 && (
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-100 text-white'>
                      {cartList?.carts?.length}
                      <span className='visually-hidden'>unread messages</span>
                    </span>
                  )}
                </div>
              </NavLink>
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
                  src='img/logo/nomad-logo-black.svg'
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
                        onClick={route.event}
                      >
                        <h6 className='fw-semibold'>{route.name}</h6>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <hr />
              <ul className='navbar-nav d-sm-none'>
                {mobile_routes.map((route) => {
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
                  <NavLink to={'/members'} className='p-3'>
                    <FiUser />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/cart'} className='p-3'>
                    <div className='position-relative'>
                      <MdOutlineShoppingCart />
                      {cartList?.carts?.length > 0 && (
                        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-100 text-white'>
                          {cartList?.carts?.length}
                          <span className='visually-hidden'>
                            unread messages
                          </span>
                        </span>
                      )}
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

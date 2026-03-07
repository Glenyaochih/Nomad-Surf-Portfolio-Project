import { NavLink } from 'react-router-dom';
import { MdOutlineShoppingCart, MdMenu } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import NavbarMarquee from '../carousel/NavbarMarquee';
import { setResetFilters } from '../../redux/slice/front/products/frontProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../redux/slice/front/cart/cartSelectors';
import {
  selectUser,
  selectUserLogin,
} from '../../redux/slice/front/user/userSelectors';
import { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'bootstrap';
import SearchBar from '../searchBar/searchBar';

export default function TestNavbar() {
  const navbarOffcanvasLink = useRef(null);
  const navbarOffcanvasSelf = useRef(null);

  const dispatch = useDispatch();
  const cartList = useSelector(selectCart);
  const userIsLogin = useSelector(selectUserLogin);
  const user = useSelector(selectUser);
  const [showInput01, setShowInput01] = useState(false);
  const [showInput02, setShowInput02] = useState(false);

  const routes = [
    {
      path: '/',
      name: '最新衝浪板',
      event: () => {
        dispatch(setResetFilters());
        handleOffcanvasClose();
        setTimeout(() => {
          const element = document.getElementById('latest-surfboards');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      },
    },
    {
      path: 'products',
      name: '所有商品',
      event: () => {
        handleOffcanvasClose();
      },
    },
    {
      path: '/wave',
      name: '即時浪況',
      event: () => {
        handleOffcanvasClose();
      },
    },
    {
      path: 'shower-map',
      name: '沖澡地圖',
      event: () => {
        handleOffcanvasClose();
      },
    },
  ];

  const mobile_routes = [
    {
      path: 'cart',
      name: '購物車',
      event: () => {
        handleOffcanvasClose();
      },
    },
    {
      path: 'members',
      name: '會員登入',
      event: () => {
        handleOffcanvasClose();
      },
    },
  ];
  //取得Offcanvas開關
  useEffect(() => {
    navbarOffcanvasSelf.current = new Offcanvas(navbarOffcanvasLink.current);
  }, []);

  const handleOffcanvasOpen = () => {
    navbarOffcanvasSelf.current.show();
  };
  const handleOffcanvasClose = () => {
    navbarOffcanvasSelf.current.hide();
  };

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
          {/* 手機版搜尋與購物車 */}
          <ul className=' d-flex align-items-center d-md-none ms-auto p-0'>
            <li>
              <SearchBar
                showInput={showInput01}
                setShowInput={setShowInput01}
                searchBarType={'navbar-search'}
              />
            </li>
            {!showInput01 && (
              <li>
                <NavLink to={'/cart'}>
                  <div className='p-3'>
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
                  </div>
                </NavLink>
              </li>
            )}
            {!showInput01 && (
              <li>
                <button
                  className='navbar-toggler p-3'
                  type='button'
                  onClick={handleOffcanvasOpen}
                  aria-controls='offcanvasNavbar'
                  aria-label='Toggle navigation'
                >
                  <MdMenu />
                </button>
              </li>
            )}
          </ul>

          <div
            ref={navbarOffcanvasLink}
            className='offcanvas offcanvas-end'
            tabIndex='-1'
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
                className='btn-close p-4'
                onClick={handleOffcanvasClose}
              ></button>
            </div>
            <div className='offcanvas-body px-7 py-3'>
              {/* 桌機版路由 */}
              <ul className='navbar-nav  pe-3 me-auto '>
                {routes.map((route) => {
                  return (
                    <li className='nav-item ' key={route.path}>
                      <NavLink
                        disable={route.disable}
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
              <ul className='navbar-nav d-md-none'>
                {mobile_routes.map((route) => {
                  return (
                    <li className='nav-item' key={route.path}>
                      <NavLink
                        className='nav-link'
                        to={route.path}
                        onClick={route.event}
                      >
                        <h6 className='fw-semibold'>{route.name}</h6>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <ul className=' d-none d-lg-flex align-items-center ms-auto gap-7'>
                <li>
                  <SearchBar
                    showInput={showInput02}
                    setShowInput={setShowInput02}
                    searchBarType={'navbar-search'}
                  />
                </li>
                <li>
                  {/* 如果登入成功顯示名字 */}
                  {userIsLogin ? (
                    <div className='d-flex justify-content-center align-items-center'>
                      <div className='user-icon rounded-circle border border-dark bg-dark fs-5 me-3 p-2 text-white position-relative'>
                        <span className='position-absolute top-50 start-50 translate-middle'>
                          {user?.name ? user.name.charAt(0).toUpperCase() : ''}
                        </span>
                      </div>
                      <div className='fs-6'>{user?.name}</div>
                    </div>
                  ) : (
                    <NavLink to={'/members'} className='p-3'>
                      <FiUser />
                    </NavLink>
                  )}
                </li>
                <li>
                  <NavLink to={'/cart'} className='p-3'>
                    <div className='position-relative'>
                      <MdOutlineShoppingCart />
                      {/* 購物車icon 數量顯示區塊 */}
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

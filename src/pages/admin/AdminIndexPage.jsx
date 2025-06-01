import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { adminLogoutAsync } from '../../redux/slice/admin/adminLogoutSlice';
import AdminLoading from '../../components/loadings/AdminLoading';

export default function AdminIndexPage() {
  const dispatch = useDispatch();
  const routes = [
    { path: '/admin', name: '商品管理' },
    { path: 'coupon', name: '優惠卷管理' },
    { path: 'order', name: '訂單管理' },
  ];

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogoutAsync());
  };
  return (
    <>
      <div className='backend d-flex vh-100'>
        <section className='aside col-2 web'>
          <div className='d-flex flex-column justify-content-between flex-shrink-0   h-100 pt-9 px-7 pb-7'>
            <div>
              <div className='d-flex align-items-center pb-7'>
                <div className='p-1'>
                  <img
                    style={{ height: '30px' }}
                    src='img/logo/nomad-logo-black.svg'
                    alt='nomad-logo-sm'
                  />
                </div>
                <div>
                  <p
                    style={{ letterSpacing: '0.15rem', lineHeight: '1.2' }}
                    className='fs-76 ps-2'
                  >
                    NOMAD SURFER
                  </p>
                </div>
              </div>
              <ul className='nav  flex-column'>
                <li className='nav-item '>
                  {routes.map((item) => {
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className='nav-link mb-9'
                      >
                        <h6>{item.name}</h6>
                      </Link>
                    );
                  })}
                </li>
              </ul>
            </div>
            <a
              onClick={logoutHandler}
              href='#'
              className='btn btn-dark border py-3'
            >
              登出
            </a>
          </div>
        </section>

        <section className='main col-12 col-lg-10 mt-10'>
          <div className='app'>
            <div className='d-flex flex-row align-items-center justify-content-between mb-8'>
              <div className='d-flex align-items-center'>
                <i
                  className='bi bi-list text-white fs-3 me-4'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseExample'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                ></i>
                <img
                  src='../assets/images/backendIcon.png'
                  className='img-fluid'
                />
              </div>
              <i className='bi bi-search text-white fs-5'></i>
            </div>

            <div className='collapse appNav' id='collapseExample'>
              <div className='d-flex flex-column justify-content-between text-white bg-primary-500 px-3'>
                <div>
                  <ul className='nav nav-pills flex-column'>
                    <li>
                      <a href='#' className='nav-link text-white fs-6 mb-9'>
                        顧客管理
                      </a>
                    </li>
                    <li>
                      <a href='#' className='nav-link text-white fs-6 mb-9'>
                        商品管理
                      </a>
                    </li>
                    <li>
                      <a href='#' className='nav-link text-white fs-6 mb-9'>
                        商品上架
                      </a>
                    </li>
                    <li>
                      <a href='#' className='nav-link text-white fs-6 mb-9'>
                        心得牆
                      </a>
                    </li>
                  </ul>
                </div>
                <button className='btn btn-primary-400 border mb-3 mt-18'>
                  會員登入
                </button>
              </div>
            </div>
          </div>

          <div className='web'>
            <div className='d-flex justify-content-between align-items-center pb-7'>
              <i className='bi bi-search fs-5 web'></i>
              <div className='d-flex justify-content-center align-items-center'>
                <div className='userImage rounded-circle bg-white fs-5 me-3'>
                  A
                </div>
                <div className='fs-6'>Alice</div>
              </div>
            </div>
          </div>
          <div className='overflow-auto'>
            <Outlet />
          </div>
        </section>
        <AdminLoading />
      </div>
    </>
  );
}

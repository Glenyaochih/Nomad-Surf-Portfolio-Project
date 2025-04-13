import { Link, NavLink, Outlet } from 'react-router-dom';

export default function AdminIndexPage() {
  return (
    <>
      <div className='backend d-flex vh-100'>
        <section className='aside col-2 web'>
          <div className='d-flex flex-column justify-content-between flex-shrink-0 text-white bg-primary-400 h-100 pt-9 px-7 pb-7'>
            <div>
              <a
                href='/'
                className='d-flex align-items-center mb-12 text-white text-decoration-none'
              >
                <img
                  className='img-fluid'
                  src='img/logo/Homepage/Desktop/Logo_L.png'
                />
              </a>
              <ul className='nav nav-underline flex-column'>
                <li className='nav-item '>
                  <Link to={'members'} className='nav-link fs-6 mb-9'>
                    顧客管理
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to={'/admin'} className='nav-link fs-6 mb-9'>
                    商品管理
                  </Link>
                </li>
                <li>
                  <div className='nav-item'>
                    <Link to={'comment'} className='nav-link fs-6 mb-9'>
                      心得牆
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <button className='btn btn-primary-400 border py-3'>登出</button>
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
              <i className='bi bi-search text-white fs-5 web'></i>
              <div className='d-flex justify-content-center align-items-center'>
                <div className='userImage rounded-circle bg-white fs-5 me-3'>
                  A
                </div>
                <div className='text-white fs-6'>Alice</div>
              </div>
            </div>
          </div>
          <div className='overflow-auto'>
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
}

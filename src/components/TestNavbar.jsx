import { NavLink } from "react-router-dom";

export default function TestNavbar() {
  const routes = [
    { path: '/', name: '首頁' },
    { path: '/products', name: '產品列表' },
    { path: '/cart', name: '購物車' },
    { path: '/article', name: '教學文章' },
  ];
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <a className='navbar-brand fw-700' href='#'>
            DRIFTER
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              {routes.map((route) => {
                return (
                  <li className='nav-item' key={route.path}>
                    <NavLink className='nav-link'  to={route.path}>
                      {route.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

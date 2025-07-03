import { Outlet } from 'react-router-dom';

export default function ShoppingCartPage() {
  return (
    <>
      <div className='bg-neutral-40'>
        <div className='container'>
          <div className='shopping-cart'>
            {/*===== 麵包屑區塊 =====*/}
            <section>
              <div className='py-5 py-lg-13 '>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb mb-0'>
                    <li className='breadcrumb-item'>
                      <a className='fs-8 fs-lg-7' href='#'>
                        首頁
                      </a>
                    </li>
                    <li
                      className='breadcrumb-item active fs-8 fs-lg-7 p-0'
                      aria-current='page'
                    >
                      購物車
                    </li>
                  </ol>
                </nav>
              </div>
            </section>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

import { Outlet } from 'react-router-dom';
import ScreenLoading from '../../components/loadings/ScreenLoading';
import { useSelector } from 'react-redux';
import { selectCartLoading } from '../../redux/slice/front/cart/cartSelectors';

export default function ShoppingCartPage() {
  const cartLoading = useSelector(selectCartLoading);
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
        <ScreenLoading loadingSource={cartLoading} />
      </div>
    </>
  );
}

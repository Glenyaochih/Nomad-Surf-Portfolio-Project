import ProductListCard from '../../components/card/ProductListCard';
import ProductFilterOffcanvas from '../../components/offcanvas/ProductFilterOffcanvas';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsAsync,
  setSortOption,
} from '../../redux/slice/front/products/frontProductsSlice';
import { selectFilteredProducts } from '../../redux/slice/front/products/frontProductsSelectors';
export default function ProductListPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const sortOption = [
    { value: '', label: '請選擇排序' },
    { value: 'best-selling', label: '最佳銷售' },
    { value: 'low-to-height', label: '價格由低到高' },
    { value: 'height-to-low', label: '價格由高到低' },
  ];

  const handleProductSortChange = (e) => {
    const sortOption = e.target.value;
    dispatch(setSortOption({ sortOption }));
  };

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  return (
    <>
      <div className='bg-neutral-40'>
        <div className='container '>
          <section>
            <div className='pb-7 pt-sm-7 d-sm-flex justify-content-between align-items-center'>
              <div className='py-4'>
                <nav aria-label='breadcrumb '>
                  <ol className='breadcrumb mb-0'>
                    <li className='breadcrumb-item'>
                      <a className='fs-8 fs-lg-7' href='#'>
                        首頁
                      </a>
                    </li>
                    <li
                      className='breadcrumb-item active fs-8 fs-lg-7'
                      aria-current='page'
                    >
                      所有產品
                    </li>
                  </ol>
                </nav>
              </div>
              <div className='d-flex'>
                <ProductFilterOffcanvas />
                <div>
                  <select
                    lang='zh-TW'
                    className='form-select form-select-sm  px-4 py-2 d-none d-sm-block'
                    aria-label='Small select example'
                    onChange={handleProductSortChange}
                  >
                    {sortOption.map((option) => (
                      <option
                        disabled={option.value === ''}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className='d-flex me-3 d-sm-none'>
                    <button
                      lang='zh-TW'
                      className='btn rounded-3 btn-outline-primary-40 text-primary-100 fw-normal fs-7'
                    >
                      最佳銷售
                    </button>
                    <button
                      lang='zh-TW'
                      className='btn rounded-3 btn-outline-primary-40 text-primary-100 fw-normal fs-7'
                    >
                      價格
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className='gy-7 pb-sm-14'>
              <div className='row row-cols-2 row-cols-sm-4 '>
                {products.map((product, index) => {
                  return (
                    <div className='col' key={index}>
                      <div key={index}>
                        <ProductListCard
                          item={product}
                          cardBackground={'neutral-40'}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

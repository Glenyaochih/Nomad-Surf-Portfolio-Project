import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsAsync,
  setProductsCurrentPage,
} from '../../redux/slice/admin/products/adminProductsSlice';
import {
  getCouponsAsync,
  setCouponsCurrentPage,
} from '../../redux/slice/admin/coupons/adminCouponsSlice';

export default function AdminPagination({ pageState }) {
  //從
  const productsPages = useSelector(
    (state) => state.adminProducts.rangePages
  );
  const currentCategory = useSelector(
    (state) => state.adminProducts.category
  );
  const couponsPages = useSelector((state) => state.adminCoupons.rangePages);

  const dispatch = useDispatch();
  let pages;
  let category;

  switch (pageState) {
    case 'products':
      pages = productsPages;
      category = currentCategory;
      break;
    case 'coupons':
      pages = couponsPages;
      break;

    default:
      pages = [];
      break;
  }

  const currentPageHandler = (page) => {
    switch (pageState) {
      case 'products':
        dispatch(setProductsCurrentPage(page));
        dispatch(getProductsAsync({ page: page, category: category }));
        break;
      case 'coupons':
        dispatch(setCouponsCurrentPage(page));
        dispatch(getCouponsAsync({ page: page }));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <nav className='mt-7' aria-label='Page navigation exam'>
        <ul className='pagination py-3 fs-6'>
          {pages.map((page) => {
            return (
              <li key={page} className='page-item px-1'>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    currentPageHandler(page);
                  }}
                  className='page-link btn btn-dark text-dark'
                  href='#'
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

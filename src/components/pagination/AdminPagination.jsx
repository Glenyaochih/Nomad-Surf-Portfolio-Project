import { useDispatch, useSelector } from 'react-redux';
import {
  adminGetProductsAsync,
  setProductsCurrentPage,
} from '../../redux/slice/admin/products/adminGetProductsSlice';
import {
  adminGetCouponsAsync,
  setCouponsCurrentPage,
} from '../../redux/slice/admin/coupons/adminGetCouponsSlice';

export default function AdminPagination({ pageState }) {
  //從
  const productsPages = useSelector(
    (state) => state.adminGetProducts.rangePages
  );
  const currentCategory = useSelector(
    (state) => state.adminGetProducts.category
  );
  const couponsPages = useSelector((state) => state.adminGetCoupons.rangePages);

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
        dispatch(adminGetProductsAsync({ page: page, category: category }));
        break;
      case 'coupons':
        dispatch(setCouponsCurrentPage(page));
        dispatch(adminGetCouponsAsync({ page: page }));
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

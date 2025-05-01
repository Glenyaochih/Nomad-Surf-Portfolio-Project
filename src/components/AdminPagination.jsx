import { useDispatch, useSelector } from 'react-redux';
import {
  adminGetProductsAsync,
  setCurrentPage,
} from '../redux/slice/adminGetProductsSlice';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreHoriz,
} from 'react-icons/md';

export default function AdminPagination() {
  const dispatch = useDispatch();

  const productsPages = useSelector(
    (state) => state.adminGetProducts.rangePages
  );
  const { current_page, total_pages } = useSelector(
    (state) => state.adminGetProducts.pageState
  );
  const currentCategory = useSelector(
    (state) => state.adminGetProducts.category
  );

  const currentPageHandler = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(adminGetProductsAsync({ page: page, category: currentCategory }));
  };

  return (
    <>
      <nav className='mt-7' aria-label='Page navigation exam'>
        <ul className='pagination py-3 fs-6'>
          <li className=''>
            <a
              onClick={(e) => {
                e.preventDefault();
                currentPageHandler(current_page - 1);
              }}
              className='page-link'
              href='#'
            >
              <MdKeyboardArrowLeft size={30} />
            </a>
          </li>
          {productsPages.map((page) => {
            return (
              <li key={page} className='page-item'>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    currentPageHandler(page);
                  }}
                  className='page-link'
                  href='#'
                >
                  {page}
                </a>
              </li>
            );
          })}
          <li className=''>
            <a className='page-link' href='#'>
              <MdMoreHoriz />
            </a>
          </li>
          <li className=''>
            <a
              onClick={(e) => {
                e.preventDefault();
                currentPageHandler(total_pages);
              }}
              className='page-link'
              href='#'
            >
              {total_pages}
            </a>
          </li>
          <li className=''>
            <a
              onClick={(e) => {
                e.preventDefault();
                currentPageHandler(current_page + 1);
              }}
              className='page-link'
              href='#'
            >
              <MdKeyboardArrowRight size={30} />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

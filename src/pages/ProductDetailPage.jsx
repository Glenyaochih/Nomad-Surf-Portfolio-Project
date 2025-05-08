import {
  MdFavoriteBorder,
  MdAttachMoney,
  MdOutlineAddShoppingCart,
} from 'react-icons/md';
import ProductDetailCarousel from '../components/carousel/ProductDetailCarousel';

export default function ProductDetailPage() {
  return (
    <>
      <section className='pt-8 pb-5 pb-lg-8  pt-lg-13'>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <a className='fs-8' href='#d'>
                首頁
              </a>
            </li>
            <li className='breadcrumb-item fs-8 fs-lg-7' aria-current='page'>
              長板
            </li>
            <li
              className='breadcrumb-item active fs-8 fs-lg-7'
              aria-current='page'
            >
              香蕉板
            </li>
          </ol>
        </nav>
      </section>
      <hr className='my-7' />
    </>
  );
}

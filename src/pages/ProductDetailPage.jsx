import { MdFavoriteBorder,MdAttachMoney,MdOutlineAddShoppingCart   } from 'react-icons/md';
import ProductDetailCarousel from '../components/ProductDetailCarousel';

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
      <section>
        <div className='d-flex align-items-center'>
          <p className='h1 fs-6 fs-lg-2'>Banana Board</p>
          <div className='ms-auto p-2 '>
            <MdFavoriteBorder size={20} />
          </div>
        </div>
      </section>
      <section>
        <ProductDetailCarousel />
        <div className='d-flex align-items-center'>
          <p className='h2 fs-6 '>NT<span><MdAttachMoney size={24}/></span>25000</p>
          <button type="button" className="btn btn-outline-light ms-auto"><span><MdOutlineAddShoppingCart size={20}/></span>加入購物車</button>
        </div>
      </section>
      <hr className='my-7'/>
    </>
  );
}

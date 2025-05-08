import { MdOutlineAddShoppingCart } from 'react-icons/md';
import RecommendCarousel from '../components/carousel/RecommendCarousel';
import axios from 'axios';

export default function ProductListPage() {
  const JSON_SERVER = import.meta.env.VITE_JSON_SERVER_HOST;
  const Products = async () => {
    try {
      const res = await axios.get(`${JSON_SERVER}/comments`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  Products();
  return (
    <>
      <div className='container pt-lg-13 pb-lg-16 pt-8 pb-15'>
        <section className='mb-7 mb-lg-10'>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a className='' href='#'>
                  首頁
                </a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                產品
              </li>
            </ol>
          </nav>
        </section>
        <section>
          <button type='button' className='btn btn-primary-300' value={'A'}>
            長板
          </button>
          <button type='button' className='btn btn-primary-300' value={'B'}>
            短板
          </button>
          <button type='button' className='btn btn-primary-300' value={''}>
            全部商品
          </button>
        </section>
        <section>
          <div className='row row-cols-1 row-cols-lg-3 gy-7'>
            <div className='col'>
              <div>
                <a href=''>
                  <img
                    src='img/products/short-board-01-isometric-projection.png'
                    className='card-img-top rounded-5 object-fit-cover'
                    style={{ height: 260 }}
                    alt='...'
                  />
                </a>
                <div className='card-body bg-primary-500 '>
                  <div className='d-flex pt-3 pb-4'>
                    <div>
                      <p className='card-title pb-1 h7'>衝浪板名稱</p>
                      <p>
                        <small>#11111</small>
                      </p>
                    </div>
                    <h5 className='ms-auto'>$8888</h5>
                  </div>
                  <a href='#' className='btn btn-outline-light w-100'>
                    <MdOutlineAddShoppingCart size={28} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='mt-12 mt-lg-14'></section>
        <section>
          <RecommendCarousel />
        </section>
      </div>
    </>
  );
}

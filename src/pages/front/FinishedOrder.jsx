import { useSelector } from 'react-redux';
import { selectOrder } from '../../redux/slice/front/order/orderSelectors';
import { useFormattedDate } from '../../hooks/useFormattedDay';
import { Link } from 'react-router-dom';

export default function FinishedOrder() {
  const order = useSelector(selectOrder);
  const createDate = useFormattedDate(order.create_at * 1000);

  return (
    <>
      <section>
        <div className='progress-bar py-4 mb-7'>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='d-flex align-items-center'>
              <div className='number-ball bg-primary-100 rounded-pill me-2'>
                <p className='text-white'>1</p>
              </div>
              <p className=' d-none d-md-block text-neutral-60'>確認訂單</p>
            </div>
            <span className='ms-2 me-2 ms-md-4 me-md-4 number-line'></span>
            <div className='d-flex align-items-center'>
              <div className='number-ball bg-primary-100 rounded-pill me-2'>
                <p className='text-white'>2</p>
              </div>
              <p className='d-none d-md-block text-neutral-60'>確認付款</p>
            </div>
            <span className='ms-2 me-2 ms-md-4 me-md-4 number-line'></span>
            <div className='d-flex align-items-center'>
              <div className='number-ball bg-primary-100 rounded-pill me-2'>
                <p className='text-white'>3</p>
              </div>
              <p className='text-neutral-60'>訂單完成</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='d-flex justify-content-center'>
          <div className='w-100 pb-14'>
            <div className='pb-11'>
              <h4 className='fs-6 fs-md-4 text-center'>
                訂單已完成付款，謝謝您的訂購！
              </h4>
            </div>
            <div
              className='bg-white p-7 rounded-3 mx-auto'
              style={{ maxWidth: '500px' }}
            >
              <div className='mx-auto pb-9' style={{ maxWidth: '200px' }}>
                <img src='img/shoppingCart/deliveryCart.png' alt='delivery' />
              </div>
              <div className='d-flex flex-column text-center'>
                <h6 className='pb-7'>訂單資訊</h6>
                <div className='mb-9'>
                  <p className='mb-2 fs-9 text-neutral-60'>訂單編號</p>
                  <p className='py-3'>{order.id}</p>
                </div>
                <div className='mb-9'>
                  <p className='mb-2 fs-9 text-neutral-60'>訂購日期</p>
                  <p className='py-3'>{createDate}</p>
                </div>
                <Link
                  className='btn btn-primary-100 py-4 fs-7 '
                  type='button'
                  lang='zh-TW'
                  to={'/products'}
                >
                  繼續購物
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

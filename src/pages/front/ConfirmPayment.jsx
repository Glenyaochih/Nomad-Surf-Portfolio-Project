import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getOrderAsync } from '../../redux/slice/front/order/orderSlice';
import {
  selectDeliveryFee,
  selectDiscountTotal,
  selectOrder,
} from '../../redux/slice/front/order/orderSelectors';
import { selectPaymentMethod } from '../../redux/slice/front/cart/cartSelectors';
import { postPaymentAsync } from '../../redux/slice/front/payment/paymentSlice';
import { useFormattedDate } from '../../hooks/useFormattedDay';

export default function ConfirmPayment() {
  const order = useSelector(selectOrder);
  const dispatch = useDispatch();
  const deliveryFee = useSelector(selectDeliveryFee);
  const discountTotal = useSelector(selectDiscountTotal);
  const paymentMethod = useSelector(selectPaymentMethod);
  const createDate = useFormattedDate(order.create_at * 1000);

  const checkPayment = (id) => {
    dispatch(postPaymentAsync(id));
  };

  //將字串轉陣列
  let productsArray = [];
  if (order.products) {
    productsArray = Object.values(order.products);
  } else if (order.product) {
    productsArray = [order.product];
  }
  useEffect(() => {
    dispatch(getOrderAsync());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className='progress-bar py-4 mb-7'>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='d-flex align-items-center'>
              <div className='number-ball bg-primary-100 rounded-pill me-2'>
                <p className='text-white'>1</p>
              </div>
              <p className='d-none d-md-block  text-neutral-60'>確認訂單</p>
            </div>
            <span className='ms-2 me-2 number-line'></span>
            <div className='d-flex align-items-center'>
              <div className='number-ball bg-primary-100 rounded-pill me-2'>
                <p className='text-white'>2</p>
              </div>
              <p className='text-neutral-60'>確認付款</p>
            </div>
            <span className='ms-2 me-2 number-line'></span>
            <div className='d-flex align-items-center'>
              <div className='number-ball bg-neutral-60 rounded-pill me-2'>
                <p className='text-white'>3</p>
              </div>
              <p className='d-none d-md-block text-neutral-60'>訂單完成</p>
            </div>
          </div>
        </div>
      </section>
      <div className='pb-11 pb-md-14'>
        <div className='row'>
          <div className='col-0 col-lg-8'>
            <section>
              <div className='pb-3 pb-md-0'>
                <section>
                  {/*===== 購物車內容 =====*/}
                  <div className='bg-white rounded-3 px-3'>
                    {/*===== 功能欄 =====*/}
                    <div className='d-flex w-100 py-7  border-bottom '>
                      <div className='ms-4'>
                        <h6>訂購商品</h6>
                      </div>
                    </div>
                    {/*===== 項目卡片 =====*/}
                    <div>
                      {productsArray.map((item) => (
                        <div
                          key={item.id}
                          className='form-check d-flex align-items-center w-100 p-3 p-lg-4  border-bottom'
                        >
                          <div
                            className='form-check-label p-3 p-lg-4 w-100'
                            htmlFor={`product-check${item.id}}`}
                          >
                            <div className=' w-100 d-flex'>
                              <img
                                className='object-fit-cover shopping-cart-product-img'
                                src={item.product.imageUrl}
                                alt='surf-board'
                              />
                              <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-md-between ms-2 gap-4 w-100'>
                                <p className='fs-lg-5 mb-lg-4 h5'>
                                  {item.product.title}
                                </p>
                                <p className='text-nowrap ms-auto me-2 lh-base'>
                                  NT$ {item.total} X
                                </p>
                                <div className='w-md-100 d-flex'>
                                  <div className=' ms-md-auto'>{item.qty}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </section>
            <section>
              <div className='py-3 pt-md-11 '>
                <form className='bg-white p-3 rounded-3'>
                  <div className='pb-4'>
                    <div className='py-3'>
                      <h6>訂單資訊</h6>
                    </div>
                    <div className='text-neutral-60'>
                      <div className='row row-cols-1 row-cols-md-2 py-3'>
                        <div className='col'>
                          <div className='pb-3'>
                            <p className='fs-9'>訂單編號</p>
                            <p className='text-dark py-3 px-2 mt-2'>
                              {order.id}
                            </p>
                          </div>
                        </div>
                        <div className='col'>
                          <div className='pb-3'>
                            <p className='fs-9'>訂單日期</p>
                            <p className='text-dark py-3 px-2 mt-2'>
                              {createDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='py-3'>
                      <h6>收貨人資訊</h6>
                    </div>
                    <div className='text-neutral-60'>
                      <div className='row row-cols-1 row-cols-md-2 py-3'>
                        <div className='col'>
                          <div className='pb-3'>
                            <p className='fs-9'>姓名</p>
                            <p className='text-dark py-3 px-2 mt-2'>
                              {order.user?.name}
                            </p>
                          </div>
                        </div>
                        <div className='col'>
                          <div className='pb-3'>
                            <p className='fs-9'>聯絡電話</p>
                            <p className='text-dark py-3 px-2 mt-2'>
                              {order.user?.tel}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='row row-cols-1 row-cols-md-2 py-3'>
                        <div className='col'>
                          <div className='pb-3'>
                            <p className='fs-9'>地址</p>
                            <p className='text-dark py-3 px-2 mt-2'>
                              {order.user?.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/*===== 付款資訊 =====*/}
                    <div className='pt-4'>
                      <div className='pb-3'>
                        <h6>付款方式</h6>
                      </div>
                      {paymentMethod === 'cashOnDelivery' ? (
                        <div className='mb-2 mt-2'>
                          <p>貨到付款</p>
                        </div>
                      ) : (
                        <div>
                          <div className='mb-2 mt-2'>
                            <p>信用卡</p>
                          </div>
                          <div className='text-neutral-60'>
                            <div className='row row-cols-1 row-cols-md-2 py-3'>
                              <div className='col'>
                                <div className='pb-3'>
                                  <p className='fs-9'>信用卡號</p>
                                  <p className='text-dark py-3 px-2 mt-2'>
                                    {order.user?.creditNum}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className='row row-cols-1 row-cols-md-2 py-3'>
                              <div className='col'>
                                <div className='pb-3'>
                                  <p className='fs-9'>有效期限</p>
                                  <p className='text-dark py-3 px-2 mt-2'>
                                    {order.user?.expireDate}
                                  </p>
                                </div>
                              </div>
                              <div className='col'>
                                <div className='pb-3'>
                                  <p className='fs-9'>安全碼</p>
                                  <p className='text-dark py-3 px-2 mt-2'>
                                    {order.user?.securityNum}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
          <div className='col-0 col-lg-4'>
            {/*===== 訂單資訊 =====*/}
            <section>
              <div className='pt-3 pt-md-0'>
                <div className='bg-white p-3 rounded-3'>
                  <div>
                    <div className='py-3'>
                      <h6>訂單總計</h6>
                    </div>
                    <div className='d-flex py-3'>
                      <p className='text-neutral-80'>
                        {productsArray.length}項商品
                      </p>
                      <h6 className='fs-7 ms-auto'>
                        NT$ {order.total ? order?.total?.toLocaleString() : 0}
                      </h6>
                    </div>
                    <div className='d-flex py-3'>
                      <p className='text-neutral-80'>運費</p>
                      <h6 className='fs-7 ms-auto'>NT${deliveryFee}</h6>
                    </div>
                    <hr className='my-3' />
                    <div className='d-flex py-3'>
                      <p className='text-neutral-80'>折扣總額</p>
                      <h6 className='fs-7 ms-auto'>
                        -NT$
                        {discountTotal !== 0 ? discountTotal : 0}
                      </h6>
                    </div>
                    <hr className='my-3' />
                    <div className='d-flex py-3'>
                      <p className='text-neutral-80 mt-auto'>總計</p>
                      <h3 className='ms-auto'>
                        NT$
                        {order.total && deliveryFee
                          ? (order?.total + deliveryFee).toLocaleString()
                          : 0}
                      </h3>
                    </div>
                    <div className='d-grid py-3'>
                      <Link
                        to={'../finished-order'}
                        className='btn btn-primary-100 py-4 fs-7 '
                        type='button'
                        lang='zh-TW'
                        onClick={() => checkPayment(order.id)}
                      >
                        確認付款
                      </Link>
                    </div>
                    <div className='mt-1 mb-3'>
                      <p lang='zh-TW'>
                        確認購買即表示您已審閱NOMAD
                        SURFER所提供購物相關條款，並同意條款內容。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

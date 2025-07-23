import { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { postCouponAsync } from '../../redux/slice/front/coupons/couponsSlice';
import { useForm } from 'react-hook-form';
import {
  clearCartAsync,
  delCartAsync,
  getCartAsync,
  putCartAsync,
  setPaymentMethod,
} from '../../redux/slice/front/cart/cartSlice';
import {
  selectCart,
  selectDeliveryFee,
  selectPaymentMethod,
} from '../../redux/slice/front/cart/cartSelectors';
import {
  postOrderAsync,
  setDeliveryCost,
  setDiscountTotal,
  setPostOrderSuccess,
} from '../../redux/slice/front/order/orderSlice';
import DarkButtonLinearG from '../../components/button/DarkButtonLinearG';
import OutlineButton from '../../components/button/outlineButton';
import { useNavigate } from 'react-router-dom';
import { selectOrderSuccess } from '../../redux/slice/front/order/orderSelectors';
import ButtonLoading from '../../components/loadings/ButtonLoading';
import { selectCouponLoading } from '../../redux/slice/front/coupons/couponsSelectors';

export default function ConfirmOrder() {
  const dispatch = useDispatch();
  const cartList = useSelector(selectCart);
  const deliveryFee = useSelector(selectDeliveryFee);
  const postOrderSuccess = useSelector(selectOrderSuccess);
  const paymentMethod = useSelector(selectPaymentMethod);
  const couponLoading = useSelector(selectCouponLoading);
  const navigate = useNavigate();
  const [isCartsEditOpen, setIsCartsEditOpen] = useState(false);
  const [idContainer, setIdContainer] = useState([]);
  const [couponCode, setCouponCode] = useState('');

  //增加或減少數量
  const updateCartItem = (cartId, product_id, qty) => {
    dispatch(
      putCartAsync({ cartId: cartId, product_id: product_id, qty: qty })
    );
  };
  //刪除項目
  const handleDelCartItemChange = (e) => {
    const { checked, value } = e.target;
    const productId = value;
    if (checked) {
      setIdContainer((prevIds) => [...prevIds, productId]);
    } else {
      setIdContainer((prevIds) => prevIds.filter((id) => id !== productId));
    }
  };
  //確認刪除
  const confirmDelCarts = () => {
    idContainer.forEach((id) => {
      dispatch(delCartAsync(id));
    });
  };
  //React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmitOrder = (data) => {
    const { message, ...user } = data;
    const sortData = {
      data: { user, message, deliveryFee },
    };
    dispatch(setDeliveryCost(deliveryFee));
    dispatch(setDiscountTotal(cartList?.total - cartList?.final_total));
    dispatch(postOrderAsync(sortData));

    reset();
  };

  //當確認訂單成功時
  useEffect(() => {
    if (postOrderSuccess) {
      navigate('/cart/payment');
      dispatch(setPostOrderSuccess(false));
    }
  }, [postOrderSuccess, navigate, dispatch]);

  useEffect(() => {
    dispatch(getCartAsync());
  }, [dispatch]);
  return (
    <>
      {/*===== 進度條 =====*/}
      <section>
        <div className='progress-bar py-4 mb-7'>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='d-flex align-items-center'>
              <div className='number-ball bg-primary-100 rounded-pill me-2'>
                <p className='text-white'>1</p>
              </div>
              <p className='  text-neutral-60'>確認訂單</p>
            </div>
            <span className='ms-2 me-2 ms-md-4 me-md-4 number-line'></span>
            <div className='d-flex align-items-center'>
              <div className='number-ball bg-neutral-60 rounded-pill me-2'>
                <p className='text-white'>2</p>
              </div>
              <p className='d-none d-md-block text-neutral-60'>確認付款</p>
            </div>
            <span className='ms-2 me-2 ms-md-4 me-md-4 number-line'></span>
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
                {cartList.carts?.length === 0 ? (
                  <section>
                    {/*===== 購物車清空 =====*/}
                    <div className='cart-empty react-icon bg-white rounded-3 text-neutral-60'>
                      <div className='text-center'>
                        <MdAddShoppingCart className='cart-empty-icon ' />
                        <h6 className='fs-6' lang='zh-TW'>
                          購物車空空如也
                          <span className='d-none d-lg-inline'>,</span>
                          <br className='d-lg-none' />
                          趕緊挑個心愛的衝浪板吧！
                        </h6>
                      </div>
                      <div className='d-flex justify-content-center pt-9'>
                        <DarkButtonLinearG
                          btnName={'去看商品'}
                          btnType={'btn-dark'}
                          destination={'/products'}
                        />
                      </div>
                    </div>
                  </section>
                ) : (
                  <section>
                    {/*===== 購物車內容 =====*/}
                    <div className='bg-white rounded-3 px-3'>
                      {/*===== 功能欄 =====*/}
                      <div className='d-flex w-100 py-7  border-bottom '>
                        <div className='ms-4'>
                          <OutlineButton
                            btnName={'清空購物車'}
                            btnColor={'neutral-60'}
                            event={() => dispatch(clearCartAsync())}
                          />
                        </div>
                        <div className='ms-auto d-flex'>
                          {isCartsEditOpen ? (
                            <div className='d-flex'>
                              <OutlineButton
                                event={() => setIsCartsEditOpen(false)}
                                btnName={'取消編輯'}
                                btnColor={'neutral-60'}
                              />
                              <div className='ms-3'>
                                <OutlineButton
                                  event={confirmDelCarts}
                                  btnName={'刪除'}
                                  btnColor={'accent-100'}
                                />
                              </div>

                              <p className='text-accent-100 ms-2'>
                                (已選{idContainer.length}項)
                              </p>
                            </div>
                          ) : (
                            <div className='me-4'>
                              <OutlineButton
                                disabled={cartList?.length?.length === 0}
                                event={() => setIsCartsEditOpen(true)}
                                btnName={'編輯'}
                                btnColor={'neutral-60'}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {/*===== 項目卡片 =====*/}
                      <div>
                        {cartList.carts?.map((item) => (
                          <div
                            key={item.id}
                            className='form-check d-flex align-items-center w-100 p-3 p-lg-4  border-bottom'
                          >
                            {isCartsEditOpen && (
                              <input
                                style={{ height: '24px', width: '24px' }}
                                className='form-check-input me-4 ms-0 mt-0 '
                                type='checkbox'
                                onChange={(e) => handleDelCartItemChange(e)}
                                value={item.id}
                                id={`product-check${item.id}}`}
                              />
                            )}

                            <label
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
                                    NT$ {item.total.toLocaleString()}
                                  </p>
                                  <div className='w-md-100 d-flex'>
                                    <div
                                      className='btn-group btn-group-sm ms-md-auto'
                                      role='group'
                                      aria-label='Small button group'
                                    >
                                      <button
                                        type='button'
                                        className='btn btn-outline-neutral-40 text-neutral-80 px-0'
                                        style={{
                                          width: '40px',
                                        }}
                                        onClick={() => {
                                          updateCartItem(
                                            item.id,
                                            item.product_id,
                                            item.qty + 1
                                          );
                                        }}
                                      >
                                        +
                                      </button>
                                      <span
                                        className='btn border border-neutral-40 px-0'
                                        style={{
                                          width: '48px',
                                          cursor: 'auto',
                                        }}
                                      >
                                        {item.qty}
                                      </span>
                                      <button
                                        type='button'
                                        className='btn btn-outline-neutral-40 text-neutral-80 px-1'
                                        style={{
                                          width: '40px',
                                        }}
                                        onClick={() => {
                                          updateCartItem(
                                            item.id,
                                            item.product_id,
                                            item.qty - 1
                                          );
                                        }}
                                        disabled={item.qty === 1}
                                      >
                                        -
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </section>
            <section>
              <div className='py-3 pt-md-11 '>
                <form
                  className='bg-white p-3 rounded-3'
                  onSubmit={handleSubmit(onSubmitOrder)}
                  id='orderForm'
                >
                  {/*===== 聯絡人資訊 =====*/}
                  <div className='pb-4'>
                    <div className='py-3'>
                      <h6>收貨人資訊</h6>
                    </div>
                    <div className='text-neutral-60'>
                      <div className='row row-cols-1 row-cols-md-2 py-3'>
                        <div className='col'>
                          <div className='pb-3'>
                            <label htmlFor='name' className='form-label fs-8'>
                              姓名
                              <span className='ms-1 text-accent-100'>*</span>
                            </label>
                            <input
                              {...register('name', {
                                required: {
                                  value: true,
                                  message: '請填寫收件人姓名',
                                },
                              })}
                              placeholder='glen'
                              type='text'
                              className={`form-control fs-7 ${errors.name && 'is-invalid'}`}
                              id='name'
                            />
                            {errors.name && (
                              <div className='invalid-feedback'>
                                {errors.name.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='col'>
                          <div>
                            <label htmlFor='tel' className='form-label fs-8'>
                              聯絡電話
                              <span className='ms-1 text-accent-100'>*</span>
                            </label>
                            <input
                              {...register('tel', {
                                required: {
                                  value: true,
                                  message: '請輸入電話號碼',
                                },
                                pattern: {
                                  value: /^(0[2-8]\d{7}|09\d{8})$/,
                                  message: '電話格式錯誤',
                                },
                              })}
                              type='tel'
                              className={`form-control fs-7 ${errors.tel && 'is-invalid'}`}
                              id='tel'
                              placeholder='0912345678'
                            />
                            {errors.tel && (
                              <div className='invalid-feedback'>
                                {errors.tel.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='row row-cols-1 row-cols-md-2 py-3'>
                        <div className='col'>
                          <div className='pb-3'>
                            <label htmlFor='email' className='form-label fs-8'>
                              Email
                              <span className='ms-1 text-accent-100'>*</span>
                            </label>
                            <input
                              {...register('email', {
                                required: {
                                  value: true,
                                  message: '請填入email',
                                },
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: 'email格式錯誤',
                                },
                              })}
                              type='email'
                              className={`form-control fs-7 ${errors.email && 'is-invalid'}`}
                              id='email'
                              placeholder='example@gmail.com'
                            />
                            {errors.email && (
                              <div className='invalid-feedback'>
                                {errors.email.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='col'>
                          <div className='pb-3'>
                            <label
                              htmlFor='address'
                              className='form-label fs-8'
                            >
                              配送地址
                              <span className='ms-1 text-accent-100'>*</span>
                            </label>
                            <input
                              {...register('address', {
                                required: {
                                  value: true,
                                  message: '請填入收件人地址',
                                },
                              })}
                              type='text'
                              className={`form-control fs-7 ${errors.address && 'is-invalid'}`}
                              id='address'
                              placeholder='100台北市中正區重慶南路一段122號'
                            />
                            {errors.address && (
                              <div className='invalid-feedback'>
                                {errors.address.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='py-3'>
                        <label htmlFor='message' className='form-label fs-8'>
                          留言給賣家
                        </label>
                        <textarea
                          {...register('message')}
                          type='text'
                          className='form-control fs-7'
                          style={{ resize: 'none' }}
                          id='message'
                          rows='5'
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/*===== 付款資訊 =====*/}
                    <div className='pt-4'>
                      <div className='pb-3'>
                        <h6>付款方式</h6>
                      </div>
                      <div className='d-flex align-items-center'>
                        <div className='py-3'>
                          <div
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              borderRadius: '16px',
                            }}
                          >
                            <div className='form-check me-7'>
                              <input
                                className='form-check-input'
                                defaultChecked
                                value='cashOnDelivery'
                                type='radio'
                                name='flexRadioDefault'
                                id='flexRadioDefault1'
                                onChange={(e) =>
                                  dispatch(setPaymentMethod(e.target.value))
                                }
                              />
                              <label
                                className='form-check-label align-middle '
                                htmlFor='flexRadioDefault1'
                              >
                                貨到付款
                              </label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              borderRadius: '16px',
                            }}
                          >
                            <div className='form-check'>
                              <input
                                className='form-check-input'
                                value='creditCard'
                                type='radio'
                                name='flexRadioDefault'
                                id='credit-card'
                                onChange={(e) =>
                                  dispatch(setPaymentMethod(e.target.value))
                                }
                              />
                              <label
                                className='form-check-label'
                                htmlFor='credit-card'
                              >
                                信用卡
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*===== 信用卡資訊 =====*/}
                    {paymentMethod === 'creditCard' && (
                      <div className='pt-2 fs-8 text-neutral-60'>
                        <div className='py-3'>
                          <label htmlFor='creditNum' className='form-label'>
                            信用卡號
                            <span className='ms-1 text-accent-100'>*</span>
                          </label>
                          <input
                            {...register('creditNum', {
                              required: {
                                value: true,
                                message: '請填入信用卡卡號',
                              },
                              pattern: {
                                value: /^\d{13,16}$/,
                                message: '信用卡格式錯誤',
                              },
                            })}
                            className={`form-control ${errors.creditNum && 'is-invalid'}`}
                            id='creditCard'
                            type='tel'
                            inputMode='numeric'
                            autoComplete='cc-number'
                            maxLength='16'
                            placeholder='0000 0000 0000 0000'
                          />
                          {errors.creditNum && (
                            <div className='invalid-feedback'>
                              {errors.creditNum.message}
                            </div>
                          )}
                        </div>
                        <div className='py-3'>
                          <div className='row row-cols-2'>
                            <div className='col'>
                              <div>
                                <label
                                  htmlFor='expireDate'
                                  className='form-label '
                                >
                                  有效期限
                                  <span className='ms-1 text-accent-100'>
                                    *
                                  </span>
                                </label>
                                <input
                                  {...register('expireDate', {
                                    required: {
                                      value: true,
                                      message: '請填入信用卡有效期',
                                    },
                                    pattern: {
                                      value: /^(0[1-9]|1[0-2])\d{2}$/,
                                      message: '日期格式錯誤',
                                    },
                                  })}
                                  type='tel'
                                  className={`form-control fs-7 ${errors.expireDate && 'is-invalid'}`}
                                  id='expireDate'
                                  maxLength='4'
                                  placeholder='MM/YY'
                                />
                                {errors.expireDate && (
                                  <div className='invalid-feedback'>
                                    {errors.expireDate.message}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className='col'>
                              <div>
                                <label
                                  htmlFor='securityNum'
                                  className='form-label'
                                >
                                  安全碼
                                  <span className='ms-1 text-accent-100'>
                                    *
                                  </span>
                                </label>
                                <input
                                  {...register('securityNum', {
                                    required: {
                                      value: true,
                                      message: '請填入信用卡安全碼',
                                    },
                                    pattern: {
                                      value: /^\d{3}$/,
                                      message: '安全碼格式錯誤',
                                    },
                                  })}
                                  type='tel'
                                  className={`form-control fs-7 ${errors.securityNum && 'is-invalid'}`}
                                  id='securityNum'
                                  placeholder='CVC'
                                  maxLength='3'
                                />
                                {errors.securityNum && (
                                  <div className='invalid-feedback'>
                                    {errors.securityNum.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
                        {cartList.carts ? cartList?.carts?.length : 0}項商品
                      </p>
                      <h6 className='fs-7 ms-auto'>
                        NT$
                        {cartList.total ? cartList.total?.toLocaleString() : 0}
                      </h6>
                    </div>
                    <div className='d-flex py-3'>
                      <p className='text-neutral-80'>運費</p>
                      <h6 className='fs-7 ms-auto'>
                        NT$ {deliveryFee.toLocaleString()}
                      </h6>
                    </div>
                    <hr className='my-3' />
                    <div className='d-flex py-3'>
                      <p className='text-neutral-80'>折扣總額</p>
                      <h6 className='fs-7 ms-auto'>
                        -NT$
                        {cartList.total
                          ? (
                              cartList?.total - cartList?.final_total
                            ).toLocaleString()
                          : 0}
                      </h6>
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(postCouponAsync(couponCode));
                      }}
                      className='d-flex align-items-center py-3'
                    >
                      <div>
                        <input
                          className='form-control'
                          type='text'
                          id='useCoupon'
                          placeholder='請輸入折扣碼'
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                      </div>
                      <div className='ms-7 me-2'>
                        <OutlineButton
                          type={'submit'}
                          btnName={'套用'}
                          btnColor={'primary-100'}
                        />
                      </div>
                      <ButtonLoading loadingSource={couponLoading} size={20} />
                    </form>
                    <hr className='my-3' />
                    <div className='d-flex py-3'>
                      <p className='text-neutral-80 mt-auto'>總計</p>
                      <h3 className='ms-auto'>
                        NT$
                        {cartList.final_total && deliveryFee
                          ? (
                              cartList.final_total + deliveryFee
                            ).toLocaleString()
                          : 0}
                      </h3>
                    </div>
                    <div className='d-grid py-3'>
                      <button
                        className='btn btn-primary-100 py-4 fs-7 '
                        type='submit'
                        form='orderForm'
                        lang='zh-TW'
                      >
                        確認訂單
                      </button>
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

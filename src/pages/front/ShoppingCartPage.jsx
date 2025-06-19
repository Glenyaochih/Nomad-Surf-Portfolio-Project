import { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import DarkButtonLinearG from '../../components/button/DarkButtonLinearG';
import OutlineButton from '../../components/button/outlineButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCartAsync,
  delCartAsync,
  getCartAsync,
  putCartAsync,
} from '../../redux/slice/front/cart/cartSlice';
import { selectCart } from '../../redux/slice/front/cart/cartSelectors';

export default function ShoppingCartPage() {
  const [sortValue, setSortValue] = useState('best_selling');
  const dispatch = useDispatch();
  const cartList = useSelector(selectCart);
  const [isCartsEditOpen, setIsCartsEditOpen] = useState(false);
  const [idContainer, setIdContainer] = useState([]);

  const sortOptions = [
    { value: '', label: '無' },
    { value: 'anniversary-sell', label: '週年慶' },
    { value: 'mothers-day-sell', label: '母親節優惠' },
    { value: 'fathers-day-sell', label: '父親節優惠' },
  ];
  console.log(cartList);

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };
  //增加或減少數量
  const updateCartItem = (cartId, product_id, qty) => {
    dispatch(
      putCartAsync({ cartId: cartId, product_id: product_id, qty: qty })
    );
  };

  const handleDelCartItemChange = (e) => {
    const { checked, value } = e.target;
    const productId = value;
    if (checked) {
      setIdContainer((prevIds) => [...prevIds, productId]);
    } else {
      setIdContainer((prevIds) => prevIds.filter((id) => id !== productId));
    }
  };

  const confirmDelCarts = () => {
    idContainer.forEach((id) => {
      dispatch(delCartAsync(id));
    });
  };

  useEffect(() => {
    dispatch(getCartAsync());
  }, [dispatch]);
  return (
    <>
      <div className='bg-neutral-40'>
        <div className='container'>
          <div className='shopping-cart'>
            {/*===== 麵包屑區塊 =====*/}
            <section>
              <div className='py-5 py-lg-13 '>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb mb-0'>
                    <li className='breadcrumb-item'>
                      <a className='fs-8 fs-lg-7' href='#'>
                        首頁
                      </a>
                    </li>
                    <li
                      className='breadcrumb-item active fs-8 fs-lg-7 p-0'
                      aria-current='page'
                    >
                      購物車
                    </li>
                  </ol>
                </nav>
              </div>
            </section>
            {/*===== 進度條 =====*/}
            <section>
              <div className='progress-bar py-4 mb-7'>
                <div className='d-flex justify-content-center align-items-center'>
                  <div className='d-flex align-items-center'>
                    <div className='number-ball bg-primary-100 rounded-pill me-2'>
                      <p className='text-white'>1</p>
                    </div>
                    <p className='text-neutral-60'>確認訂單</p>
                  </div>
                  <span className='ms-2 me-2 number-line'></span>
                  <div className='d-flex align-items-center'>
                    <div className='number-ball bg-neutral-60 rounded-pill me-2'>
                      <p className='text-white'>2</p>
                    </div>
                    <p className='d-none d-sm-block'>進行結帳</p>
                  </div>
                  <span className='ms-2 me-2 number-line'></span>
                  <div className='d-flex align-items-center'>
                    <div className='number-ball bg-neutral-60 rounded-pill me-2'>
                      <p className='text-white'>3</p>
                    </div>
                    <p className='d-none d-sm-block'>訂單完成</p>
                  </div>
                </div>
              </div>
            </section>
            <div className='pb-11 pb-sm-14'>
              <div className='row'>
                <div className='col-0 col-lg-8'>
                  <section>
                    <div className='pb-3 pb-sm-0'>
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
                                      (已選{cartList.carts.length}項)
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
                                      onChange={(e) =>
                                        handleDelCartItemChange(e)
                                      }
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
                                      <div className='d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between ms-2 gap-4 w-100'>
                                        <p className='fs-lg-5 mb-lg-4 h5'>
                                          {item.product.title}
                                        </p>
                                        <p className='text-nowrap ms-auto me-2 lh-base'>
                                          NT$ {item.total}
                                        </p>
                                        <div className='w-sm-100 d-flex'>
                                          <div
                                            className='btn-group btn-group-sm ms-sm-auto'
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
                    <div className='py-3 pt-sm-14 '>
                      <div className='bg-white p-3 rounded-3'>
                        {/*===== 聯絡人資訊 =====*/}
                        <div className='pb-4'>
                          <div className='py-3'>
                            <h6>收貨人資訊</h6>
                          </div>
                          <div className='text-neutral-60'>
                            <div className='row row-cols-2 py-3'>
                              <div className='col'>
                                <div className='pb-3'>
                                  <label
                                    htmlFor='CustomerNameInput'
                                    className='form-label fs-8'
                                  >
                                    姓名
                                    <span className='ms-1 text-accent-100'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control fs-7'
                                    id='CustomerNameInput'
                                    placeholder='Glen'
                                  />
                                </div>
                              </div>
                              <div className='col'>
                                <div>
                                  <label
                                    htmlFor='CustomerTelInput'
                                    className='form-label fs-8'
                                  >
                                    聯絡電話
                                    <span className='ms-1 text-accent-100'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    type='tel'
                                    className='form-control fs-7'
                                    id='CustomerTelInput'
                                    placeholder='0912345678'
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='py-3'>
                              <label
                                htmlFor='CustomerAddressInput'
                                className='form-label fs-8'
                              >
                                配送地址
                                <span className='ms-1 text-accent-100'>*</span>
                              </label>
                              <input
                                type='name'
                                className='form-control fs-7'
                                id='CustomerAddressInput'
                                placeholder='100台北市中正區重慶南路一段122號'
                              />
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
                                      className='form-check-input '
                                      type='radio'
                                      name='flexRadioDefault'
                                      id='flexRadioDefault1'
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
                                      type='radio'
                                      name='flexRadioDefault'
                                      id='credit-card'
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
                          <div className='pt-2 fs-8 text-neutral-60'>
                            <div className='py-3'>
                              <label
                                htmlFor='creditCardNumInput'
                                className='form-label'
                              >
                                信用卡號
                                <span className='ms-1 text-accent-100'>*</span>
                              </label>
                              <input
                                className='form-control '
                                id='creditCardNumInput'
                                type='tel'
                                inputMode='numeric'
                                pattern='[0-9\s]{13,19}'
                                autoComplete='cc-number'
                                maxLength='19'
                                placeholder='0000 0000 0000 0000'
                              />
                            </div>
                            <div className='py-3'>
                              <div className='row row-cols-2'>
                                <div className='col'>
                                  <div>
                                    <label
                                      htmlFor='creditCardExDateInput'
                                      className='form-label '
                                    >
                                      有效期限
                                      <span className='ms-1 text-accent-100'>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control fs-7'
                                      id='creditCardExDateInput'
                                      placeholder='MM/YY'
                                    />
                                  </div>
                                </div>
                                <div className='col'>
                                  <div>
                                    <label
                                      htmlFor='creditCardIdInput'
                                      className='form-label'
                                    >
                                      安全碼
                                      <span className='ms-1 text-accent-100'>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type='number'
                                      className='form-control fs-7'
                                      id='creditCardIdInput'
                                      placeholder='CVC'
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className='col-0 col-lg-4'>
                  {/*===== 訂單資訊 =====*/}
                  <section>
                    <div className='pt-3 pt-sm-0'>
                      <div className='bg-white p-3 rounded-3'>
                        <div>
                          <div className='py-3'>
                            <h6>訂單資訊</h6>
                          </div>
                          <div className='d-flex py-3'>
                            <p className='text-neutral-80'>
                              {cartList?.carts?.length}項商品
                            </p>
                            <h6 className='fs-7 ms-auto'>
                              NT$ {cartList.total}
                            </h6>
                          </div>
                          <div className='d-flex py-3'>
                            <p className='text-neutral-80'>運費</p>
                            <h6 className='fs-7 ms-auto'>NT$ 100</h6>
                          </div>
                          <hr className='my-3' />
                          <div className='d-flex py-3'>
                            <p className='text-neutral-80'>折價卷</p>
                            <h6 className='fs-7 ms-auto'>-NT$ 100</h6>
                          </div>
                          <div className='d-flex align-items-center py-3'>
                            <select
                              className='form-select'
                              aria-label='Large select example'
                              onChange={handleSortChange}
                              value={sortValue}
                            >
                              {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <div className='ms-7 me-2'>
                              <OutlineButton
                                btnName={'套用'}
                                btnColor={'primary-100'}
                              />
                            </div>
                          </div>
                          <hr className='my-3' />
                          <div className='d-flex py-3'>
                            <p className='text-neutral-80 mt-auto'>總計</p>
                            <h3 className='ms-auto'>
                              NT$ {cartList.final_total}
                            </h3>
                          </div>
                          <div className='d-grid py-3'>
                            <button
                              className='btn btn-primary-100 py-4 fs-7 '
                              type='button'
                              lang='zh-TW'
                            >
                              前往結帳
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
          </div>
        </div>
      </div>
    </>
  );
}

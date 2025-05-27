import { useState } from 'react';
import {
  MdAttachMoney,
  MdDelete,
  MdClose,
  MdEdit,
  MdAddShoppingCart,
} from 'react-icons/md';
import DarkButtonLinearG from '../components/button/DarkButtonLinearG';
import OutlineButton from '../components/button/outlineButton';

export default function ShoppingCartPage() {
  const [sortValue, setSortValue] = useState('best_selling');
  const sortOptions = [
    { value: '', label: '無' },
    { value: 'anniversary-sell', label: '週年慶' },
    { value: 'mothers-day-sell', label: '母親節優惠' },
    { value: 'fathers-day-sell', label: '父親節優惠' },
  ];
  const handleSortChange = (e) => {
    setSortValue(e.target.value);
    console.log(e.target.value);
  };
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
                      {/*===== 購物車清空 =====*/}
                      <section className='d-none'>
                        <div className='cart-empty react-icon bg-white rounded-3 text-neutral-60'>
                          <div className='text-center'>
                            <MdAddShoppingCart className='cart-empty-icon ' />
                            <h6 className='fs-6' lang='zh-TW'>
                              購物車空空如也
                              <span className='d-none d-lg-inline'>，</span>
                              <br className='d-lg-none' />
                              趕緊挑個心愛的衝浪板吧！
                            </h6>
                          </div>
                          <div className='d-flex justify-content-center pt-9'>
                            <DarkButtonLinearG
                              btnName={'去看商品'}
                              btnType={'btn-dark'}
                            />
                          </div>
                        </div>
                      </section>
                      {/*===== 購物車內容 =====*/}
                      <section>
                        <div className='bg-white rounded-3 px-3'>
                          {/*===== 功能欄 =====*/}
                          <div className='d-flex w-100 py-7  border-bottom'>
                            <OutlineButton
                              btnName={'清空購物車'}
                              btnColor={'neutral-60'}
                            />
                            <div className='ms-auto d-flex'>
                              <OutlineButton
                                btnName={'編輯'}
                                btnColor={'neutral-60'}
                              />
                              <div className='d-flex'>
                                <OutlineButton
                                  btnName={'取消編輯'}
                                  btnColor={'neutral-60'}
                                />
                                <p className='text-accent-100 ms-2'>
                                  刪除(已選1項)
                                </p>
                              </div>
                            </div>
                          </div>
                          {/*===== 項目卡片 =====*/}
                          <div>
                            <div className='d-flex align-items-center w-100 p-3 p-lg-4  border-bottom'>
                              <input
                                style={{ height: '24px', width: '24px' }}
                                className='form-check-input me-4 mt-0'
                                type='checkbox'
                                value=''
                                id='flexCheckDefault'
                              />
                              <div className='p-3 p-lg-4 w-100'>
                                <div className=' w-100 d-flex'>
                                  <img
                                    className='object-fit-cover shopping-cart-product-img'
                                    src='img/products/short-board-01-isometric-projection.png'
                                    alt='surf-board'
                                  />
                                  <div className='d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between ms-2 gap-4 w-100'>
                                    <p
                                      className='fs-lg-5 mb-lg-4 '
                                      style={{ lineHeight: 1.5 }}
                                    >
                                      islandsurfboards
                                      <br />
                                      GO Surfboard
                                    </p>
                                    <p
                                      className='text-nowrap'
                                      style={{ lineHeight: 1.5 }}
                                    >
                                      NT$ 1,200
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
                                          1
                                        </span>
                                        <button
                                          type='button'
                                          className='btn btn-outline-neutral-40 text-neutral-80 px-1'
                                          style={{
                                            width: '40px',
                                          }}
                                        >
                                          -
                                        </button>
                                      </div>
                                      <div className='ms-auto d-none'>
                                        <OutlineButton
                                          btnName={'刪除'}
                                          btnColor={'accent-100'}
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
                            <p className='text-neutral-80'>3 項商品</p>
                            <h6 className='fs-7 ms-auto'>NT$ 3600</h6>
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
                            <h3 className='ms-auto'>NT$ 3,600</h3>
                          </div>
                          <div class='d-grid py-3'>
                            <button
                              class='btn btn-primary-100 py-4 fs-7 '
                              type='button'
                              lang='zh-TW'
                            >
                              前往結帳
                            </button>
                          </div>
                          <div className='mt-1'>
                            <p>
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

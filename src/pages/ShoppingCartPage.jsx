import {
  MdAttachMoney,
  MdDelete,
  MdClose,
  MdEdit,
  MdAddShoppingCart,
} from 'react-icons/md';

export default function ShoppingCartPage() {
  return (
    <>
      <div className='container'>
        <div className='shopping-cart'>
          <section>
            <div className='py-5 py-lg-13'>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <a className='fs-8 fs-lg-7' href='#'>
                      首頁
                    </a>
                  </li>
                  <li
                    className='breadcrumb-item active fs-8 fs-lg-7'
                    aria-current='page'
                  >
                    購物車
                  </li>
                </ol>
              </nav>
            </div>
          </section>
          <div className='row'>
            <div className='col-0 col-lg-8'>
              <section>
                <div className='pb-14'>
                  <div className='py-14 py-lg-15 react-icon'>
                    <div className='text-center'>
                      <MdAddShoppingCart className='cart-empty-icon' />
                      <p className='h7 fs-lg-5'>
                        購物車空空如也
                        <span className='d-none d-lg-inline'>，</span>
                        <br className='d-lg-none' />
                        趕緊挑個心愛的衝浪板吧！
                      </p>
                    </div>
                  </div>
                  <div className='form-check d-flex align-items-center w-100 mb-3'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='flexCheckDefault'
                    />
                    <label
                      className='form-check-label w-100 ms-2'
                      htm
                      htmlFor='flexCheckDefault'
                    >
                      <div
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderRadius: '16px',
                        }}
                        className='d-flex align-items-end align-items-lg-center p-2 p-lg-4'
                      >
                        <div className=' w-100 d-flex'>
                          <img
                            className='object-fit-cover shopping-cart-product-img'
                            src='img/products/short-board-01-isometric-projection.png'
                            alt='surf-board'
                          />
                          <div className='ms-2 ms-lg-7'>
                            <p className='fs-lg-5 mb-lg-4'>衝浪板</p>
                            <p className='fs-8 fs-lg-7'>長板樣式</p>
                          </div>
                        </div>
                        <div className='w-100 h-100'>
                          <p className='fs-lg-5 text-end'>
                            NT
                            <span className='me-1'>
                              <MdAttachMoney className='fs-lg-3' />
                            </span>
                            5000
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className='w-100 mt-2'>
                    <div className='d-flex justify-content-end pt-5 pt-lg-8'>
                      <button
                        type='button'
                        className='btn btn-outline-light btn-sm py-lg-2 px-lg-4 fs-lg-6'
                      >
                        <MdEdit className='me-2' />
                        編輯
                      </button>
                      <button
                        type='button'
                        className='btn btn-outline-light btn-sm py-lg-2 px-lg-4 fs-lg-6'
                      >
                        <MdClose className='me-2' />
                        取消
                      </button>
                      <button
                        type='button'
                        className='btn btn-accent-200 btn-sm ms-4 py-lg-2 px-lg-4 fs-lg-6'
                      >
                        <MdDelete className='me-2' />
                        刪除
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className='pb-14'>
                  <div className='pb-5 pb-lg-9'>
                    <h6 className='fs-lg-5'>收貨人資訊</h6>
                  </div>
                  <div>
                    <div className='row row-cols-1 row-cols-lg-2'>
                      <div className='col'>
                        <div className='pb-3'>
                          <label
                            htmlFor='CustomerNameInput'
                            className='form-label fs-8'
                          >
                            姓名*
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
                            聯絡電話*
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
                    <div className='pt-3'>
                      <label
                        htmlFor='CustomerAddressInput'
                        className='form-label fs-8'
                      >
                        配送地址
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
              </section>
              <section>
                <div>
                  <div className='pb-5 pb-lg-9'>
                    <h6 className='fs-lg-5'>付款方式</h6>
                  </div>
                  <div className='row row-cols-1 row-cols-lg-2 gy-4'>
                    <div className='col'>
                      <div
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderRadius: '16px',
                        }}
                        className='px-3 py-5'
                      >
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='radio'
                            name='flexRadioDefault'
                            id='flexRadioDefault1'
                          />
                          <label
                            className='form-check-label fs-lg-6'
                            htmlFor='flexRadioDefault1'
                          >
                            貨到付款
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='col'>
                      <div
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderRadius: '16px',
                        }}
                        className='px-3 py-5'
                      >
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='radio'
                            name='flexRadioDefault'
                            id='credit-card'
                          />
                          <label
                            className='form-check-label fs-lg-6'
                            htmlFor='credit-card'
                          >
                            信用卡
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* credit-card-inf-section */}
                <div className='pt-2 pt-lg-4 pb-14'>
                  <div className='pb-3'>
                    <label htmlFor='creditCardNumInput' className='form-label'>
                      信用卡號*
                    </label>
                    <input
                      className='form-control fs-7'
                      id='creditCardNumInput'
                      type='tel'
                      inputMode='numeric'
                      pattern='[0-9\s]{13,19}'
                      autocomplete='cc-number'
                      maxlength='19'
                      placeholder='0000 0000 0000 0000'
                    />
                  </div>
                  <div className='row row-cols-2'>
                    <div className='col'>
                      <div className='pb-3'>
                        <label
                          htmlFor='creditCardExDateInput'
                          className='form-label '
                        >
                          有效期限*
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
                      <div className='pb-3'>
                        <label
                          htmlFor='creditCardIdInput'
                          className='form-label'
                        >
                          安全碼*
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
              </section>
              <hr className='d-lg-none' />
            </div>
            <div className='col-0 col-lg-4'>
              {/* pay-section */}
              <section>
                <div>
                  <p className='h8'>折價券</p>
                  <div className='pt-2 pb-3'>
                    <select
                      className='form-select'
                      aria-label='Large select example'
                    >
                      <option selected>無</option>
                      <option value='週年慶優惠'>週年慶優惠</option>
                      <option value='母親節優惠'>衝浪音樂節優惠</option>
                      <option value='國際衝浪日優惠'>國際衝浪日優惠</option>
                    </select>
                  </div>
                </div>
                <div className='pt-9 pb-7'>
                  <div className='pb-5'>
                    <div className='d-flex'>
                      <p className='fs-8 fs-lg-6 fs-lg-6'>金額</p>
                      <p className='ms-auto fs-8 fs-lg-6'>
                        NT
                        <MdAttachMoney className='fs-7 fs-lg-5' /> 25000
                      </p>
                    </div>
                    <div className='d-flex py-1'>
                      <p className='fs-8 fs-lg-6'>運費</p>
                      <p className='ms-auto fs-8 fs-lg-6'>
                        NT
                        <MdAttachMoney className='fs-7 fs-lg-5' /> 500
                      </p>
                    </div>
                    <div className='d-flex'>
                      <p className='fs-8 fs-lg-6'>折價卷</p>
                      <p className='ms-auto fs-8 fs-lg-6'>
                        - NT
                        <MdAttachMoney className='fs-7 fs-lg-5' /> 100
                      </p>
                    </div>
                  </div>

                  <div className='d-flex'>
                    <p className='fs-lg-5'>總計</p>
                    <p className='ms-auto fs-6 fs-lg-5'>
                      NT
                      <MdAttachMoney className='fs-5 fs-lg-3' />
                      25500
                    </p>
                  </div>
                </div>
                <div class='d-grid gap-2'>
                  <button disabled class='btn btn-secondary-200' type='button'>
                    付款
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

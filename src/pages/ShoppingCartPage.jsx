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
      <div>
        <section>
          <div className='py-5 py-lg-13'>
            <nav aria-label='breadcrumb'>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <a className='fs-8 fs-lg-7' href='#'>
                    首頁
                  </a>
                </li>
                <li className='breadcrumb-item active fs-8 fs-lg-7' aria-current='page'>
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
                      {' '}
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
                      className='d-flex align-items-center p-2'
                    >
                      <div>
                        <img
                          className='object-fit-cover'
                          style={{
                            height: '85px',
                            maxWidth: '80px',
                            borderRadius: '8px',
                          }}
                          src='/public/products/short-board-01-Isometric-projection.png'
                          alt='surf-board'
                        />
                      </div>
                      <div className='ms-2 w-100'>
                        <p className='fs-lg-5'>衝浪板</p>
                        <p className='fs-8'>長板樣式</p>
                        <p className='text'>
                          NT
                          <span className='me-1'>
                            <MdAttachMoney />
                          </span>
                          5000
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                <div className='w-100 mt-2'>
                  <div className='d-flex justify-content-end'>
                    <button
                      type='button'
                      className='btn btn-outline-light btn-sm'
                    >
                      <MdEdit />
                      編輯
                    </button>
                    <button
                      type='button'
                      className='btn btn-outline-light btn-sm'
                    >
                      <MdClose />
                      取消
                    </button>
                    <button
                      type='button'
                      className='btn btn-accent-200 btn-sm ms-4'
                    >
                      <MdDelete />
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className='pb-14'>
                <h5 className='mb-5'>收貨人資訊</h5>
                <div>
                  <div className='row row-cols-1 row-cols-lg-2'>
                    <div className='col'>
                      <div className='pb-3'>
                        <label
                          htmlFor='CustomerNameInput'
                          className='form-label'
                        >
                          姓名*
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          id='CustomerNameInput'
                          placeholder='Glen'
                        />
                      </div>
                    </div>
                    <div className='col'>
                      <div>
                        <label
                          htmlFor='CustomerTelInput'
                          className='form-label'
                        >
                          聯絡電話*
                        </label>
                        <input
                          type='tel'
                          className='form-control'
                          id='CustomerTelInput'
                          placeholder='0912345678'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='pt-3'>
                    <label
                      htmlFor='CustomerAddressInput'
                      className='form-label'
                    >
                      配送地址
                    </label>
                    <input
                      type='name'
                      className='form-control'
                      id='CustomerAddressInput'
                      placeholder='100台北市中正區重慶南路一段122號'
                    />
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div>
                <h5 className='mb-5'>付款方式</h5>
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
                          className='form-check-label'
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
              {/* credit-card-inf-section */}
              <div className='pt-2 pb-14'>
                <div className='pb-3'>
                  <label htmlFor='creditCardNumInput' className='form-label'>
                    信用卡號*
                  </label>
                  <input
                    className='form-control'
                    id='creditCardNumInput'
                    type='tel'
                    inputmode='numeric'
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
                        className='form-label'
                      >
                        到期日*
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='creditCardExDateInput'
                        placeholder='MM/YY'
                      />
                    </div>
                  </div>
                  <div className='col'>
                    <div className='pb-3'>
                      <label htmlFor='creditCardIdInput' className='form-label'>
                        識別碼*
                      </label>
                      <input
                        type='number'
                        className='form-control'
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
                    <p className='fs-8'>金額</p>
                    <p className='ms-auto'>25000</p>
                  </div>
                  <div className='d-flex py-1'>
                    <p className='fs-8'>運費</p>
                    <p className='ms-auto'>500</p>
                  </div>
                  <div className='d-flex'>
                    <p className='fs-8'>折價卷</p>
                    <p className='ms-auto'>-100</p>
                  </div>
                </div>

                <div className='d-flex'>
                  <p>總計</p>
                  <p className='ms-auto'>25500</p>
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
    </>
  );
}

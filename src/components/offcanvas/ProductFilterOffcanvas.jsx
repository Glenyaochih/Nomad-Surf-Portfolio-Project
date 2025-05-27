import { MdFilterList } from 'react-icons/md';
import DarkButtonLinearG from '../button/DarkButtonLinearG';
import OutlineButton from '../button/outlineButton';

export default function ProductFilterOffcanvas() {
  return (
    <>
      <button
        className='btn btn-neutral-10 text-neutral-80 rounded-2 me-3 fw-normal fs-7'
        type='button'
        data-bs-toggle='offcanvas'
        data-bs-target='#offcanvasRight'
        aria-controls='offcanvasRight'
        lang='zh-TW'
      >
        分類篩選
        <span className='ms-2'>
          <MdFilterList className='align-bottom' size={24} />
        </span>
      </button>

      <div
        className='offcanvas offcanvas-end filter-offcanvas'
        tabIndex='-1'
        id='offcanvasRight'
        aria-labelledby='offcanvasRightLabel'
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasRightLabel'>
            篩選商品
          </h5>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body'>
          <div className='d-flex flex-column h-100'>
            <div>
              {/* ===== 衝浪程度 ===== */}
              <div className='mb-7'>
                <p className='text-neutral-60 mb-3'>衝浪程度</p>
                <div className='form-check p-0'>
                  <input
                    type='checkbox'
                    className='btn-check '
                    name='options-base'
                    id='grade1'
                    autoComplete='off'
                  />
                  <label
                    className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal me-3'
                    htmlFor='grade1'
                  >
                    初階板
                  </label>

                  <input
                    type='checkbox'
                    className='btn-check'
                    name='options-base'
                    id='grade2'
                    autoComplete='off'
                  />
                  <label
                    className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal me-3'
                    htmlFor='grade2'
                  >
                    中階板
                  </label>

                  <input
                    type='checkbox'
                    className='btn-check '
                    name='options-base'
                    id='grade3'
                    autoComplete='off'
                  />
                  <label
                    className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal text-neutral-60'
                    htmlFor='grade3'
                  >
                    高階板
                  </label>
                </div>
              </div>
              <hr className='mb-7' />
              {/* ===== FIn系統 ===== */}
              <div className='mb-7'>
                <p className='text-neutral-60 mb-3'>FIn系統</p>
                <div>
                  <input
                    type='radio'
                    className='btn-check'
                    name='options-base'
                    id='option5'
                    autoComplete='off'
                  />
                  <label
                    className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal me-3'
                    htmlFor='option5'
                  >
                    Futures
                  </label>

                  <input
                    type='radio'
                    className='btn-check '
                    name='options-base'
                    id='option6'
                    autoComplete='off'
                  />
                  <label
                    className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal text-neutral-60'
                    htmlFor='option6'
                  >
                    FCS II
                  </label>
                </div>
              </div>
              {/* ===== 價格區間 ===== */}
              <div className='mb-7'>
                <p className='text-neutral-60 mb-3'>價格區間</p>
                <div>
                  <div className='row row-cols-2'>
                    <div className='col'>
                      <div>
                        <label
                          htmlFor='priceRangeInput1'
                          className='form-label text-neutral-60'
                        >
                          From
                        </label>
                        <input
                          type='email'
                          className='form-control'
                          id='priceRangeInput1'
                          placeholder='$0'
                        />
                      </div>
                    </div>
                    <div className='col'>
                      <div>
                        <label
                          htmlFor='priceRangeInput2'
                          className='form-label text-neutral-60'
                        >
                          to
                        </label>
                        <input
                          type='email'
                          className='form-control'
                          id='priceRangeInput2'
                          placeholder='$0'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ===== 尺寸 ===== */}
              <div className='mb-7'>
                <p className='text-neutral-60 mb-3'>尺寸</p>
                <div className='row row-cols-6 gx-1'>
                  <div className='col'>
                    <div>
                      <input
                        type='radio'
                        className='btn-check '
                        name='size-options-base'
                        id='size-option'
                        autoComplete='off'
                      />
                      <label
                        className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal '
                        htmlFor='size-option'
                      >
                        5’0
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-grid mt-auto gap-7'>
              <DarkButtonLinearG btnName={'加入購物車'} btnType={'btn-dark'} />
              <OutlineButton
                btnName={'清除全部'}
                isVisible={1}
                isArrowVisible={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

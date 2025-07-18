import { MdFilterList } from 'react-icons/md';
import DarkButtonLinearG from '../button/DarkButtonLinearG';
import OutlineButton from '../button/outlineButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import {
  setResetFilters,
  setApplyFilter,
  setFilter,
  setFilterOffcanvasToggle,
} from '../../redux/slice/front/products/frontProductsSlice';
import { Offcanvas } from 'bootstrap';
import { selectFilterOffcanvasOpen } from '../../redux/slice/front/products/frontProductsSelectors';

const sizeBtn = [
  { size: "5'.0", value: '5' },
  { size: "6'.0", value: '6' },
  { size: "7'.0", value: '7' },
  { size: "8'.0", value: '8' },
  { size: "9'.0", value: '9' },
  { size: "10'.0", value: '10' },
];

export default function ProductFilterOffcanvas() {
  const dispatch = useDispatch();

  const productFilterOffcanvasLink = useRef(null);
  const productFilterOffcanvasSelf = useRef(null);
  const offcanvasOpen = useSelector(selectFilterOffcanvasOpen);

  const tempFilters = useSelector(
    (state) => state.frontGetProducts.filters.tempFilters
  );
  useEffect(() => {
    productFilterOffcanvasSelf.current = new Offcanvas(
      productFilterOffcanvasLink.current
    );
  }, []);

  useEffect(() => {
    if (offcanvasOpen) {
      productFilterOffcanvasSelf.current.show();
    }
  }, [offcanvasOpen]);
  // === 開關offcanvas ===
  const handleOffcanvasOpen = () => {
    dispatch(setFilterOffcanvasToggle(true));
  };
  const handleOffcanvasClose = () => {
    productFilterOffcanvasSelf.current.hide();
    dispatch(setFilterOffcanvasToggle(false));
  };
  // === 衝浪程度篩選 ===
  const handleGradeChecked = (e) => {
    const { value, checked } = e.target;
    const currentGrades = tempFilters.grades || [];
    let newGrades;

    if (checked) {
      newGrades = [...currentGrades, value]; //當checked為true 展開加入value
    } else {
      //當checked為false 過濾不等於value返回
      newGrades = currentGrades.filter((grade) => grade !== value);
    }
    dispatch(setFilter({ filterType: 'grades', value: newGrades }));
  };

  // === fin系統篩選 ===
  const handleFinSystemChange = (e) => {
    const selectedValue = e.target.value;
    dispatch(setFilter({ filterType: 'finSystem', value: selectedValue }));
  };

  // === 價格區間篩選 ===
  const handlePriceRangeChange = (type, value) => {
    dispatch(
      setFilter({
        filterType: 'priceRange',
        value: {
          ...tempFilters.priceRange,
          [type]: Number(value) || (type === 'min' ? Number(0) : Infinity),
        },
      })
    );
  };

  // === 尺寸篩選 ===
  const handleSizeChange = (e) => {
    const selectedValue = e.target.value;
    dispatch(setFilter({ filterType: 'size', value: selectedValue }));
  };

  return (
    <>
      <button
        className='btn btn-neutral-10 text-neutral-80 rounded-2 me-3 fw-normal fs-7'
        type='button'
        aria-controls='offcanvasRight'
        lang='zh-TW'
        onClick={handleOffcanvasOpen}
      >
        分類篩選
        <span className='ms-2'>
          <MdFilterList className='align-bottom' size={24} />
        </span>
      </button>

      <div
        ref={productFilterOffcanvasLink}
        className='offcanvas offcanvas-end filter-offcanvas'
        tabIndex='-1'
        aria-labelledby='offcanvasRightLabel'
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasRightLabel'>
            篩選商品
          </h5>
          <button
            type='button'
            className='btn-close'
            aria-label='Close'
            onClick={handleOffcanvasClose}
          ></button>
        </div>
        <div className='offcanvas-body'>
          <form
            className='h-100'
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(setApplyFilter());
            }}
          >
            <div className='d-flex flex-column h-100'>
              <div>
                {/* ===== 衝浪程度 ===== */}
                <div className='mb-7'>
                  <p className='text-neutral-60 mb-3'>衝浪程度</p>
                  <div className='form-check p-0'>
                    <input
                      className='btn-check '
                      type='checkbox'
                      name='grades'
                      id='grade1'
                      value='C'
                      onChange={handleGradeChecked}
                      checked={(tempFilters.grades || []).includes('C')} //當grades不是undefine回傳本身是undefine回傳空陣列裡面包涵‘初階板’為true
                    />
                    <label
                      className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal me-3 text-neutral-60'
                      htmlFor='grade1'
                    >
                      初階板
                    </label>

                    <input
                      type='checkbox'
                      className='btn-check'
                      name='grade'
                      id='grade2'
                      value='B'
                      onChange={handleGradeChecked}
                      checked={(tempFilters.grades || []).includes('B')}
                    />
                    <label
                      className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal me-3 text-neutral-60'
                      htmlFor='grade2'
                    >
                      中階板
                    </label>

                    <input
                      type='checkbox'
                      className='btn-check '
                      name='options-base'
                      id='grade3'
                      value='A'
                      onChange={handleGradeChecked}
                      checked={(tempFilters.grades || []).includes('A')}
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
                      id='futures'
                      value='Futures'
                      onChange={handleFinSystemChange}
                      checked={tempFilters.finSystem === 'Futures'}
                    />
                    <label
                      className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal me-3'
                      htmlFor='futures'
                    >
                      Futures
                    </label>

                    <input
                      type='radio'
                      className='btn-check '
                      name='options-base'
                      id='fcs2'
                      value='FCS-2'
                      onChange={handleFinSystemChange}
                      checked={tempFilters.finSystem === 'FCS-2'}
                    />
                    <label
                      className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal text-neutral-60'
                      htmlFor='fcs2'
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
                            onChange={(e) => {
                              handlePriceRangeChange('min', e.target.value);
                            }}
                            value={
                              tempFilters.priceRange.min === 0
                                ? ''
                                : tempFilters.priceRange.min //這邊的邏輯是要解決0自動轉字串的問題
                            }
                            type='number'
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
                            onChange={(e) => {
                              handlePriceRangeChange('max', e.target.value);
                            }}
                            value={
                              tempFilters.priceRange.max === Infinity
                                ? ''
                                : tempFilters.priceRange.max
                            }
                            type='number'
                            className='form-control'
                            id='priceRangeInput2'
                            placeholder='$10000'
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
                    {sizeBtn.map((btn) => {
                      return (
                        <div key={btn.size} className='col'>
                          <div>
                            <input
                              type='radio'
                              className='btn-check '
                              name='size-options-base'
                              id={btn.size}
                              value={btn.value}
                              onChange={handleSizeChange}
                              checked={tempFilters.size === btn.value}
                            />
                            <label
                              className='btn btn-outline-dark btn-sm rounded-1 px-2 fw-normal '
                              htmlFor={btn.size}
                            >
                              {btn.size}
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='d-grid mt-auto gap-7'>
                <DarkButtonLinearG
                  btnName={'套用篩選'}
                  btnType={'btn-dark'}
                  type={'submit'}
                  event={handleOffcanvasClose}
                />
                <div className='d-flex justify-content-center'>
                  <OutlineButton
                    event={() => {
                      dispatch(setResetFilters());
                      handleOffcanvasClose();
                    }}
                    type={'button'}
                    btnName={'清除全部'}
                    isVisible={1}
                    isArrowVisible={false}
                    btnColor={'primary-100'}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

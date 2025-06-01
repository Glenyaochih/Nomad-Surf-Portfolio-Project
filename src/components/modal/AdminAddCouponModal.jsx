import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddCouponModalOpen } from '../../redux/slice/modalSlice';
import {
  adminPostCouponAsync,
  setPostCouponInputChange,
} from '../../redux/slice/admin/coupons/adminPostCouponSlice';

export default function AdminAddCouponModal() {
  const adminAddCouponModalLink = useRef(null);
  const adminAddCouponModalSelf = useRef(null);
  const modalOpen = useSelector((state) => state.modal.addCouponModalOpen);
  const modalData = useSelector((state) => state.adminPostCoupon.initData);
  const dispatch = useDispatch();
  //data section

  //data section
  //modal section
  useEffect(() => {
    adminAddCouponModalSelf.current = new Modal(
      adminAddCouponModalLink.current,
      { backdrop: false }
    );
  }, []);

  useEffect(() => {
    if (modalOpen) {
      adminAddCouponModalSelf.current.show();
    }
  }, [modalOpen]);

  const CouponModalClose = () => {
    adminAddCouponModalSelf.current.hide();
    dispatch(setAddCouponModalOpen(false));
  };

  //modal section

  //add product section

  const handleCouponModalInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch(setPostCouponInputChange({ name, value, checked, type }));
  };

  const confirmAddCoupon = () => {
    dispatch(adminPostCouponAsync());

    //add product section
  };
  return (
    <>
      <div
        ref={adminAddCouponModalLink}
        className='modal fade'
        tabIndex='-1'
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        aria-hidden='false'
      >
        <div className='modal-dialog modal-xl modal-dialog-scrollable'>
          <div className='modal-content border-0'>
            <div className='modal-header bg-dark text-white'>
              <h5 id='productModalLabel' className='modal-title'>
                新增產品
              </h5>
              <button
                type='button'
                className='btn btn-primary text-light btn-close'
                data-bs-dismiss='modal'
                onClick={CouponModalClose}
              ></button>
            </div>
            <div className='modal-body'>
              <div>
                <div className='mb-5'>
                  <label htmlFor='title' className='form-label h5'>
                    優惠卷名稱
                  </label>
                  <input
                    value={modalData.title}
                    onChange={handleCouponModalInputChange}
                    name='title'
                    id='title'
                    type='text'
                    className='form-control'
                    placeholder='請輸入標題'
                  />
                </div>
                <div className='row'>
                  <div className='mb-5 col-md-6'>
                    <label htmlFor='code' className='form-label h5'>
                      優惠卷代碼
                    </label>
                    <input
                      value={modalData.code}
                      onChange={handleCouponModalInputChange}
                      name='code'
                      id='code'
                      type='text'
                      className='form-control'
                      placeholder='請輸入代碼'
                    />
                  </div>
                  <div className='mb-5 col-md-6'>
                    <label htmlFor='price' className='form-label h5'>
                      折扣率
                    </label>
                    <input
                      value={modalData.percent}
                      onChange={handleCouponModalInputChange}
                      name='percent'
                      id='percent'
                      type='number'
                      className='form-control'
                      placeholder='請輸入折扣率'
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='mb-5 col-md-6'>
                    <label htmlFor='due_date' className='form-label h5'>
                      到期日
                    </label>
                    <input
                      value={modalData.due_date}
                      onChange={handleCouponModalInputChange}
                      name='due_date'
                      id='due_date'
                      type='date'
                      className='form-control'
                      placeholder='請輸入到期日'
                    />
                  </div>
                  <div className='mb-5 col-md-6'>
                    <div className='form-check'>
                      <input
                        checked={modalData.is_enabled}
                        onChange={handleCouponModalInputChange}
                        name='is_enabled'
                        id='is_enabled'
                        className='form-check-input'
                        type='checkbox'
                      />
                      <label
                        className='form-check-label h6'
                        htmlFor='is_enabled'
                      >
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-outline-secondary'
                data-bs-dismiss='modal'
                onClick={CouponModalClose}
              >
                取消
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={confirmAddCoupon}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

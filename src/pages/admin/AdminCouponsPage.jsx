import AdminAddCouponModal from '../../components/modal/AdminAddCouponModal';
import AdminLoading from '../../components/loadings/AdminLoading';
import AdminPagination from '../../components/pagination/AdminPagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddCouponModalOpen } from '../../redux/slice/modalSlice';
import { MdCheck, MdModeEditOutline } from 'react-icons/md';
import { adminGetCouponsAsync } from '../../redux/slice/admin/coupons/adminGetCouponsSlice';
import {
  adminPutCouponAsync,
  setPutCouponInputChange,
  setTempCoupon,
} from '../../redux/slice/admin/coupons/adminPutCouponSlice';
import {
  adminDelCouponsAsync,
  setDelCouponsInputChange,
} from '../../redux/slice/admin/coupons/adminDelCouponsSlice';

export default function AdminCouponsPage() {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.adminGetCoupons.coupons);
  const tempCoupon = useSelector((state) => state.adminPutCoupon.tempCoupon);
  const [editState, setEditState] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // === modal section --> adminModalSlices ===
  const addCouponModalOpen = () => {
    dispatch(setAddCouponModalOpen(true));
  };

  // === modal section --> adminModalSlices ===

  // === delete section --> adminDelProductSlices ===
  const handleCouponDelInputChange = (e, couponId) => {
    const { checked } = e.target;
    dispatch(setDelCouponsInputChange({ checked, couponId }));
  };

  const confirmDelCoupons = () => {
    dispatch(adminDelCouponsAsync());
  };

  // === edit section --> adminPutProductSlices.js ===
  //修改狀態控制
  const editCouponHandler = (coupon) => {
    setEditState(coupon.id);
    dispatch(setTempCoupon(coupon));
  };
  //欄位修改
  const handleCouponPutInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch(setPutCouponInputChange({ name, value, checked, type }));
  };

  //確認件送出
  const confirmEditCoupon = () => {
    dispatch(adminPutCouponAsync());
  };

  useEffect(() => {
    dispatch(adminGetCouponsAsync({ page: 1 }));
  }, [dispatch]);

  return (
    <>
      <AdminAddCouponModal />
      <div>
        <div className=' banner mb-4'>
          <h5 className='fs-5 mt-4 mb-7'>優惠卷管理</h5>

          <div className='d-flex justify-content-between align-items-center'>
            <div className='ms-auto'>
              <button
                onClick={addCouponModalOpen}
                className='btn btn-dark text-white border deleteButton px-4 me-4'
              >
                <i className='bi bi-trash text-white me-1'></i>新增優惠卷
              </button>
              <button
                onClick={confirmDelCoupons}
                className='btn btn-dark text-white border deleteButton px-4'
              >
                <i className='bi bi-trash text-white me-1'></i>刪除優惠卷
              </button>
            </div>
          </div>
        </div>

        <div className='table-responsive position-relative'>
          <div
            className='table-container border d-flex'
            data-bs-spy='scroll'
            data-bs-target='#productTableBody'
            data-bs-offset='0'
            tabIndex='0'
          >
            <table className='table productManager rounded-table table-container table-hover'>
              <thead>
                <tr>
                  <th className='' scope='col' style={{ width: '80px' }}>
                    #
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    修改
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    優惠卷名稱
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    折扣碼
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    折扣率
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    到期日
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    是否啟用
                  </th>
                </tr>
              </thead>
              <tbody className='rounded-bottom'>
                {coupons?.map((coupon, index) => (
                  <tr className='' key={coupon.id}>
                    {coupon.id !== editState ? (
                      <>
                        <th scope='col' className='align-middle'>
                          <div className='form-check'>
                            <input
                              onChange={(e) => {
                                handleCouponDelInputChange(e, coupon.id);
                              }}
                              className='form-check-input ms-0'
                              type='checkbox'
                              value={coupon.id}
                              id={coupon.id}
                            />
                            <label
                              className='form-check-label'
                              htmlFor={coupon.id}
                            >
                              {index + 1}
                            </label>
                          </div>
                        </th>
                        <td className='align-middle'>
                          <button
                            className='btn'
                            onClick={() => {
                              setIsEditing(true);
                              editCouponHandler(coupon);
                            }}
                            disabled={isEditing}
                          >
                            <MdModeEditOutline />
                          </button>
                        </td>
                        <td className='align-middle'>{coupon.title}</td>
                        <td className='align-middle'>{coupon.code}</td>
                        <td className='align-middle'>{coupon.percent}%</td>
                        <td className='align-middle'>
                          {/* {dateTranslate(coupon)} */}
                        </td>

                        <td className='align-middle'>
                          {coupon.is_enabled ? (
                            <span className='text-success'>啟用</span>
                          ) : (
                            <span className='text-secondary'>關閉</span>
                          )}
                        </td>
                      </>
                    ) : (
                      <>
                        <th scope='row' className='align-middle'>
                          <label className='mt-1'>{index + 1}</label>
                        </th>
                        <td className='align-middle'>
                          <button
                            className='btn'
                            onClick={() => {
                              setIsEditing(false);
                              setEditState('');
                              confirmEditCoupon();
                            }}
                          >
                            <MdCheck />
                          </button>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center '>
                            <input
                              value={tempCoupon.title}
                              onChange={handleCouponPutInputChange}
                              name='title'
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='text'
                              className='form-control fs-7'
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <input
                              className='form-control fs-7'
                              value={tempCoupon.code}
                              onChange={handleCouponPutInputChange}
                              name='code'
                              type='text'
                              style={{ maxWidth: '150px', height: '40px' }}
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <input
                              className='form-control fs-7'
                              value={tempCoupon.percent}
                              onChange={handleCouponPutInputChange}
                              name='percent'
                              type='text'
                              style={{ maxWidth: '150px', height: '40px' }}
                            />
                          </div>
                        </td>

                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <input
                              value={tempCoupon.due_date}
                              onChange={handleCouponPutInputChange}
                              name='due_date'
                              className='form-control fs-7'
                              type='date'
                              style={{ maxWidth: '150px', height: '40px' }}
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='form-check '>
                            <input
                              name='is_enabled'
                              id='is_enabled'
                              className='form-check-input'
                              type='checkbox'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='is_enabled'
                            >
                              是否啟用
                            </label>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <AdminPagination pageState={'coupons'} />
      </div>
    </>
  );
}

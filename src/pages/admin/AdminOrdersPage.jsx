import AdminPagination from '../../components/pagination/AdminPagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCheck, MdModeEditOutline } from 'react-icons/md';

import { adminGetOrdersAsync } from '../../redux/slice/admin/orders/adminGetOrdersSlice';
import {
  adminPutOrderAsync,
  setPutOrderInputChange,
  setTempOrder,
} from '../../redux/slice/admin/orders/adminPutOrderSlice';
import {
  adminDelAllOrdersAsync,
  adminDelOrdersAsync,
  setDelOrdersInputChange,
} from '../../redux/slice/admin/orders/adminDelOrdersSlice';

export default function AdminOrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.adminGetOrders.orders);
  const tempOrder = useSelector((state) => state.adminPutOrder.tempOrder);
  const [editState, setEditState] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // === delete section --> adminDelProductSlices ===
  const handleOrderDelInputChange = (e, orderId) => {
    const { checked } = e.target;
    dispatch(setDelOrdersInputChange({ checked, orderId }));
  };
  const confirmDelOrders = () => {
    dispatch(adminDelOrdersAsync());
  };
  const confirmDelAllOrders = () => {
    dispatch(adminDelAllOrdersAsync());
  };

  // === edit section --> adminPutProductSlices.js ===
  //修改狀態控制
  const editOrderHandler = (order) => {
    setEditState(order.id);
    dispatch(setTempOrder(order));
  };
  //欄位修改
  const handleOrderPutInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    const userType = e.target.dataset.user;
    dispatch(setPutOrderInputChange({ name, value, checked, type, userType }));
  };

  //確認件送出
  const confirmEditOrder = () => {
    dispatch(adminPutOrderAsync());
  };

  useEffect(() => {
    dispatch(adminGetOrdersAsync({}));
  }, [dispatch]);

  return (
    <>
      <div>
        <div className=' banner mb-4'>
          <h5 className='fs-5 mt-4 mb-7'>訂單管理</h5>

          <div className='d-flex justify-content-between align-items-center'>
            <div className='ms-auto'>
              <button
                onClick={confirmDelOrders}
                className='btn btn-dark text-white border deleteButton px-4'
              >
                <i className='bi bi-trash text-white me-1'></i>刪除訂單
              </button>
              <button
                onClick={confirmDelAllOrders}
                className='btn btn-dark text-white border deleteButton px-4'
              >
                <i className='bi bi-trash text-white me-1'></i>刪除全部訂單
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
                    客戶名稱
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    地址
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    電話
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    email
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    留言
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    訂單建立時間
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    訂單金額
                  </th>
                </tr>
              </thead>
              <tbody className='rounded-bottom'>
                {orders?.map((order, index) => (
                  <tr className='' key={order.id}>
                    {order.id !== editState ? (
                      <>
                        <th scope='col' className='align-middle'>
                          <div className='form-check'>
                            <input
                              onChange={(e) => {
                                handleOrderDelInputChange(e, order.id);
                              }}
                              className='form-check-input ms-0'
                              type='checkbox'
                              value={order.id}
                              id={order.id}
                            />
                            <label
                              className='form-check-label'
                              htmlFor={order.id}
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
                              editOrderHandler(order);
                            }}
                            disabled={isEditing}
                          >
                            <MdModeEditOutline />
                          </button>
                        </td>
                        <td className='align-middle'>{order.user.name}</td>
                        <td className='align-middle'>{order.user.address}</td>
                        <td className='align-middle'>{order.user.tel}</td>
                        <td className='align-middle'>{order.user.email}</td>
                        <td className='align-middle'>{order.message}</td>
                        <td className='align-middle'>{order.create_at}</td>
                        <td className='align-middle'>{order.total}$</td>
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
                              confirmEditOrder();
                            }}
                          >
                            <MdCheck />
                          </button>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center '>
                            <input
                              value={tempOrder.user.name}
                              onChange={handleOrderPutInputChange}
                              data-user='user'
                              name='name'
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='text'
                              className='form-control fs-7'
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center '>
                            <input
                              value={tempOrder.user.address}
                              onChange={handleOrderPutInputChange}
                              data-user='user'
                              name='address'
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='text'
                              className='form-control fs-7'
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center '>
                            <input
                              value={tempOrder.user.tel}
                              onChange={handleOrderPutInputChange}
                              data-user='user'
                              name='tel'
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='text'
                              className='form-control fs-7'
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center '>
                            <input
                              value={tempOrder.user.email}
                              onChange={handleOrderPutInputChange}
                              data-user='user'
                              name='email'
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='text'
                              className='form-control fs-7'
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center '>
                            <input
                              value={tempOrder.message}
                              onChange={handleOrderPutInputChange}
                              name='message'
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='text'
                              className='form-control fs-7'
                            />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <AdminPagination pageState={'orders'} />
      </div>
    </>
  );
}

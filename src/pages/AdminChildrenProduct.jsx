import { useDispatch, useSelector } from 'react-redux';
import { setProductModalOpen } from '../redux/slice/modalSlice';
import AdminAddProductModal from '../components/modal/AdminAddProductModal';
import { useEffect, useState } from 'react';
import { adminGetProductsAsync } from '../redux/slice/adminGetProductsSlice';
import { MdModeEditOutline, MdCheck } from 'react-icons/md';

export default function AdminChildrenProduct() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.adminGetProducts.products);
  const [editState, setEditState] = useState('');
  const productModalOpen = () => {
    dispatch(setProductModalOpen(true));
  };

  useEffect(() => {
    dispatch(adminGetProductsAsync());
  }, [dispatch]);

  return (
    <>
      <AdminAddProductModal />
      <div>
        <div className='banner mb-4'>
          <h5 className='fs-5 mt-4 mb-7'>商品管理</h5>

          <div className='d-flex justify-content-between align-items-center'>
            <select
              className='form-select bg-primary-400 text-white h-100'
              aria-label='Default select example'
              defaultValue='defaultOptionValue'
            >
              <option value='defaultOptionValue'>類別</option>
              <option value='商品編號'>商品編號</option>
              <option value='商品名稱'>商品名稱</option>
              <option value='階級'>階級</option>
              <option value='價格'>價格</option>
            </select>

            <div>
              <button
                onClick={productModalOpen}
                className='btn btn-primary-500 text-white border deleteButton px-4 me-4'
              >
                <i className='bi bi-trash text-white me-1'></i>新增產品
              </button>
              <button className='btn btn-primary-500 text-white border deleteButton px-4'>
                <i className='bi bi-trash text-white me-1'></i>刪除
              </button>
            </div>
          </div>
        </div>

        <div className='table-responsive pt-4'>
          <div
            className='table-container'
            data-bs-spy='scroll'
            data-bs-target='#productTableBody'
            data-bs-offset='0'
            tabIndex='0'
          >
            <table className='table productManager rounded-table table-container table-hover'>
              <thead className=''>
                <tr>
                  <th scope='col' style={{ width: '80px' }}>
                    <input
                      className='form-check-input me-2'
                      type='checkbox'
                      value=''
                      id='flexCheckDefault'
                    />
                    <label
                      className='form-check-label mt-1'
                      htmlFor='flexCheckDefault'
                    >
                      #
                    </label>
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    商品編號
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    商品名稱
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    商品類型
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    階級
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    原價
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    定價
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    尺寸
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    FIN 系統
                  </th>
                  <th scope='col' style={{ width: '150px' }}>
                    狀態
                  </th>
                  <th scope='col' style={{ width: '150px' }}>
                    折價券
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    圖片
                  </th>
                  <th scope='col' style={{ width: '300px' }}>
                    描述
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    功能鍵
                  </th>
                </tr>
              </thead>
              <tbody className='border rounded-bottom'>
                {products.map((product, index) => (
                  <>
                    {product.id !== editState && (
                      <tr
                        key={product.id}
                        className='tableBorder'
                        htmlFor={product.id}
                      >
                        <th scope='col' className='align-middle'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            value=''
                            id={product.id}
                          />
                          <label className='mt-1'>{index + 1}</label>
                        </th>
                        <td className='align-middle'>td#AHAGA68</td>
                        <td className='align-middle'>{product.title}</td>
                        <td className='align-middle'>{product.category}</td>
                        <td className='align-middle'>{product.grade}</td>
                        <td className='align-middle'>{product.origin_price}</td>
                        <td className='align-middle'>{product.price}</td>
                        <td className='align-middle'>
                          <button className='btn btn-outline-primary btn-sm'>
                            查看
                          </button>
                        </td>
                        <td className='align-middle'>
                          <button className='btn btn-outline-primary btn-sm'>
                            查看
                          </button>
                        </td>
                        <td className='align-middle'>
                          {product.is_enabled ? (
                            <span className='text-success'>上架</span>
                          ) : (
                            <span className='text-secondary'>下架</span>
                          )}
                        </td>
                        <td className='align-middle'>
                          {product.hasDiscount ? (
                            <span className='text-success'>是</span>
                          ) : (
                            <span className='text-secondary'>否</span>
                          )}
                        </td>
                        <td className='align-middle'>
                          <img
                            style={{ height: '88px', maxWidth: '88px' }}
                            src={product.imageUrl}
                            className='rounded object-fit-cover'
                          />
                        </td>
                        <td className='align-middle'>{product.description}</td>
                        <td className='align-middle'>
                          <button className='btn'>
                            <MdModeEditOutline />
                          </button>
                        </td>
                      </tr>
                    )}
                    {product.id === editState && (
                      <tr key={product.id} className='tableBorder'>
                        <th scope='row' className='align-middle'>
                          <label className='mt-1'>{index + 1}</label>
                        </th>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center '>
                            <input
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='text'
                              className='form-control fs-7'
                              placeholder='請輸入產品編號'
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <input
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='text'
                              className='form-control fs-7'
                              placeholder='Glen'
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <select
                              class='form-select fs-7'
                              aria-label='Default select example'
                            >
                              <option value='longBoard'>longBoard</option>
                              <option value='shortBoard'>shortBoard</option>
                              <option value='midLength'>midLength</option>
                            </select>
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <select
                              style={{ maxWidth: '150px', height: '40px' }}
                              class='form-select fs-7'
                              aria-label='Default select example'
                            >
                              <option value='A'>A</option>
                              <option value='B'>B</option>
                              <option value='C'>C</option>
                            </select>
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <input
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='number'
                              className='form-control fs-7'
                              placeholder='23000'
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <input
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='number'
                              className='form-control fs-7'
                              placeholder='23000'
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <button className='btn btn-outline-primary btn-sm'>
                              編輯
                            </button>
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <button className='btn btn-outline-primary btn-sm'>
                              編輯
                            </button>
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
                        <td className='align-middle'>
                          <div className='form-check'>
                            <input
                              name='hasDiscount'
                              id='hasDiscount'
                              className='form-check-input'
                              type='checkbox'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='hasDiscount'
                            >
                              是否啟用
                            </label>
                          </div>
                        </td>
                        <td>
                          <img
                            style={{ height: '88px', width: '88px' }}
                            src={product.imageUrl}
                            className='rounded object-fit-cover'
                          />
                        </td>
                        <td className='align-middle'>
                          <textarea
                            style={{ resize: 'none' }}
                            className='form-control fs-7'
                            id='exampleFormControlTextarea1'
                            rows='3'
                          ></textarea>
                        </td>
                        <td className='align-middle'>
                          <button className='btn'>
                            <MdCheck />
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='pagination pt-8 pb-6'>
          <div className='web'>
            <div className='pages d-flex justify-content-center align-items-center ms-15 me-13'>
              <button className='pagesButton'>1</button>
              <button className='pagesButton'>2</button>
              <button className='pagesButton'>3</button>
              <i className='bi bi-three-dots fs-3 text-white mx-3'></i>
              <button className='pagesButton'>10</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

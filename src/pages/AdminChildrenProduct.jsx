import { useDispatch, useSelector } from 'react-redux';
import {
  setEditProductOpen,
  setAddProductModalOpen,
  setCheckProductOpen,
} from '../redux/slice/modalSlice';
import AdminAddProductModal from '../components/modal/AdminAddProductModal';
import { useEffect, useState } from 'react';
import {
  adminGetProductsAsync,
  setProductCategory,
} from '../redux/slice/adminGetProductsSlice';
import { MdModeEditOutline, MdCheck } from 'react-icons/md';
import {
  adminDelProductsAsync,
  setDelProductInputChange,
} from '../redux/slice/adminDelProductSlice';
import {
  setTempProduct,
  adminPutProductAsync,
  setPutProductInputChange,
} from '../redux/slice/adminPutProductSlice';
import AdminCheckProductModal from '../components/modal/AdminCheckProductModal';
import AdminEditProductModal from '../components/modal/AdminEditProductModal';
import AdminPagination from '../components/adminPagination';

export default function AdminChildrenProduct() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.adminGetProducts.products);
  const tempProduct = useSelector((state) => state.adminPutProduct.tempProduct);
  const [editState, setEditState] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  //modal section
  const addProductModalOpen = () => {
    dispatch(setAddProductModalOpen(true));
  };
  const editProductModalOpen = (state, data) => {
    dispatch(setEditProductOpen({ open: true, state, data }));
  };
  const checkProductModalOpen = (state, data) => {
    dispatch(setCheckProductOpen({ open: true, state, data }));
  };

  //modal section ******

  //delete section ******
  const handleProductDelInputChange = (e, productId) => {
    const { checked } = e.target;
    dispatch(setDelProductInputChange({ checked, productId }));
  };

  const confirmDelProduct = () => {
    dispatch(adminDelProductsAsync());
  };
  //delete section ******

  //edit section ******
  const editProductHandler = (product) => {
    setEditState(product.id);
    dispatch(setTempProduct(product));
  };

  const handleProductPutInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch(setPutProductInputChange({ name, value, checked, type }));
  };

  const confirmEditProduct = () => {
    dispatch(adminPutProductAsync());
  };

  //edit section ******
  //filter section
  const categoryFilterHandler = (newCategory) => {
    dispatch(setProductCategory(newCategory));
    dispatch(adminGetProductsAsync({ page: 1, category: newCategory }));
  };

  //filter section

  useEffect(() => {
    dispatch(adminGetProductsAsync({}));
  }, [dispatch]);

  return (
    <>
      <AdminAddProductModal />
      <AdminCheckProductModal />
      <AdminEditProductModal />
      <div>
        <div className='banner mb-4'>
          <h5 className='fs-5 mt-4 mb-7'>商品管理</h5>

          <div className='d-flex justify-content-between align-items-center'>
            <select
              className='form-select bg-primary-400 text-white h-100'
              aria-label='Default select example'
              defaultValue='defaultOptionValue'
              onChange={(e) => {
                categoryFilterHandler(e.target.value);
              }}
            >
              <option value=''>衝浪板類別</option>
              <option value='longBoard'>長板</option>
              <option value='midLength'>中長板</option>
              <option value='shortBoard'>短板</option>
            </select>
            <div>
              <button
                onClick={addProductModalOpen}
                className='btn btn-primary-500 text-white border deleteButton px-4 me-4'
              >
                <i className='bi bi-trash text-white me-1'></i>新增產品
              </button>
              <button
                onClick={confirmDelProduct}
                className='btn btn-primary-500 text-white border deleteButton px-4'
              >
                <i className='bi bi-trash text-white me-1'></i>刪除產品
              </button>
            </div>
          </div>
        </div>

        <div className='table-responsive'>
          <div
            className='table-container'
            data-bs-spy='scroll'
            data-bs-target='#productTableBody'
            data-bs-offset='0'
            tabIndex='0'
          >
            <table className='table productManager rounded-table table-container table-hover'>
              <thead>
                <tr>
                  <th scope='col' style={{ width: '80px' }}>
                    #
                  </th>
                  <th scope='col' style={{ width: '200px' }}>
                    功能鍵
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
                    顏色
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
                </tr>
              </thead>
              <tbody className='border rounded-bottom'>
                {products?.map((product, index) => (
                  <tr className='tableBorder' key={product.id}>
                    {product.id !== editState ? (
                      <>
                        <th scope='col' className='align-middle'>
                          <div className='form-check'>
                            <input
                              onChange={(e) => {
                                handleProductDelInputChange(e, product.id);
                              }}
                              className='form-check-input ms-0'
                              type='checkbox'
                              value={product.id}
                              id={product.id}
                            />
                            <label
                              className='form-check-label'
                              htmlFor={product.id}
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
                              editProductHandler(product);
                            }}
                            disabled={isEditing}
                          >
                            <MdModeEditOutline />
                          </button>
                        </td>
                        <td className='align-middle'>{product.product_num}</td>
                        <td className='align-middle'>{product.title}</td>
                        <td className='align-middle'>{product.category}</td>
                        <td className='align-middle'>{product.grade}</td>
                        <td className='align-middle'>{product.origin_price}</td>
                        <td className='align-middle'>{product.price}</td>
                        <td className='align-middle'>
                          <button
                            className='btn btn-outline-primary btn-sm'
                            onClick={() => {
                              checkProductModalOpen('size', product);
                            }}
                            disabled={isEditing}
                          >
                            查看
                          </button>
                        </td>
                        <td className='align-middle'>
                          <button
                            className='btn btn-outline-primary btn-sm'
                            onClick={() => {
                              checkProductModalOpen('color', product);
                            }}
                            disabled={isEditing}
                          >
                            查看
                          </button>
                        </td>
                        <td className='align-middle'>{product.fin_system}</td>
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
                          <a
                            className='btn'
                            onClick={() => {
                              checkProductModalOpen('photo', product);
                            }}
                          >
                            <img
                              style={{ height: '88px', maxWidth: '88px' }}
                              src={product.imageUrl || null}
                              alt={product.title || null}
                              className='rounded object-fit-cover'
                            />
                          </a>
                        </td>
                        <td className='align-middle'>{product.description}</td>
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
                              confirmEditProduct();
                            }}
                          >
                            <MdCheck />
                          </button>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center '>
                            <input
                              value={tempProduct.product_num}
                              onChange={handleProductPutInputChange}
                              name='product_num'
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
                              value={tempProduct.title}
                              onChange={handleProductPutInputChange}
                              name='title'
                              type='text'
                              style={{ maxWidth: '150px', height: '40px' }}
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <select
                              className='form-select fas-7'
                              value={tempProduct.category}
                              onChange={handleProductPutInputChange}
                              name='category'
                              type='select'
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
                              className='form-select fs-7'
                              value={tempProduct.grade}
                              onChange={handleProductPutInputChange}
                              name='grade'
                              type='select'
                              style={{ maxWidth: '150px', height: '40px' }}
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
                              value={tempProduct.origin_price}
                              onChange={handleProductPutInputChange}
                              name='origin_price'
                              className='form-control fs-7'
                              type='number'
                              style={{ maxWidth: '150px', height: '40px' }}
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <input
                              value={tempProduct.price}
                              onChange={handleProductPutInputChange}
                              name='price'
                              style={{ maxWidth: '150px', height: '40px' }}
                              type='number'
                              className='form-control fs-7'
                            />
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <button
                              className='btn btn-outline-primary btn-sm'
                              onClick={() => {
                                editProductModalOpen('editSize');
                              }}
                            >
                              編輯
                            </button>
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <button
                              className='btn btn-outline-primary btn-sm'
                              onClick={() => {
                                editProductModalOpen(
                                  'editColor',
                                  product.colors
                                );
                              }}
                            >
                              編輯
                            </button>
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='d-flex justify-content-center'>
                            <select
                              value={tempProduct.fin_system}
                              onChange={handleProductPutInputChange}
                              name='fin_system'
                              type='select'
                              style={{ maxWidth: '150px', height: '40px' }}
                              className='form-select fs-7'
                              aria-label='Default select example'
                            >
                              <option value=''>請選擇Fin系統</option>
                              <option value='FCS-1'>FCS-1</option>
                              <option value='FCS-2'>FCS-2</option>
                              <option value='Futures'>Futures</option>
                            </select>
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
                          <a
                            className='btn'
                            onClick={() => {
                              editProductModalOpen('editPhoto', {
                                image: product.imageUrl,
                                images: product.imagesUrl,
                              });
                            }}
                          >
                            <img
                              style={{ height: '88px', width: '88px' }}
                              src={product.imageUrl}
                              className='rounded object-fit-cover'
                            />
                          </a>
                        </td>
                        <td className='align-middle'>
                          <textarea
                            value={tempProduct.description}
                            name='description'
                            onChange={handleProductPutInputChange}
                            style={{ resize: 'none' }}
                            className='form-control fs-7'
                            id='exampleFormControlTextarea1'
                            rows='3'
                          ></textarea>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <AdminPagination />
      </div>
    </>
  );
}

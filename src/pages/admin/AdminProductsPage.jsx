import AdminAddProductModal from '../../components/modal/AdminAddProductModal';
import AdminCheckProductModal from '../../components/modal/AdminCheckProductModal';
import AdminEditProductModal from '../../components/modal/AdminEditProductModal';
import AdminPagination from '../../components/pagination/AdminPagination';
import AdminLoading from '../../components/loadings/AdminLoading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { MdModeEditOutline, MdCheck } from 'react-icons/md';
import {
  setEditProductOpen,
  setAddProductModalOpen,
  setCheckProductOpen,
} from '../../redux/slice/modalSlice';
import {
  adminGetProductsAsync,
  setProductCategory,
} from '../../redux/slice/admin/products/adminGetProductsSlice';
import {
  adminDelProductsAsync,
  setDelProductInputChange,
} from '../../redux/slice/admin/products/adminDelProductSlice';
import {
  setTempProduct,
  adminPutProductAsync,
  setPutProductInputChange,
} from '../../redux/slice/admin/products/adminPutProductSlice';

export default function AdminProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.adminGetProducts.products);
  const tempProduct = useSelector((state) => state.adminPutProduct.tempProduct);
  const [editState, setEditState] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // === 模態框相關功能 ===
  const addProductModalOpen = () => {
    dispatch(setAddProductModalOpen(true));
  };
  const editProductModalOpen = (state, data) => {
    dispatch(setEditProductOpen({ open: true, state, data }));
  };
  const checkProductModalOpen = (state, data) => {
    dispatch(setCheckProductOpen({ open: true, state, data }));
  };

  // === 產品刪除功能 ===
  const handleProductDelInputChange = (e, productId) => {
    const { checked } = e.target;
    dispatch(setDelProductInputChange({ checked, productId }));
  };

  const confirmDelProduct = () => {
    dispatch(adminDelProductsAsync());
  };

  // === 產品編輯功能 ===
  const editProductHandler = (product) => {
    setEditState(product.id);
    dispatch(setTempProduct(product));
  };

  const handleProductPutInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch(setPutProductInputChange({ name, value, checked, type }));
  };
  //確認件送出
  const confirmEditProduct = () => {
    dispatch(adminPutProductAsync());
  };

  // === 產品篩選功能 ===
  const categoryFilterHandler = (newCategory) => {
    dispatch(setProductCategory(newCategory));
    dispatch(adminGetProductsAsync({ page: 1, category: newCategory }));
  };

  // useEffect hook 在組件掛載時獲取產品數據
  useEffect(() => {
    dispatch(adminGetProductsAsync({}));
  }, [dispatch]);

  return (
    <>
      {/* 用於添加、檢查和編輯產品功能的模態框 */}
      <AdminAddProductModal />
      <AdminCheckProductModal />
      <AdminEditProductModal />

      <div>
        {/* 帶有標題和操作按鈕的橫幅部分 */}
        <div className=' banner mb-4'>
          <h5 className='fs-5 mt-4 mb-7'>商品管理</h5>

          <div className='d-flex justify-content-between align-items-center'>
            {/* 產品類別篩選下拉選單 */}
            <select
              className='form-select bg-primary-400 h-100'
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
              {/* 添加產品按鈕 */}
              <button
                onClick={addProductModalOpen}
                className='btn btn-dark text-white border deleteButton px-4 me-4'
              >
                <i className='bi bi-trash text-white me-1'></i>新增產品
              </button>
              {/* 刪除選定產品按鈕 */}
              <button
                onClick={confirmDelProduct}
                className='btn btn-dark text-white border deleteButton px-4'
              >
                <i className='bi bi-trash text-white me-1'></i>刪除產品
              </button>
            </div>
          </div>
        </div>

        {/* 產品表格部分 */}
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
                    新品
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
              <tbody className='rounded-bottom'>
                {/* 遍歷產品並渲染每一行 */}
                {products?.map((product, index) => (
                  <tr className='' key={product.id}>
                    {/* 根據 editState 條件渲染：顯示產品信息或可編輯的輸入字段 */}
                    {product.id !== editState ? (
                      <>
                        {/* 產品選擇複選框和索引 */}
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
                        {/* 編輯產品按鈕 */}
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
                        {/* 產品詳細信息 */}
                        <td className='align-middle'>{product.product_num}</td>
                        <td className='align-middle'>{product.title}</td>
                        <td className='align-middle'>{product.category}</td>
                        <td className='align-middle'>{product.grade}</td>
                        <td className='align-middle'>{product.origin_price}</td>
                        <td className='align-middle'>{product.price}</td>
                        {/* 用於查看尺寸、顏色和圖片詳細信息的按鈕 */}
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
                        {/* 產品狀態（啟用/禁用） */}
                        <td className='align-middle'>
                          {product.is_enabled ? (
                            <span className='text-success'>上架</span>
                          ) : (
                            <span className='text-secondary'>下架</span>
                          )}
                        </td>
                        {/* 新上架產品 */}
                        <td className='align-middle'>
                          {product.is_new_arrivals ? (
                            <span className='text-success'>是</span>
                          ) : (
                            <span className='text-secondary'>否</span>
                          )}
                        </td>
                        {/* 產品折扣狀態 */}
                        <td className='align-middle'>
                          {product.hasDiscount ? (
                            <span className='text-success'>是</span>
                          ) : (
                            <span className='text-secondary'>否</span>
                          )}
                        </td>
                        {/* 帶有查看詳細信息按鈕的產品圖片 */}
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
                        {/* 產品描述 */}
                        <td className='align-middle'>{product.description}</td>
                      </>
                    ) : (
                      <>
                        {/* 編輯產品的行：顯示輸入字段 */}
                        <th scope='row' className='align-middle'>
                          <label className='mt-1'>{index + 1}</label>
                        </th>
                        {/* 確認編輯按鈕 */}
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
                        {/* 產品詳細信息的可編輯輸入字段 */}
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
                        {/* 用於編輯尺寸、顏色和圖片詳細信息的按鈕 */}
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
                        {/* 用於產品狀態和折扣的複選框 */}
                        <td className='align-middle'>
                          <div className='form-check '>
                            <input
                              checked={tempProduct.is_enabled}
                              onChange={handleProductPutInputChange}
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
                          <div className='form-check '>
                            <input
                              checked={tempProduct.is_new_arrivals}
                              onChange={handleProductPutInputChange}
                              name='is_new_arrivals'
                              id='is_new_arrivals'
                              className='form-check-input'
                              type='checkbox'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='is_new_arrivals'
                            >
                              是否為新品
                            </label>
                          </div>
                        </td>
                        <td className='align-middle'>
                          <div className='form-check'>
                            <input
                              checked={tempProduct.hasDiscount}
                              onChange={handleProductPutInputChange}
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
                        {/* 產品描述的可編輯文本區域 */}
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
        {/* 管理員分頁組件 */}
        <AdminPagination pageState={'products'} />
      </div>
    </>
  );
}

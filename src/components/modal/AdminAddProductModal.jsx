import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddProductModalOpen } from '../../redux/slice/modalSlice';
import { MdDeleteOutline } from 'react-icons/md';
import {
  adminPostProductAsync,
  setPostAddColorHandler,
  setPostAddImagesHandler,
  setPostAddSizeHandler,
  setPostColorsInputChange,
  setPostDeleteColorHandler,
  setPostDeleteImagesHandler,
  setPostDeleteSizeHandler,
  setPostImagesInputChange,
  setPostProductInputChange,
  setPostSizesInputChange,
} from '../../redux/slice/admin/products/adminPostProductSlice';
import { adminUploadImageAsync } from '../../redux/slice/admin/products/adminUploadImageSlice';

export default function AdminAddProductModal() {
  const adminAddProductModalLink = useRef(null);
  const adminAddProductModalSelf = useRef(null);
  const modalOpen = useSelector((state) => state.modal.addProductModalOpen);
  const modalData = useSelector((state) => state.adminPostProduct.initData);
  const dispatch = useDispatch();
  //data section

  //data section
  //modal section
  useEffect(() => {
    adminAddProductModalSelf.current = new Modal(
      adminAddProductModalLink.current,
      { backdrop: false }
    );
  }, []);

  useEffect(() => {
    if (modalOpen) {
      adminAddProductModalSelf.current.show();
    }
  }, [modalOpen]);

  const productModalClose = () => {
    adminAddProductModalSelf.current.hide();
    dispatch(setAddProductModalOpen(false));
  };

  //modal section

  //add product section

  const handleProductModalInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch(setPostProductInputChange({ name, value, checked, type }));
  };

  const handleImagesChange = (e, index) => {
    const { value } = e.target;
    dispatch(setPostImagesInputChange({ value, index }));
  };
  const handleSizesChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(setPostSizesInputChange({ name, value, index }));
  };

  const handleColorsChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(setPostColorsInputChange({ name, value, index }));
  };

  const addImagesHandler = () => {
    dispatch(setPostAddImagesHandler());
  };

  const deleteImagesHandler = () => {
    dispatch(setPostDeleteImagesHandler());
  };

  const addSizesHandler = () => {
    dispatch(setPostAddSizeHandler());
  };

  const deleteSizeHandler = (index) => {
    dispatch(setPostDeleteSizeHandler(index));
  };

  const addColorHandler = () => {
    dispatch(setPostAddColorHandler());
  };
  const deleteColorHandler = (index) => {
    dispatch(setPostDeleteColorHandler(index));
  };
  const imageUploadHandler = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    dispatch(adminUploadImageAsync({ file, name }));
  };

  const confirmAddProduct = () => {
    dispatch(adminPostProductAsync());

    //add product section
  };
  return (
    <>
      <div
        ref={adminAddProductModalLink}
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
                onClick={productModalClose}
              ></button>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-sm-4'>
                  <div className='mb-2'>
                    <div className='mb-5'>
                      <label htmlFor='fileInput' className='form-label '>
                        圖片上傳
                      </label>
                      <input
                        name='file'
                        type='file'
                        accept='.jpg,.jpeg,.png'
                        className='form-control '
                        id='fileInput'
                        onChange={imageUploadHandler}
                      />
                    </div>
                    <div className='mb-5'>
                      <h5>主圖</h5>
                      <label htmlFor='imageUrl' className='form-label'>
                        輸入圖片網址
                      </label>
                      <input
                        value={modalData.imageUrl}
                        onChange={handleProductModalInputChange}
                        name='imageUrl'
                        type='text'
                        className='form-control'
                        placeholder='請輸入圖片連結'
                      />
                    </div>
                    {modalData.imageUrl && ( //src 不可為空字串會出錯當有值的時候再渲染
                      <img
                        className='img-fluid'
                        src={modalData.imageUrl}
                        alt='surfboard'
                      />
                    )}

                    <div className='mb-5'>
                      <label htmlFor='fileInput' className='form-label '>
                        圖片上傳
                      </label>
                      <input
                        name='files'
                        type='file'
                        accept='.jpg,.jpeg,.png'
                        className='form-control '
                        id='fileInput'
                        onChange={imageUploadHandler}
                      />
                    </div>
                    <div className='mb-5'>
                      <h5>副圖</h5>
                      <div className='border border-2 border-dashed rounded-3 p-3'>
                        {modalData.imagesUrl?.map((image, index) => (
                          <div key={index} className='mb-2'>
                            <label
                              htmlFor={`imagesUrl-${index + 1}`}
                              className='form-label'
                            >
                              副圖 {index + 1}
                            </label>
                            <input
                              value={image}
                              onChange={(e) => handleImagesChange(e, index)}
                              id={`imagesUrl-${index + 1}`}
                              type='text'
                              placeholder={`圖片網址 ${index + 1}`}
                              className='form-control mb-2'
                            />

                            {image && (
                              <img
                                src={image}
                                alt={`副圖 ${index + 1}`}
                                className='img-fluid mb-2'
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='btn-group w-100'>
                    {modalData.imagesUrl.length < 5 &&
                      modalData.imagesUrl[modalData.imagesUrl.length - 1] !==
                        '' && (
                        <button
                          className='btn btn-outline-accent-300 btn-sm d-block'
                          onClick={addImagesHandler}
                        >
                          新增圖片
                        </button>
                      )}
                    {modalData.imagesUrl.length > 1 && (
                      <button
                        className='btn btn-outline-accent-200 btn-sm d-block'
                        onClick={deleteImagesHandler}
                      >
                        刪除圖片
                      </button>
                    )}
                  </div>
                </div>
                <div className='col-sm-8'>
                  <div className='mb-5'>
                    <label htmlFor='title' className='form-label h5'>
                      標題
                    </label>
                    <input
                      value={modalData.title}
                      onChange={handleProductModalInputChange}
                      name='title'
                      id='title'
                      type='text'
                      className='form-control'
                      placeholder='請輸入標題'
                    />
                  </div>
                  <div className='row'>
                    <div className='mb-5 col-md-6'>
                      <label htmlFor='category' className='form-label h5'>
                        分類
                      </label>
                      <select
                        value={modalData.category}
                        onChange={handleProductModalInputChange}
                        name='category'
                        id='category'
                        type='select'
                        className='form-select w-100'
                      >
                        <option value=''>請選擇類別</option>
                        <option value='longBoard'>longBoard</option>
                        <option value='shortBoard'>shortBoard</option>
                        <option value='midLength'>midLength</option>
                      </select>
                    </div>
                    <div className='mb-5 col-md-6'>
                      <label htmlFor='unit' className='form-label h5'>
                        單位
                      </label>
                      <input
                        value={modalData.unit}
                        onChange={handleProductModalInputChange}
                        name='unit'
                        id='unit'
                        type='text'
                        className='form-control'
                        placeholder='請輸入單位'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-5 col-md-6'>
                      <label htmlFor='origin_price' className='form-label h5'>
                        原價
                      </label>
                      <input
                        value={modalData.origin_price}
                        onChange={handleProductModalInputChange}
                        name='origin_price'
                        id='origin_price'
                        type='number'
                        min='0'
                        className='form-control'
                        placeholder='請輸入原價'
                      />
                    </div>
                    <div className='mb-5 col-md-6'>
                      <label htmlFor='price' className='form-label h5'>
                        售價
                      </label>
                      <input
                        value={modalData.price}
                        onChange={handleProductModalInputChange}
                        name='price'
                        id='price'
                        type='number'
                        min='0'
                        className='form-control'
                        placeholder='請輸入售價'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-5 col-md-6'>
                      <label htmlFor='grade' className='form-label h5'>
                        衝浪板分級
                      </label>
                      <select
                        value={modalData.grade}
                        onChange={handleProductModalInputChange}
                        name='grade'
                        id='grade'
                        type='select'
                        className='form-select w-100'
                      >
                        <option value=''>請幫衝浪板分級</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='C'>C</option>
                      </select>
                    </div>
                    <div className='mb-5 col-md-6'>
                      <label htmlFor='fin_system' className='form-label h5'>
                        fin系統
                      </label>
                      <select
                        value={modalData.fin_system}
                        onChange={handleProductModalInputChange}
                        name='fin_system'
                        id='fin_system'
                        type='select'
                        className='form-select w-100'
                      >
                        <option value=''>請選擇Fin系統</option>
                        <option value='FCS-1'>FCS-1</option>
                        <option value='FCS-2'>FCS-2</option>
                        <option value='Futures'>Futures</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-5 col-md-6'>
                      <label htmlFor='product_num' className='form-label h5'>
                        產品編號
                      </label>
                      <input
                        value={modalData.product_num}
                        onChange={handleProductModalInputChange}
                        name='product_num'
                        id='product_num'
                        type='number'
                        min='0'
                        className='form-control'
                        placeholder='請輸入原價'
                      />
                    </div>
                  </div>
                  <hr />
                  <h5>衝浪板尺寸</h5>
                  <div className='row gy-7 py-7'>
                    {modalData?.sizes?.map((size, index) => {
                      const sizeMatch =
                        size?.size?.match(/^\d+'\d+"/) ||
                        size?.size?.match(/^\d+'/);
                      return (
                        <div className='col-md-6' key={index}>
                          <div className='card bg-primary-500 border border-light'>
                            <div className='card-body p-2'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <h6 className='card-title mt-0 mb-0'>
                                  {sizeMatch}
                                </h6>
                                {modalData.sizes.length > 1 && (
                                  <button
                                    className='btn'
                                    onClick={() => deleteSizeHandler(index)}
                                  >
                                    <MdDeleteOutline />
                                  </button>
                                )}
                              </div>
                              <div className='input-group input-group-sm py-2'>
                                <span
                                  className='input-group-text'
                                  id='basic-addon1'
                                >
                                  尺寸
                                </span>
                                <input
                                  onChange={(e) => handleSizesChange(e, index)}
                                  value={size.size}
                                  name='size'
                                  type='text'
                                  className='form-control'
                                  placeholder='請輸入尺寸'
                                  aria-label='size'
                                  aria-describedby='basic-addon1'
                                />
                              </div>
                              <div className='input-group input-group-sm'>
                                <span
                                  className='input-group-text'
                                  id='basic-addon1'
                                >
                                  庫存
                                </span>
                                <input
                                  onChange={(e) => handleSizesChange(e, index)}
                                  value={size.stock}
                                  name='stock'
                                  type='number'
                                  className='form-control'
                                  placeholder='請輸入庫存'
                                  min='0'
                                  aria-label='stock'
                                  aria-describedby='basic-addon1'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className='btn-group w-100 '>
                    {modalData.sizes.length < 10 && (
                      <button
                        onClick={addSizesHandler}
                        className='btn btn-outline-secondary btn-sm d-block'
                        type='button'
                      >
                        新增
                      </button>
                    )}
                  </div>
                  <hr />
                  <h5>衝浪板顏色</h5>
                  <div className='row py-7 gy-7'>
                    {modalData.colors?.map((color, index) => {
                      return (
                        <div className='col-md-6' key={index}>
                          <div className='card bg-primary-500 border border-light'>
                            <div className='card-body p-2'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <div
                                  style={{
                                    height: '20px',
                                    maxWidth: '100px',
                                    backgroundColor: color.colorCode,
                                  }}
                                  className='rounded-pill w-100'
                                ></div>
                                {modalData.colors.length > 1 && (
                                  <button
                                    className='btn'
                                    onClick={() => {
                                      deleteColorHandler(index);
                                    }}
                                  >
                                    <MdDeleteOutline />
                                  </button>
                                )}
                              </div>
                              <div className='input-group input-group-sm py-2'>
                                <span
                                  className='input-group-text'
                                  id='basic-addon1'
                                >
                                  顏色名稱
                                </span>
                                <input
                                  onChange={(e) => {
                                    handleColorsChange(e, index);
                                  }}
                                  value={color.colorName}
                                  name='colorName'
                                  type='text'
                                  className='form-control'
                                  placeholder='請輸入顏色名稱'
                                  aria-label='Username'
                                  aria-describedby='basic-addon1'
                                />
                              </div>
                              <div className='input-group input-group-sm'>
                                <span
                                  className='input-group-text'
                                  id='basic-addon1'
                                >
                                  顏色色號
                                </span>
                                <input
                                  onChange={(e) => {
                                    handleColorsChange(e, index);
                                  }}
                                  value={color.colorCode}
                                  name='colorCode'
                                  type='text'
                                  className='form-control'
                                  placeholder='請輸入色號'
                                  aria-label='stock'
                                  aria-describedby='basic-addon1'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className='btn-group w-100'>
                    {modalData.colors.length < 10 && (
                      <button
                        onClick={addColorHandler}
                        className='btn btn-outline-secondary btn-sm d-block'
                        type='button'
                      >
                        新增
                      </button>
                    )}
                  </div>

                  <hr />
                  <div className='mb-5'>
                    <label htmlFor='description' className='form-label h5'>
                      產品描述
                    </label>
                    <textarea
                      value={modalData.description}
                      onChange={handleProductModalInputChange}
                      name='description'
                      id='description'
                      className='form-control'
                      placeholder='請輸入產品描述'
                    ></textarea>
                  </div>
                  <div className='mb-5'>
                    <label htmlFor='content' className='form-label h5'>
                      說明內容
                    </label>
                    <textarea
                      value={modalData.content}
                      onChange={handleProductModalInputChange}
                      name='content'
                      id='content'
                      className='form-control'
                      placeholder='請輸入說明內容'
                    ></textarea>
                  </div>
                  <div className='row'>
                    <div className='mb-5 col-md-6'>
                      <div className='form-check'>
                        <input
                          checked={modalData.is_enabled}
                          onChange={handleProductModalInputChange}
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
                    <div className='mb-5 col-md-6'>
                      <div className='form-check'>
                        <input
                          checked={modalData.hasDiscount}
                          onChange={handleProductModalInputChange}
                          name='hasDiscount'
                          id='hasDiscount'
                          className='form-check-input'
                          type='checkbox'
                        />
                        <label
                          className='form-check-label h6'
                          htmlFor='hasDiscount'
                        >
                          是否啟用折價卷
                        </label>
                      </div>
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
                onClick={productModalClose}
              >
                取消
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={confirmAddProduct}
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

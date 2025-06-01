import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProductOpen } from '../../redux/slice/modalSlice';
import { MdDeleteOutline } from 'react-icons/md';
import {
  setPutAddColorHandler,
  setPutAddImagesHandler,
  setPutAddSizeHandler,
  setPutColorsInputChange,
  setPutDeleteColorHandler,
  setPutDeleteImagesHandler,
  setPutDeleteSizeHandler,
  setPutImagesInputChange,
  setPutProductInputChange,
  setPutSizesInputChange,
} from '../../redux/slice/admin/products/adminPutProductSlice';
import { adminUploadImageAsync } from '../../redux/slice/admin/products/adminUploadImageSlice';

export default function AdminEditProductModal() {
  const adminEditProductModalLink = useRef(null);
  const adminEditProductModalSelf = useRef(null);
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.editProductModalOpen);
  const tempProduct = useSelector((state) => state.adminPutProduct.tempProduct);

  //modal 相關

  useEffect(() => {
    adminEditProductModalSelf.current = new Modal(
      adminEditProductModalLink.current,
      { backdrop: false }
    );
  }, []);

  useEffect(() => {
    if (modalOpen.open) {
      adminEditProductModalSelf.current.show();
    }
  }, [modalOpen.open]);

  const editProductClose = () => {
    adminEditProductModalSelf.current.hide();
    dispatch(setEditProductOpen({ ...modalOpen, open: false }));
  };

  //modal 相關

  //一般修改

  const handleProductPutInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch(setPutProductInputChange({ name, value, checked, type }));
  };

  //一般修改

  //編輯修改尺寸

  const handleSizesChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(setPutSizesInputChange({ name, value, index }));
  };

  const addSizesHandler = () => {
    dispatch(setPutAddSizeHandler());
  };

  const deleteSizeHandler = (index) => {
    dispatch(setPutDeleteSizeHandler(index));
  };

  //編輯修改尺寸

  //編輯修改顏色
  const handleColorsChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(setPutColorsInputChange({ name, value, index }));
  };

  const addColorHandler = () => {
    dispatch(setPutAddColorHandler());
  };

  const deleteColorHandler = (index) => {
    dispatch(setPutDeleteColorHandler(index));
  };

  //編輯修改顏色

  //編輯修改圖片
  const imageUploadHandler = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    dispatch(adminUploadImageAsync({ file, name }));
  };

  const handleImagesChange = (e, index) => {
    const { value } = e.target;
    dispatch(setPutImagesInputChange({ value, index }));
  };

  const addImagesHandler = () => {
    dispatch(setPutAddImagesHandler());
  };
  const deleteImagesHandler = () => {
    dispatch(setPutDeleteImagesHandler());
  };

  //編輯修改圖片

  return (
    <>
      <div
        className='modal fade'
        ref={adminEditProductModalLink}
        style={{ background: 'rgba(0,0,0,0.5)' }}
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                {' '}
                {(modalOpen.state === 'editSize' && '修改尺寸') ||
                  (modalOpen.state === 'editColor' && '修改顏色') ||
                  (modalOpen.state === 'editPhoto' && '修改圖片')}
              </h5>
              <button
                onClick={editProductClose}
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {modalOpen.state === 'editSize' && (
                <>
                  <div className='row gy-7 py-7'>
                    {tempProduct.sizes.map((size, index) => {
                      const sizeMatch =
                        size.size.match(/^\d+'\d+"/) ||
                        size.size.match(/^\d+'/);
                      return (
                        <div className='col-md-6' key={index}>
                          <div className='card bg-primary-500 border border-light'>
                            <div className='card-body p-2'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <h6 className='card-title mt-0 mb-0'>
                                  {sizeMatch}
                                </h6>
                                {tempProduct.sizes.length > 1 && (
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
                    {tempProduct?.sizes?.length < 10 && (
                      <button
                        onClick={addSizesHandler}
                        className='btn btn-outline-secondary btn-sm d-block'
                        type='button'
                      >
                        新增
                      </button>
                    )}
                  </div>
                </>
              )}
              {modalOpen.state === 'editColor' && (
                <>
                  <div className='row py-7 gy-7'>
                    {tempProduct?.colors?.map((color, index) => {
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
                                {tempProduct.colors.length > 1 && (
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
                    {tempProduct.colors.length < 10 && (
                      <button
                        onClick={addColorHandler}
                        className='btn btn-outline-secondary btn-sm d-block'
                        type='button'
                      >
                        新增
                      </button>
                    )}
                  </div>
                </>
              )}
              {modalOpen.state === 'editPhoto' && (
                <div>
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
                        value={modalOpen.image}
                        onChange={handleProductPutInputChange}
                        name='imageUrl'
                        type='text'
                        className='form-control'
                        placeholder='請輸入圖片連結'
                      />
                    </div>
                    {tempProduct.imageUrl && ( //src 不可為空字串會出錯當有值的時候再渲染
                      <img
                        className='img-fluid'
                        src={tempProduct.imageUrl}
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
                        {tempProduct.imagesUrl?.map((image, index) => (
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
                    {tempProduct.imagesUrl.length < 5 &&
                      tempProduct.imagesUrl[
                        tempProduct.imagesUrl.length - 1
                      ] !== '' && (
                        <button
                          className='btn btn-outline-accent-300 btn-sm d-block'
                          onClick={addImagesHandler}
                        >
                          新增圖片
                        </button>
                      )}
                    {tempProduct.imagesUrl.length > 1 && (
                      <button
                        className='btn btn-outline-accent-200 btn-sm d-block'
                        onClick={deleteImagesHandler}
                      >
                        刪除圖片
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={editProductClose}
              >
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

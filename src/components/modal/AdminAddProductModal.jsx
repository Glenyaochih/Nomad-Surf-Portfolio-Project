import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductModalOpen } from '../../redux/slice/modalSlice';

export default function AdminAddProductModal() {
  const adminAddProductModalLink = useRef(null);
  const adminAddProductModalSelf = useRef(null);
  const modalOpen = useSelector((state) => state.modal.productModalOpen);
  const dispatch = useDispatch();
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
    dispatch(setProductModalOpen(false));
  };

  return (
    <>
      <div
        ref={adminAddProductModalLink}
        className='modal fade'
        tabIndex='-1'
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        aria-hidden='true'
      >
        <div className='modal-dialog modal-xl modal-dialog-scrollable'>
          <div className='modal-content border-0'>
            <div className='modal-header bg-dark text-white'>
              <h5 id='productModalLabel' className='modal-title'>
                {/* <span>{modalType === 'create' ? '新增產品' : '編輯產品'}</span> */}
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
                      <label htmlFor='fileInput' className='form-label'>
                        {' '}
                        圖片上傳{' '}
                      </label>
                      <input
                        type='file'
                        accept='.jpg,.jpeg,.png'
                        className='form-control'
                        id='fileInput'
                        // onChange={fileUpdateHandler}
                      />
                    </div>
                    <div className='mb-3'>
                      <h5>主圖</h5>
                      <label htmlFor='imageUrl' className='form-label'>
                        輸入圖片網址
                      </label>
                      <input
                        // value={modalData.imageUrl}
                        // onChange={handleModalInputChange}
                        name='imageUrl'
                        type='text'
                        className='form-control'
                        placeholder='請輸入圖片連結'
                      />
                    </div>
                    <img
                      className='img-fluid'
                      // src={modalData.imageUrl}
                      alt=''
                    />
                    <div className='mb-3'>
                      <h5>副圖</h5>
                      <div className='border border-2 border-dashed rounded-3 p-3'>
                        {/* {modalData.imagesUrl?.map((image, index) => (
                          <div key={index} className='mb-2'>
                            <label
                              htmlFor={`imagesUrl-${index + 1}`}
                              className='form-label'
                            >
                              副圖 {index + 1}
                            </label>
                            <input
                              value={image}
                              onChange={(e) => handleImageChange(e, index)}
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
                        ))} */}
                      </div>
                    </div>
                  </div>
                  <div className='btn-group w-100'>
                    {/* {modalData.imagesUrl.length < 5 &&
                      modalData.imagesUrl[modalData.imagesUrl.length - 1] !==
                        '' && (
                        <button
                          className='btn btn-outline-primary btn-sm d-blocks'
                          onClick={addImageHandler}
                        >
                          新增圖片
                        </button>
                      )}
                    {modalData.imagesUrl.length > 1 && (
                      <button
                        className='btn btn-outline-danger btn-sm d-block'
                        onClick={removeImageHandler}
                      >
                        刪除圖片
                      </button>
                    )} */}
                  </div>
                </div>
                <div className='col-sm-8'>
                  <div className='mb-3'>
                    <label htmlFor='title' className='form-label h5'>
                      標題
                    </label>
                    <input
                      // value={modalData.title}
                      // onChange={handleModalInputChange}
                      name='title'
                      id='title'
                      type='text'
                      className='form-control'
                      placeholder='請輸入標題'
                    />
                  </div>

                  <div className='row'>
                    <div className='mb-3 col-md-6'>
                      <label htmlFor='category' className='form-label h5'>
                        分類
                      </label>
                      <input
                        // value={modalData.category}
                        // onChange={handleModalInputChange}
                        name='category'
                        id='category'
                        type='text'
                        className='form-control'
                        placeholder='請輸入分類'
                      />
                    </div>
                    <div className='mb-3 col-md-6'>
                      <label htmlFor='unit' className='form-label h5'>
                        單位
                      </label>
                      <input
                        // value={modalData.unit}
                        // onChange={handleModalInputChange}
                        name='unit'
                        id='unit'
                        type='text'
                        className='form-control'
                        placeholder='請輸入單位'
                      />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='mb-3 col-md-6'>
                      <label htmlFor='origin_price' className='form-label h5'>
                        原價
                      </label>
                      <input
                        // value={modalData.origin_price}
                        // onChange={handleModalInputChange}
                        name='origin_price'
                        id='origin_price'
                        type='number'
                        min='0'
                        className='form-control'
                        placeholder='請輸入原價'
                      />
                    </div>
                    <div className='mb-3 col-md-6'>
                      <label htmlFor='price' className='form-label h5'>
                        售價
                      </label>
                      <input
                        // value={modalData.price}
                        // onChange={handleModalInputChange}
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
                    <div className='mb-3 col-md-6'>
                      <label htmlFor='grade' className='form-label h5'>
                        衝浪板分級
                      </label>
                      <input
                        // value={modalData.origin_price}
                        // onChange={handleModalInputChange}
                        name='grade'
                        id='grade'
                        type='text'
                        min='0'
                        className='form-control'
                        placeholder='請輸入級別'
                      />
                    </div>
                    <div className='mb-3 col-md-6'>
                      <label htmlFor='fin_system' className='form-label h5'>
                        fin系統
                      </label>
                      <select
                        // value={modalData.price}
                        // onChange={handleModalInputChange}
                        name='fin_system'
                        id='fin_system'
                        type='number'
                        min='0'
                        className='form-select w-100'
                        placeholder='請輸入售價'
                      >
                        <option value='1'>One</option>
                        <option value='2'>Two</option>
                        <option value='3'>Three</option>
                      </select>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='mb-3 col-md-6'>
                      <label htmlFor='size' className='form-label h5'>
                        尺寸
                      </label>
                      <input
                        // value={modalData.origin_price}
                        // onChange={handleModalInputChange}
                        name='size'
                        id='size'
                        type='text'
                        min='0'
                        className='form-control'
                        placeholder={'5\'6" x 18 3/4" x 2 3/8" x 26.3L'}
                      />
                    </div>
                    <div className='mb-3 col-md-6'>
                      <label htmlFor='color' className='form-label h5'>
                        顏色
                      </label>
                      <input
                        // value={modalData.price}
                        // onChange={handleModalInputChange}
                        name='color'
                        id='color'
                        type='text'
                        min='0'
                        className='form-control'
                        placeholder='請輸入售價'
                      />
                    </div>
                  </div>

                  <hr />

                  <div className='mb-3'>
                    <label htmlFor='description' className='form-label h5'>
                      產品描述
                    </label>
                    <textarea
                      // value={modalData.description}
                      // onChange={handleModalInputChange}
                      name='description'
                      id='description'
                      className='form-control'
                      placeholder='請輸入產品描述'
                    ></textarea>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='content' className='form-label h5'>
                      說明內容
                    </label>
                    <textarea
                      // value={modalData.content}
                      // onChange={handleModalInputChange}
                      name='content'
                      id='content'
                      className='form-control'
                      placeholder='請輸入說明內容'
                    ></textarea>
                  </div>
                  <div className='mb-3'>
                    <div className='form-check'>
                      <input
                        // checked={modalData.is_enabled}
                        // onChange={handleModalInputChange}
                        name='is_enabled'
                        id='is_enabled'
                        className='form-check-input'
                        type='checkbox'
                      />
                      <label className='form-check-label' htmlFor='is_enabled'>
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
                onClick={productModalClose}
              >
                取消
              </button>
              <button
                type='button'
                className='btn btn-primary'
                // onClick={updateProductConfirm}
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

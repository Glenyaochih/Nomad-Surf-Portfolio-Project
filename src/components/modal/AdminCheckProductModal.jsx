import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckProductOpen } from '../../redux/slice/modalSlice';

export default function AdminCheckProductModal() {
  const adminCheckProductModalLink = useRef(null);
  const adminCheckProductModalSelf = useRef(null);
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.checkProductModalOpen);
  const tempData = useSelector(
    (state) => state.modal.checkProductModalOpen.data
  );

  useEffect(() => {
    adminCheckProductModalSelf.current = new Modal(
      adminCheckProductModalLink.current,
      { backdrop: false }
    );
  }, []);

  useEffect(() => {
    if (modalOpen.open) {
      adminCheckProductModalSelf.current.show();
    }
  }, [modalOpen.open]);

  const checkProductClose = () => {
    adminCheckProductModalSelf.current.hide();
    dispatch(setCheckProductOpen({ ...modalOpen, open: false }));
  };

  return (
    <>
      <div
        className='modal fade'
        ref={adminCheckProductModalLink}
        style={{ background: 'rgba(0,0,0,0.5)' }}
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                {(modalOpen.state === 'size' && '尺寸') ||
                  (modalOpen.state === 'color' && '顏色') ||
                  (modalOpen.state === 'photo' && '圖片')}
              </h5>
              <button
                onClick={checkProductClose}
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='close'
              ></button>
            </div>
            <div className='modal-content'>
              {modalOpen.state === 'size' &&
                tempData?.sizes?.map((size) => {
                  return (
                    <>
                      <div key={size.id}>
                        <p>{size.size}</p>
                        <p>{size.stock}</p>
                      </div>
                    </>
                  );
                })}
              {modalOpen.state === 'color' &&
                tempData?.colors?.map((color, index) => {
                  return (
                    <>
                      <div key={index}>
                        <p>{color.colorName}</p>
                        <p>{color.colorCode}</p>
                      </div>
                    </>
                  );
                })}
              {modalOpen.state === 'photo' && (
                <>
                  <img src={tempData.imageUrl} alt='surfboard' />
                  {tempData.imagesUrl.map((photo, index) => {
                    return <img key={index} src={photo} alt='surfboard' />;
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

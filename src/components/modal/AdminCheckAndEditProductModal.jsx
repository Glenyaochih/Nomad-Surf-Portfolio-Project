import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckAndEditProductOpen } from '../../redux/slice/modalSlice';

export default function AdminEditProductModal() {
  const adminEditProductSizeModalLink = useRef(null);
  const adminEditProductSizeModalSelf = useRef(null);
  const dispatch = useDispatch();
  const modalOpen = useSelector(
    (state) => state.modal.checkAndEditProductModalOpen
  );

  useEffect(() => {
    adminEditProductSizeModalSelf.current = new Modal(
      adminEditProductSizeModalLink.current,
      { backdrop: false }
    );
  }, []);

  useEffect(() => {
    if (modalOpen.open) {
      adminEditProductSizeModalSelf.current.show();
    }
  }, [modalOpen.open]);

  const editProductClose = () => {
    adminEditProductSizeModalSelf.current.hide();
    dispatch(setCheckAndEditProductOpen({ ...modalOpen, open: false }));
  };

  const productsItemStateHandler = () => {
    switch (modalOpen.state) {
      case 'size':
        return '尺寸';
      case 'color':
        return '顏色';
      case 'editSize':
        return '修改尺寸';
      case 'editColor':
        return '修改顏色';
      default:
        break;
    }
  };
  return (
    <>
      <div
        className='modal fade'
        ref={adminEditProductSizeModalLink}
        style={{ background: 'rgba(0,0,0,0.5)' }}
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{productsItemStateHandler()}</h5>
              <button
                onClick={editProductClose}
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <p>Modal body text goes here.</p>
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

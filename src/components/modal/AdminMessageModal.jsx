import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';

export default function AdminMessageModal({
  isOpen,
  setIsOpen,
  items,
  itemName,
  isDelAll,
  action,
  idContainer,
  deleteTitle,
}) {
  const messageModalLink = useRef(null);
  const messageModalSelf = useRef(null);
  const closeMessageModal = () => {
    setIsOpen(false);
    messageModalSelf.current.hide();
  };
  //監聽html元素
  useEffect(() => {
    messageModalSelf.current = new Modal(messageModalLink.current, {
      backdrop: false,
    });
  }, []);
  //modal 開啟
  useEffect(() => {
    if (isOpen) {
      messageModalSelf.current.show();
    }
  }, [isOpen]);

  return (
    <div
      ref={messageModalLink}
      className='modal fade'
      id='delProductModal'
      tabIndex='-1'
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5'>{deleteTitle}</h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={closeMessageModal}
            ></button>
          </div>
          <div className='modal-body'>
            {isDelAll ? (
              <p className='mb-1'>你是否要刪除全部訂單</p>
            ) : (
              <div>
                <p className='mb-1'>你是否要刪除</p>
                {items
                  .filter((item) => {
                    return idContainer.includes(item.id);
                  }) //先將id過濾
                  .map((item) => {
                    //一個一個渲染
                    return (
                      <p className='text-danger fw-bold mb-1'>
                        {item[itemName]}
                      </p>
                    );
                  })}
              </div>
            )}
          </div>
          <div className='modal-footer'>
            <button
              onClick={closeMessageModal}
              type='button'
              className='btn btn-secondary'
            >
              取消
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => {
                return (
                  action(),
                  setIsOpen(false),
                  messageModalSelf.current.hide()
                );
              }}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

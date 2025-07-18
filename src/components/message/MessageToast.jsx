import { useSelector } from 'react-redux';
import { selectMessages } from '../../redux/slice/message/messageSelectors';

export default function MessageToast() {
  const messages = useSelector(selectMessages);

  return (
    <>
      <div className='toast-container position-fixed bottom-0 end-0 p-3'>
        {messages?.map((msg) => {
          return (
            <div
              key={msg.id}
              id='liveToast'
              className='toast show '
              role='alert'
              aria-live='assertive'
              aria-atomic='true'
            >
              <div className={`toast-header text-neutral-80 bg-${msg.type}`}>
                <img
                  style={{ maxWidth: '20px' }}
                  src='img/logo/nomad-logo-black.svg'
                  className='rounded me-2'
                  alt='Nomad logo'
                />
                <strong className='me-auto'>Nomad</strong>
                <small>{msg.title}</small>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='toast'
                  aria-label='Close'
                ></button>
              </div>
              <div className='toast-body'>
                <p>{msg.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

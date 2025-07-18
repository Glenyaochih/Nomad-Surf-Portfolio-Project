import { PulseLoader } from 'react-spinners';

export default function ScreenLoading({ loadingSource, color, size }) {
  return (
    <>
      {loadingSource && (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.6)',
            zIndex: 9999,
          }}
        >
          <PulseLoader
            loading={true}
            color={color}
            size={size}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      )}
    </>
  );
}

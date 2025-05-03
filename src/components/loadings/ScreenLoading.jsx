import { useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';

export default function ScreenLoading() {
  const isScreenLoading = useSelector((state) => state.loading.isScreenLoading);

  return (
    <>
      {isScreenLoading && (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            zIndex: 999,
          }}
        >
          <BarLoader
            color='black'
            loading={true}
            size={64}
            aria-label='Loading Spinner'
          />
        </div>
      )}
    </>
  );
}

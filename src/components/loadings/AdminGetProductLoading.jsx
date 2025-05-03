import { useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
export default function AdminGetProductLoading() {
  const getProductLoading = useSelector(
    (state) => state.loading.isAdminGetProductLoading
  );

  return (
    <>
      {getProductLoading && (
        <div
          className='position-absolute d-flex justify-content-center align-items-center'
          style={{
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

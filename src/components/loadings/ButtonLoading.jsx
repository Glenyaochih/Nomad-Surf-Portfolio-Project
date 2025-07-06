import { MoonLoader } from 'react-spinners';

export default function ButtonLoading({ loadingSource, color, size }) {
  return (
    <>
      {loadingSource && (
        <div className='d-flex justify-content-center align-items-center'>
          <MoonLoader
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

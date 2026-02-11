import { useMap } from 'react-leaflet';

export default function ZoomButton() {
  const map = useMap();
  return (
    <>
      <div
        className='btn-group-vertical'
        role='group'
        aria-label='Vertical button group'
      >
        <button
          type='button'
          className='btn btn-light'
          onClick={() => map.zoomIn()}
        >
          +
        </button>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => map.zoomOut()}
        >
          -
        </button>
      </div>
    </>
  );
}

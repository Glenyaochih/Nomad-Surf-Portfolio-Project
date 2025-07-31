import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function ShowerMapPage() {
  return (
    <>
      <div className='shower-map'>
        <div className='container'>
          <div className='py-4'>
            <nav aria-label='breadcrumb '>
              <ol className='breadcrumb mb-0'>
                <li className='breadcrumb-item'>
                  <a className='fs-8 fs-lg-7' href='#'>
                    首頁
                  </a>
                </li>
                <li
                  className='breadcrumb-item active fs-8 fs-lg-7'
                  aria-current='page'
                >
                  盥洗地圖
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div>
          <MapContainer center={[51.505, -0.09]} zoom={13}>
            <div className='container'></div>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
          </MapContainer>
        </div>
      </div>
    </>
  );
}

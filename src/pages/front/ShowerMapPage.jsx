import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import RecommendCarousel from '../../components/carousel/RecommendCarousel';
import SearchBar from '../../components/searchBar/searchBar';
import { useState } from 'react';
import {
  MdAccessTime,
  MdOutlineLocationOn,
  MdPhone,
  MdCheckCircle,
  MdLocalParking,
} from 'react-icons/md';
import ZoomButton from '../../components/button/ZoomButton';
import L from 'leaflet';
import ShowerMapFilter from '../../components/dropdown/ShowerMapFilter';
export default function ShowerMapPage() {
  const [showMapSearch01, setShowMapSearch01] = useState(false);
  const [showMapSearch02, setShowMapSearch02] = useState(false);
  //客製化Icon
  const customIcon = new L.Icon({
    iconUrl: '/public/img/map/toilet.png',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
  //control or command + 滾動輪滾動地圖
  const leafletMap = (map) => {
    const LMap = map.target;
    LMap.getContainer().addEventListener('wheel', (e) => {
      if (e.ctrlKey) {
        LMap.scrollWheelZoom.enable();
      } else {
        LMap.scrollWheelZoom.disable();
      }
    });
  };

  return (
    <>
      <div className='shower-map'>
        <div className='container py-5 pt-sm-7 pb-sm-9'>
          <div className='py-0 py-sm-4'>
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
        <section className='flex-grow-1'>
          <MapContainer
            center={[23.47, 120.95444]}
            zoom={8}
            scrollWheelZoom={false}
            whenReady={leafletMap}
            zoomControl={false}
            className='z-0'
          >
            {/* 客製化UI */}
            <div className='container pt-7 pt-sm-9 h-100'>
              <div className='d-none d-sm-flex'>
                {/* 放大縮小按鍵 */}
                <div className='shower-map-z-index me-7'>
                  <ZoomButton />
                </div>
                {/* 搜尋框 */}
                <div className='shower-map-z-index'>
                  <SearchBar
                    showInput={showMapSearch01}
                    setShowInput={setShowMapSearch01}
                  />
                </div>
                {/* 篩選器 */}
                <div className='shower-map-z-index ms-auto'>
                  <ShowerMapFilter />
                </div>
              </div>

              <div className='d-sm-none d-flex flex-column pb-10 h-100'>
                <div className='shower-map-z-index '>
                  <SearchBar
                    showInput={showMapSearch02}
                    setShowInput={setShowMapSearch02}
                  />
                </div>
                <div className='d-flex mt-auto'>
                  <div className='shower-map-z-index'>
                    <ZoomButton />
                  </div>
                  <div className='shower-map-z-index ms-auto'>
                    <ShowerMapFilter />
                  </div>
                </div>
              </div>
            </div>
            {/* 圖資層 */}
            <TileLayer
              className='mt-auto'
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            />
            <Marker
              position={[24.43204436638926, 120.6178099558209]}
              icon={customIcon}
            >
              <Popup className='p-0 object-fit'>
                <h5 className='fw-semibold fs-7'>61衝浪</h5>
                <hr />
                <ul className='p-0'>
                  <li className='mb-1'>
                    <span>
                      <MdAccessTime size={18} className='me-1' />
                    </span>
                    <span className='fw-semibold align-middle'>開放時間</span>
                    <span className='ms-1 d align-middle'>09:00~18:00</span>
                  </li>
                  <li className='mb-1'>
                    <span>
                      <MdOutlineLocationOn size={18} className='me-1' />
                    </span>
                    <span className='fw-semibold align-middle'>地址</span>
                    <span className='ms-1 align-middle'>09:00~18:00</span>
                  </li>
                  <li className='mb-1'>
                    <span>
                      <MdPhone size={18} className='me-1' />
                    </span>
                    <span className='fw-semibold align-middle'>電話</span>
                    <span className='ms-1 align-middle'>09:00~18:00</span>
                  </li>
                  <li className='mb-1'>
                    <span>
                      <MdCheckCircle size={18} className='me-1' />
                    </span>
                    <span className='fw-semibold align-middle'>設施</span>
                    <span className='ms-1 align-middle'>09:00~18:00</span>
                  </li>
                  <li className='mb-1'>
                    <span>
                      <MdLocalParking size={18} className='me-1' />
                    </span>
                    <span className='fw-semibold align-middle'>停車場</span>
                    <span className='ms-1 align-middle'>09:00~18:00</span>
                  </li>
                </ul>
              </Popup>
            </Marker>
          </MapContainer>
        </section>
        {/* 推薦輪播 */}
        <section>
          <RecommendCarousel
            titleZhTW={'更多推薦'}
            background={'neutral-10'}
            recommendType={'latest'}
          />
        </section>
      </div>
    </>
  );
}

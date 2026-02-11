import {
  MdWaves,
  MdLocationOn,
  MdAccessTime,
  MdThermostat,
} from 'react-icons/md';
import { FaArrowUp, FaWind } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWaveDataAsync } from '../../redux/slice/front/wave/waveSlice';
import { ClipLoader } from 'react-spinners';
import RecommendCarousel from '../../components/carousel/RecommendCarousel';

// Leaflet
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

// 浪點清單 (保持不變)
const SURF_SPOTS = [
  { id: 'wushi', name: '宜蘭 烏石港', lat: 24.87, lon: 121.83 },
  { id: 'waiao', name: '宜蘭 外澳', lat: 24.88, lon: 121.84 },
  { id: 'donghe', name: '台東 東河', lat: 22.97, lon: 121.31 },
  { id: 'nanwan', name: '墾丁 南灣', lat: 21.96, lon: 120.76 },
  { id: 'jialeshui', name: '墾丁 佳樂水', lat: 21.99, lon: 120.84 },
  { id: 'daan', name: '台中 大安', lat: 24.39, lon: 120.58 },
  { id: 'jibeis', name: '花蓮 磯碕', lat: 23.70, lon: 121.55 },
];

// 透過 ChangeView 元件實作地圖平移 (FlyTo) 功能
// 當 center (經緯度) 改變時，利用 Leaflet 的 useMap hook 取得地圖實體並執行平滑移動
function ChangeView({ center }) {
  const map = useMap();
  map.flyTo(center, 13, { duration: 1.5 }); // 飛到指定座標，縮放等級 13，動畫持續 1.5 秒
  return null;
}

export default function WaveReportPage() {
  const dispatch = useDispatch();
  const { waveData, isWaveLoading } = useSelector((state) => state.wave);
  const [selectedSpot, setSelectedSpot] = useState(SURF_SPOTS[0]);

  useEffect(() => {
    dispatch(getWaveDataAsync({ lat: selectedSpot.lat, lon: selectedSpot.lon }));
  }, [dispatch, selectedSpot]);

  const current = waveData?.current || {};

  const getRating = (height, wind) => {
    if (!height || height === '-') return { text: '數據載入中', color: 'text-neutral-40', grade: '?' };
    if (height > 1.5) return { text: 'Excellent', color: 'text-primary-100', grade: 'A' };
    if (height > 0.8 && wind < 20) return { text: 'Good', color: 'text-success', grade: 'B' };
    if (height > 0.5) return { text: 'Fair', color: 'text-warning', grade: 'C' };
    return { text: 'Flat', color: 'text-secondary', grade: 'D' };
  };

  const ratingStatus = getRating(current.wave_height, current.wind_speed_10m);

  const markerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const currentData = {
    location: selectedSpot.name,
    waveHeight: current.wave_height !== undefined ? current.wave_height : '-',
    rating: ratingStatus.text,
    ratingColor: ratingStatus.color,
    ratingGrade: ratingStatus.grade,
    windSpeed: current.wind_speed_10m !== undefined ? current.wind_speed_10m : '-',
    windDirection: current.wind_direction_10m !== undefined ? current.wind_direction_10m : 0,
    period: current.wave_period !== undefined ? current.wave_period : '-',
    temperature: current.temperature_2m !== undefined ? current.temperature_2m : '-',
    waterTemp: current.sea_surface_temperature !== undefined ? Math.round(current.sea_surface_temperature) : '-',
  };

  return (
    <div className='bg-neutral-10 min-vh-100'>
      {/* 麵包屑 - 依照 ShowerMapPage 風格 */}
      <div className='container py-5 pt-sm-7'>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb mb-0'>
            <li className='breadcrumb-item'>
              <a className='fs-8 fs-lg-7 text-decoration-none' href='/'>
                首頁
              </a>
            </li>
            <li className='breadcrumb-item active fs-8 fs-lg-7' aria-current='page'>
              即時浪況
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero 區塊 - 依照 HomePage Banner/Section 風格 */}
      <section className='bg-black text-white py-11 py-md-15'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7'>
              <div className='d-flex align-items-center mb-4'>
                <MdLocationOn className='text-primary-100 me-2 fs-3' />
                <h1 className='display-4 fw-bold mb-0'>{currentData.location}</h1>
              </div>

              <div className='mb-6'>
                <label className='fs-7 mb-2 text-neutral-40 d-block'>選擇浪點 Explore Spot</label>
                <div className="d-flex flex-wrap gap-2">
                  {SURF_SPOTS.map(spot => (
                    <button
                      key={spot.id}
                      className={`btn rounded-pill px-4 py-2 fs-7 transition ${selectedSpot.id === spot.id
                        ? 'btn-primary-100 text-white'
                        : 'btn-outline-white text-white opacity-50'
                        }`}
                      onClick={() => setSelectedSpot(spot)}
                    >
                      {spot.name}
                    </button>
                  ))}
                </div>
              </div>

              <p className='fs-7 text-neutral-40'>
                最後更新時間 Last Updated: {new Date().toLocaleTimeString()}
              </p>
            </div>

            <div className='col-lg-5 text-lg-end mt-7 mt-lg-0'>
              <div className='d-inline-block text-center'>
                <div className='display-huge fw-bold text-primary-100 mb-0' style={{ fontSize: '100px', lineHeight: '1' }}>
                  {currentData.waveHeight}
                  <span className='fs-2 ms-2 text-white'>m</span>
                </div>
                <div className='d-flex align-items-center justify-content-center mt-2'>
                  <div className={`fs-3 fw-bold me-3 ${currentData.ratingColor}`}>
                    {currentData.rating}
                  </div>
                  <div className="bg-primary-100 text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                    style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}>
                    {currentData.ratingGrade}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 數據卡片區塊 - 保持乾淨的 Neutral 風格 */}
      <section className='container mt-9 position-relative z-2 mb-11'>
        <div className='row g-4 row-cols-1 row-cols-md-2 row-cols-lg-4'>
          <div className='col'>
            <div className='card h-100 border-0 shadow-lg rounded-4 p-5 bg-white'>
              <div className='d-flex align-items-center mb-4 text-neutral-60'>
                <div className="bg-neutral-10 p-2 rounded-3 me-3">
                  <MdWaves className='fs-4 text-primary-100' />
                </div>
                <h6 className='mb-0 fw-bold'>浪高 Swell</h6>
              </div>
              <div className='mt-auto'>
                {isWaveLoading ? <ClipLoader size={20} /> : <h2 className='fw-bold mb-1'>{currentData.waveHeight} m</h2>}
                <small className='text-muted'>Primary Swell Height</small>
              </div>
            </div>
          </div>

          <div className='col'>
            <div className='card h-100 border-0 shadow-lg rounded-4 p-5 bg-white'>
              <div className='d-flex align-items-center mb-4 text-neutral-60'>
                <div className="bg-neutral-10 p-2 rounded-3 me-3">
                  <MdAccessTime className='fs-4 text-primary-100' />
                </div>
                <h6 className='mb-0 fw-bold'>週期 Period</h6>
              </div>
              <div className='mt-auto'>
                {isWaveLoading ? <ClipLoader size={20} /> : <h2 className='fw-bold mb-1'>{currentData.period} s</h2>}
                <small className='text-muted'>Excellent Power Level</small>
              </div>
            </div>
          </div>

          <div className='col'>
            <div className='card h-100 border-0 shadow-lg rounded-4 p-5 bg-white'>
              <div className='d-flex align-items-center mb-4 text-neutral-60'>
                <div className="bg-neutral-10 p-2 rounded-3 me-3">
                  <FaWind className='fs-4 text-primary-100' />
                </div>
                <h6 className='mb-0 fw-bold'>風力 Wind</h6>
              </div>
              <div className='mt-auto'>
                <div className='d-flex align-items-center'>
                  {isWaveLoading ? <ClipLoader size={20} /> : <h2 className='fw-bold mb-1 me-3'>{currentData.windSpeed}</h2>}
                  <div
                    className='bg-neutral-20 rounded-circle d-flex align-items-center justify-content-center'
                    style={{
                      width: '40px',
                      height: '40px',
                      transform: `rotate(${currentData.windDirection}deg)`,
                      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <FaArrowUp className='fs-7' />
                  </div>
                </div>
                <small className='text-muted'>km/h Real-time Direction</small>
              </div>
            </div>
          </div>

          <div className='col'>
            <div className='card h-100 border-0 shadow-lg rounded-4 p-5 bg-white'>
              <div className='d-flex align-items-center mb-4 text-neutral-60'>
                <div className="bg-neutral-10 p-2 rounded-3 me-3">
                  <MdThermostat className='fs-4 text-primary-100' />
                </div>
                <h6 className='mb-0 fw-bold'>溫度 Temp</h6>
              </div>
              <div className='mt-auto'>
                <div className='d-flex justify-content-between align-items-end'>
                  <div>
                    <span className='fs-8 text-muted d-block mb-1'>AIR</span>
                    {isWaveLoading ? <ClipLoader size={15} /> : <span className='fw-bold fs-3 text-dark'>{currentData.temperature}°C</span>}
                  </div>
                  <div className='text-end border-start ps-3'>
                    <span className='fs-8 text-muted d-block mb-1'>WATER</span>
                    <span className='fw-bold fs-3 text-primary-100'>{currentData.waterTemp}°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 地圖區塊 - 依照 ShowerMapPage 的滿版/質感處理 */}
      <section className='py-11'>
        <div className="container">
          <div className="text-center mb-9">
            <h2 className="fw-bold fs-lg-2 mb-3" lang="zh-TW">浪點分布分布圖 Spot Map</h2>
            <p className="text-neutral-60">點擊地標查看詳細資訊 Click Marker for Details</p>
          </div>

          <div className='card border-0 shadow-lg rounded-5 overflow-hidden'>
            <div style={{ height: '600px', width: '100%', position: 'relative' }}>
              <MapContainer
                center={[selectedSpot.lat, selectedSpot.lon]}
                zoom={13}
                scrollWheelZoom={false}
                zoomControl={false}
                className='h-100 w-100 z-0'
              >
                <ChangeView center={[selectedSpot.lat, selectedSpot.lon]} />
                <TileLayer
                  url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                  attribution='&copy; Stadia Maps, &copy; OpenStreetMap contributors'
                />
                <Marker position={[selectedSpot.lat, selectedSpot.lon]} icon={markerIcon}>
                  <Popup className="custom-popup">
                    <div className='p-2 text-center'>
                      <h6 className='fw-bold fs-6 mb-2'>{selectedSpot.name}</h6>
                      <div className={`badge rounded-pill mb-2 px-3 py-2 ${currentData.ratingColor} bg-neutral-10`}>
                        {currentData.rating} Condition
                      </div>
                      <hr className="my-2 opacity-10" />
                      <div className='d-flex justify-content-between gap-3 small text-neutral-60'>
                        <span>浪高: {currentData.waveHeight}m</span>
                        <span>風速: {currentData.windSpeed}k/h</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 推薦輪播 - 依照 HomePage / ShowerMapPage 結尾結構 */}
      <section className="bg-neutral-10 py-11">
        <RecommendCarousel
          titleZhTW={'推薦商品'}
          title={'Recommend'}
          recommendType={'latest'}
          background={'neutral-10'}
        />
      </section>
    </div>
  );
}

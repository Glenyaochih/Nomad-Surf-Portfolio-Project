import {
  MdWaves,
  MdLocationOn,
  MdAccessTime,
  MdThermostat,
} from 'react-icons/md';
import { FaArrowUp, FaWind } from 'react-icons/fa';

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getWaveDataAsync, setSelectedSpotId, setSelectedDate } from '../../redux/slice/front/wave/waveSlice';
import {
  SURF_SPOTS,
  selectSelectedDate,
  selectCurrentSpot,
  selectActiveReport,
  selectWindAnalysis,
  selectWaveRating,
  selectWeatherWarning,
  selectIsWaveLoading,
  selectDailyForecast,
  selectRecommendedSurfTime
} from '../../redux/slice/front/wave/waveSelectors';
import { ClipLoader } from 'react-spinners';
import RecommendCarousel from '../../components/carousel/RecommendCarousel';

// Leaflet
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// 透過 ChangeView 元件實作地圖平移 (FlyTo) 功能
// 當 center (經緯度) 改變時，利用 Leaflet 的 useMap hook 取得地圖實體並執行平滑移動
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 });
  }, [map, center]);
  return null;
}

export default function WaveReportPage() {
  const dispatch = useDispatch();
  const isWaveLoading = useSelector(selectIsWaveLoading);
  const mapRef = useRef(null);

  // 離開頁面時移除所有 tile layer，中止 in-flight 的地圖圖塊 HTTP 請求
  // 避免 Leaflet 佔用網路頻寬，導致 React lazy import 失敗
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.eachLayer(layer => {
          mapRef.current.removeLayer(layer);
        });
      }
    };
  }, []);

  const selectedDate = useSelector(selectSelectedDate);
  const selectedSpot = useSelector(selectCurrentSpot);
  const activeReport = useSelector(selectActiveReport);
  const windAnalysis = useSelector(selectWindAnalysis);
  const ratingStatus = useSelector(selectWaveRating);
  const weatherWarning = useSelector(selectWeatherWarning);
  const dailyForecast = useSelector(selectDailyForecast);
  const recommendedSurfTime = useSelector(selectRecommendedSurfTime);

  useEffect(() => {
    if (selectedSpot) {
      dispatch(getWaveDataAsync({ lat: selectedSpot.lat, lon: selectedSpot.lon }));
    }
  }, [dispatch, selectedSpot]);

  const current = activeReport || {};

  const currentData = {
    location: selectedSpot.name,
    waveHeight: current.wave_height !== undefined ? current.wave_height : '-',
    rating: ratingStatus.text,
    ratingColor: ratingStatus.color,
    ratingGrade: ratingStatus.grade,
    windSpeed: current.wind_speed_10m !== undefined ? current.wind_speed_10m : '-',
    windDirection: current.wind_direction_10m !== undefined ? current.wind_direction_10m : 0,
    windType: windAnalysis.text,
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
              <Link className='fs-8 fs-lg-7 text-decoration-none' to='/'>
                首頁
              </Link>
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
                <h1 className='display-4 fw-bold mb-0'>
                  {currentData.location}
                  {current.isLive ? (
                    <span className="ms-3 badge rounded-pill bg-danger fs-8 fw-normal align-middle animate-pulse">LIVE</span>
                  ) : (
                    <span className="ms-3 fs-3 fw-normal text-neutral-40">/ {current.time}</span>
                  )}
                </h1>
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
                      onClick={() => dispatch(setSelectedSpotId(spot.id))}
                    >
                      {spot.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <p className='fs-7 text-neutral-40 mb-0'>
                  更新時間 Last Updated: {new Date().toLocaleTimeString()}
                </p>
                {!current.isLive && (
                  <button
                    className="btn btn-sm btn-outline-primary-100 rounded-pill px-3 py-1 fs-8"
                    onClick={() => dispatch(setSelectedDate(null))}
                  >
                    返回即時 Back to Live
                  </button>
                )}
              </div>
            </div>

            <div className='col-lg-5 text-lg-end mt-7 mt-lg-0'>
              <div className='d-inline-block text-center'>
                <div className='display-huge fw-bold text-primary-100 mb-0' style={{ fontSize: '100px', lineHeight: '1' }}>
                  {currentData.waveHeight}
                  <span className='fs-2 ms-2 text-white'>m</span>
                </div>
                <div className='d-flex align-items-center justify-content-center mt-2'>
                  <div className={`fs-3 fw-bold me-3 ${currentData.ratingColor}`}>
                    {currentData.rating === 'Flat' ? '別浪費時間(Flat)' : currentData.rating}
                  </div>
                  <div className="bg-primary-100 text-white rounded-pill d-flex align-items-center justify-content-center shadow-lg px-4"
                    style={{ height: '50px', minWidth: '100px', fontSize: '24px', fontWeight: 'bold' }}>
                    <small className="fs-7 me-2 opacity-75 fw-normal">Grade</small>
                    {currentData.ratingGrade}
                  </div>
                </div>
                <div className='mt-4 text-neutral-40 bg-white bg-opacity-10 py-2 px-4 rounded-pill d-inline-block'>
                  <span className='fs-7 fw-bold text-white'>
                    <MdAccessTime className='me-2 text-primary-100' />
                    最佳下浪：{recommendedSurfTime}
                  </span>
                  <small className='ms-2 opacity-50'>(漲潮前後 2h)</small>
                </div>
                {weatherWarning && (
                  <div className={`mt-4 p-3 rounded-3 shadow-sm ${weatherWarning.level === 'danger' ? 'bg-danger text-white' : 'bg-warning text-dark'}`}>
                    <small className="fw-bold">{weatherWarning.text}</small>
                  </div>
                )}
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
                <div className='d-flex align-items-center flex-wrap gap-2'>
                  <div className='d-flex align-items-center'>
                    {isWaveLoading ? (
                      <ClipLoader size={20} />
                    ) : (
                      <h2 className={`fw-bold mb-1 me-2 ${windAnalysis.colorClass || ''}`}>
                        {currentData.windSpeed}
                      </h2>
                    )}
                    <div
                      className='bg-neutral-20 rounded-circle d-flex align-items-center justify-content-center'
                      style={{
                        width: '32px',
                        height: '32px',
                        transform: `rotate(${currentData.windDirection}deg)`,
                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <FaArrowUp className='fs-8' />
                    </div>
                  </div>
                  <div className='d-flex flex-column'>
                    <small className='text-primary-100 fw-bold'>{windAnalysis.text}</small>
                    <small className={`${windAnalysis.colorClass || 'text-muted'} fw-bold`} style={{ fontSize: '0.7rem' }}>
                      {windAnalysis.strength}
                    </small>
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

      {/* 一週預報區塊 - 質感卡片列表 */}
      <section className='container mb-11'>
        <div className="d-flex align-items-center mb-6">
          <MdAccessTime className='text-primary-100 fs-3 me-2' />
          <h2 className='fw-bold mb-0 fs-2'>一週預報 Weekly Forecast</h2>
        </div>

        <div className="row g-3 row-cols-2 row-cols-md-4 row-cols-lg-7">
          {dailyForecast.map((day) => {
            const isToday = current.isLive && day.date === new Date().toISOString().split('T')[0];
            const isActive = selectedDate === day.date || isToday;

            return (
              <div key={day.date} className='col'>
                <div
                  className={`card h-100 border-0 shadow-sm rounded-4 p-3 text-center transition-hover pointer ${isActive ? 'bg-primary-100 text-white' : 'bg-white'}`}
                  onClick={() => dispatch(setSelectedDate(day.date))}
                >
                  <div className={`fs-7 mb-2 ${isActive ? 'text-white-50' : 'text-muted'}`}>{day.date.split('-').slice(1).join('/')}</div>
                  <div className='fw-bold fs-6 mb-3'>{day.dayOfWeek}</div>

                  <div className='mb-3'>
                    <MdWaves className={`fs-4 ${isActive ? 'text-white' : 'text-primary-100'}`} />
                    <div className='fw-bold fs-4 mt-1'>{day.waveHeight}m</div>
                  </div>

                  <div className='mt-auto pt-3 border-top border-neutral-10'>
                    <div className='fs-8 opacity-75 mb-1'>TEMP</div>
                    <div className='fw-bold fs-7'>{Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°</div>
                  </div>
                </div>
              </div>
            );
          })}
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
                ref={mapRef}
                center={[selectedSpot.lat, selectedSpot.lon]}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl={true}
                className='h-100 w-100 z-0'
              >
                <ChangeView center={[selectedSpot.lat, selectedSpot.lon]} />
                <TileLayer
                  url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
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

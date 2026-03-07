import { createSelector } from '@reduxjs/toolkit';

// 浪點清單 (包含理想陸風方向)
export const SURF_SPOTS = [
    { id: 'wushi', name: '宜蘭 烏石港', lat: 24.87, lon: 121.83, offshoreAngle: 270 },
    { id: 'waiao', name: '宜蘭 外澳', lat: 24.878273627978025, lon: 121.84291934878927, offshoreAngle: 270 },
    { id: 'miyue', name: '宜蘭 蜜月灣', lat: 24.933126171126684, lon: 121.88583970130608, offshoreAngle: 270 },
    { id: 'wuwu', name: '宜蘭 無尾', lat: 24.6106871636795, lon: 121.86452146465591, offshoreAngle: 270 },
    { id: 'donghe', name: '台東 東河', lat: 22.97, lon: 121.31, offshoreAngle: 270 },
    { id: 'jibeis', name: '花蓮 磯碕', lat: 23.70, lon: 121.55, offshoreAngle: 270 },
    { id: 'nanwan', name: '墾丁 南灣', lat: 21.96, lon: 120.76, offshoreAngle: 0 },
    { id: 'jialeshui', name: '墾丁 佳樂水', lat: 21.99, lon: 120.84, offshoreAngle: 315 },
    { id: 'daan', name: '台中 大安', lat: 24.39, lon: 120.58, offshoreAngle: 90 },
    { id: 'songbai', name: '大甲 松柏港', lat: 24.43190, lon: 120.61784, offshoreAngle: 90 },
    { id: 'waipu', name: '苗栗 外埔', lat: 24.64886, lon: 120.77033, offshoreAngle: 90 },
    { id: 'jiangjun', name: '台南 將軍', lat: 23.207563796734828, lon: 120.07981584315436, offshoreAngle: 90 },
];

/**
 * 輔助邏輯函式 (不匯出，僅供內部 Selector 使用)
 */
const analyzeWindRaw = (windSpeed, windDir, spot) => {
    const s = parseFloat(windSpeed) || 0;
    let strength = '平靜 Calm';
    let colorClass = 'text-info';

    if (s >= 40) {
        strength = '強風 Gale';
        colorClass = 'text-danger';
    } else if (s >= 31) {
        strength = '清勁 Fresh';
        colorClass = 'text-warning';
    } else if (s >= 20) {
        strength = '和緩 Moderate';
        colorClass = 'text-success';
    } else if (s >= 13) {
        strength = '輕微 Light';
        colorClass = 'text-info';
    }

    const diff = Math.abs((windDir - spot.offshoreAngle + 180 + 360) % 360 - 180);
    let typeText = '側風 Cross-shore';
    let type = 'cross';

    if (diff < 45) {
        typeText = '陸風 Offshore';
        type = 'offshore';
    } else if (diff > 135) {
        typeText = '海風 Onshore';
        type = 'onshore';
    }

    return {
        text: typeText,
        type,
        strength,
        colorClass,
        speed: s
    };
};

const getWaveRatingRaw = (height, period, windSpeed, windType) => {
    if (!height || height === '-') return { text: '數據載入中', color: 'text-neutral-40', grade: '?' };
    const h = parseFloat(height);
    const p = parseFloat(period) || 0;
    const w = parseFloat(windSpeed) || 0;

    // A: 門檻 - 15 節 (約 28 km/h)
    const WIND_LIMIT = 28;

    if (h > 1.5 && windType === 'offshore' && w < WIND_LIMIT && p >= 7)
        return { text: 'Excellent', color: 'text-primary-100', grade: 'A' };

    if (h > 0.8 && w < WIND_LIMIT && (windType === 'offshore' || w < 15))
        return { text: 'Good', color: 'text-success', grade: 'B' };

    if (h > 0.6 && w < WIND_LIMIT)
        return { text: 'Fair', color: 'text-warning', grade: 'C' };

    return { text: 'Flat / Poor', color: 'text-secondary', grade: 'D' };
};

const getWeatherWarningRaw = (code) => {
    if (code >= 95) return { text: '⚠️ 注意：預測有雷雨，請勿下水安全第一！', level: 'danger' };
    if (code >= 61) return { text: '⚠️ 提醒：預測會下雨，請注意保暖與視線。', level: 'warning' };
    return null;
};

// --- 第一層：Raw State ---
export const selectWaveState = (state) => state.wave;

// --- 第二層：基礎資料 ---
export const selectWaveData = createSelector(
    [selectWaveState],
    (wave) => wave.waveData
);

export const selectSelectedSpotId = createSelector(
    [selectWaveState],
    (wave) => wave.selectedSpotId
);

export const selectIsWaveLoading = createSelector(
    [selectWaveState],
    (wave) => wave.isWaveLoading
);

export const selectSelectedDate = createSelector(
    [selectWaveState],
    (wave) => wave.selectedDate
);

// --- 第三層：實體浪點與活動報表 (Unified Report) ---
export const selectCurrentSpot = createSelector(
    [selectSelectedSpotId],
    (id) => SURF_SPOTS.find(spot => spot.id === id)
);

/**
 * 核心：根據所選日期回傳「目前活動中」的數據
 * 如果 selectedDate 是 null，回傳 current 資料。
 * 如果是日期字串，從 daily 中對應資料並映射為 current 格式。
 */
export const selectActiveReport = createSelector(
    [selectWaveData, selectSelectedDate],
    (data, date) => {
        if (!data) return null;
        if (!date || !data.daily) return { ...data.current, isLive: true };

        const index = data.daily.time.indexOf(date);
        if (index === -1) return { ...data.current, isLive: true };

        // 數據轉換：將 daily 格式轉為 current 格式以供其他 Selector 使用
        return {
            time: data.daily.time[index],
            temperature_2m: data.daily.temperature_2m_max[index], // 以最高溫代表
            wind_speed_10m: data.daily.wind_speed_10m_max[index],
            wind_direction_10m: data.daily.wind_direction_10m_dominant[index],
            weather_code: data.daily.weather_code[index],
            wave_height: data.daily.wave_height_max[index],
            wave_period: data.daily.wave_period_max[index],
            sea_surface_temperature: data.current?.sea_surface_temperature, // 海溫通常變動小，沿用即時
            isLive: false
        };
    }
);

export const selectWeatherWarning = createSelector(
    [selectActiveReport],
    (report) => report ? getWeatherWarningRaw(report.weather_code) : null
);

// --- 第四層：風向分析 (依賴 ActiveReport 與 CurrentSpot) ---
export const selectWindAnalysis = createSelector(
    [selectActiveReport, selectCurrentSpot],
    (report, spot) => report && spot ? analyzeWindRaw(report.wind_speed_10m, report.wind_direction_10m, spot) : { text: '-', type: 'calm' }
);

// --- 第五層：最終評分 (依賴 ActiveReport 與 WindAnalysis) ---
export const selectWaveRating = createSelector(
    [selectActiveReport, selectWindAnalysis],
    (report, wind) => {
        if (!report || !wind) return { text: '數據載入中', color: 'text-neutral-40', grade: '?' };
        return getWaveRatingRaw(report.wave_height, report.wave_period, report.wind_speed_10m, wind.type);
    }
);

// --- 第六層：一週預報資料轉換 ---
export const selectDailyForecast = createSelector(
    [selectWaveData],
    (data) => {
        const daily = data?.daily;
        if (!daily || !daily.time) return [];

        return daily.time.map((time, index) => ({
            date: time,
            weatherCode: daily.weather_code[index],
            tempMax: daily.temperature_2m_max[index],
            tempMin: daily.temperature_2m_min[index],
            waveHeight: daily.wave_height_max[index],
            wavePeriod: daily.wave_period_max[index],
            // 取得週幾 (中文)
            dayOfWeek: new Intl.DateTimeFormat('zh-TW', { weekday: 'short' }).format(new Date(time))
        }));
    }
);

// --- 第七層：潮汐分析與建議下浪時間 ---
export const selectRecommendedSurfTime = createSelector(
    [selectWaveData, selectSelectedDate],
    (data, selectedDate) => {
        const hourly = data?.hourly;
        if (!hourly || !hourly.time || !hourly.sea_level_height_msl) return '數據載入中';

        // 預設當天，若有選擇日期則過濾該日
        const targetDate = selectedDate || new Date().toISOString().split('T')[0];

        // 過濾出目標日期的每小時數據
        const dayData = hourly.time
            .map((time, index) => ({ time, level: hourly.sea_level_height_msl[index] }))
            .filter(item => item.time.startsWith(targetDate));

        if (dayData.length === 0) return '暫無預報資料';

        // 尋找高潮位 (局部最大值)
        const highTides = [];
        for (let i = 1; i < dayData.length - 1; i++) {
            if (dayData[i].level > dayData[i - 1].level && dayData[i].level > dayData[i + 1].level) {
                highTides.push(dayData[i]);
            }
        }

        // 如果只有一個趨勢（例如整天都在漲），則取最大值
        if (highTides.length === 0) {
            const max = dayData.reduce((prev, current) => (prev.level > current.level) ? prev : current);
            highTides.push(max);
        }

        // 計算最佳窗口：漲潮前後兩小時
        const windows = highTides.map(tide => {
            const tideTime = new Date(tide.time);
            const start = new Date(tideTime.getTime() - 2 * 60 * 60 * 1000);
            const end = new Date(tideTime.getTime() + 2 * 60 * 60 * 1000);

            const formatTime = (date) => date.getHours().toString().padStart(2, '0') + ':00';
            return `${formatTime(start)} - ${formatTime(end)}`;
        });

        return windows.join(', ');
    }
);

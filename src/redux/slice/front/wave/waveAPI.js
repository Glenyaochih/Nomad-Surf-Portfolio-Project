import axios from 'axios';

export const getWaveAPI = {
    getWaveData: (lat, lon) => {
        // 氣象請求：加入 daily 預報
        const weatherReq = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Asia/Taipei`);

        // 海洋請求：加入 daily 浪高預報與每小時海位 (潮汐)
        const marineReq = axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_period,wave_direction,sea_surface_temperature&hourly=wave_height,sea_level_height_msl&daily=wave_height_max,wave_period_max&timezone=Asia/Taipei`);

        return Promise.all([weatherReq, marineReq]).then(([weatherRes, marineRes]) => {
            return {
                data: {
                    current: {
                        ...weatherRes.data.current,
                        ...marineRes.data.current
                    },
                    hourly: {
                        ...marineRes.data.hourly
                    },
                    daily: {
                        ...weatherRes.data.daily,
                        ...marineRes.data.daily
                    }
                }
            };
        });
    },
};

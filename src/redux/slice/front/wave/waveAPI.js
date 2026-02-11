import axios from 'axios';

export const getWaveAPI = {
    getWaveData: (lat, lon) => {
        // 氣象請求
        const weatherReq = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m&timezone=Asia/Taipei`);

        // 海洋請求：加入 sea_surface_temperature (海溫)
        const marineReq = axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_period,wave_direction,sea_surface_temperature&hourly=wave_height&timezone=Asia/Taipei`);

        return Promise.all([weatherReq, marineReq]).then(([weatherRes, marineRes]) => {
            return {
                data: {
                    current: {
                        ...weatherRes.data.current,
                        ...marineRes.data.current
                    },
                    hourly: {
                        ...marineRes.data.hourly
                    }
                }
            };
        });
    },
};

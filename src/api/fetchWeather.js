import axios from '../../../pwa-weather/node_modules/axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '737e3beb31320b02a342ef6805f38a2f';

export const fetchWeather = async (query) => {
  const {data} = await axios.get(URL, {
    params: {
      q: query,
      units: 'imperial',
      appid: API_KEY,
    }
    
  });
  return data;
}
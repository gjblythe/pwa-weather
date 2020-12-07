import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather'

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

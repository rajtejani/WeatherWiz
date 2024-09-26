import axios from 'axios';

const API_KEY = '22a3f42315e44996ae964403242509';
const BASE_URL = 'https://api.weatherapi.com/v1/';

export const fetchWeather = async (city: string) => {
    const response = await axios.get(`${BASE_URL}/current.json?q=${city}&key=${API_KEY}&units=metric`);
    return response.data;
};

export const fetchForecast = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/forecast.json?q=${city}&key=${API_KEY}&days=5`);
  return response.data;
};

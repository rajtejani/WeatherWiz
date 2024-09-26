
import axios from 'axios';
import { fetchForecast, fetchWeather } from '../../src/utils/api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchWeather should return weather data', async () => {
    const mockWeatherData = { location: {}, current: {} };
    mockedAxios.get.mockResolvedValue({ data: mockWeatherData });

    const result = await fetchWeather('London');
    expect(result).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('London'));
  });

  it('fetchForecast should return forecast data', async () => {
    const mockForecastData = { forecast: { forecastday: [] } };
    mockedAxios.get.mockResolvedValue({ data: mockForecastData });

    const result = await fetchForecast('London');
    expect(result).toEqual(mockForecastData);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('London'));
  });
});

import weatherReducer, {
  addFavoriteCity,
  removeFavoriteCity,
  setCityForecast,
  setCityWeather
} from '../../src/store/weatherSlice';

describe('weatherSlice', () => {
  const initialState = {
    favoriteCities: [],
    cityWeather: {},
    cityForecast: {},
    loading: false,
    error: null,
  };

  const weatherData = {
    location: { name: 'London', region: 'Greater London', country: 'UK' },
    current: {
      temp_c: 15,
      condition: { text: 'Clear', icon: 'icon-url' },
      humidity: 60,
      wind_kph: 10,
      feelslike_c: 14,
    },
  };

  const forecastData = [
    {
      date: '2024-09-27',
      day: {
        maxtemp_c: 18,
        mintemp_c: 10,
        condition: { text: 'Sunny', icon: 'icon-url' },
      },
    },
  ];

  const newForecastData = [
    {
      date: '2024-09-27',
      day: {
        maxtemp_c: 18,
        mintemp_c: 10,
        condition: { text: 'Sunny', icon: 'sunny-icon' },
      },
    },
  ];

  it('should handle addFavoriteCity', () => {
    const newState = weatherReducer(initialState, addFavoriteCity('London'));
    expect(newState.favoriteCities).toEqual(['London']);
  });

  it('should handle removeFavoriteCity', () => {
    const stateWithCity = weatherReducer(initialState, addFavoriteCity('London'));
    const newState = weatherReducer(stateWithCity, removeFavoriteCity('London'));
    expect(newState.favoriteCities).toEqual([]);
  });

  it('should handle setCityWeather', () => {
    const weatherData = {
      location: { name: 'London', region: 'City of London', country: 'UK' },
      current: { temp_c: 20, condition: { text: 'Sunny', icon: 'sunny.png' }, humidity: 50, wind_kph: 10, feelslike_c: 21 },
    };
    const newState = weatherReducer(initialState, setCityWeather({ city: 'London', data: weatherData }));
    expect(newState.cityWeather['London']).toEqual(weatherData);
  });

  it('should handle setCityWeather and update city weather data', () => {
    const nextState = weatherReducer(
      initialState,
      setCityWeather({ city: 'London', data: weatherData })
    );

    expect(nextState.cityWeather['London']).toEqual(weatherData);
  });

  it('should handle setCityForecast and update city forecast data', () => {
    const nextState = weatherReducer(
      initialState,
      setCityForecast({ city: 'London', data: forecastData })
    );

    expect(nextState.cityForecast['London']).toEqual(forecastData);
  });

  it('should update city forecast data when setCityForecast is dispatched', () => {
    const nextState = weatherReducer(
      initialState,
      setCityForecast({ city: 'London', data: newForecastData })
    );

    expect(nextState.cityForecast['London']).toEqual(newForecastData);
  });
});
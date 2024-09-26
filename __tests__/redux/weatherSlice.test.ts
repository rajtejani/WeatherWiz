import weatherReducer, {
  setCurrentWeather
} from '../../src/store/weatherSlice';

describe('weatherSlice', () => {
  const initialState = {
    currentWeather: null,
    forecast: null,
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(weatherReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCurrentWeather', () => {
    const weatherData = { temperature: 25, humidity: 60 };
    const actual = weatherReducer(initialState, setCurrentWeather(weatherData));
    expect(actual.currentWeather).toEqual(weatherData);
  });

});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
  };
}

interface ForecastData {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface WeatherState {
  favoriteCities: string[];
  cityWeather: { [city: string]: WeatherData };
  cityForecast: { [city: string]: ForecastData[] };
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  favoriteCities: [],
  cityWeather: {},
  cityForecast: {},
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addFavoriteCity: (state, action: PayloadAction<string>) => {
      if (!state.favoriteCities.includes(action.payload)) {
        state.favoriteCities.push(action.payload);
      }
    },
    removeFavoriteCity: (state, action: PayloadAction<string>) => {
      state.favoriteCities = state.favoriteCities.filter(city => city !== action.payload);
    },
    setCityWeather: (state, action: PayloadAction<{ city: string; data: WeatherData }>) => {
      state.cityWeather[action.payload.city] = action.payload.data;
    },
    setCityForecast: (state, action: PayloadAction<{ city: string; data: ForecastData[] }>) => {
      state.cityForecast[action.payload.city] = action.payload.data;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addFavoriteCity,
  removeFavoriteCity,
  setCityWeather,
  setCityForecast,
  setLoading,
  setError,
} = weatherSlice.actions;

export default weatherSlice.reducer;
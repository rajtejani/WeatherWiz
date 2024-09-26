import { render } from '@testing-library/react-native';
import React from 'react';
import WeatherCard from '../../src/components/WeatherCard';

describe('WeatherCard', () => {
  const mockWeatherData = {
    temperature: 25,
    humidity: 60,
    windSpeed: 10,
    description: 'Sunny',
  };

  it('renders weather data correctly', () => {
    const { getByText } = render(<WeatherCard weather={mockWeatherData} />);

    expect(getByText('25°C')).toBeTruthy();
    expect(getByText('Humidity: 60%')).toBeTruthy();
    expect(getByText('Wind: 10 m/s')).toBeTruthy();
    expect(getByText('Sunny')).toBeTruthy();
  });
});

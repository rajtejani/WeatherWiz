import { render } from '@testing-library/react-native';
import React from 'react';
import { WeatherCard } from '../../src/components';

describe('WeatherCard Component', () => {
  const mockWeather = {
    location: {
      name: 'New York',
      region: 'NY',
      country: 'USA',
    },
    current: {
      temp_c: 22,
      condition: {
        text: 'Sunny',
        icon: '/weather/sunny.png',
      },
      humidity: 60,
      wind_kph: 15,
      feelslike_c: 24,
    },
  };

  it('renders the location correctly', () => {
    const { getByText } = render(<WeatherCard location={mockWeather.location} current={mockWeather.current} />);
    const locationText = `${mockWeather.location.name}, ${mockWeather.location.region}, ${mockWeather.location.country}`;
    
    // Check if the location is rendered correctly
    expect(getByText(locationText)).toBeTruthy();
  });

  it('displays the correct temperature', () => {
    const { getByText } = render(<WeatherCard location={mockWeather.location} current={mockWeather.current} />);
    
    // Check if the temperature is rendered correctly
    expect(getByText(`${mockWeather.current.temp_c}°C`)).toBeTruthy();
  });

  it('renders the correct condition description and feels like temperature', () => {
    const { getByText } = render(<WeatherCard location={mockWeather.location} current={mockWeather.current} />);
    
    // Check if the weather condition is rendered correctly
    expect(getByText(mockWeather.current.condition.text)).toBeTruthy();

    // Check if the 'feels like' temperature is rendered correctly
    expect(getByText(`Feels like: ${mockWeather.current.feelslike_c}°C`)).toBeTruthy();
  });

  it('displays the correct humidity and wind speed', () => {
    const { getByText } = render(<WeatherCard location={mockWeather.location} current={mockWeather.current} />);
    
    // Check if humidity is rendered correctly
    expect(getByText(`Humidity: ${mockWeather.current.humidity}%`)).toBeTruthy();

    // Check if wind speed is rendered correctly
    expect(getByText(`Wind: ${mockWeather.current.wind_kph} km/h`)).toBeTruthy();
  });

  it('renders the correct weather icon', () => {
    const { getByTestId } = render(<WeatherCard location={mockWeather.location} current={mockWeather.current} />);
    
    // Check if the icon has the correct source URI
    const icon = getByTestId('weather-icon');
    expect(icon.props.source.uri).toBe(`https:${mockWeather.current.condition.icon}`);
  });
});

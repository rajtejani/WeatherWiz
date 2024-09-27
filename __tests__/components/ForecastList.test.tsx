import { render } from '@testing-library/react-native';
import React from 'react';
import { ForecastList } from '../../src/components';

describe('ForecastList Component', () => {
  const mockForecastData = [
    {
      date: '2024-09-26',
      tempHigh: 30,
      tempLow: 20,
      description: 'Sunny',
      icon: '/weather/sunny.png',
    },
    {
      date: '2024-09-27',
      tempHigh: 28,
      tempLow: 18,
      description: 'Partly Cloudy',
      icon: '/weather/cloudy.png',
    },
    {
      date: '2024-09-28',
      tempHigh: 25,
      tempLow: 16,
      description: 'Rainy',
      icon: '/weather/rain.png',
    },
  ];

  // Test case 1: Renders the correct number of forecast items
  it('renders the correct number of forecast items', () => {
    const { getAllByTestId } = render(<ForecastList forecast={mockForecastData} />);
    
    const forecastItems = getAllByTestId('forecast-item');
    expect(forecastItems.length).toBe(mockForecastData.length);
  });

  // Test case 2: Renders each item with correct data (date, temperature, description)
  it('renders each forecast item with correct date, temperature, description, and icon', () => {
    const { getByText, getAllByTestId } = render(<ForecastList forecast={mockForecastData} />);

    // Check if each forecast item renders correctly
    mockForecastData.forEach((item, index) => {
      // Check for date
      expect(getByText(item.date)).toBeTruthy();
      // Check for temperatures
      expect(getByText(`${item.tempHigh}°C / ${item.tempLow}°C`)).toBeTruthy();
      // Check for description
      expect(getByText(item.description)).toBeTruthy();
      // Check if icon is rendered correctly
      const icon = getAllByTestId('forecast-icon')[index];
      expect(icon.props.source.uri).toBe(`https:${item.icon}`);
    });
  });
});

import { render } from '@testing-library/react-native';
import moment from 'moment';
import React from 'react';
import { ForecastSlider } from '../../src/components';

describe('ForecastSlider Component', () => {
  const mockForecast = [
    {
      date: '2024-09-26',
      day: {
        maxtemp_c: 30,
        mintemp_c: 20,
        condition: {
          text: 'Sunny',
          icon: '/weather/sunny.png',
        },
      },
    },
    {
      date: '2024-09-27',
      day: {
        maxtemp_c: 28,
        mintemp_c: 18,
        condition: {
          text: 'Partly Cloudy',
          icon: '/weather/cloudy.png',
        },
      },
    },
    {
      date: '2024-09-28',
      day: {
        maxtemp_c: 25,
        mintemp_c: 16,
        condition: {
          text: 'Rainy',
          icon: '/weather/rain.png',
        },
      },
    },
  ];

  it('renders the correct number of forecast days', () => {
    const { getAllByTestId } = render(<ForecastSlider forecast={mockForecast} />);
    const forecastDays = getAllByTestId('forecast-day');
    expect(forecastDays.length).toBe(mockForecast.length);
  });

  it('renders the correct data for each forecast day', () => {
    const { getByText, getAllByTestId } = render(<ForecastSlider forecast={mockForecast} />);
    
    mockForecast.forEach((day, index) => {
      const formattedDate = moment(new Date(day.date)).calendar({
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
      });
      
      // Check if the date is rendered correctly
      expect(getByText(formattedDate)).toBeTruthy();
      
      // Check if the temperature is rendered correctly
      expect(getByText(`${day.day.maxtemp_c}°C / ${day.day.mintemp_c}°C`)).toBeTruthy();
      
      // Check if the condition text is rendered correctly
      expect(getByText(day.day.condition.text)).toBeTruthy();

      // Check if the icon URI is correct
      const icons = getAllByTestId('forecast-icon');
      expect(icons[index].props.source.uri).toBe(`https:${day.day.condition.icon}`);
    });
  });
});

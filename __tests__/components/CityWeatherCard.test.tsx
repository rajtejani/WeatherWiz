import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { CityWeatherCard } from '../../src/components';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('CityWeatherCard', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const city = 'London';
  const temp = 15;
  const condition = 'Sunny';
  const icon = 'https://example.com/icon.png';

  it('renders city, temperature, condition, and icon correctly', () => {
    const { getByText, getByTestId } = render(
      <CityWeatherCard city={city} temp={temp} condition={condition} icon={icon} />
    );

    expect(getByText(city)).toBeTruthy();
    expect(getByText(`${temp}°C`)).toBeTruthy();
    expect(getByText(condition)).toBeTruthy();
    const image = getByTestId('weather-icon');
    expect(image.props.source.uri).toBe(icon);
  });

  it('navigates to WeatherDetails with correct city when pressed', () => {
    const { getByTestId } = render(
      <CityWeatherCard city={city} temp={temp} condition={condition} icon={icon} />
    );

    const card = getByTestId('city-weather-card');
    fireEvent.press(card);

    expect(mockNavigate).toHaveBeenCalledWith('WeatherDetails', { city });
  });
});

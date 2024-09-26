import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HomeScreen from '../../src/screens/HomeScreen';

const mockStore = configureStore([]);

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const initialState = { weather: { currentWeather: null, forecast: null, loading: false, error: null } };
    const store = mockStore(initialState);

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    expect(getByTestId('home-screen')).toBeTruthy();
    expect(getByText('Weather Forecast')).toBeTruthy();
  });
});
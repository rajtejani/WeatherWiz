import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import { store } from '../src/store/store';

describe('App', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByTestId('app-container')).toBeTruthy();
  });
});


import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import IconButton from '../../src/components/IconButton';

// Mock the Icon component
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

describe('IconButton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<IconButton iconName="search" testID="icon-button" />);
    expect(getByTestId('icon-button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<IconButton iconName="search" onPress={onPressMock} testID="icon-button" />);
    fireEvent.press(getByTestId('icon-button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies variant styles correctly', () => {
    const { getByTestId } = render(<IconButton iconName="search" variant="filled" color="red" testID="icon-button" />);
    const button = getByTestId('icon-button');

    // Check if the backgroundColor is 'red'
    expect(button.props.style.backgroundColor).toBe('red');
  });

  it('applies default styles when no variant is provided', () => {
    const { getByTestId } = render(<IconButton iconName="search" testID="icon-button" />);
    const button = getByTestId('icon-button');

    // Expect no variant-related styles
    expect(button.props.style.backgroundColor).toBeUndefined();
  });


  it('applies default border radius when no rounded style is provided', () => {
    const { getByTestId } = render(<IconButton iconName="search" testID="icon-button" />);
    const button = getByTestId('icon-button');

    // Expect borderRadius to be 0 when no rounded prop is given
    expect(button.props.style.borderRadius).toBe(0);
  });

  it('renders the icon with the correct size and color', () => {
    const { getByTestId } = render(<IconButton iconName="search" size={30} color="blue" testID="icon-button" />);
    const button = getByTestId('icon-button');

    // Find the icon inside the button
    const icon = button.findByType(Icon);

    // Verify icon size is set correctly (half the size of the button)
    expect(icon.props.size).toBe(30 - (30 * 0.5));

    // Verify icon color is applied correctly
    expect(icon.props.color).toBe('blue');
  });
});

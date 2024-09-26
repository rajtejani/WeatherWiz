import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IconButtonProps {
  iconName: string
  onPress?: () => void;
  style?: ViewStyle;
  color?: string;
  variant?: 'filled' | 'outlined' | 'link';
  rounded?: 'partial' | 'full';
  size?: number;
  testID?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onPress,
  style,
  variant,
  rounded,
  size = 24,
  color = 'black',
  testID
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: color,
          backgroundColor: 'transparent',
        };
      case 'filled':
        return {
          backgroundColor: color,
        };
      case 'link':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      default:
        return {};
    }
  };

  const getRoundedStyle = (): ViewStyle => {
    switch (rounded) {
      case 'full':
        return {
          borderRadius: size / 2,
        };
      case 'partial':
        return {
          borderRadius: 8,
        };
      default:
        return {
          borderRadius: 0,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        getButtonStyle(),
        getRoundedStyle(),
        style,
        { width: size, height: size },
      ]}
      testID={testID}
    >
      <Icon name={iconName} size={size - (size * 0.5)} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default IconButton;

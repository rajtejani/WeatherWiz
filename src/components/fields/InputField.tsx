import { type Icon } from '@tabler/icons-react-native';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { colors } from '../../theme';

interface CommonInputProps extends TextInputProps {
  startAdornment?: Icon;
  endAdornment?: Icon;
  iconSize?: number;
  iconColor?: string;
  inputStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

const CommonInput: React.FC<CommonInputProps> = ({
  startAdornment: StartIcon,
  endAdornment: EndIcon,
  iconSize = 24,
  iconColor = '#000',
  inputStyle,
  containerStyle,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {StartIcon && (
        <StartIcon size={iconSize} color={iconColor} style={styles.icon} />
      )}
      
      <TextInput 
        style={[styles.input, inputStyle]} 
        {...textInputProps} 
      />
      
      {EndIcon && (
        <EndIcon size={iconSize} color={iconColor} style={styles.icon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.white
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default CommonInput;
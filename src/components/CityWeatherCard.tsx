
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';

interface CityWeatherCardProps {
  city: string;
  temp: number;
  condition: string;
  icon: string;
}

const CityWeatherCard: React.FC<CityWeatherCardProps> = ({ city, temp, condition, icon }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('WeatherDetails', { city })}
    >
      <View>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.temp}>{temp}°C</Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>
      <Image source={{ uri: icon }} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  city: {
    fontSize: 20,
    color: colors.background,
  },
  temp: {
    fontSize: 24,
    color: colors.background,
  },
  condition: {
    fontSize: 16,
    color: colors.background,
  },
  icon: {
    height: 100,
    width: 100
  }
});

export default CityWeatherCard;


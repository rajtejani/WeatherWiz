import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

interface WeatherCardProps {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ location, current }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.location}>{location.name}, {location.region}, {location.country}</Text>
      <Text style={styles.temperature}>{current.temp_c}°C</Text>
      <Image source={{ uri: `https:${current.condition.icon}` }} style={styles.icon} />
      <Text style={styles.description}>{current.condition.text}</Text>
      <Text style={styles.detail}>Feels like: {current.feelslike_c}°C</Text>
      <Text style={styles.detail}>Humidity: {current.humidity}%</Text>
      <Text style={styles.detail}>Wind: {current.wind_kph} km/h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
  },
  location: {
    fontSize: 20,
    color: colors.background,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    color: colors.background,
  },
  icon: {
    width: 64,
    height: 64,
    marginVertical: 10,
  },
  description: {
    fontSize: 24,
    color: colors.background,
    marginVertical: 10,
  },
  detail: {
    fontSize: 16,
    color: colors.background,
    marginVertical: 5,
  },
});

export default WeatherCard;

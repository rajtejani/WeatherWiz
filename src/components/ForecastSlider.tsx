import moment from 'moment';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface ForecastSliderProps {
  forecast: ForecastDay[];
}

const ForecastSlider: React.FC<ForecastSliderProps> = ({ forecast }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {forecast.map((day) => (
          <View key={day.date} style={styles.dayContainer} testID="forecast-day">
            <Text style={styles.date}>{moment(new Date(day.date)).calendar({ sameDay: '[Today]', nextDay: '[Tomorrow]', nextWeek: 'dddd'})}</Text>
            <Image source={{ uri: `https:${day.day.condition.icon}` }} style={styles.icon} testID="forecast-icon"  />
            <Text style={styles.temp}>{day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</Text>
            <Text style={styles.condition}>{day.day.condition.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    gap: 10
  },
  dayContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 16,
    color: colors.text,
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 14,
    color: colors.text,
  },
  condition: {
    fontSize: 12,
    color: colors.text,
  },
});

export default ForecastSlider;

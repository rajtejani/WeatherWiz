import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

interface ForecastItem {
  date: string;
  tempHigh: number;
  tempLow: number;
  description: string;
  icon: string;
}

interface ForecastListProps {
  forecast: ForecastItem[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  const renderItem = ({ item }: { item: ForecastItem }) => (
    <View style={styles.item}>
      <Text style={styles.date}>{item.date}</Text>
      <Image source={{ uri: `https:${item.icon}` }} style={styles.icon} />
      <Text style={styles.temp}>{item.tempHigh}°C / {item.tempLow}°C</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={forecast}
      renderItem={renderItem}
      keyExtractor={(item) => item.date}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    padding: 15,
    marginVertical: 8,
    alignItems: 'center',
  },
  date: {
    fontSize: 18,
    color: colors.text,
  },
  icon: {
    width: 64,
    height: 64,
    marginVertical: 10,
  },
  temp: {
    fontSize: 16,
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.text,
  },
});

export default ForecastList;
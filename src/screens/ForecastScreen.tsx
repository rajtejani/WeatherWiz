import { useRoute, type RouteProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ForecastList } from '../components';
import { RootState } from '../store/store';
import { setError, setForecast, setLoading } from '../store/weatherSlice';
import { colors } from '../theme';
import { fetchForecast } from '../utils/api';

type RootStackParamList = {
  Forecast: { city: string };
};

type ForecastScreenRouteProp = RouteProp<RootStackParamList, 'Forecast'>;


const ForecastScreen: React.FC = () => {
  const dispatch = useDispatch();
  const route = useRoute<ForecastScreenRouteProp>();
  const { city } = route.params;
  const { forecast, loading, error } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    const loadForecast = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchForecast(city);
        const processedForecast = data.forecast.forecastday.map((day: any) => ({
          date: day.date,
          tempHigh: day.day.maxtemp_c,
          tempLow: day.day.mintemp_c,
          description: day.day.condition.text,
          icon: day.day.condition.icon,
        }));
        dispatch(setForecast(processedForecast));
        dispatch(setError(null));
      } catch (err) {
        console.log(' >>>> FETCH FORECAST ERROR ', err);
        
        dispatch(setError('Failed to fetch forecast data'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadForecast();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast for {city}</Text>
      {loading && <ActivityIndicator size="large" color={colors.primary} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {forecast && <ForecastList forecast={forecast} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ForecastScreen;
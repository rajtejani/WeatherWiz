import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ForecastSlider from '../components/ForecastSlider';
import IconButton from '../components/IconButton';
import WeatherCard from '../components/WeatherCard';
import { useSafeContainerStyles } from '../hooks';
import { RootState } from '../store/store';
import { addFavoriteCity, removeFavoriteCity, setCityForecast, setCityWeather } from '../store/weatherSlice';
import { colors } from '../theme';
import { fetchForecast, fetchWeather } from '../utils/api';

type RootStackParamList = {
  WeatherDetails: { city: string };
};

type WeatherDetailsScreenRouteProp = RouteProp<RootStackParamList, 'WeatherDetails'>;

const WeatherDetailsScreen: React.FC = () => {
  const route = useRoute<WeatherDetailsScreenRouteProp>();
  const navigation = useNavigation();
  const { city } = route.params;
  const dispatch = useDispatch();
  const safeContainerStyles = useSafeContainerStyles();
  const { cityWeather, cityForecast, favoriteCities } = useSelector((state: RootState) => state.weather);
  const [isFavorite, setIsFavorite] = useState(favoriteCities.includes(city));
  const [loaders, setLoaders] = useState({ weatherLoading: false, forecastLoading: false });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cityWeather[city]) {
      fetchCityWeather();
    }
    if (!cityForecast[city]) {
      fetchCityForecast();
    }
  }, [city]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: 5 }}>
          <IconButton
            iconName={isFavorite ? 'bookmark' : 'bookmark-border'}
            onPress={toggleFavorite}
            size={40}
            color={colors.primary}
            // style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
          />
        </View>
      ),
    });
  }, [navigation, isFavorite]);

  const fetchCityWeather = async () => {
    try {
      setLoaders(prev => ({...prev, weatherLoading: true }))
      const data = await fetchWeather(city);
      dispatch(setCityWeather({ city, data }));
    } catch (err) {
      console.error('Failed to fetch weather data', err);
    } finally {
      setLoaders(prev => ({...prev, weatherLoading: false }))
    }
  };

  const fetchCityForecast = async () => {
    try {
      setLoaders(prev => ({...prev, forecastLoading: true }))
      const data = await fetchForecast(city);
      dispatch(setCityForecast({ city, data: data.forecast.forecastday }));
    } catch (err) {
      console.error('Failed to fetch forecast data', err);
    } finally {
      setLoaders(prev => ({...prev, forecastLoading: false }))
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteCity(city));
    } else {
      dispatch(addFavoriteCity(city));
    }
    setIsFavorite(!isFavorite);
  };

  if (loaders.weatherLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchCityWeather} />
      </View>
    );
  }

  if (!cityWeather[city]) {
    return (
      <View style={styles.centerContainer}>
        <Text>No weather data available</Text>
      </View>
    );
  }


  return (
    <ScrollView style={[styles.container, safeContainerStyles]}>
      <WeatherCard location={cityWeather[city].location} current={cityWeather[city].current} />
      {
        loaders.forecastLoading &&
          <View style={styles.inlinedLoaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
      }
      {cityForecast[city] && <ForecastSlider forecast={cityForecast[city]} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  inlinedLoaderContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WeatherDetailsScreen;

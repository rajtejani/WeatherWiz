import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CityWeatherCard from '../components/CityWeatherCard';
import CommonInput from '../components/fields/InputField';
import IconButton from '../components/IconButton';
import { useSafeContainerStyles } from '../hooks';
import { RootState } from '../store/store';
import { setCityWeather, setError, setLoading } from '../store/weatherSlice';
import { colors } from '../theme';
import { fetchWeather } from '../utils/api';

const HomeScreen: React.FC = () => {
  const [searchCity, setSearchCity] = React.useState('');
  const safeStyles = useSafeContainerStyles();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { favoriteCities, cityWeather } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    favoriteCities.forEach(city => {
      if (!cityWeather[city]) {
        fetchCityWeather(city);
      }
    });
  }, [favoriteCities]);

  const fetchCityWeather = async (city: string) => {
    dispatch(setLoading(true));
    try {
      const data = await fetchWeather(city);
      console.log(' >>>>> data ', data)
      dispatch(setCityWeather({ city, data }));
    } catch (err) {
      dispatch(setError('Failed to fetch weather data'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearch = useCallback(() => {
    if (searchCity.trim()) {
      navigation.navigate('WeatherDetails', { city: searchCity.trim() });
      setSearchCity('');
    }
  }, [searchCity, navigation]);

  return (
    <View style={[styles.container, safeStyles]}>
      <View style={styles.searchContainer}>
        <CommonInput
          value={searchCity}
          onChangeText={setSearchCity}
          placeholder="Search for a city"
        />
        <IconButton
          iconName={'search'}
          size={40}
          onPress={handleSearch}
          variant="filled"
          rounded="full"
          color={colors.white}
          style={{ backgroundColor: colors.primary}}
        />
      </View>
      <FlatList
        data={favoriteCities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CityWeatherCard
            city={item}
            temp={cityWeather[item]?.current.temp_c || 0}
            condition={cityWeather[item]?.current.condition.text || ''}
            icon={`https:${cityWeather[item]?.current?.condition?.icon}`}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;

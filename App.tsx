import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import HomeScreen from './src/screens/HomeScreen';
import WeatherDetailsScreen from './src/screens/WeatherDetailsScreen';
import {persistor, store} from './src/store/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Home'}}
            />
            <Stack.Screen
              name="WeatherDetails"
              component={WeatherDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

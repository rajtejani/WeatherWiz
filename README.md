# Weather Forecasting App

A mobile application built with React Native and TypeScript that provides users with weather forecasts. The app integrates with a weather API to display current weather conditions and a 5-day forecast for searched cities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Project Setup](#project-setup)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Scripts](#scripts)

## Prerequisites

- Node.js (version 18.17.0)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Environment Setup

1. Install Node.js (v18.17.0) from [nodejs.org](https://nodejs.org/) or using nvm:
   ```
   nvm install 18.17.0
   nvm use 18.17.0
   ```
2. Set up Xcode and Android Studio following the [React Native Environment Setup guide](https://reactnative.dev/docs/environment-setup).

## Project Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/weather-forecasting-app.git
   cd weather-forecasting-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. (iOS only) Install CocoaPods dependencies:
   ```
   cd ios && pod install && cd ..
   ```

## Running the App

1. Start Metro bundler:
   ```
   npx react-native start
   ```

2. Run on iOS:
   ```
   npx react-native run-ios
   ```

3. Run on Android:
   ```
   npx react-native run-android
   ```

## Project Structure

```
weather-forecasting-app/
├── __tests__/                  # Test files
│   ├── components/             # Component tests
│   ├── screens/                # Screen tests
│   └── redux/                  # Redux tests
├── src/                        # Source files
│   ├── components/             # React components
│   ├── screens/                # Screen components
│   ├── redux/                  # Redux store, slices, and actions
│   ├── services/               # API services
│   ├── utils/                  # Utility functions
│   └── types/                  # TypeScript type definitions
├── App.tsx                     # Main App component
├── index.js                    # Entry point
└── package.json                # Project dependencies and scripts
```

## Testing

The project uses Jest and React Native Testing Library for unit and integration tests. Test files are located in the `__tests__` directory, mirroring the structure of the `src` directory.

To run tests:

```
npm run test
```

To generate a coverage report:

```
npm run test:coverage
```

## Scripts

- `npm start`: Start the Metro bundler
- `npm run android`: Run the app on Android
- `npm run ios`: Run the app on iOS
- `npm run test`: Run unit tests
- `npm run test:coverage`: Run tests with coverage report
- `npm run lint`: Run ESLint
- `npm run typescript`: Run TypeScript compiler check

## API Integration

This app uses [OpenWeatherMap API](https://openweathermap.org/api) for weather data. You need to sign up for a free API key and add it to your environment variables or directly in the code (not recommended for production).

## App Demo

https://github.com/user-attachments/assets/5afc9961-4f70-42a5-8af1-78e11986e003


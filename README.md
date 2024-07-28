# MoviesApp

MoviesApp is a React Native application for browsing and searching movies. This app utilizes various libraries and tools to provide a seamless and efficient experience.


# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Clone the repository
  ```sh
   git clone https://github.com/menna-magdy-182/MoviesApp.git
   cd MoviesApp

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


# Project Structure

/
|-- __tests__   # Holds test files for components and screens
|-- src/
|   |-- assets/   # contains images and icons needed for the app
|   |-- components/  # Contains reusable React components for use across multiple parts of the application
|   |-- constants/ # Stores constants or configuration files, like theme colors
|   |-- models/ # Defines data models or interfaces used throughout the application.
|   |-- navigation/ # Handles navigation-related code, including configuration and route definitions
|   |-- screens/ # Houses individual screens of the application
|   |-- services/ # API-related code such as network requests and response handling
|   |-- types/ # Contains modules definitions
│   ├── utils/ # Utility functions and helpers used throughout the applicatio
|-- index.js # The entry point of the React Native application



# Unit Testing 

- Jest & react native testing library are used to create tests
- you can run it using 'yarn test'


# Typescript errors checking

- you can run it using 'yarn tsc'

# Linting errors checking

- you can run it using 'yarn liny'



# Dependencies

This project uses the following dependencies:

- `@react-navigation/native`: Routing and navigation library for React Native apps.
- `@react-navigation/native-stack`: Provides stack navigation for the app.
- `@tanstack/react-query`: Used for data fetching and caching tool.
- `axios`: Promise-based HTTP client for making API requests.
- `react-native-dotenv`: Load environment variables from a `.env` file.
- `react-native-error-boundary`: Error boundary component to catch JavaScript errors in React components.
- `react-native-fast-image`: Fast, performant image component for React Native.
- `react-native-safe-area-context`: Provides info about safe areas of the screen.
- `react-native-screens`: Provides native screen management to optimize navigation.
- `react-native-svg`: SVG library for rendering SVG images in React Native.
- `rn-circle-progress`: Circular progress bar component.



# DEMO URL
- Android https://drive.google.com/file/d/1q5muJCBx7GEeQB5WC-CuCUxaSsR-m1XK/view?usp=sharing
- iOS https://drive.google.com/file/d/1MyMP5Ze8xbhAXiQICmIML7w1ZNIylytT/view?usp=sharing
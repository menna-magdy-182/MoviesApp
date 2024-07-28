import {NativeModules, PermissionsAndroid, Platform} from 'react-native';

const {LocationModule} = NativeModules;

export const getLocation = async () => {
  try {
    const hasPermission =
      Platform.OS === 'ios' ? true : await requestAndroidLocationPermission();
    if (!hasPermission) {
      return;
    }

    return await LocationModule.getCurrentLocation();
  } catch (e) {
    __DEV__ && console.error(e);
  }
};

export const requestAndroidLocationPermission = async () => {
  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    return false;
  }
};

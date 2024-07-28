import colors from 'constants/colors';
import {SCREEN_WIDTH} from 'constants/sizes';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  columnWrapper: {
    marginStart: SCREEN_WIDTH * 0.03,
  },
  locationText: {
    paddingStart: 20,
    paddingTop: 10,
  },
});

export default styles;

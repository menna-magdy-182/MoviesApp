import colors from 'constants/colors';
import {SCREEN_WIDTH} from 'constants/sizes';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.455,
    marginBottom: 20,
    marginEnd: SCREEN_WIDTH * 0.03,
  },
  imageContainer: {
    borderRadius: 7,
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 0.8,
    width: '100%',
    borderWidth: 0.4,
    borderColor: colors.border,
  },
  percentageContainer: {
    marginTop: -20,
    left: 10,
  },
  textName: {
    marginTop: 7,
    fontSize: 16,
    marginBottom: 2,
  },
  textDate: {
    fontSize: 12,
    color: colors.dimGray,
  },
});

export default styles;

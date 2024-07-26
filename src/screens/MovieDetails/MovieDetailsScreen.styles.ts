import colors from 'constants/colors';
import {SCREEN_WIDTH} from 'constants/sizes';
import {StyleSheet} from 'react-native';

const castListColumnSpace = (SCREEN_WIDTH * 0.1) / 4;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screenBackground,
    flex: 1,
  },
  posterImage: {
    width: SCREEN_WIDTH,
    aspectRatio: 1,
    marginTop: 10,
  },
  infoContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  genres: {
    marginBottom: 15,
    color: colors.dimGray,
  },
  castHeader: {
    marginTop: 20,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  columnWrapper: {
    marginStart: castListColumnSpace,
  },
  castItemContainer: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    paddingBottom: 20,
    width: SCREEN_WIDTH * 0.3,
    alignSelf: 'stretch',
    borderColor: colors.border,
    marginEnd: castListColumnSpace,
  },
  castItemName: {margin: 5},
  castItemImage: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default styles;

import colors from 'constants/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    maxWidth: '80%',
  },
  rightIconContainer: {
    minWidth: 22,
  },
});

export default styles;

import colors from 'constants/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: colors.surface,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 12,
    minHeight: 40,
    borderRadius: 5,
    overflow: 'hidden',
  },
  input: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
export default styles;

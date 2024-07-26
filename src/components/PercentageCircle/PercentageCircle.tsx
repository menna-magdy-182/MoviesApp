import colors from 'constants/colors';
import React, {useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import ProgressCircle from 'rn-circle-progress';
import {formatVotePercentage} from 'utils/formatting.util';

type PercentageCircleProps = {
  value: number;
};

const PercentageCircle = ({value}: PercentageCircleProps) => {
  const color = useMemo(() => {
    if (value <= 3) {
      return colors.background;
    } else if (value > 3 && value < 5) {
      return colors.green;
    } else {
      return colors.gold;
    }
  }, [value]);

  return (
    <ProgressCircle
      percent={value * 10}
      radius={20}
      borderWidth={2}
      bgColor={colors.white}
      color={color}>
      <Text style={styles.text}>{formatVotePercentage(value)}%</Text>
    </ProgressCircle>
  );
};

export default PercentageCircle;

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    fontWeight: '500',
  },
});

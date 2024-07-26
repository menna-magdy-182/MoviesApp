import colors from 'constants/colors';
import React from 'react';
import {StyleSheet, Text as TextRN, TextProps} from 'react-native';

const Text = (props: TextProps) => {
  return <TextRN {...props} style={[styles.text, props?.style]} />;
};

export default Text;

const styles = StyleSheet.create({
  text: {
    color: colors.text,
  },
});

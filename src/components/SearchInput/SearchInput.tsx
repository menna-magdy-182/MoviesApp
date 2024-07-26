import colors from 'constants/colors';
import React from 'react';
import {TextInput, TextStyle, View, ViewStyle} from 'react-native';

import styles from './SearchInput.styles';

type SearchInputProps = {
  onChangeText: (value: string) => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
};

const SearchInput = ({onChangeText, style, inputStyle}: SearchInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={'Search'}
        placeholderTextColor={colors.placeholder}
        style={[styles.input, inputStyle]}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchInput;

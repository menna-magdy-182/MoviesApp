// Header.tsx
import {useNavigation} from '@react-navigation/native';
import images from 'assets/images';
import ExtendedSvg from 'components/ExtendedSvg/ExtendedSvg';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './Header.styles';

interface HeaderProps {
  title?: string;
  onBackPress?: () => void;
  showBackIcon?: boolean;
  renderRightIcon?: () => React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  showBackIcon = true,
  renderRightIcon,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => navigation.goBack();

  return (
    <View style={styles.container}>
      {showBackIcon && (
        <TouchableOpacity onPress={onBackPress || handleBackPress}>
          <ExtendedSvg svgFile={images.IconBack} size={22} />
        </TouchableOpacity>
      )}

      {Boolean(title) && (
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      )}

      <View style={styles.rightIconContainer}>{renderRightIcon?.()}</View>
    </View>
  );
};

export default Header;

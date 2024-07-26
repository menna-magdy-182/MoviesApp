import colors from 'constants/colors';
import React, {FunctionComponent} from 'react';
import {SvgProps} from 'react-native-svg';

interface ExtendedSvgProps extends SvgProps {
  svgFile: FunctionComponent<SvgProps>;
  color?: string;
  size?: number;
}

const ExtendedSvg: React.FC<ExtendedSvgProps> = props => {
  return (
    <props.svgFile
      color={props.color || colors.primary}
      width={props.size || 25}
      height={props.size || 25}
    />
  );
};

export default ExtendedSvg;

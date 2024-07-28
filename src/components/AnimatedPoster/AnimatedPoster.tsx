import React from 'react';
import {requireNativeComponent, ViewStyle} from 'react-native';

interface AnimatedPosterProps {
  imageUrl: string;
  style?: ViewStyle;
}

const AnimatedPoster =
  requireNativeComponent<AnimatedPosterProps>('AnimatedPoster');

const Poster: React.FC<AnimatedPosterProps> = ({imageUrl, style}) => {
  return <AnimatedPoster imageUrl={imageUrl} style={style} />;
};

export default Poster;

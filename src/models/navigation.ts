import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  MovieDetails: {movieId: number};
};

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Home'
>;

export type MovieDetailsScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'MovieDetails'
>;

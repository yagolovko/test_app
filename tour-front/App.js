import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  PlaceScreen,
  AddPlaceScreen,
  AddTourScreen,
  AddCultPlaceScreen,
  PlacesScreen,
  CultPlacesScreen,
} from './screens';

const AppNavigator = createStackNavigator(
  {
    Place: {
      screen: PlaceScreen
    },
    AddPlace: {
      screen: AddPlaceScreen
    },
    AddCultPlace: {
      screen: AddCultPlaceScreen
    },
    AddTour: {
      screen: AddTourScreen
    },
    Places: {
      screen: PlacesScreen
    },
    CultPlaces: {
      screen: CultPlacesScreen
    }
  },
  {
    initialRouteName: 'Places'
  }
);

export default createAppContainer(AppNavigator);

import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Foundation, Ionicons } from '@expo/vector-icons';

import {
  GrayText,
  Button,
  Badge,
  Container,
  Tours,
  PlusButton
} from '../components';

import { placesApi, phoneFormat } from '../utils';

const PlaceScreen = ({ navigation }) => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    const id = navigation.getParam('place')._id;
    placesApi
      .show(id)
      .then(({ data }) => {
        setTours(data.data.tours);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PlaceDetails>
        <PlaceFullname>
          {navigation.getParam('place', {}).fullname}
        </PlaceFullname>
        <GrayText>
          {navigation.getParam('place', {}).description}
        </GrayText>
        <PlaceTours>
        <Container>
          {isLoading ? (
            <ActivityIndicator size="large" color="#2A86FF" />
          ) : (
            tours.map(tours => (
              <TourCard key={tours._id}>
                <TourCardRow>
                <TouchableOpacity
                    onPress={navigation.navigate.bind(this, 'Places')}
                    style={{ marginRight: 20 }}
                  >
                  <TourCardLabel>
                    {' '}
                    <Text style={{ fontWeight: '600' }}>
                      {tours.fullname}
                    </Text>
                  </TourCardLabel>
                </TouchableOpacity>
                </TourCardRow>
                <TourCardRow>
                  <TourCardLabel>
                    Описание:{' '}
                    <Text style={{ fontWeight: '600' }}>
                      {tours.description}
                    </Text>
                  </TourCardLabel>
                </TourCardRow>
              </TourCard>
            ))
          )}
        </Container>
      </PlaceTours>
      </PlaceDetails>
      <PlusButton
        onPress={navigation.navigate.bind(this, 'AddTour', {
          placeId: navigation.getParam('place', {})._id
        })}
      />
    </View>
  );
};

const MoreButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 32px;
  width: 32px;
`;


const PlaceDetails = styled(Container)`
  flex: 1;
`;


const PlaceFullname = styled.Text`
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 3px;
`;

PlaceScreen.navigationOptions = {
  title: 'Маршрут',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};


const TourCardLabel = styled.Text`
  font-size: 16px;
`;

const TourCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
`;

const TourCard = styled.View`
  shadow-color: gray;
  elevation: 0.5;
  shadow-opacity: 0.4;
  shadow-radius: 10;
  padding: 20px 25px;
  border-radius: 10px;
  background: white;
  margin-bottom: 20px;
`;

const PlaceTours = styled.View`
  flex: 1;
  background: #f8fafd;
`;


export default PlaceScreen;

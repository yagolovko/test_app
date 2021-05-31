import React, { useState, useEffect } from 'react';
import { SectionList, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';

import { Tour, SectionTitle, PlusButton } from '../components';
import { toursApi } from '../utils/api';

const HomeScreen = props => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdateTime, setlastUpdateTime] = useState(null);

  const fetchTours = () => {
    setIsLoading(true);
    toursApi
      .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally(e => {
        setIsLoading(false);
      });
  };

  useEffect(fetchTours, []);

  useEffect(fetchTours, [navigation.state.params]);


  const removeTour = id => {
    Alert.alert(
      'Удаление маршрута',
      'Вы действительно хотите удалить маршрут?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Удалить',
          onPress: () => {
            setIsLoading(true);
            toursApi
              .remove(id)
              .then(() => {
                fetchTours();
              })
              .catch(() => {
                setIsLoading(false);
              });
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      {data && (
        <SectionList
          sections={data}
          keyExtractor={item => item._id}
          onRefresh={fetchTours}
          refreshing={isLoading}
          renderItem={({ item }) => (
            <Swipeable
              rightButtons={[
                <SwipeViewButton
                  onPress={removeTour.bind(this, item._id)}
                  style={{ backgroundColor: '#F85A5A' }}
                >
                  <Ionicons name="ios-close" size={48} color="white" />
                </SwipeViewButton>
              ]}
            >
              <Tour navigate={navigation.navigate} item={item} />
            </Swipeable>
          )}
        />
      )}
      <PlusButton onPress={navigation.navigate.bind(this, 'AddPlace')} />
    </Container>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Места',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  },
  headerRight: () => (
    <TouchableOpacity
      onPress={navigation.navigate.bind(this, 'Places')}
      style={{ marginRight: 20 }}
    >
      <Ionicons name="md-people" size={28} color="black" />
    </TouchableOpacity>
  )
});

const SwipeViewButton = styled.TouchableOpacity`
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
`;

export default HomeScreen;

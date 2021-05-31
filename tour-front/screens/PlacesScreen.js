import React, { useState, useEffect } from 'react';
import { FlatList, Alert, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';
import { Item, Input } from 'native-base';

import { Tour, SectionTitle, PlusButton } from '../components';
import { placesApi} from '../utils';

const PlacesScreen = props => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaces = () => {
    setIsLoading(true);
    
    placesApi
      .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally(e => {
        setIsLoading(false);
      });
  };

  useEffect(fetchPlaces, []);

  useEffect(fetchPlaces, [navigation.state.params]);

  const onSearch = e => {
    setSearchValue(e.nativeEvent.text);
  };

  const removePlace = id => {
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
            placesApi
              .remove(id)
              .then(() => {
                fetchPlaces();
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
        <>
          <View style={{ padding: 20 }}>
            <Item style={{ paddingLeft: 15, borderRadius: 30 }} regular>
              <Input onChange={onSearch} placeholder="Поиск..." />
            </Item>
          </View>
          <FlatList
            data={data.filter(
              item =>
                item.fullname
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase()) >= 0
            )}
            keyExtractor={item => item._id}
            onRefresh={fetchPlaces}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <Swipeable
                rightButtons={[
                  <SwipeViewButton
                    onPress={removePlace.bind(this, item._id)}
                    style={{ backgroundColor: '#F85A5A' }}
                  >
                    <Ionicons name="ios-close" size={48} color="white" />
                  </SwipeViewButton>
                ]}
              >
                <Tour
                  navigate={navigation.navigate}
                  item={{
                    place: item,
                    description: item.description
                  }}
                />
              </Swipeable>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <SectionTitle>{title}</SectionTitle>
            )}
          />
        </>
      )}
      <PlusButton onPress={navigation.navigate.bind(this, 'AddPlace')} />
    </Container>
  );
};

PlacesScreen.navigationOptions = {
  title: 'Маршруты',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};

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

export default PlacesScreen;

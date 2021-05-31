import React, { useState, useEffect } from 'react';
import { FlatList, Alert, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';
import { Item, Input } from 'native-base';

import { CultPlaces, SectionTitle, PlusButton } from '../components';
import { cultplacesApi} from '../utils';

const CultPlacesScreen = props => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchCultPlaces = () => {
    setIsLoading(true);
    
    cultplacesApi
      .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally(e => {
        setIsLoading(false);
      });
  };

  useEffect(fetchCultPlaces, []);

  useEffect(fetchCultPlaces, [navigation.state.params]);

  const onSearch = e => {
    setSearchValue(e.nativeEvent.text);
  };

  const removeCultPlace = id => {
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
            cultplacesApi
              .remove(id)
              .then(() => {
                fetchCultPlaces();
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
            onRefresh={fetchCultPlaces}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <Swipeable
                rightButtons={[
                  <SwipeViewButton
                    onPress={removeCultPlace.bind(this, item._id)}
                    style={{ backgroundColor: '#F85A5A' }}
                  >
                    <Ionicons name="ios-close" size={48} color="white" />
                  </SwipeViewButton>
                ]}
              >
                <CultPlaces
                  navigate={navigation.navigate}
                  item={{
                    cultplace: item,
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
      <PlusButton onPress={navigation.navigate.bind(this, 'AddCultPlace')} />
    </Container>
  );
};

CultPlacesScreen.navigationOptions = {
  title: 'Культурные места',
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

export default CultPlacesScreen;

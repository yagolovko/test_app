import React, { useState } from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item, Input, Label } from 'native-base';
import styled from 'styled-components';

import { placesApi } from '../utils/api';

import { Button, Container } from '../components';

const AddPlaceScreen = ({ navigation }) => {
  const [values, setValues] = useState({});

  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    });
  };

  const onSubmit = () => {
    placesApi
      .add(values)
      .then(() => {
        navigation.navigate('Place');
      })
      .catch(e => {
        alert('BAD');
      });
  };

  return (
    <Container>
      <Item style={{ marginLeft: 0 }} floatingLabel>
        <Label>Название маршрута</Label>
        <Input
          onChange={handleChange.bind(this, 'fullname')}
          value={values.fullname}
          style={{ marginTop: 12 }}
          autoFocus
        />
      </Item>
      <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
        <Label>Описание маршрута</Label>
        <Input
          onChange={handleChange.bind(this, 'description')}
          value={values.description}
          keyboardType="default"
          style={{ marginTop: 12 }}
        />
      </Item>
      <ButtonView>
        <Button onPress={onSubmit} color="#87CC6F">
          <Ionicons name="ios-add" size={24} color="white" />
          <Text>Добавить</Text>
        </Button>
      </ButtonView>
    </Container>
  );
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

AddPlaceScreen.navigationOptions = {
  title: 'Добавление нового маршрута',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default AddPlaceScreen;

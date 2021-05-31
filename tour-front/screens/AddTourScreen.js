import React, { useState } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item, Input, Label, Picker } from 'native-base';
import styled from 'styled-components';

import { toursApi } from '../utils/api';

import { Button, Container } from '../components';

const AddTourScreen = ({ navigation }) => {
  const [values, setValues] = useState({
    fullname: '',
    description: '',
    place: navigation.getParam('placeId')
  });

  const fieldsName = {
    fullname: 'Название маршрута',
    description: 'Описание маршрута',

  };

  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleInputChange = (name, e) => {
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  };

  const onSubmit = () => {
    toursApi
      .add(values)
      .then(() => {
        navigation.navigate('Places', { lastUpdate: new Date() });
      })
      .catch(e => {
        if (e.response.data && e.response.data.message) {
          e.response.data.message.forEach(err => {
            const fieldName = err.param;
            alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
          });
        }
      });
  };

  return (
    <Container>
      <Item style={{ marginLeft: 0 }} floatingLabel>
        <Label>Название места</Label>
        <Input
          onChange={handleInputChange.bind(this, 'fullname')}
          value={values.fullname}
          style={{ marginTop: 12 }}
          keyboardType="default"
          autoFocus
        />
      </Item>
      <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
        <Label>Описание места</Label>
        <Input
          onChange={handleInputChange.bind(this, 'description')}
          value={values.description}
          keyboardType="default"
          style={{ marginTop: 12 }}
        />
      </Item>
      <Item style={{ marginTop: 20, marginLeft: 0 }}>
      </Item>
      <Item style={{ marginTop: 20, marginLeft: 0 }}>
        <TimeRow>
          <View style={{ flex: 1 }}>
          </View>
        </TimeRow>
      </Item>
      <ButtonView>
        <Button onPress={onSubmit} color="#87CC6F">
          <Ionicons name="ios-add" size={24} color="white" />
          <Text>Добавить место</Text>
        </Button>
      </ButtonView>
    </Container>
  );
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

const TimeRow = styled.View`
  flex-direction: row;
`;

AddTourScreen.navigationOptions = {
  title: 'Добавление нового места',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};

export default AddTourScreen;

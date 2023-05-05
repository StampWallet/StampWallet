import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import TopBar from '../components/TopBar';
import CardTile from '../components/CardTile';
import ListItemSeparator from '../components/ListItemSeparator';

const cards = [
  {
    image: require('../assets/biedronka_homepage.jpg'),
  },
  {
    image: require('../assets/biedronka_homepage.jpg'),
  },
];

export default function MainScreen() {
  const [text, onChangeText] = useState('');

  return (
    <View style={styles.container}>
      <TopBar
        iconLeft={'menu'}
        onPressLeft={() => alert('Work in progress')}
        iconRight={'filter-menu-outline'}
        onPressRight={() => alert('Work in progress')}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        placeholder="Search"
        value={text}
      />
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <CardTile image={item.image} onPress={() => alert('Work in progress')} />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 60,
    margin: 12,
    padding: 10,
    fontSize: 18,
  },
});

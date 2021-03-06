import React from 'react';
import {FlatList} from 'react-native';
import {Card} from 'home/Card';

export function CardsListLoading() {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={Object.keys([...Array(8)])}
      numColumns={2}
      renderItem={item => <Card key={item} />}
      keyExtractor={item => item}
    />
  );
}

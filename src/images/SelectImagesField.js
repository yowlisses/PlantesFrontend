import {hasSomeTrueValuedKey} from 'utils/hasSomeTrueValuedKey';
import {Label} from 'form/Label';
import {MiniMessage} from 'form/MiniMessage';
import React from 'react';
import {FlatList} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {SelectImagesItem} from './SelectImageItem';
import {SelectImagesButton} from './SelectImagesButton';

export function SelectImagesField({label, value, error, control, onChange}) {
  const renderItem = ({item: uri}) => (
    <SelectImagesItem uri={uri} key={uri} onChange={onChange} />
  );

  const uris = typeof value === 'object' ? Object.keys(value) : [];

  return (
    <View style={styles.container}>
      <Label text={label} style={styles.label} />
      <View style={!!uris.length && styles.wrapper}>
        <FlatList
          horizontal
          data={uris}
          renderItem={renderItem}
          contentContainerStyle={[styles.inner]}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <SelectImagesButton
        value={value}
        control={control}
        onChange={onChange}
        reduced={!!uris.length}
      />
      {error && !hasSomeTrueValuedKey(value) && (
        <MiniMessage isError text={error} />
      )}
    </View>
  );
}

const offset = 2;

const styles = StyleSheet.create({
  inner: {
    padding: offset,
  },
  container: {
    marginBottom: 10,
    alignItems: 'stretch',
  },
  label: {
    // backgroundColor: 'white',
  },
  wrapper: {
    borderBottomWidth: 0,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderStyle: 'solid',
    borderColor: '#bbb',
  },
});

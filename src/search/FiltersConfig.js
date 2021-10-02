import {OptionsButton} from 'home/OptionsButton';
import {useModal} from 'modal/ModalContext';
import {availabilitiesLabels} from 'publish/data/availiabilities';
import React from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {ApplyButton} from './ApplyButton';
import {FiltersModal} from './FiltersModal';
import {searchOptions} from './searchOptions';
import {reHydrate} from './unappliedSearchOptions';

export function FiltersConfig() {
  const {showModal} = useModal();
  function onFiltersPress() {
    showModal(<FiltersModal />, {
      FloatingComponent: <ApplyButton />,
      snapPoint: 400,
      onClosed: reHydrate,
    });
  }

  const showText = Object.entries(searchOptions.availabilities)
    .filter(entry => entry[1])
    .map(entry => availabilitiesLabels[entry[0]].toLowerCase())
    .concat(
      Object.entries(searchOptions.tags)
        .filter(entry => entry[1])
        .map(entry => entry[0]),
    );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.indicatorsWrapper}>
        <Text numberOfLines={1}>
          {showText.map(text => (
            <Text style={styles.indicator}>{text}, </Text>
          ))}
          {showText.length === 0 && (
            <Text style={styles.withoutIndicators}>Nenhum filtro </Text>
          )}
        </Text>
      </ScrollView>
      <OptionsButton text="Filtros" onPress={onFiltersPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    fontSize: 16,
    color: 'green',
  },
  withoutIndicators: {
    fontSize: 16,
    color: 'gray',
  },
  indicatorsWrapper: {
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
});

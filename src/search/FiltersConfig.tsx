import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';

import {useModal} from 'modal/ModalContext';
import {refreshPlants} from 'home/loadPlants';
import {ApplyButton} from 'search/ApplyButton';
import {OptionsButton} from 'home/OptionsButton';
import {FiltersModal} from 'search/FiltersModal';
import {searchOptions} from 'search/searchOptions';
import {concatWithCommas} from 'utils/concatWithCommas';
import {getTrueValuedKeys} from 'utils/getTrueValuedKeys';
import {availabilitiesLabels} from 'publish/data/availiabilities';

export function FiltersConfig() {
  const {reset, control, handleSubmit} = useForm();
  const {showModal, closeModal} = useModal();

  function onSubmit(value) {
    searchOptions.availabilities = value.availabilities;
    searchOptions.tags = value.tags;
    refreshPlants();
    closeModal();
  }

  function showFiltersModal() {
    showModal(<FiltersModal reset={reset} control={control} />, {
      FloatingComponent: <ApplyButton onPress={handleSubmit(onSubmit)} />,
      snapPoint: 400,
      onClosed: reset,
    });
  }

  const showText = getTrueValuedKeys(searchOptions.availabilities)
    .map(value => availabilitiesLabels[value])
    .concat(getTrueValuedKeys(searchOptions.tags));

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.indicatorsWrapper}>
        <Text numberOfLines={1}>
          {showText.length === 0 ? (
            <Text style={styles.withoutIndicators}>Nenhum filtro </Text>
          ) : (
            <Text style={styles.indicator}>{concatWithCommas(showText)}</Text>
          )}
        </Text>
      </ScrollView>
      <OptionsButton text="Filtros" onPress={showFiltersModal} />
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

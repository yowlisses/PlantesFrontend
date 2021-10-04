import {TagsSelector} from 'form/TagsSelector';
import {
  availabilities,
  availabilitiesLabels,
} from 'publish/data/availiabilities';
import {tags} from 'publish/data/tags';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import {CleanFiltersButton} from './CleanFiltersButton';

export function FiltersModal() {
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cleanWrapper}>
        <CleanFiltersButton
          text="Limpar"
          // Must use no parameters
          onPress={() => reset()}
        />
      </View>
      <Controller
        control={control}
        defaultValue={{}}
        name="availabilities"
        render={({field: {onChange, onBlur, value}}) => (
          <TagsSelector
            value={value}
            onBlur={onBlur}
            showIcon={false}
            onChange={onChange}
            label="Disponível para"
            options={availabilities}
            buttonStyle={styles.button}
            labels={availabilitiesLabels}
          />
        )}
      />
      <Controller
        name="tags"
        control={control}
        defaultValue={{}}
        render={({field: {onChange, onBlur, value}}) => (
          <TagsSelector
            value={value}
            options={tags}
            onBlur={onBlur}
            label="De preferência"
            onChange={onChange}
          />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 9,
    justifyContent: 'center',
  },
  cleanWrapper: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

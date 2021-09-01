import React from 'react';
import {ScrollView} from 'react-native';
import {TagsSelector} from 'form/TagsSelector';
import {TextInputSaved} from 'form/TextInputSaved';
import {publishData} from 'publish/publishData';
import {PublishScreenLayout} from './PublishScreenLayout';
import {ItemTypeSelector} from 'form/ItemTypeSelector';

export function PublishDetailScreen() {
  const {name, options, description, type} = publishData;

  return (
    <PublishScreenLayout ratio={2 / 3} nextRoute="PublishPrice">
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInputSaved dataItem={name} autoFocus />
        <ItemTypeSelector dataItem={type} />
        <TagsSelector label="Marcar como" options={options} />
        <TextInputSaved
          dataItem={description}
          style={{paddingBottom: 35}}
          optional
          multiline
        />
      </ScrollView>
    </PublishScreenLayout>
  );
}

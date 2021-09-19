import React from 'react';

import {CommonActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import {useSending} from 'send/SendingContext';
import {formatToPlant} from 'send/formatToPlant';

import {NextButton} from './NextButton';
import {useImages} from './ImagesContext';
import {useShallowData} from './ShallowDataContext';

export function FinishButton() {
  const {pushSending} = useSending();
  const {dispatch} = useNavigation();

  const {discard: discardImagesSelection} = useImages();
  const {data: shallowData, discard: discardShallowData} = useShallowData();

  function resetNavigation() {
    dispatch({
      ...CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    });
  }

  function onPress() {
    resetNavigation();
    const sending = formatToPlant(shallowData);
    pushSending(sending);
    discardImagesSelection();
    discardShallowData();
  }

  return <NextButton route="Home" text="Enviar" customOnPress={onPress} />;
}
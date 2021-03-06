import React from 'react';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';

import {useModal} from 'modal/ModalContext';

import {BarButton} from 'publish/BarButton';
import {selectedAlbum} from 'images/selectedAlbum';
import {SelectLocalImageAlbumModal} from 'images/SelectImageAlbumModal';

export function SelectImageAlbumButton({...res}) {
  const {showModal} = useModal();

  const onPress = () => {
    showModal(<SelectLocalImageAlbumModal />, {snapPoint: 300});
  };

  return (
    <BarButton
      {...res}
      onPress={onPress}
      icon={faAngleDown}
      text={selectedAlbum.name}
      iconStyle={{marginRight: 2}}
    />
  );
}

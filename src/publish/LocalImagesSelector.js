import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';

import {width} from 'utils/width';
import {SelectableImage} from './SelectableImage';
import {usePublish} from './PublishContext';
import CameraRoll from '@react-native-community/cameraroll';

const numberOfCollums = 3;

export function LocalImagesSelector({flatListHeader}) {
  const {state, dispatch} = usePublish();
  const images = state.images || {};
  const [foundImages, setFoundImages] = useState([]);

  const album = state._localAlbum;

  async function getPhotos() {
    console.error('get photos, album ', album);
    CameraRoll.getPhotos({
      groupName: album !== 'Galeria' ? album : undefined,
      first: 100,
    })
      .then(res => {
        setFoundImages(res.edges.map(edge => edge.node.image.uri));
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getPhotos();
  }, [album]);

  useEffect(() => {
    getPhotos();
  }, [album]);

  const getImageIndex = uri =>
    images[uri] ? Object.keys(images).indexOf(uri) + 1 : null;

  return (
    <FlatList
      data={foundImages}
      numColumns={numberOfCollums}
      keyExtractor={item => item}
      ListHeaderComponent={flatListHeader}
      showsVerticalScrollIndicator={false}
      getItemLayout={(data, index) => {
        return {
          length: width / numberOfCollums,
          offset: ((width / numberOfCollums) * index) % numberOfCollums,
          index,
        };
      }}
      renderItem={({item: uri}) => (
        <SelectableImage
          key={uri}
          uri={uri}
          dispatch={dispatch}
          index={getImageIndex(uri)}
        />
      )}
    />
  );
}

import React, {useContext, useState} from 'react';
import {createContext} from 'react';
import {useLocalStorage} from 'storage/useLocalStorage';

import {publishData} from 'publish/publishData';

const ImageGroupContext = createContext();

export function ImageGroupContextProvider({children}) {
  const [images, setImages] = useLocalStorage(publishData.images);
  const [lastImageUri, setLastImageUri] = useState('');

  function addImage(imageUri) {
    if (imageUri && imageUri !== lastImageUri) {
      const copy = [...images];
      copy.push(imageUri);
      setImages(copy);
      setLastImageUri(imageUri);
    }
  }

  return (
    <ImageGroupContext.Provider value={{images, addImage, setImages}}>
      {children}
    </ImageGroupContext.Provider>
  );
}

export function useImageGroup() {
  return useContext(ImageGroupContext);
}

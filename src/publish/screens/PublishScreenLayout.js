import React from 'react';
import {View} from 'react-native';

import {ProgressBar} from 'publish/ProgressBar';
import {CustomHeader} from 'publish/CustomHeader';
import {BackButton} from 'publish/BackButton';

export function PublishScreenLayout({
  ratio,
  children,
  headerLeft,
  headerRight,
  hideBar = false,
}) {
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title="Publicar"
        left={headerLeft !== undefined ? headerLeft : <BackButton />}
        right={headerRight}
      />
      {!hideBar && <ProgressBar ratio={ratio} />}
      <View style={{flex: 1}}>{children}</View>
    </View>
  );
}

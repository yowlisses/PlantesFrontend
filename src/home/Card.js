import React from 'react';

import {SquareImage} from 'common/SquareImage';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {width} from 'utils/width';
import {auth} from 'auth/auth';

export function Card({item, fraction, postComponent}) {
  const {navigate} = useNavigation();

  const onPress = () => {
    if (item) {
      if (item.userId === auth.userId) {
        navigate('OwnItem', {item, preImage: item?.card});
      } else {
        navigate('ShowItem', {item, preImage: item?.card});
      }
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <SquareImage
        uri={item?.card}
        fraction={fraction || 2}
        // style={styles.card}
      />
      {postComponent}
      {/* <View style={styles.textContainer}>
        <Text style={styles.text}>{item.donate ? 'Doação ' : ''}</Text>
        <Text style={styles.text}>{item.swap ? 'Troca ' : ''}</Text>
        <Text style={styles.text}>{item.price ? 'R$' + item.price : ''}</Text>
      </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // card: {
  //   borderRadius: 10,
  // },
  textContainer: {
    width: width / 2,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

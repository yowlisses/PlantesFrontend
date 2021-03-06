import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export function OptionsButton({text, ...rest}) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <FontAwesomeIcon icon={faAngleDown} color="gray" size={20} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
});

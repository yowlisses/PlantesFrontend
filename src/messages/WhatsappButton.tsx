import React from 'react';
import {StyleSheet} from 'react-native';
import {TextIconButton} from '../common/TextIconButton';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import {openInWhatsapp} from './openInWhatsapp';

export function WhatsappButton({number}) {
  function onPress() {
    openInWhatsapp(number);
  }

  return (
    <TextIconButton
      text="Mensagem"
      icon={faWhatsapp}
      onPress={onPress}
      iconColor={'#fff'}
      activeColor="#0b0"
      style={styles.button}
      textStyle={styles.text}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    elevation: 2,
  },
  text: {
    color: '#fff',
  },
});

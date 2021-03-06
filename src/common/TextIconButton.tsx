import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export function TextIconButton({
  icon,
  text,
  style,
  iconSize,
  iconColor,
  textStyle,
  activeColor,
  activeOpacity,
  ...rest
}) {
  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: activeColor || '#ccc',
          borderRadius: style?.borderRadius || 10,
          elevation: style?.elevation,
          margin: style?.margin,
          marginTop: style?.marginTop,
          marginBottom: style?.marginBottom || 10,
          marginRight: style?.marginRight,
          marginLeft: style?.marginLeft,
        },
      ]}>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: '#fff'},
          style,
          {
            elevation: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          },
        ]}
        {...rest}
        activeOpacity={activeOpacity || 0.7}>
        {!!icon && (
          <FontAwesomeIcon
            icon={icon}
            color={iconColor}
            style={styles.icon}
            size={iconSize || 25}
          />
        )}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    elevation: 0,
    marginBottom: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  icon: {
    marginLeft: 10,
  },
});

import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {basicHitSlop} from 'common/basicHitSlop';
import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text} from 'react-native';

export function SearchBox() {
  const [active, setActive] = useState(false);

  const ref = useRef();

  function onPress() {
    ref?.current?.focus();
    setActive(true);
  }

  function onClosePress() {
    ref?.current?.blur();
    setActive(false);
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.searchBox}
      activeOpacity={0.8}>
      {!active ? (
        <>
          <Text style={styles.title}>Plantei</Text>
          <FontAwesomeIcon icon={faSearch} color="gray" size={20} />
        </>
      ) : (
        <>
          <TextInput
            ref={ref}
            style={styles.input}
            autoFocus
            returnKeyType="search"
            placeholder="Pesquisar"
          />
          <TouchableOpacity onPress={onClosePress} hitSlop={basicHitSlop}>
            <FontAwesomeIcon icon={faTimes} color="gray" size={20} />
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  searchBox: {
    marginVertical: 3,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 45,
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});

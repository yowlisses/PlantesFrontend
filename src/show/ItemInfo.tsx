import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import {LoadingItemInfo} from './LoadingItemInfo';
import {TagsList} from './TagsList';
import {UserLink} from './UserLink';

const {width} = Dimensions.get('window');

export function ItemInfo({scrollTo, item}) {
  if (!item) {
    return <LoadingItemInfo />;
  }

  return (
    <View>
      <Text style={styles.title}>{item?.name}</Text>
      <UserLink id={item?.userId} />
      <View style={styles.section}>
        {!!(item?.tags && item.tags.length) && (
          <>
            <Pressable
              style={styles.aboutWrapper}
              onPress={() => scrollTo(width + 80)}>
              <FontAwesomeIcon icon={faChevronDown} color={'gray'} />
              <Text style={styles.about}>Detalhes</Text>
            </Pressable>
            <TagsList tags={item?.tags || []} />
          </>
        )}
      </View>
      {item?.description ? (
        <View>
          <View style={styles.aboutWrapper}>
            <FontAwesomeIcon icon={faChevronDown} color={'gray'} />
            <Text style={styles.about}>Descrição</Text>
          </View>
          <Text style={styles.about}>{item?.description}</Text>
        </View>
      ) : (
        <Text style={styles.notProvided}>Sem descrição</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginHorizontal: 10,
  },
  distance: {
    fontSize: 18,
  },
  owner: {
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  belongsTo: {
    marginTop: 20,
    marginLeft: 14,
    fontSize: 18,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  about: {
    fontSize: 18,
    marginBottom: 8,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  aboutWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 20,
  },
  notProvided: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    padding: 10,
  },
});

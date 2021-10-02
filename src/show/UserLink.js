import {cepToString} from 'common/cepToString';
import {UserRoundImage} from 'common/UserRoundImage';
import {useUserById} from 'common/UsersByIdContext';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function UserLink({id}) {
  const {getUserById} = useUserById();
  const user = getUserById(id);

  return (
    <View style={styles.container}>
      <UserRoundImage
        style={styles.image}
        size={40}
        userId={user?._id}
        image={user?.image}
      />
      <View>
        {!!user.name && <Text style={styles.name}>{user?.name}</Text>}
        {!!user.cep && (
          <Text style={styles.local}>{cepToString(user?.cep)}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
  local: {
    fontSize: 16,
    color: 'gray',
  },
});

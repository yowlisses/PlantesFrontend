import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Message} from 'chat/Message';
import {MessageInput} from 'chat/MessageInput';
import {CustomHeader} from 'publish/CustomHeader';
import {BackButton} from 'publish/BackButton';
import {UserImageAndName} from 'user/UserImageAndName';
import {FlatList} from 'react-native-gesture-handler';
import {api} from 'api/api';
import {useUserContext} from 'auth/userContext';

export function ChatScreen({route}) {
  const {chat, user} = route.params;
  const {user: currentUser} = useUserContext();

  const [messages, setMessages] = useState([]);

  async function getMessages() {
    try {
      const res = await api.get('chatmessages/' + chat._id);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMessages();
    return getMessages;
  }, []);

  function renderItem({item: message}) {
    return (
      <Message
        key={message.id}
        message={message}
        fromUser={currentUser._id === message.userId}
        // moreMargin={actualLastUserId !== message.userId}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <CustomHeader
        left={<BackButton />}
        center={<UserImageAndName image={user?.image} name={user?.name} />}
      />
      <FlatList data={messages} renderItem={renderItem} />
      <MessageInput />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  pad: {
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ItemInfo} from 'show/ItemInfo';
import {ImagesSwiper} from 'show/ImagesSwiper';
import {FloatingButton} from 'show/FloatingButton';
import {AvailabilityInfo} from 'show/AvailabilityInfo';
import {StartConversetionButton} from 'show/StartConversationButton';
import {api} from 'api/api';

export function ShowItemScreen({route}) {
  const {itemId, preImage} = route.params;

  const [item, setItem] = useState(null);

  const scrollRef = useRef();

  const scrollTo = pos => {
    scrollRef.current.scrollTo({y: pos, animated: true});
  };

  console.error(preImage);
  async function getItem() {
    const res = await api.get('/plant/' + itemId);
    setItem(res.data);
  }

  useEffect(() => {
    getItem();
  }, []);

  // const {navigate} = useNavigation();
  // const {setOneChatReference} = useChatReference();

  const onPress = () => {};
  // const onPress = () => {
  //   if (!item) {
  //     return;
  //   }
  //   const {name, thumbnail} = item;
  //   setOneChatReference(item.owner.id, {
  //     type: 'plant',
  //     plantId: item.id,
  //     name,
  //     thumbnail,
  //   });
  //   navigate('Chat', {item: item.owner});
  // };

  return (
    <View style={styles.screen}>
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <FloatingButton />
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        <ImagesSwiper images={item?.images} preImage={preImage} />
        <ItemInfo scrollTo={scrollTo} item={item} />
      </ScrollView>
      <View style={styles.bottomWrapper}>
        <AvailabilityInfo onModalConfirmPress={onPress} item={item} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <StartConversetionButton onPress={onPress} loading={!item} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'white',
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  padding: {
    padding: 10,
    flexDirection: 'row',
  },
});

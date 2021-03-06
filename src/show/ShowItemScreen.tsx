import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Title} from './Title';
import {Section} from './Section';
import {UserLink} from './UserLink';
import {TagsList} from './TagsList';
import {Secondary} from './Secondary.tsx';

import {Description} from 'post/Description';
import {ImagesSwiper} from 'show/ImagesSwiper';
import {FloatingButton} from 'show/FloatingButton';
import {WhatsappButton} from 'messages/WhatsappButton';
import {AvailabilityInfo} from 'show/AvailabilityInfo';
import {InstagramButton} from 'messages/InstagramButton';
import {auth} from 'auth/auth';
import {EditButton} from './EditButton';
import {RemoveButton} from './RemoveButton';
import {useUser} from 'user/useUser';
import {Plant} from 'types/Plant';
import {LikeButton} from './LikeButton';

interface ShowItemScreen {
  preImage: string;
  item: Plant;
}

export function ShowItemScreen({route}) {
  const {preImage, item} = route.params as Params;
  const {data: user} = useUser(item?.userId);

  return (
    <View style={styles.screen}>
      <FloatingButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImagesSwiper images={item?.images} preImage={preImage} />
        <View style={{paddingHorizontal: 10}}>
          <Section>
            <View style={styles.likeWrapper}>
              <Title text={item?.name} />
              <LikeButton />
            </View>
            {/* <View style={styles.line}> */}
            <AvailabilityInfo item={item} />
            {!!item.amount && <Secondary text={item.amount + ' disponível'} />}
            {/* </View> */}
          </Section>
          <Section>
            {item?.userId === auth.user?.id && (
              <View style={[styles.line, styles.buttonsWrapper]}>
                <RemoveButton style={styles.button} item={item} />
                <EditButton style={styles.button} item={item} />
              </View>
            )}
            <UserLink user={user} />
            {!!user?.whatsappNumber && (
              <WhatsappButton number={user.whatsappNumber} />
            )}
            {!!user?.instagramUsername && (
              <InstagramButton user={user.instagramUsername} />
            )}
          </Section>
          {!!(item?.tags && item.tags.length) && (
            <Section name="Detalhes">
              <TagsList tags={item?.tags || []} />
            </Section>
          )}
          {item?.description ? (
            <Section name="Descrição">
              <Description text={item?.description} />
            </Section>
          ) : (
            <Text style={styles.notProvided}>Sem descrição</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeWrapper: {
    paddingTop: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingRight: 40,
  },
  button: {
    elevation: 2,
    marginRight: 5,
  },
  buttonsWrapper: {
    paddingLeft: 5,
    marginTop: 0,
    marginBottom: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  notProvided: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
});

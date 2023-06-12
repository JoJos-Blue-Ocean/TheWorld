import {
  StyleSheet, Text, View, Image, Pressable, Alert,
} from 'react-native';
import React, { useState } from 'react';
import NavigationPane from '../NavigationPane';

// TODO: implement navigation.navigate('Message', {name: 'Dio'}) or id

export default function Profile() {
  return (
    <View style={styles.container}>
      <View className="pic-name" style={styles.picName}>
        <View className="profile-picture" style={styles.profilePicture}>
          <Image source={require('../../../../assets/bob.png')} />
        </View>
        <View className="info" style={styles.info}>
          <Text className="name" style={styles.name}>Dilly Migdol</Text>
          <Text className="location" style={styles.location}>Santa Clarita, CA</Text>
        </View>
      </View>
      <View className="stats-col" style={styles.statsBox}>
      <View className="profile-stats" style={styles.stats}>
        <Text style={styles.statsMeta}>
          1337
          {' '}
          {'\n'}
          Reviews
          {'\n'}
        </Text>
        <Text style={styles.statsMeta}>
          4.53
          {' '}
          {'\n'}
          Rating
          {'\n'}
        </Text>
        <Text style={styles.statsMeta}>
          134
          {' '}
          {'\n'}
          Trades
          {'\n'}
        </Text>
      </View>
      </View>

      <Pressable
        style={styles.mButton}
        className="message-button"
        onPress={() => Alert.alert('Message button pressed')}
      >
        <Text style={styles.buttonText}>Message</Text>
      </Pressable>
      <View className="bio" style={styles.bio}>
        <Text style={styles.bioText}>
          This is a bio! Enjoy my Bio! I love writing Bios. Bio Bio Bio Bio Bio
          Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio
          Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio
        </Text>
      </View>
      <Pressable
        style={styles.wButton}
        className="message-button"
        onPress={() => Alert.alert('Wishlist button pressed')}
      >
        <Text style={styles.buttonText}>Wishlist</Text>
      </Pressable>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  picName: {
    width: '66%',
    alignItems: 'center',
  },
  statsBox: {
    width: '33%',
  },
  profilePicture: {
    overflow: 'hidden',
    borderWidth: 4,
    borderRadius: 100,
    borderColor: '#757575',
    width: 125,
    height: 125,
    alignItems: 'center',
    marginTop: '12%',
  },
  stats: {
    width: '50%',
    marginTop: '11%',
    marginLeft: '2%',
    marginRight: '11%',
    paddingBottom: '2%',
  },
  statsMeta: {
    lineHeight: 17,
    textAlign: 'left',
    fontSize: 17,
  },
  info: {
    alignItems: 'center',
  },
  bio: {
    marginTop: '10%',
    margin: '5%',
    justifyContent: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#757575',
  },
  bioText: {
    textAlign: 'center',
    fontSize: 17,
  },
  name: {
    fontSize: 26,
    alignItems: 'center',
  },
  location: {
    fontSize: 15,
  },
  mButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
    elevation: 3,
    marginLeft: 'auto',
    marginRight: '10%',
    backgroundColor: '#A30000',
  },
  wButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 4,
    width: '33%',
    marginLeft: '33%',
    marginRight: '33%',
    elevation: 3,
    backgroundColor: '#A30000',
    alignItems: 'center',
  },
  buttonText: {
    color: '#C0C0C0',
    fontSize: 20,
  },
});

import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import NavigationPane from '../NavigationPane';

// TODO: implement navigation.navigate('Message', {name: 'Dio'}) or id

export default function Profile() {
  return (
    <View style={styles.container}>
      <View className="profile-picture" style={styles.profilePicture}>
        <Image source={require('/Users/dillonmigdol/Desktop/HackReactor/JoJosBlueOcean/TheWorld/assets/bob.png')} />
      </View>
      <View className="profile-stats" style={styles.stats}>
        <Text style={styles.statsMeta}>1337 {"\n"}Reviews{"\n"}</Text>
        <Text style={styles.statsMeta}>4.53 {"\n"}Rating{"\n"}</Text>
        <Text style={styles.statsMeta}>134 {"\n"}Trades{"\n"}</Text>
      </View>
      <View className="info" style={styles.info}>
        <Text className="name" style={styles.name}>Dilly Migdol</Text>
        <Text className="location" style={styles.location}>Santa Clarita, CA</Text>
      </View>
      <Pressable
      style={styles.mButton}
      className="message-button"
      onPress={() => Alert.alert('Message button pressed')}
      ><Text style={styles.buttonText}>Message</Text>
      </Pressable>
      <View className="bio" style={styles.bio}>
        <Text style={styles.bioText}>
          This is a bio! Enjoy my Bio! I love writing Bios. Bio Bio Bio Bio Bio
          Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio
          Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio
          Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio
          Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio Bio
        </Text>
      </View>
      <Pressable
      style={styles.wButton}
      className="message-button"
      onPress={() => Alert.alert('Wishlist button pressed')}
      ><Text style={styles.buttonText}>Dilly's Wishlist</Text>
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
  profilePicture: {
    overflow: 'hidden',
    borderWidth: 4,
    borderRadius: 100,
    borderColor: '#757575',
    width: 125,
    height: 125,
    alignItems: 'center',
    marginLeft: '10%',
    marginTop: '12%',
    marginRight: '15%',
  },
  stats: {
    width: '27%',
    marginTop: '11%',
    marginLeft: '2%',
    marginRight: '11%',
    paddingBottom: '2%',
  },
  statsMeta: {
    lineHeight: 19,
    textAlign: 'left',
    paddingRight: '18%',
    fontSize: 19,
  },
  info: {
    marginLeft: '10%',
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
  },
  location: {
    fontSize: 15,
  },
  mButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginLeft: '14%',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#A30000',
  },
  wButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 4,
    marginLeft: '27%',
    elevation: 3,
    backgroundColor: '#A30000',

  },
  buttonText: {
    color: '#C0C0C0',
    fontSize: 20,
  }
});

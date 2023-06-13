import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable,
} from 'react-native';
import StarRating from '../StarRating';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    top: '5%',
    textAlign: 'center',
    fontSize: 20,
  },
  sellingAlbumImage: {
    position: 'absolute',
    height: '15%',
    width: '30%',
    top: '15%',
    left: '5%',
  },
  sellingAlbumSongName: {
    position: 'absolute',
    top: '15%',
    left: '40%',
  },
  sellingAlbumArtist: {
    position: 'absolute',
    top: '20%',
    left: '40%',
  },
  desiredAlbumImage: {
    position: 'absolute',
    height: '15%',
    width: '30%',
    top: '40%',
    left: '5%',
  },
  desiredAlbumSongName: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  desiredAlbumArtist: {
    position: 'absolute',
    top: '45%',
    left: '40%',
  },
  rateTrader: {
    top: '55%',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default function CompleteTradeForm({ route }) {
  const {
    sellingAlbumImage,
    sellingAlbumSongName,
    sellingAlbumArtist,
    desiredAlbumImage,
    desiredAlbumSongName,
    desiredAlbumArtist,
  } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Trade?</Text>
      <Image source={sellingAlbumImage} style={styles.sellingAlbumImage} />
      <Text style={styles.sellingAlbumSongName}>{sellingAlbumSongName}</Text>
      <Text style={styles.sellingAlbumArtist}>{sellingAlbumArtist}</Text>
      <Image source={desiredAlbumImage} style={styles.desiredAlbumImage} />
      <Text style={styles.desiredAlbumSongName}>{desiredAlbumSongName}</Text>
      <Text style={styles.desiredAlbumArtist}>{desiredAlbumArtist}</Text>
      <Text style={styles.rateTrader}>Please Give This Person a Rating</Text>
    </View>
  );
};

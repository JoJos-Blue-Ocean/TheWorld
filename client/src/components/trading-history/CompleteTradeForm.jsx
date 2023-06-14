import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable, TextInput,
} from 'react-native';
import StarRating from '../StarRating';
import { useNavigation } from '@react-navigation/core';

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
    top: '12%',
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
    top: '35%',
    left: '5%',
  },
  desiredAlbumSongName: {
    position: 'absolute',
    top: '37%',
    left: '40%',
  },
  desiredAlbumArtist: {
    position: 'absolute',
    top: '42%',
    left: '40%',
  },
  selectTrader: {
    top: '50%',
    textAlign: 'center',
    fontSize: 14,
  },
  traderSearchBar: {
    position: 'absolute',
    height: '4%',
    width: '80%',
    left: '10%',
    top: '58%',
    borderWidth: 1,
  },
  rateTrader: {
    top: '60%',
    textAlign: 'center',
    fontSize: 14,
  },
  completeButton: {
    position: 'absolute',
    bottom: '10%',
    height: '10%',
    width: '50%',
    left: '25%',
    backgroundColor: '#800000',
  },
  completeButtonText: {
    textAlign: 'center',
    fontSize: 20,
  },
  starsContainer: {
    position: 'absolute',
    height: '5%',
    width: '22%',
    left: '39%',
    top: '72%',
    flexDirection: 'row',
  },
  forContainer: {
    position: 'absolute',
    width: '30%',
    left: '25%',
    top: '29%',
  },
  for: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default function CompleteTradeForm({ route }) {
  const navigation = useNavigation();

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
      <Image source={{ uri: sellingAlbumImage }} style={styles.sellingAlbumImage} />
      <Text style={styles.sellingAlbumSongName}>{sellingAlbumSongName}</Text>
      <Text style={styles.sellingAlbumArtist}>{sellingAlbumArtist}</Text>
      <View style={styles.forContainer}>
        <Text style={styles.for}>Trading For</Text>
      </View>
      <Image source={{ uri: desiredAlbumImage }} style={styles.desiredAlbumImage} />
      <Text style={styles.desiredAlbumSongName}>{desiredAlbumSongName}</Text>
      <Text style={styles.desiredAlbumArtist}>{desiredAlbumArtist}</Text>
      <Text style={styles.selectTrader}>Who did you trade with?</Text>
      <TextInput style={styles.traderSearchBar} />
      <Text style={styles.rateTrader}>Please Give This Person a Rating</Text>
      <View style={styles.starsContainer}>
        <StarRating rating={3.5} />
      </View>
      <Pressable
        style={styles.completeButton}
        onPress={() => {
          navigation.navigate('TradingHistory');
        }}>
        <Text style={styles.completeButtonText}>
          Complete
        </Text>
      </Pressable>
    </View>
  );
}

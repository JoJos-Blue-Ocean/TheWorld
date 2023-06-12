import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable,
} from 'react-native';

const styles = StyleSheet.create({
  trade: {
    height: 120,
    width: '100%',
    backgroundColor: '#C0C0C0',
    marginTop: '5%',
  },
  tradeIdContainer: {
    position: 'absolute',
    height: '15%',
    width: '100%',
    backgroundColor: 'grey',
  },
  tradeId: {
    left: '5%',
  },
  sellingAlbumImage: {
    position: 'absolute',
    top: '20%',
    left: '3%',
    height: '50%',
    width: '18%',
  },
  sellingAlbumSongName: {
    position: 'absolute',
    top: '70%',
    left: '5%',
    fontSize: 8,
  },
  sellingAlbumArtist: {
    position: 'absolute',
    top: '80%',
    left: '5%',
    fontSize: 8,
  },
  for: {
    position: 'absolute',
    top: '40%',
    left: '30%',
    fontSize: 16,
  },
  desiredAlbumImage: {
    position: 'absolute',
    top: '20%',
    left: '45%',
    height: '50%',
    width: '18%',
  },
  desiredAlbumSongName: {
    position: 'absolute',
    top: '70%',
    left: '48%',
    fontSize: 8,
  },
  desiredAlbumArtist: {
    position: 'absolute',
    top: '80%',
    left: '48%',
    fontSize: 8,
  },
  date: {
    position: 'absolute',
    right: '40%',
    fontSize: 12,
    bottom: 0,
  },
  statusContainer: {
    position: 'absolute',
    top: '14%',
    right: '0%',
    height: '18%',
    width: '20%',
    backgroundColor: 'grey',
  },
  completeButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#800000',
    height: '5%',
    width: '20%',
    margin: '2%',
  },
});

export default function MakeListingTrade({
  id,
  sellingAlbumImage,
  sellingAlbumSongName,
  sellingAlbumArtist,
  desiredAlbumImage,
  desiredAlbumSongName,
  desiredAlbumArtist,
  date,
  status,
}) {
  return (
    <View style={styles.trade}>
      <View style={styles.tradeIdContainer}>
              <Text style={styles.date}>{date}</Text>
              <Text style={styles.tradeId}>Listing#{id}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={{
          textAlign: 'center',
        }}>
          {status}
        </Text>
      </View>
      <Image source={sellingAlbumImage} style={styles.sellingAlbumImage}/>
      <Text style={styles.sellingAlbumSongName}>{sellingAlbumSongName}</Text>
      <Text style={styles.sellingAlbumArtist}>{sellingAlbumArtist}</Text>
      <Text style={styles.for}>for</Text>
      <Image source={desiredAlbumImage} style={styles.desiredAlbumImage}/>
      <Text style={styles.desiredAlbumSongName}>{desiredAlbumSongName}</Text>
      <Text style={styles.desiredAlbumArtist}>{desiredAlbumArtist}</Text>
      <Pressable style={styles.completeButton}>
        <Text style={{
          textAlign: 'center',
          fontSize: 10,
        }}>
          Mark As Sold
        </Text>
      </Pressable>
    </View>
  );
}

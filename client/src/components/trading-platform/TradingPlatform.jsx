import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import NavigationPane from '../NavigationPane';
import SellerList from './SellerList';

const styles = StyleSheet.create({
  albumHeader: {
    height: 120,
    width: Dimensions.get('window').width,
    backgroundColor: '#800000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  albumThumbnail: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: '#333333',
  },
  albumDetails: {
    width: Dimensions.get('window').width - 115,
    marginLeft: 10,
  },
  title: {
    color: '#f5f5f5',
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  releaseDate: {
    color: '#f5f5f5',
  },
  forTrade: {
    color: '#f5f5f5',
    marginTop: 20,
  },
});

export default function TradingPlatform() {
  const [albumDetails, setAlbumDetails] = useState(null);
  const [openTrades, setOpenTrades] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.discogs.com/releases/27031743', {
        params: {
          key: 'lluWRnvvevttDpTuaCMH',
          secret: 'qQjcdOrANZEwVygmUdQfUUOXKUCHtVLq',
        },
      })
      .then(({ data }) => setAlbumDetails(data))
      .catch((err) => console.error('OH NO: ', err));

    axios
      .get(`${Constants.expoConfig.extra.apiUrl}/api/trading-platform/27031743/open-trades`)
      .then(({ data }) => setOpenTrades(data))
      .catch((err) => console.error('OH NO: ', err));
  }, []);

  if (albumDetails) {
    return (
      <View>
        <View style={styles.albumHeader}>
          <Image
            style={styles.albumThumbnail}
            source={{ uri: albumDetails.thumb }}
          />
          <View style={styles.albumDetails}>
            <Text style={styles.title}>{`${albumDetails.artists[0].name} - ${albumDetails.title}`}</Text>
            <Text style={styles.releaseDate}>{`Released: ${albumDetails.released}`}</Text>
            <Text style={styles.forTrade}>{`${openTrades.length} copies to trade`}</Text>
          </View>
        </View>
        <ScrollView>
          <SellerList openTrades={openTrades} albumDetails={albumDetails} />
        </ScrollView>
      </View>
    );
  }
}

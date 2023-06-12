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
  const [openTrades, setOpenTrades] = useState([]);

  useEffect(() => {
    axios
      .get(`${Constants.expoConfig.extra.apiUrl}/api/trading-platform/27031743/open-trades`)
      .then(({ data }) => setOpenTrades(data))
      .catch((err) => console.error('OH NO: ', err));
  }, []);

  return (
    <View>
      <View style={styles.albumHeader}>
        <Image
          style={styles.albumThumbnail}
          source={{ uri: 'https://i.discogs.com/f8_B05PM2c1GRREU9cQNr1pYBr2C_7qmvVhLM48NYXo/rs:fit/g:sm/q:90/h:600/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI3MDMx/NzQzLTE2ODM5Nzk2/MjEtMzE1My5qcGVn.jpeg' }}
        />
        <View style={styles.albumDetails}>
          <Text style={styles.title}>Random Access Memories (10th Anniversary Edition)</Text>
          <Text style={styles.releaseDate}>Released 5/12/23</Text>
          <Text style={styles.forTrade}>{`${openTrades.length} copies to trade`}</Text>
        </View>
      </View>
      <ScrollView>
        <SellerList openTrades={openTrades} />
      </ScrollView>
    </View>
  );
}

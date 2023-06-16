/* eslint-disable camelcase */
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
    marginLeft: 8,
  },
  releaseDate: {
    color: '#f5f5f5',
    marginLeft: 8,
  },
  forTrade: {
    color: '#f5f5f5',
    marginTop: 20,
    marginLeft: 8,
  },
});

export default function TradingPlatform({ route }) {
  const { master_id } = route.params;
  const [master, setMaster] = useState(null);
  const [openTrades, setOpenTrades] = useState([]);

  useEffect(() => {
    axios
      // .get(`https://api.discogs.com/masters/${master_id}`, {
      //   params: {
      //     key: Constants.expoConfig.extra.discogsKey,
      //     secret: Constants.expoConfig.extra.discogsSecret,
      //   },
      // })
      .get('http://localhost:3000/api/record-catalog/individualAlbum', {
        params: {
          id: master_id,
        },
      })
      .then(({ data }) => setMaster(data))
      .catch((err) => console.error('OH NO: ', err));

    axios
      .get(`${Constants.expoConfig.extra.apiUrl}/api/trading-platform/${master_id}/open-trades`)
      .then(({ data }) => setOpenTrades(data))
      .catch((err) => console.error('OH NO: ', err));
  }, []);

  if (master) {
    return (
      <View>
        <View style={styles.albumHeader}>
          <Image
            style={styles.albumThumbnail}
            source={{ uri: master.images[0].uri }}
          />
          <View style={styles.master}>
            <Text style={styles.title}>{`${master.artists[0].name} - ${master.title}`}</Text>
            <Text style={styles.releaseDate}>{`Released: ${master.year}`}</Text>
            <Text style={styles.forTrade}>{`${openTrades.length} copies to trade`}</Text>
          </View>
        </View>
        {
          openTrades.length
            ? (
              <ScrollView>
                <SellerList openTrades={openTrades} master={master} />
              </ScrollView>
            )
            : <Text>No available trades</Text>
        }
      </View>
    );
  }
}

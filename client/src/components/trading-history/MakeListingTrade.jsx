import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Swipeable from 'react-native-swipeable';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
  trade: {
    height: 225,
    width: '100%',
    backgroundColor: 'white',
  },
  tradeIdContainer: {
    height: '15%',
    width: '100%',
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tradeId: {
    fontSize: 20,
  },
  albumsContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumContainer: {
    justifyContent: 'center',
    marginRight: '10%',
    height: '70%',
    width: '45%',
  },
  albumImageContainer: {
    height: '100%',
    width: '80%',
    borderRadius: '5%',
    left: '10%',
  },
  albumImage: {
    left: '7%',
    top: '12%',
    height: '76%',
    width: '86%',
    borderRadius: '5%',
  },
  albumInfo: {
    left: '15%',
    height: '35%',
    width: '80%',
    overflow: 'hidden',
  },
  albumSongName: {
    textAlign: 'left',
    fontSize: 14,
    marginBottom: '3%',
    fontWeight: 'bold',
    width: '80%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  albumArtist: {
    textAlign: 'left',
    fontSize: 10,
    width: '80%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#666',
  },
  date: {
    position: 'absolute',
    right: '5%',
    fontSize: 12,
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
  swipeableContainer: {
    position: 'absolute',
    top: '20%',
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
  },
  rightButtonOne: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    backgroundColor: '#532CEE',
    padding: '8%',
  },
  rightButtonTwo: {
    width: '100%',
    height: '50%',
    backgroundColor: '#A30000',
    justifyContent: 'center',
    padding: '14%',
  },
  rightButtonsContainer: {
    flexDirection: 'column',
    height: '100%',
    width: '40%',
  },
  arrows: {
    position: 'absolute',
    left: '46%',
  },
});

export default function MakeListingTrade({
  id,
  date,
  tradingAlbumId,
  desiredAlbumId,
  userId,
  refresh,
  setRefresh,
}) {
  const [tradingAlbum, setTradingAlbum] = useState({
    images: [
      {
        uri: 'https://i.discogs.com/mUBg5clQ9XRz_sYjXEZVirPnhd8eVA3MkyiphaFYzLE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY1NjUy/NDItMTQyMjEyMTEz/MC01NzAxLmpwZWc.jpeg',
      },
    ],
    title: '',
    artists: [{
      name: '',
    }],
  });
  const [desiredAlbum, setDesiredAlbum] = useState({
    images: [
      {
        uri: 'https://i.discogs.com/mUBg5clQ9XRz_sYjXEZVirPnhd8eVA3MkyiphaFYzLE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY1NjUy/NDItMTQyMjEyMTEz/MC01NzAxLmpwZWc.jpeg',
      },
    ],
    title: '',
    artists: [{
      name: '',
    }],
  });

  const navigation = useNavigation();
  const params = {
    sellingAlbumImage: tradingAlbum.images[0].uri,
    sellingAlbumSongName: tradingAlbum.title,
    sellingAlbumArtist: tradingAlbum.artists[0].name,
    desiredAlbumImage: desiredAlbum.images[0].uri,
    desiredAlbumSongName: desiredAlbum.title,
    desiredAlbumArtist: desiredAlbum.artists[0].name,
    tradeId: id,
    refresh,
    setRefresh,
  };

  const rightButtons = [
    <View style={styles.rightButtonsContainer}>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('Trade Completion Form', params);
        }}
        style={styles.rightButtonOne}
      >
        <FontAwesome name="handshake-o" size={35} color="white" />

      </TouchableHighlight>
      <TouchableHighlight style={styles.rightButtonTwo}><FontAwesome name="trash" size={35} color="white" /></TouchableHighlight>
    </View>,
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/record-catalog/individualAlbum', {
          params: {
            id: tradingAlbumId,
          },
        });
        setTradingAlbum(response.data);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.get('http://localhost:3000/api/record-catalog/individualAlbum', {
          params: {
            id: desiredAlbumId,
          },
        });
        setDesiredAlbum(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <View style={styles.trade} useNativeDriver={false}>
      <View style={styles.tradeIdContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.tradeId}>
          Listing#
          {id}
        </Text>
      </View>

      <Swipeable
        rightButtons={rightButtons}
        useNativeDriver={false}
        style={styles.swipeableContainer}
      >
        <View style={styles.albumsContainer}>
          <View style={styles.albumContainer}>
            <View style={styles.albumImageContainer}>
              <Image source={{ uri: tradingAlbum.images[0].uri }} style={styles.albumImage} />
            </View>
            <View style={styles.albumInfo}>
              <Text style={styles.albumSongName} numberOfLines={1}>{tradingAlbum.title}</Text>
              <Text
                style={styles.albumArtist}
                numberOfLines={1}
              >
                {tradingAlbum.artists[0].name}
              </Text>
            </View>
          </View>

          <FontAwesome name="exchange" size={35} color="black" style={styles.arrows} />

          <View style={styles.albumContainer}>
            <View style={styles.albumImageContainer}>
              <Image source={{ uri: desiredAlbum.images[0].uri }} style={styles.albumImage} />
            </View>
            <View style={styles.albumInfo}>
              <Text style={styles.albumSongName} numberOfLines={1}>{desiredAlbum.title}</Text>
              <Text
                style={styles.albumArtist}
                numberOfLines={1}
              >
                {desiredAlbum.artists[0].name}
              </Text>
            </View>
          </View>
        </View>

      </Swipeable>
    </View>
  );
}

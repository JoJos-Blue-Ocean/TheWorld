import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable, TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Swipeable from 'react-native-swipeable';
import axios from 'axios';

const styles = StyleSheet.create({
  trade: {
    height: 300,
    width: '100%',
    marginTop: '5%',
  },
  tradeIdContainer: {
    position: 'absolute',
    height: '15%',
    width: '100%',
  },
  tradeId: {
    left: '15%',
    fontSize: 20,
  },
  albumsContainer: {
    position: 'absolute',
    height: '100%',
    width: '80%',
    flexDirection: 'row',
  },
  albumContainer: {
    position: 'relative',
    top: '10%',
    justifyContent: 'center',
    marginRight: '10%',
    height: '70%',
    width: '45%',
  },
  albumImageContainer: {
    left: '10%',
    height: '80%',
    width: '80%',
    backgroundColor: '#800000',
    borderRadius: '5%',
  },
  albumImage: {
    left: '7%',
    top: '12%',
    height: '76%',
    width: '86%',
    borderRadius: '5%',
  },
  albumSongName: {
    textAlign: 'center',
    fontSize: 8,
  },
  albumArtist: {
    textAlign: 'center',
    fontSize: 8,
  },
  date: {
    position: 'absolute',
    right: '30%',
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
    backgroundColor: 'red',
  },
  rightButtonTwo: {
    width: '100%',
    height: '50%',
    backgroundColor: 'grey',
  },
  rightButtonsContainer: {
    flexDirection: 'column',
    height: '100%',
    width: '40%',
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
  tradingAlbumId,
  desiredAlbumId,
  userId,
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
  };

  const rightButtons = [
    <View style={styles.rightButtonsContainer}>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('Trade Completion Form', params);
        }}
        style={styles.rightButtonOne}
      >
        <Text>complete</Text>

      </TouchableHighlight>
      <TouchableHighlight style={styles.rightButtonTwo}><Text>Button 2</Text></TouchableHighlight>
    </View>
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
      {/* <View style={styles.statusContainer}>
        <Text style={{
          textAlign: 'center',
        }}>
          {status}
        </Text>
      </View> */}
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
            <Text style={styles.albumSongName}>{tradingAlbum.title}</Text>
            <Text style={styles.albumArtist}>{tradingAlbum.artists[0].name}</Text>
          </View>

          <View style={styles.albumContainer}>
            <View style={styles.albumImageContainer}>
              <Image source={{ uri: desiredAlbum.images[0].uri }} style={styles.albumImage} />
            </View>
            <Text style={styles.albumSongName}>{desiredAlbum.title}</Text>
            <Text style={styles.albumArtist}>{desiredAlbum.artists[0].name}</Text>
          </View>
        </View>

      </Swipeable>
    </View>
  );
}

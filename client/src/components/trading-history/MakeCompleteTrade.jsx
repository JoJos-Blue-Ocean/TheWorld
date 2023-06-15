import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import axios from 'axios';

const styles = StyleSheet.create({
  trade: {
    height: 300,
    width: '100%',
    marginTop: '3%',
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
  albumImage: {
    left: '10%',
    height: '70%',
    width: '80%',
  },
  albumSongName: {
    textAlign: 'center',
    fontSize: 8,
  },
  albumArtist: {
    textAlign: 'center',
    fontSize: 8,
  },
  for: {
    position: 'absolute',
    top: '40%',
    left: '30%',
    fontSize: 16,
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
  buyerContainer: {
    position: 'absolute',
    top: '5%',
    left: '75%',
    height: '30%',
    width: '20%',
    justifyContent: 'center',
  },
  buyerImage: {
    height: '75%',
    width: '75%',
    left: '15%',
    borderRadius: '50%',
  },
  buyerName: {
    textAlign: 'center',
    fontSize: 12,
  },
  messageButton: {
    position: 'absolute',
    bottom: '12%',
    right: '15%',
    height: '10%',
    width: '10%',
    backgroundColor: '#800000',
  },
  message: {
    textAlign: 'center',
    fontSize: 10,
  },
  swipeableContainer: {
    position: 'absolute',
    top: '20%',
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '3%',
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
    backgroundColor: 'green',
  },
});

export default function MakeCompleteTrade({
  id,
  sellingAlbumImage,
  sellingAlbumSongName,
  sellingAlbumArtist,
  desiredAlbumImage,
  desiredAlbumSongName,
  desiredAlbumArtist,
  date,
  status,
  buyerName,
  buyerImage,
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
  const params = {
    sellingAlbumImage,
    sellingAlbumSongName,
    sellingAlbumArtist,
    desiredAlbumImage,
    desiredAlbumSongName,
    desiredAlbumArtist,
  };
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
  const rightButtons = [
    <View style={styles.rightButtonsContainer}>
      <Text>message</Text>
    </View>,
  ];
  return (
    <View style={styles.trade}>
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
        style={styles.swipeableContainer}
        useNativeDriver={false}
        rightButtons={rightButtons}
      >
        <View style={styles.albumsContainer}>
          <View style={styles.albumContainer}>
            <Image source={{ uri: tradingAlbum.images[0].uri }} style={styles.albumImage} />
            <Text style={styles.albumSongName}>{tradingAlbum.title}</Text>
            <Text style={styles.albumArtist}>{tradingAlbum.artists[0].name}</Text>
          </View>
          <View style={styles.albumContainer}>
            <Text style={styles.for}>for</Text>
            <Image source={{ uri: desiredAlbum.images[0].uri }} style={styles.albumImage} />
            <Text style={styles.albumSongName}>{desiredAlbum.title}</Text>
            <Text style={styles.albumArtist}>{desiredAlbum.artists[0].name}</Text>
          </View>
        </View>

        <View style={styles.buyerContainer}>
          <Image source={{ uri: buyerImage }} style={styles.buyerImage} />
          <Text style={styles.buyerName}>{buyerName}</Text>
        </View>
      </Swipeable>
    </View>
  );
}

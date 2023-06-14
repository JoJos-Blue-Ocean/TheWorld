import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';

const styles = StyleSheet.create({
  trade: {
    height: 120,
    width: '100%',
    backgroundColor: 'white',
    marginTop: '5%',
  },
  tradeIdContainer: {
    position: 'absolute',
    height: '15%',
    width: '100%',
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

  return (
    <View style={styles.trade}>
      <View style={styles.tradeIdContainer}>
              <Text style={styles.date}>{date}</Text>
              <Text style={styles.tradeId}>Listing#{id}</Text>
      </View>
      {/*<View style={styles.statusContainer}>
        <Text style={{
          textAlign: 'center',
        }}>
          {status}
        </Text>
      </View>*/}
      <Image source={{ uri: tradingAlbum.images[0].uri }} style={styles.sellingAlbumImage} />
      <Text style={styles.sellingAlbumSongName}>{tradingAlbum.title}</Text>
      <Text style={styles.sellingAlbumArtist}>{tradingAlbum.artists[0].name}</Text>
      <Text style={styles.for}>for</Text>
      <Image source={{ uri: desiredAlbum.images[0].uri }} style={styles.desiredAlbumImage} />
      <Text style={styles.desiredAlbumSongName}>{desiredAlbum.title}</Text>
      <Text style={styles.desiredAlbumArtist}>{desiredAlbum.artists[0].name}</Text>
      <Pressable style={styles.completeButton}
        onPress={() => {
          navigation.navigate('Trade Completion Form', params);
        }}>
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

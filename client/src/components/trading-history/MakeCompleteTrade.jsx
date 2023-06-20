import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import axios from 'axios';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import UserContext from '../UserContext';

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
    textAlign: 'start',
    fontSize: 14,
    marginBottom: '3%',
    fontWeight: 'bold',
    width: '80%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  albumArtist: {
    textAlign: 'start',
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
  buyerContainer: {
    marginTop: '10%',
    height: '10%',
    width: '100%',
    justifyContent: 'center',
  },
  buyerImage: {
    height: '80%',
    width: '55%',
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
    backgroundColor: 'green',
    justifyContent: 'center',
    padding: '5%',
  },
  arrows: {
    position: 'absolute',
    left: '46%',
  },
});

export default function MakeCompleteTrade({
  id,
  date,
  buyerName,
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

  const [uid, setUid] = useContext(UserContext);
  const [curUser, setCurUser] = useState('');

  useEffect(() => {
    const retrieveStats = () => {
      //  QUERY DATABASE FOR STATS
      axios.get(`http://localhost:3000/api/profile/${uid}`)
        .then((results) => {
          console.log('RETRIEVE STATS', results.data[0]);
          setCurUser(results.data[0].username);
        })
        .catch((err) => console.log('username error: ', err));
    };
    retrieveStats();
  }, [id]);

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
      <Entypo name="message" size={40} color="white" />
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

      <Swipeable
        style={styles.swipeableContainer}
        useNativeDriver={false}
        rightButtons={rightButtons}
      >
        <View style={styles.albumsContainer}>
          <View style={styles.albumContainer}>
            <View style={styles.buyerContainer}>
              <Text style={styles.buyerName}>{curUser}</Text>
            </View>
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
            <View style={styles.buyerContainer}>
              <Text style={styles.buyerName}>{buyerName}</Text>
            </View>
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

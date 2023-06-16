import React, { useState, useContext } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable, TextInput, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import AddAlbum from './AddAlbum';
import UserContext from '../UserContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tradingAlbum: {
    position: 'absolute',
    top: '5%',
    left: '3%',
    fontSize: 20,
  },
  addTradingAlbumButton: {
    position: 'absolute',
    top: '10%',
    height: '12%',
    width: '25%',
    left: '3%',
    backgroundColor: 'white',
  },
  desiredAlbum: {
    position: 'absolute',
    top: '27%',
    left: '3%',
    fontSize: 20,
  },
  addDesiredAlbumButton: {
    position: 'absolute',
    top: '32%',
    height: '12%',
    width: '25%',
    left: '3%',
    backgroundColor: 'white',
  },
  descriptionPrompt: {
    fontSize: 20,
    top: '50%',
    textAlign: 'center',
  },
  descriptionBox: {
    position: 'absolute',
    top: '55%',
    width: '80%',
    left: '10%',
    height: '20%',
    backgroundColor: 'white',
  },
  submitButton: {
    // top: '75%',
    // width: '30%',
    // left: '35%',
    // backgroundColor: 'grey',
    // height: '6%',
    marginTop: 20,
    backgroundColor: '#800000',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    alignSelf: 'center',
    top: '70%',
  },
  confirm: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',

    // textAlign: 'center',
    // fontSize: 18,
    // color: 'white',
  },
  tradingAlbumContainer: {
    position: 'absolute',
    top: '10%',
    height: '12%',
    width: '100%',
  },
  image: {
    position: 'absolute',
    left: '3%',
    height: '100%',
    width: '25%',
  },
  desiredAlbumContainer: {
    position: 'absolute',
    top: '32%',
    height: '12%',
    width: '100%',
  },
  detailsContainer: {
    position: 'absolute',
    flexDirection: 'column',
    height: '100%',
    width: '50%',
    left: '50%',
    textAlign: 'left',
  },
});

export default function AddTrade({ route }) {
  const navigation = useNavigation();
  const [showAddTradingAlbum, toggleShowAddTradingAlbum] = useState(false);
  const [showAddDesiredAlbum, toggleShowAddDesiredAlbum] = useState(false);
  const [tradingAlbumSelected, toggleTradingAlbumSelected] = useState(false);
  const [desiredAlbumSelected, toggleDesiredAlbumSelected] = useState(false);
  const [description, setDescription] = useState('');
  const [uid, setUid] = useContext(UserContext);

  const {
    userId,
  } = route.params;

  const [tradingAlbum, setTradingAlbum] = useState({
    images: [
      {
        uri: 'https://i.discogs.com/mUBg5clQ9XRz_sYjXEZVirPnhd8eVA3MkyiphaFYzLE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY1NjUy/NDItMTQyMjEyMTEz/MC01NzAxLmpwZWc.jpeg',
      },
    ],
    title: '',
  });
  const [desiredAlbum, setDesiredAlbum] = useState({
    images: [
      {
        uri: 'https://i.discogs.com/mUBg5clQ9XRz_sYjXEZVirPnhd8eVA3MkyiphaFYzLE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY1NjUy/NDItMTQyMjEyMTEz/MC01NzAxLmpwZWc.jpeg',
      },
    ],
    title: '',
  });

  return (

    <View style={styles.container}>
      <Text style={styles.tradingAlbum}>Trading Album</Text>
      {tradingAlbumSelected ? (
        <Pressable style={styles.tradingAlbumContainer}>
          <Image source={{ uri: tradingAlbum.uri }} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text>{tradingAlbum.title}</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          style={styles.addTradingAlbumButton}
          onPress={() => { toggleShowAddTradingAlbum(true); }}
        >
          <Text>+</Text>
        </Pressable>
      )}
      <Text style={styles.desiredAlbum}>Desired Album</Text>
      {desiredAlbumSelected ? (
        <Pressable style={styles.desiredAlbumContainer}>
          <Image Image source={{ uri: desiredAlbum.uri }} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text>{desiredAlbum.title}</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          style={styles.addDesiredAlbumButton}
          onPress={() => { toggleShowAddDesiredAlbum(true); }}
        >
          <Text>
            +
          </Text>
        </Pressable>
      )}
      <Text style={styles.descriptionPrompt}>Description</Text>
      <TextInput style={styles.descriptionBox} onChangeText={(e) => { setDescription(e); }} />
      <Pressable
        style={styles.submitButton}
        onPress={() => axios.post('http://localhost:3000/api/trade-history/add-trade', {
          user_id: uid,
          have_album_id: tradingAlbum.id,
          want_album_id: desiredAlbum.id,
          description,
        })
          .then(() => {
            navigation.navigate('TradingHistory');
          })}
      >
        <Text style={styles.confirm}>
          Confirm
        </Text>
      </Pressable>
      {showAddTradingAlbum && (
        <AddAlbum
          selectAlbum={(e) => { setTradingAlbum(e); }}
          toggleShowAddAlbum={(e) => { toggleShowAddTradingAlbum(e); }}
          toggleAlbumSelected={(e) => { toggleTradingAlbumSelected(e); }}
        />
      )}
      {showAddDesiredAlbum && (
      <AddAlbum
        selectAlbum={(e) => { setDesiredAlbum(e); }}
        toggleShowAddAlbum={(e) => { toggleShowAddDesiredAlbum(e); }}
        toggleAlbumSelected={(e) => { toggleDesiredAlbumSelected(e); }}
      />
      )}
    </View>
  );
}

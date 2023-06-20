import React, { useState, useContext } from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  descriptionPrompt: {
    fontSize: 20,
    top: '50%',
    left: '10%',
  },
  descriptionBox: {
    position: 'absolute',
    top: '55%',
    width: '80%',
    left: '10%',
    height: '20%',
    backgroundColor: 'white',
    borderWidth: 2,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#800000',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    alignSelf: 'center',
    top: '71%',
  },
  confirm: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tradingAlbumContainer: {
    position: 'absolute',
    top: '10%',
    height: '12%',
    width: '100%',
  },
  image: {
    position: 'absolute',
    left: '5%',
    height: '100%',
    width: '25%',
    borderRadius: '5%',
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
    left: '40%',
    textAlign: 'left',
    justifyContent: 'center',
  },
  songName: {
    fontSize: 16,
    fontWeight: 'bold',
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
    refresh,
    setRefresh,
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
        <TouchableOpacity style={styles.tradingAlbumContainer}>
          <Image source={{ uri: tradingAlbum.uri }} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text style={styles.songName}>{tradingAlbum.title}</Text>
            <Text style={styles.artist}>{tradingAlbum.artist}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.addTradingAlbumButton}
          onPress={() => { toggleShowAddTradingAlbum(true); }}
        >
          <MaterialIcons name="add-to-photos" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.desiredAlbum}>Desired Album</Text>
      {desiredAlbumSelected ? (
        <TouchableOpacity style={styles.desiredAlbumContainer}>
          <Image Image source={{ uri: desiredAlbum.uri }} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text style={styles.songName}>{desiredAlbum.title}</Text>
            <Text style={styles.artist}>{desiredAlbum.artist}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.addDesiredAlbumButton}
          onPress={() => { toggleShowAddDesiredAlbum(true); }}
        >
          <MaterialIcons name="add-to-photos" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.descriptionPrompt}>Description</Text>
      <TextInput
        style={styles.descriptionBox}
        onChangeText={(e) => { setDescription(e); }}
        multiline
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => axios.post('http://localhost:3000/api/trade-history/add-trade', {
          user_id: uid,
          have_album_id: tradingAlbum.id,
          want_album_id: desiredAlbum.id,
          description,
        })
          .then(() => {
            setRefresh(!refresh);
            navigation.navigate('TradingHistory');
          })}
      >
        <Text style={styles.confirm}>
          Confirm
        </Text>
      </TouchableOpacity>
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

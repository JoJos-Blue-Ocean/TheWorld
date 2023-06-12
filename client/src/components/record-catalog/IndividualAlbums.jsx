import React, { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, Button, Image, Modal, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

export default function IndividualAlbums({ album }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [info, setInfo] = useState([]);
  const navigation = useNavigation();

  console.log('this is INFO', info);
  const grabAlbumInfo = () => {
    axios.get('http://localhost:3000/api/record-catalog/individualAlbum', {
      params: {
        id: album.master_id,
      },
    })
      .then((response) => {
        setInfo(response.data.tracklist);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModal = () => {
    grabAlbumInfo();
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const splitTitle = album.title.split(' - ');
  const collectionTitle = splitTitle[1] || '';
  const artistTitle = splitTitle[0] || '';

  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: album.cover_image }} style={styles.modalImage} />
            <Text style={styles.modalTitleText}>{collectionTitle}</Text>
            <Text style={styles.modalArtistText}>{artistTitle}</Text>
            {info.map((item, index) => (
              <View key={item.position}>
                <View style={styles.trackInfo}>
                  <Text style={styles.modalText}>{`${index + 1}. ${item.title}`}</Text>
                  <Text style={styles.modalText}>{item.duration}</Text>
                </View>
              </View>
            ))}

            <Button
              title="Trade"
              onPress={() => {
                closeModal();
                navigation.navigate('TradingPlatform', { master_id : album.master_id});
              }}
              style={styles.tradeButton}
            />
            <Button
              title="Add to Wishlist"
              onPress={() => {
                // Handle trade button press
              }}
              style={styles.tradeButton}
            />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={openModal}>
        <Image source={{ uri: album.cover_image }} style={styles.image} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText} numberOfLines={1}>{collectionTitle}</Text>
          <Text style={styles.artist} numberOfLines={1}>{artistTitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  titleContainer: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'start',
    marginBottom: 5,
    marginRight: 0,
    width: 160, // Adjust the width to match the image width
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  artist: {
    fontSize: 10,
    textAlign: 'start',
    color: '#666',
    width: 160, // Adjust the width to match the image width
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitleText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  modalArtistText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  trackInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalText: {
    flex: 1,
    marginBottom: 10,
  },
  tradeButton: {
    marginTop: 20,
  },
});

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, Button, Image, Modal, TouchableOpacity, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons'; // Import the required icon

export default function IndividualAlbums({ album }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [info, setInfo] = useState({});
  const [trackList, setTrackList] = useState([]);
  const [enableWishlist, setEnableWishlist] = useState(false);
  const navigation = useNavigation();

  console.log('this is ModalVisible', modalVisible);
  console.log('this is info', info);

  const addWishlist = () => {
    axios.post('http://localhost:3000/wishlist', info)
      .then((response) => {
        console.log('Successfully posted', response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const splitTitle = album.title.split(' - ');
  const collectionTitle = splitTitle[1] || '';
  const artistTitle = splitTitle[0] || '';

  const grabAlbumInfo = () => {
    axios.get('http://localhost:3000/api/record-catalog/individualAlbum', {
      params: {
        id: album.master_id,
      },
    })
      .then((response) => {
        setTrackList(response.data.tracklist);
      })
      .then(() => {
        setInfo({
          user_id: 'cliuo26c1000608i96syehksd',
          album_id: album.master_id,
          artist_name: artistTitle,
          album_name: collectionTitle,
          genre: album.genre,
          image: album.cover_image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkWishlist = () => {
    axios.get('http://localhost:3000/api/wishlist', {
      params: {
        user_id: 'cliuo26c1000608i96syehksd',
        album_id: album.master_id,
      },
    })
      .then((response) => {
        setEnableWishlist(response.data);
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

  const addWishlist = () => {
    axios.post('http://localhost:3000/api/wishlist', info)
      .then((response) => {
        console.log('Successfully posted', response);
        setEnableWishlist(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Image source={{ uri: album.cover_image }} style={styles.modalImage} />
              <Text style={styles.modalTitleText}>{collectionTitle}</Text>
              <Text style={styles.modalArtistText}>{artistTitle}</Text>
              {trackList.map((item, index) => (
                <View key={item.position} style={styles.trackListItem}>
                  <Text style={styles.trackNumber}>
                    {index + 1}
                  </Text>
                  <View style={styles.trackInfo}>
                    <Text style={styles.trackTitle}>{item.title}</Text>
                    <Text style={styles.trackDuration}>{item.duration || '0:00'}</Text>
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={styles.tradeButton}
                onPress={() => {
                  closeModal();
                  navigation.navigate('TradingPlatform', { master_id: album.master_id });
                }}
              >
                <Text style={styles.buttonText}>Trade</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.wishlistButton}
                onPress={addWishlist}
                disabled={enableWishlist}
              >
                <Text style={styles.buttonText}>Add to Wishlist</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <AntDesign name="close" size={24} color="#800000" />
              </TouchableOpacity>
            </ScrollView>
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
    width: 160,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  artist: {
    fontSize: 10,
    textAlign: 'start',
    color: '#666',
    width: 160,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  modalImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 50,
    marginBottom: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  modalTitleText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'flex-start',
  },
  modalArtistText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'flex-start',
  },
  modalText: {
    flex: 1,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tradeButton: {
    marginTop: 20,
    backgroundColor: '#800000',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    alignSelf: 'center', // Center horizontally
  },
  wishlistButton: {
    marginTop: 10,
    backgroundColor: '#800000',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    alignSelf: 'center', // Center horizontally
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 8,
    borderWidth: 2,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#800000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  trackListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: 350,
  },
  trackNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
    width: 20,
  },
  trackInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackTitle: {
    flex: 1,
    marginRight: 8,
    fontSize: 12,
  },
  trackDuration: {
    fontSize: 12,
    color: '#666',
  },
});

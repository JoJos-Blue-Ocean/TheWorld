import React, { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, Button, Image, Modal, TouchableOpacity,
} from 'react-native';

export default function IndividualAlbums({ album }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [info, setInfo] = useState({});

  const grabAlbumInfo = (id) => {
    axios.get('http://localhost:3000/vinyl/individualAlbum', {
      params: {
        release_id: id,
      },
    })
      .then((response) => {
        console.log('this is response', response);
        setInfo(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModal = () => {
    grabAlbumInfo(album.id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
            <Image source={{ uri: album.cover_image }} style={styles.image} />
            <Text style={styles.modalText}>{album.title}</Text>
            <Text style={styles.modalText}>{album.tracklist}</Text>
            <Text style={styles.modalText}>{album.duration}</Text>
            <Text style={styles.modalText}>{album.published_date}</Text>
            <Text style={styles.modalText}>{album.artist}</Text>
            <Button
              title="Trade"
              onPress={() => {
                // Handle trade button press
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
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 10,
  },
  tradeButton: {
    marginTop: 20,
  },
});

/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, Image, ScrollView, TouchableOpacity,
} from 'react-native';

export default function Wishlist({ route }) {
  const [list, setWishList] = useState([]);
  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: 'column',
      flex: 1,
      marginBottom: 60,
    },
    removeButton: {
      elevation: 30,
      backgroundColor: '#800000',
      paddingVertical: 10,
      borderRadius: 50,
      width: 78,
      height: 35,
      paddingHorizontal: 12,
      marginBottom: 10,
      activeOpacity: 0.7,
    },
    buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
    artistNameText: {
      fontSize: 17,
    },
    container: {
      paddingTop: 40,
      paddingBottom: 20,
      width: '100%',
      backgroundColor: '#F5F5F5',
    },
    albumNameText: {
      fontWeight: 'bold',
      fontSize: 17,
    },
    albumImage: {
      width: 200,
      height: 200,
      aspectRatio: 2 / 2,
    },
  });

  const getWishListData = function () {
    axios.get('http://localhost:3000/api/wishlist', { params: { user_id: route.params.uid } }).then(({ data }) => {
      setWishList(data);
    }).catch((error) => {
      console.log('Wishlist data cannot be retrieved from the server', error);
    });
  };

  const removeFromWishList = function (id) {
    axios.delete('http://localhost:3000/api/wishlist', { data: { user_id: route.params.uid, id } })
      .then(() => {
        getWishListData();
      }).catch((error) => {
        console.log('Unable to remove album from the wishlist', error);
      });
  };

  useEffect(() => {
    getWishListData();
  }, [route]);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        { list.map((data) => (
          <View key={data.id} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.albumImage}
              source={{
                uri: data.image,
              }}
            />
            <Text style={styles.albumNameText}>
              {data.album_name}
            </Text>
            <Text style={styles.artistNameText}>
              {data.artist_name}
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 15 }}>
              {data.genre.substring(2, data.genre.length - 2)}
            </Text>
            {route.params.foreign ? (
              <View />
            ) : (
              <TouchableOpacity title="Remove" style={styles.removeButton} onPress={() => removeFromWishList(data.id)}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

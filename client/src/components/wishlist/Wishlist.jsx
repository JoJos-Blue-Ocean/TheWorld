/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, Image, Button, Alert, ScrollView, SafeAreaView, Dimensions, FlatList,
} from 'react-native';
import UserContext from '../UserContext';
import NavigationPane from '../NavigationPane';

// wishlist component
export default function Wishlist({ navigation, route }) {
  // const [visible, setVisible] = useState(true);
  // console.log('route param', route.params.uid);
  const [list, setWishList] = useState([]);
  const [uid, setUid] = useContext(UserContext);

  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: 'column',
      flex: 1,
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    container: {
      paddingTop: 40,
      paddingBottom: 20,
      paddingLeft: 40,
      flexWrap: 'wrap',
      alignItems: 'center',
      width: '100%',
      borderWidth: 1,
      backgroundColor: '#F5F5F5',
    },
    tinyImage: {
      width: 100,
      height: 100,
    },
  });

  const getWishListData = function () {
    axios.get('http://localhost:3000/api/wishlist', { params: { user_id: uid } }).then(({ data }) => {
      setWishList(data);
      console.log('data', data);
    }).catch((error) => {
      console.log('Wishlist data cannot be retrieved from the server', error);
    });
  };

  const removeFromWishList = function (id) {
    axios.delete('http://localhost:3000/api/wishlist', { data: { user_id: uid, id } })
      .then(({ data }) => {
        console.log('Server response after remove operation', data);
        getWishListData();
      }).catch((error) => {
        console.log('Unable to remove album from the wishlist', error);
      });
  };

  useEffect(() => {
    getWishListData();
  }, []);

  console.log('wishlist', list);

  return (
    <ScrollView>
      <View style={styles.container}>
        { list.map((data) => (
          <View key={data.id} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.tinyImage}
              source={{
                uri: data.image,
              }}
            />
            <Text>
              {data.album_name}
            </Text>
            <Text>
              {data.artist_name}
            </Text>
            <Text>
              {data.genre.substring(2, data.genre.length - 2)}
            </Text>
            <Button title="Remove" onPress={() => removeFromWishList(data.id)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

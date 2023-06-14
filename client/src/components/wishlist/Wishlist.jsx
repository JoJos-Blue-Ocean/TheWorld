/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, Image, Button, Alert, ScrollView, SafeAreaView, Dimensions, FlatList,
} from 'react-native';
import NavigationPane from '../NavigationPane';

// wishlist component
export default function Wishlist({ navigation, route }) {
  // const [visible, setVisible] = useState(true);
  // console.log('route param', route.params.uid);
  const [list, setWishList] = useState([]);

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
      paddingLeft: 30,
      // marginVertical: 20,
      // flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      // gap: 30,
      width: '100%',
      borderWidth: 1,
      backgroundColor: '#F5F5F5',
    },
    tinyImage: {
      width: 100,
      height: 100,
      // margin: 1,
    },
  });

  const getWishListData = function () {
    axios.get('http://localhost:3000/api/wishlist', { params: { user_id: 'cliuo26c1000608i96syehksd' } }).then(({ data }) => {
      //   console.log('Data', data);
      setWishList(data);
    }).catch((error) => {
      console.log('Wishlist data cannot be retrieved from the server', error);
    });
  };

  const removeFromWishList = function (id) {
    console.log('id in remove', id);
    axios.delete('http://localhost:3000/api/wishlist', { data: { user_id: 'cliuo26c1000608i96syehksd', id } })
      .then(({ data }) => {
        console.log('Server response after remove operation', data);
        getWishListData();
      }).catch((error) => {
        console.log('Unable to remove album from the wishlist', error);
      });
  };

  // console.log('wishlist:', list);

  useEffect(() => {
    getWishListData();
  }, []);

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

// <Button title="Remove" onPress={() => Alert.alert('Removed item')} />
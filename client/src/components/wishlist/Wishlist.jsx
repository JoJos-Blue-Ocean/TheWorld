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
  // console.log('route param', route.params);
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
      paddingBottom: 40,
      paddingLeft: 30,
      marginVertical: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 30,
      width: '100%',
      borderWidth: 1,
      backgroundColor: 'red',
    },
    tinyImage: {
      width: 50,
      height: 50,
      margin: 1,
    },
  });

  const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Album',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Album',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Album',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Fourth Album',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Fifth Album',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Fourth Album',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Fifth Album',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Fourth Album',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Fifth Album',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Fourth Album',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Fifth Album',
    },
  ];

  const getWishListData = function (callback) {
    axios.get('http://localhost:3000/api/wishlist', { params: { user_id: 1 } }).then(({ data }) => {
      // console.log('Data', data);
      callback(data);
    }).catch((error) => {
      console.log('Wishlist data cannot be retrieved from the server', error);
    });
  };

  useEffect(() => {
    getWishListData((data) => {
      setWishList(data);
      console.log('wishlist:', data);
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text> This is the wishlist main page</Text>
      </View>
      <View style={styles.container}>
        { list.map((data, index) => (
          <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.tinyImage}
              source={data.image}
            />
            <Text>
              {data.album_name}
              {data.artist_name}
              {data.genre}
            </Text>
            <Button title="Remove" onPress={() => Alert.alert('Removed item')} />
          </View>
        ))}
      </View>
    </View>
  );
}

/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, Button, Alert, ScrollView, SafeAreaView, Dimensions, FlatList,
} from 'react-native';
import NavigationPane from '../NavigationPane';

// wishlist component
export default function Wishlist() {
  const [visible, setVisible] = useState(true);

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

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text> This is the wishlist main page</Text>
      </View>
      <View style={styles.container}>
        { mockData.map((data, index) => (
          <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.tinyImage}
              source={require('./square.png')}
            />
            <Text>
              {DATA[index].title}
            </Text>
            <Button title="Remove" onPress={() => Alert.alert('Removed item')} />
          </View>
        ))}
      </View>
    </View>
  );
}

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationPane from '../NavigationPane';
import RockGenre from './RockGenre';


export default function RecordCatalog() {
  const [rockAlbums, setRockAlbums] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/vinyl', {
      params: {
        text: '',
        genre: 'rock',
      },
    })
      .then((response) => {
        setRockAlbums(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (

    <View>
      <Text> This is the Record Catalog main page</Text>
      <RockGenre rockAlbums={rockAlbums} />
    </View>
  );
}

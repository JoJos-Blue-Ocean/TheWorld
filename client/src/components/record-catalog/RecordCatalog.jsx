import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RockGenre from './RockGenre';
import ClassicalGenre from './ClassicalGenre';

export default function RecordCatalog() {
  const [rockAlbums, setRockAlbums] = useState([]);
  const [classicalAlbums, setClassicalAlbums] = useState([]);

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

  useEffect(() => {
    axios.get('http://localhost:3000/vinyl', {
      params: {
        text: '',
        genre: 'classical',
      },
    })
      .then((response) => {
        setClassicalAlbums(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (

    <View>
      <RockGenre rockAlbums={rockAlbums} />
      <ClassicalGenre classicalAlbums={classicalAlbums} />
    </View>
  );
}

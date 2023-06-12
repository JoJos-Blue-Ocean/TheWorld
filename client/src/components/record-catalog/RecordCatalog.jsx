import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import NavigationPane from '../NavigationPane';
import GenreEntries from './GenreEntries';

export default function RecordCatalog() {
  const genres = ['rock', 'classical', 'hip-hop'];
  // useEffect(() => {
  //   axios.get('http://localhost:3000/vinyl', {
  //     params: {
  //       text: '',
  //       genre: 'rock',
  //     },
  //   })
  //     .then((response) => {
  //       setRockAlbums(response.data.results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:3000/vinyl', {
  //     params: {
  //       text: '',
  //       genre: 'classical',
  //     },
  //   })
  //     .then((response) => {
  //       setClassicalAlbums(response.data.results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (

    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {genres.map((genre) => (
          <GenreEntries genre={genre} key={genre} />
        ))}
      </ScrollView>
      <NavigationPane />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 60,
  },
});
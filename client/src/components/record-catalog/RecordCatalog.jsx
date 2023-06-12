import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationPane from '../NavigationPane';
import GenreEntries from './GenreEntries';
import SearchBar from './SearchBar';

export default function RecordCatalog() {
  const genres = ['rock', 'classical', 'hip-hop'];
  const categories = ['title', 'artist'];
  const [searchState, setSearchState] = useState(false);

  return (

    <View>
      <SearchBar setSearchState={setSearchState} />
      {searchState
        ? categories.map((category) => <SearchEntries category={category} key={category} />)
        : genres.map((genre) => <GenreEntries genre={genre} key={genre} />)}
    </View>
  );
}

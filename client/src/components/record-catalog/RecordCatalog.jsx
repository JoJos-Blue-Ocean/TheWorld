import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import GenreEntries from './GenreEntries';
import SearchBar from './SearchBar';
import SearchEntries from './SearchEntries';

export default function RecordCatalog() {
  const genres = ['rock', 'classical', 'hip-hop'];
  const categories = ['release_title', 'artist', 'track'];
  const [search, setSearch] = useState('');
  const [searchState, setSearchState] = useState(false);

  return (

    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <SearchBar search={search} setSearch={setSearch} setSearchState={setSearchState} />
        {searchState ? (
          <Text>
            Search Result for "
            {search}
            "
          </Text>
        ) : null }
        {searchState
          ? categories.map((category) => (
            <SearchEntries
              setSearchState={setSearchState}
              search={search}
              category={category}
              key={category}
            />
          ))
          : genres.map((genre) => (
            <GenreEntries
              genre={genre}
              key={genre}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maginLeft: 20,
  },
  scrollViewContent: {
    paddingBottom: 60,
  },
});

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, TextInput, View, Text,
} from 'react-native';

export default function SearchBar({ setSearchState, search, setSearch }) {
  const searchChanger = (text) => {
    setSearch(text);
    if (text.length > 0 && search !== text) {
      setSearchState(true);
    } else {
      setSearchState(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Songs, Artists, Album Name..."
        value={search}
        onChangeText={searchChanger}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
  },
});

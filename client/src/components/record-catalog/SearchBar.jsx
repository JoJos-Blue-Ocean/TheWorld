import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, TextInput, View, Text,
} from 'react-native';

export default function SearchBar({ setSearchState, search, setSearch }) {
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  const searchChanger = (e) => {
    const text = e.target.value;
    setSearch(e.target.value);
    if (text.length > 0 && search !== text) {
      setSearchState(true);
    } else {
      setSearchState(false);
    }
  };

  return (
    <View>
      <TextInput style={styles.input} onChange={searchChanger} />
    </View>
  );
}

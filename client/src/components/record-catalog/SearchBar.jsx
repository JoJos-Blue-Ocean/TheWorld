import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, TextInput, View, Text,
} from 'react-native';

export default function SearchBar({setSearchState}) {
  const [search, setSearch] = useState('');
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  const searchChanger = (e) => {
    setSearch(e.target.value);
    if (search) {
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

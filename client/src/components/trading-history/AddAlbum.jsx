import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable, TextInput, ScrollView,
} from 'react-native';
import axios from 'axios';
import MakeAlbum from './MakeAlbum';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '5%',
    height: '80%',
    width: '90%',
    left: '5%',
    zIndex: 1,
    backgroundColor: 'white',
  },
  search: {
    position: 'absolute',
    top: '5%',
    height: '8%',
    width: '80%',
    left: '10%',
    backgroundColor: 'grey',
  },
  albumContainer: {
    position: 'absolute',
    top: '20%',
    height: '60%',
    width: '100%',
    flexDirection: 'column',
  },
  scroll: {
    flex: 1,
  },
});

export default function AddAlbum({ selectAlbum, toggleShowAddAlbum, toggleAlbumSelected }) {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('release_title');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const grabAlbums = () => {
    setLoading(true);
    axios.get('http://localhost:3000/api/record-catalog/searchAlbumCategory', {
      params: {
        category,
        search,
        page,
      },
    })
      .then((response) => {
        setAlbums((prevAlbums) => [...prevAlbums, ...response.data.results]);
      })
      .then(() => {
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      setPage(1);
      setAlbums([]);
      grabAlbums();
    }, 500);
    setTimeoutId(newTimeoutId);
    return () => clearTimeout(newTimeoutId);
  }, [search]);

  return(
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        onChangeText={(e) => {
          setSearch(e);
        }} />
      <View style={styles.albumContainer}>
        <ScrollView style={styles.scroll}>
          {albums.map((album) => (
            <MakeAlbum
              album={album}
              key={album.id}
              selectAlbum={selectAlbum}
              toggleShowAddAlbum={toggleShowAddAlbum}
              toggleAlbumSelected={toggleAlbumSelected}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

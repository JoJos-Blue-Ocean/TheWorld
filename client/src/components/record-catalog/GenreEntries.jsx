import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Text, StyleSheet, View, ScrollView,
} from 'react-native';
import IndividualAlbums from './IndividualAlbums';

export default function GenreEntries({ genre }) {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = () => {
    setLoading(true);
    axios.get('http://localhost:3000/vinyl', {
      params: {
        text: '',
        genre,
        page,
      },
    })
      .then((response) => {
        setAlbums((prevAlbums) => [...prevAlbums, ...response.data.results]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleScroll = (e) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const isEndReached = layoutMeasurement.width + contentOffset.x >= contentSize.width - 50;
    if (isEndReached && !loading) {
      fetchAlbums();
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <ScrollView
      horizontal
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <Text>{genre}</Text>
      {albums.map((album) => (
        <IndividualAlbums key={album.id} album={album} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

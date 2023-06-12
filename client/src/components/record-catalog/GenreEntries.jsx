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
    axios.get('http://localhost:3000/api/record-catalog/allAlbums', {
      params: {
        text: '',
        genre,
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
      .then(() => {
        console.log(`${genre} :`, albums);
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
    <View>
      <Text>{genre}</Text>
      <ScrollView
        horizontal
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {albums.map((album) => (
          <IndividualAlbums key={album.master_id} album={album} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

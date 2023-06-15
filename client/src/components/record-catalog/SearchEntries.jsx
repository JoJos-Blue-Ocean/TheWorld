import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, Button, ScrollView,
} from 'react-native';
import IndividualAlbums from './IndividualAlbums';

export default function SearchEntries({ search, category }) {
  const [albums, setAlbums] = useState([]);
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

  const handleScroll = (e) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const isEndReached = layoutMeasurement.width + contentOffset.x >= contentSize.width - 50;
    if (isEndReached && !loading) {
      grabAlbums();
    }
  };

  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      setPage(1);
      setAlbums([]);
      grabAlbums();
    }, 500);
    setTimeoutId(newTimeoutId);
    return () => clearTimeout(newTimeoutId);
  }, []);

  return (
    <View>
      <Text style={styles.genreText}>{capitalizedCategory}</Text>
      <ScrollView
        horizontal
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {albums.map((album) => (
          <IndividualAlbums key={album.id} album={album} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  genreText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

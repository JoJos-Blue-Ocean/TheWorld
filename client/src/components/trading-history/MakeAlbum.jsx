import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable, TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '50%',
  },
  details: {
    position: 'absolute',
    left: '55%',
    height: '90%',
    width: '40%',
    textAlign: 'left',
    flexDirection: 'column',
  },
});

export default function MakeAlbum({ album, selectAlbum, toggleShowAddAlbum, toggleAlbumSelected }) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        selectAlbum({
          id: album.id,
          title: album.title,
          uri: album.cover_image,
        });
        toggleShowAddAlbum(false);
        toggleAlbumSelected(true);
      }}>
      <Image source={{ uri: album.cover_image }} style={styles.image} />
      <View style={styles.details}>
        <Text>{album.title}</Text>
      </View>
    </Pressable>
  )
}

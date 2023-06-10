import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, Button, Image,
} from 'react-native';

export default function RockGenreIndividual({ album }) {
  const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
    },
  });

  return (
    <View>
      <Image source={{ uri: album.cover_image }} style={styles.image} />
      <Text>{album.title}</Text>
    </View>
  );
}

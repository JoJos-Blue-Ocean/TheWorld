import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, Button, Image, TouchableOpacity,
} from 'react-native';

export default function ClassicalGenreIndividual({ album }) {
  const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
    },
  });

  return (
    <TouchableOpacity>
      <View>
        <Image source={{ uri: album.cover_image }} style={styles.image} />
        <Text>{album.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

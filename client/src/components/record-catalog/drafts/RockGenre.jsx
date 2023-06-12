import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import RockGenreIndividual from './RockGenreIndividual';

export default function RockGenre({ rockAlbums }) {
  return (
    <ScrollView horizontal style={styles.container}>
      <Text>Rock</Text>
      {rockAlbums.map((album) => (
        <RockGenreIndividual key={album.id} album={album} />
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

import React, { useState, useEffect} from 'react';
import {
  StyleSheet, Text, View, Button, ScrollView,
} from 'react-native';
import ClassicalGenreIndividual from './ClassicalGenreIndividual';

export default function ClassicalGenre({ classicalAlbums }) {
  return (
    <ScrollView horizontal style={styles.container}>
      <Text>Classical</Text>
      {classicalAlbums.map((album) => (
        <ClassicalGenreIndividual album={album} key={album.id} />
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

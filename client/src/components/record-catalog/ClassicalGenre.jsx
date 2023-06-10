import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import ClassicalGenreIndividual from './ClassicalGenreIndividual';

export default function ClassicalGenre({ classicalAlbums }) {
  return (
    <View>
      <Text>Classical</Text>
      {classicalAlbums.map((album) => <ClassicalGenreIndividual album={album} key={album.id} />)}
    </View>
  );
}

import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import RockGenreIndividual from './RockGenreIndividual';

export default function RockGenre({ rockAlbums }) {
  return (
    <View>
      <Text>Rock</Text>
      {rockAlbums.map((album) => <RockGenreIndividual album={album} key={album.id} />)}
    </View>
  );
}

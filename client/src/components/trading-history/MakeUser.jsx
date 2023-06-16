import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    marginBottom: 10,
  },
  image: {
    height: '100%',
    width: '40%',
  },
  username: {
    position: 'absolute',
    top: '40%',
    left: '50%',
  },
});

export default function MakeUser({
  user,
  setBuyerId,
  setSearch,
  setSearchLength,
  setBuyerImage,
  setBuyerName,
  setBuyerSelected,
}) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setBuyerId(user.uid);
        setBuyerImage(user.profile_picture);
        setBuyerName(user.username);
        setBuyerSelected(true);
        setSearch('');
        setSearchLength(0);
      }}
    >
      <Image source={{ uri: user.profile_picture }} style={styles.image} />
      <Text style={styles.username}>{user.username}</Text>
    </Pressable>
  );
};

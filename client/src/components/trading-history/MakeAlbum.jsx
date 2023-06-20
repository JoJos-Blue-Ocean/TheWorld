import React åfrom 'react';
import {
  StyleSheet, Text, View, Image, Pressable,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    height: '90%',
    width: '50%',
    borderRadius: '8%',
  },
  details: {
    position: 'absolute',
    left: '55%',
    height: '90%',
    width: '40%',
    textAlign: 'left',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default function MakeAlbum({ album, selectAlbum, toggleShowAddAlbum, toggleAlbumSelected }) {
  const splitTitle = album.title.split(' - ');
  const collectionTitle = splitTitle[1] || '';
  const artistTitle = splitTitle[0] || '';
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        selectAlbum({
          id: album.id,
          title: collectionTitle,
          artist: artistTitle,
          uri: album.cover_image,
        });
        toggleShowAddAlbum(false);
        toggleAlbumSelected(true);
      }}>
      <Image source={{ uri: album.cover_image }} style={styles.image} />
      <View style={styles.details}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{collectionTitle}</Text>
          <Text>{artistTitle}</Text>
        </View>
      </View>
    </Pressable>
  );
}

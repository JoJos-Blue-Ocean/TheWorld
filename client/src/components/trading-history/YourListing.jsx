import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function YourListing() {
  return (
    <View style={styles.trades}>
      <Text>this is your listing</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  trades: {
    position: 'absolute',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});

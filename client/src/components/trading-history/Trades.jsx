import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Trades() {
  return (
    <View style={styles.trades}>
    </View>
  );
}

const trades = StyleSheet.create({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
});

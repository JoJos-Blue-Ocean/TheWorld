/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});

// eslint-disable-next-line no-unused-vars
export default function NavigationPane({ children }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      { children }
      <View style={styles.navBar}>
        <Button title="RC" onPress={() => navigation.navigate('RecordCatalog')} />
        <Button title="TH" onPress={() => navigation.navigate('TradingHistory')} />
        <Button title="TP" onPress={() => navigation.navigate('TradingPlatform')} />
        <Button title="M" onPress={() => navigation.navigate('Messages')} />
        <Button title="P" onPress={() => navigation.navigate('Profile')} />
        <Button title="L" onPress={() => navigation.navigate('Login')} />
        <Button title="W" onPress={() => navigation.navigate('WishList')} />
      </View>
    </View>
  );
}

import React, { useState } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import YourListing from './YourListing';
import NavigationPane from '../NavigationPane';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: '10%',
    backgroundColor: '#F5F5F5',
  },
  tabs: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
  },
  tab: {
    position: 'relative',
    backgroundColor: 'grey',
    padding: '5%',
  },
  tradesHistoryMain: {
    position: 'absolute',
    top: '10%',
    backgroundColor: 'grey',
    height: '80%',
    width: '100%',
  },
});

export default function TradingHistory() {
  const [tab, setTab] = useState('Your Listing');

  return (

    <View style={styles.container}>
      <View style={styles.tabs}>
        <View style={styles.tab} onPress={() => { setTab('Your Listing'); }}>
          <Text>Your Listing</Text>
        </View>
        <View style={styles.tab} onPress={() => { setTab('Transaction History'); }}>
          <Text>Transaction History</Text>
        </View>
      </View>
      <View style={styles.tradesHistoryMain}>
        {(tab === 'Your Listing') && <YourListing />}
      </View>
    </View>

  );
}

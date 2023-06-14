import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import YourListing from './YourListing';
import TransactionHistory from './TransactionHistory';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabs: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    height: '7%',
  },
  tab: {
    position: 'relative',
    backgroundColor: 'grey',
    padding: '5%',
  },
  tradesHistoryMain: {
    position: 'absolute',
    top: '15%',
    height: '80%',
    width: '100%',
  },
  addListing: {
    position: 'absolute',
    top: '8%',
    height: '6%',
    backgroundColor: 'white',
  },
});

export default function TradingHistory() {
  const [tab, setTab] = useState('Your Listing');
  const navigation = useNavigation();
  const [listedTrades, setListedTrades] = useState([]);
  const [completeTrades, setCompleteTrades] = useState([]);
  const userId = 1;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/trade-history/listed-trades', {
          params: {
            user_id: userId,
          },
        });
        setListedTrades(response.data);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.get('http://localhost:3000/api/trade-history/complete-trades', {
          params: {
            user_id: userId,
          },
        });
        setCompleteTrades(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (

    <View style={styles.container}>
      <View style={styles.tabs}>
        <Pressable style={styles.tab} onPress={() => { setTab('Your Listing'); }}>
          <Text>Your Listing</Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => { setTab('Transaction History'); }}>
          <Text>Transaction History</Text>
        </Pressable>
      </View>
      <Pressable style={styles.addListing} onPress={() => { navigation.navigate('Add Trade Form'); }}>
        <Text>
          Add a Listing
        </Text>
      </Pressable>
      <View style={styles.tradesHistoryMain}>
        {(tab === 'Your Listing') && <YourListing list={listedTrades} userId={userId} />}
        {(tab === 'Transaction History') && <TransactionHistory list={completeTrades} userId={userId} />}
      </View>
    </View>

  );
}

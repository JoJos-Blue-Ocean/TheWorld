import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, Text, View, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import Draggable from 'react-native-draggable';
import YourListing from './YourListing';
import TransactionHistory from './TransactionHistory';
import UserContext from '../UserContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabs: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    height: '10%',
  },
  tab: {
    position: 'relative',
    padding: '5%',
    borderWidth: 1,
    borderColor: 'black',
    marginRight: '5%',
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
    backgroundColor: 'red',
  },
});

export default function TradingHistory() {
  const [tab, setTab] = useState('Your Listing');
  const navigation = useNavigation();
  const [listedTrades, setListedTrades] = useState([]);
  const [completeTrades, setCompleteTrades] = useState([]);
  const [uid, setUid] = useContext(UserContext);
  const addTradeParams = {
    uid,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/trade-history/listed-trades', {
          params: {
            user_id: uid,
          },
        });
        setListedTrades(response.data);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.get('http://localhost:3000/api/trade-history/complete-trades', {
          params: {
            user_id: uid,
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
      <View style={styles.tradesHistoryMain}>
        {(tab === 'Your Listing') && <YourListing list={listedTrades} userId={uid} />}
        {(tab === 'Transaction History') && <TransactionHistory list={completeTrades} userId={uid} />}
      </View>
      <Draggable
        x={150}
        y={450}
        z={2}
        minX={0}
        minY={0}
        maxY={750}
        renderSize={60}
        onShortPressRelease={() => { navigation.navigate('Add Trade Form', addTradeParams); }}
        renderColor="#A30000"
        isCircle
        style={styles.addListing}
      >
        <Text style={{
          height: 50,
          width: 50,
          textAlign: 'center',
          top: 4,
          fontSize: 30,
          color: 'white',
        }}
        >
          +
        </Text>
      </Draggable>
    </View>
  );
}

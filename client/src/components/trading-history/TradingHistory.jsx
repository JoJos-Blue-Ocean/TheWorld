import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, Text, View, Pressable, TouchableOpacity,
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
    // position: 'absolute',
    // display: 'flex',
    // flexDirection: 'row',
    // height: '10%',
    // position: 'absolute',
    // display: 'flex',
    // flexDirection: 'row',
    // height: '10%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '10%',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  tab: {
    // position: 'relative',
    // padding: '5%',
    // borderWidth: 1,
    // borderColor: 'black',
    // marginRight: '5%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    // position: 'relative',
    // padding: '5%',
    // borderWidth: 1,
    // borderColor: 'black',
    // marginRight: '5%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    marginRight: 10,
  },
  // added
  activeTab: {
    backgroundColor: '#C0C0C0',
  },
  tabText: {
    fontSize: 16,
    color: '#000000',
    borderColor: '#000000',
    marginRight: 10,
  },
  // added
  activeTab: {
    backgroundColor: '#C0C0C0',
  },
  tabText: {
    fontSize: 16,
    color: '#000000',
  },
  tradesHistoryMain: {
    // position: 'absolute',
    // top: '15%',
    // height: '80%',
    // width: '100%',
    flex: 1,
  },
  addListing: {
    position: 'absolute',
    top: '2%',
    left: '85%',
    height: '6%',
    width: '10%',
    backgroundColor: '#800000',
    borderRadius: '5%',
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
        <Pressable
          style={[styles.tab, tab === 'Your Listing' && styles.activeTab]}
          onPress={() => setTab('Your Listing')}
        >
          <Text style={[styles.tabText, tab === 'Your Listing' && styles.activeTabText]}>Your Listing</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, tab === 'Transaction History' && styles.activeTab]}
          onPress={() => setTab('Transaction History')}
        >
          <Text style={[styles.tabText, tab === 'Transaction History' && styles.activeTabText]}>Transaction History</Text>
        </Pressable>
      </View>
      <View style={styles.tradesHistoryMain}>
        {tab === 'Your Listing' && <YourListing list={listedTrades} userId={uid} />}
        {tab === 'Transaction History' && <TransactionHistory list={completeTrades} userId={uid} />}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Add Trade Form', addTradeParams)}
        style={styles.addListing}
      >
        <Text style={{ fontSize: 30, color: 'white', textAlign: 'center' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

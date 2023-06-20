import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import YourListing from './YourListing';
import TransactionHistory from './TransactionHistory';
import UserContext from '../UserContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '10%',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    marginRight: 10,
  },
  activeTab: {
    color: '#800000',
  },
  activeTabText: {
    color: '#800000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    borderColor: '#000000',
    marginRight: 5,
  },
  tradesHistoryMain: {
    flex: 1,
  },
  addListing: {
    position: 'absolute',
    top: '2.4%',
    left: '82%',
    height: '5%',
    width: '12%',
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
  const [refresh, setRefresh] = useState(false);

  const addTradeParams = {
    uid,
    refresh,
    setRefresh,
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
  }, [refresh]);

  return (

    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'Your Listing' && styles.activeTab]}
          onPress={() => setTab('Your Listing')}
        >
          <Text style={[styles.tabText, tab === 'Your Listing' && styles.activeTabText]}>Your Listing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'Transaction History' && styles.activeTab]}
          onPress={() => setTab('Transaction History')}
        >
          <Text style={[styles.tabText, tab === 'Transaction History' && styles.activeTabText]}>Transaction History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tradesHistoryMain}>
        {tab === 'Your Listing' && <YourListing list={listedTrades} userId={uid} refresh={refresh} setRefresh={(e) => { setRefresh(e); }} />}
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

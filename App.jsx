import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Login from './client/src/components/login/LoginStart';
import TradingPlatform from './client/src/components/trading-platform/TradingPlatform';
import TradingHistory from './client/src/components/trading-history/TradingHistory';
import RecordCatalog from './client/src/components/record-catalog/RecordCatalog';
import Profile from './client/src/components/users/Profile';
import Messages from './client/src/components/messages/Messages';
import Wishlist from './client/src/components/wishlist/Wishlist';

export default function App() {
  const [activePage, setActivePage] = useState('Profile');

  const renderPage = () => {
    switch (activePage) {
      case 'RecordCatalog':
        return <RecordCatalog />;
      case 'TradingHistory':
        return <TradingHistory />;
      case 'TradingPlatform':
        return <TradingPlatform />;
      case 'Messages':
        return <Messages />;
      case 'Profile':
        return <Profile />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      {renderPage()}
      <View style={styles.navBar}>
        <Button title="RecordCatalog" onPress={() => setActivePage('RecordCatalog')} />
        <Button title="TradeHistory" onPress={() => setActivePage('TradingHistory')} />
        <Button title="TradingPlatform" onPress={() => setActivePage('TradingPlatform')} />
        <Button title="Messages" onPress={() => setActivePage('Messages')} />
        <Button title="Profile" onPress={() => setActivePage('Profile')} />
      </View>
    </View>
  );
}

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


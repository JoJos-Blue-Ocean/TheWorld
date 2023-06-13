/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './client/src/components/login/Login';
import Register from './client/src/components/login/Register';
import TradingPlatform from './client/src/components/trading-platform/TradingPlatform';
import ActiveTradeDetails from './client/src/components/trading-platform/ActiveTradeDetails';
import TradingHistory from './client/src/components/trading-history/TradingHistory';
import RecordCatalog from './client/src/components/record-catalog/RecordCatalog';
import Profile from './client/src/components/users/Profile';
import Messages from './client/src/components/messages/Messages';
import Wishlist from './client/src/components/wishlist/Wishlist';
import NavigationPane from './client/src/components/NavigationPane';
import CompleteTradeForm from './client/src/components/trading-history/CompleteTradeForm';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NavigationPane>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
          <Stack.Screen name="TradingPlatform" component={TradingPlatform} />
          <Stack.Screen name="ActiveTradeDetails" component={ActiveTradeDetails} />
          <Stack.Screen name="TradingHistory" component={TradingHistory} />
          <Stack.Screen name="RecordCatalog" component={RecordCatalog} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="WishList" component={Wishlist} />
          <Stack.Screen name="Trade Completion Form" component={CompleteTradeForm} />
        </Stack.Navigator>
      </NavigationPane>
    </NavigationContainer>
  );
}

/*
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

function NavigationPane({ page, navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      {page}
      <View style={styles.navBar}>
        <Button title="RecordCatalog" onPress={() => navigation.navigate('RecordCatalog')} />
        <Button title="TradeHistory" onPress={() => navigation.navigate('TradingHistory')} />
        <Button title="TradingPlatform" onPress={() => navigation.navigate('TradingPlatform')} />
        <Button title="Messages" onPress={() => navigation.navigate('Messages')} />
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('RecordCatalog');

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
      case 'Login':
        return <Login />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      {renderPage()}
      <View style={styles.navBar}>
        <Button title="RecordCatalog" onPress={() => setActivePage('RecordCatalog')} />
        <Button title="TradeHistory" onPress={() => setActivePage('TradingHistory')} />
        <Button title="TradingPlatform" onPress={() => setActivePage('TradingPlatform')} />
        <Button title="Messages" onPress={() => setActivePage('Messages')} />
        <Button title="Profile" onPress={() => setActivePage('Profile')} />
        <Button title="Login" onPress={() => setActivePage('Login')} />
      </View>
    </View>
  );
}
*/

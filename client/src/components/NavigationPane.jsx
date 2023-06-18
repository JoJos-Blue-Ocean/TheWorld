import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

import UserContext from './UserContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  activeButton: {
    color: '#800000',
  },
});
export default function NavigationPane({ children }) {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState('RecordCatalog');
  const [uid, setUid] = useContext(UserContext);

  const handlePress = (button) => {
    setActiveButton(button);
    navigation.navigate(button);
  };
  return (
    <View style={styles.container}>
      {children}
      {!uid ? null : ( // do not show buttons if user has not logged in
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => handlePress('RecordCatalog')} color="#e0e0e0">
            <AntDesign name="book" size={40} color={activeButton === 'RecordCatalog' ? '#800000' : '#808080'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('TradingHistory')} color="#e0e0e0">
            <MaterialIcons name="history" size={45} color={activeButton === 'TradingHistory' ? '#800000' : '#808080'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Messages')} color="#e0e0e0">
            <AntDesign name="message1" size={35} color={activeButton === 'Messages' ? '#800000' : '#808080'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Profile')} color="#e0e0e0">
            <Ionicons name="person-circle-outline" size={44} color={activeButton === 'Profile' ? '#800000' : '#808080'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Button } from 'react-native';
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
    padding: 10,
    position: 'absolute',
    bottom: 20,
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
          <Button
            title="RC"
            onPress={() => handlePress('RecordCatalog')}
            color={activeButton === 'RecordCatalog' ? '#800000' : '#808080'}
          />
          <Button
            title="TH"
            onPress={() => handlePress('TradingHistory')}
            color={activeButton === 'TradingHistory' ? '#800000' : '#808080'}
          />
          <Button
            title="M"
            onPress={() => handlePress('Messages')}
            color={activeButton === 'Messages' ? '#800000' : '#808080'}
          />
          <Button
            title="P"
            onPress={() => handlePress('Profile')}
            color={activeButton === 'Profile' ? '#800000' : '#808080'}
          />
        </View>
      )}
    </View>
  );
}
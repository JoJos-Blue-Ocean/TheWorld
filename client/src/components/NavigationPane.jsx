import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Button } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

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
    position: 'fixed',
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
  const [activeButton, setActiveButton] = useState('Login');

  const handlePress = (button) => {
    setActiveButton(button);
    navigation.navigate(button);
  };

  return (
    <View style={styles.container}>
      {children}
      <View style={styles.navBar}>
        <Button
          title={<AntDesign name="book" size={40} color={activeButton === 'RecordCatalog' ? '#800000' : '#808080'} />}
          onPress={() => handlePress('RecordCatalog')}
          color="#e0e0e0"
        />
        <Button
          title={<FontAwesome name="exchange" size={40} color={activeButton === 'TradingHistory' ? '#800000' : '#808080'} />}
          onPress={() => handlePress('TradingHistory')}
          color="#e0e0e0"
        />
        <Button
          title={<AntDesign name="message1" size={40} color={activeButton === 'Messages' ? '#800000' : '#808080'} />}
          onPress={() => handlePress('Messages')}
          color="#e0e0e0"
        />
        <Button
          title={<Ionicons name="person-outline" size={40} color={activeButton === 'Profile' ? '#800000' : '#808080'} />}
          onPress={() => handlePress('Profile')}
          color="#e0e0e0"
        />
      </View>
    </View>
  );
}

import axios from 'axios';
import React from 'react';
import {
  StyleSheet, Text, View, TextInput, Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import UserContext from '../UserContext';

const { useState, useContext } = React;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
  },
});

export default function NewMessage({ route }) {
  const { sellerId } = route.params;
  const [newMessage, setNewMessage] = useState('');
  const [uid, setUid] = useContext(UserContext);
  const navigation = useNavigation();

  const handlePress = () => {
    axios.post('http://localhost:3000/api/messages/makeRoomAndSendMessage', {
      senderId: uid,
      recipientId: sellerId,
      body: newMessage,
    })
      .then(({ data }) => navigation.navigate('Messages', { user: data }));
  };
  return (
    <View>
      <Text>Send a Message</Text>
      <TextInput style={styles.textInput} onChangeText={(text) => setNewMessage(text)} />
      <Button
        title="Send Message"
        onPress={handlePress}
      />
    </View>
  );
}

import axios from 'axios';
import React from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import UserContext from '../UserContext';

const predefinedMessages = [
  'Hi, is this still available?',
  'Hi, I would like to trade for this vinyl!',
  'Hi, can you meet today?',
];

function NewMessage({ route }) {
  const { userId } = route.params;
  const [newMessage, setNewMessage] = React.useState('');
  const [uid, setUid] = React.useContext(UserContext);
  const navigation = useNavigation();

  const handlePress = () => {
    axios
      .post('http://localhost:3000/api/messages/makeRoomAndSendMessage', {
        senderId: uid,
        recipientId: userId,
        body: newMessage,
      })
      .then(({ data }) => {
        const { user, room } = data;
        navigation.navigate('Messages', { user, roomId: room.id });
      });
  };

  const insertMessage = (message) => {
    setNewMessage((prevMessage) => prevMessage + message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send a Message</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setNewMessage(text)}
          value={newMessage}
          placeholder="Type your message"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handlePress}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        {predefinedMessages.map((message, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => insertMessage(message)}
          >
            <Text style={styles.buttonText}>{message}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#C0C0C0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default NewMessage;

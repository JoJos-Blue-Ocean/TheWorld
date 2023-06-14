import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button, Modal, TouchableOpacity } from 'react-native';

export default function Messages() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/messages/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users with messages:', error));
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      axios
        .get('http://localhost:3000/api/messages', {
          params: {
            firstId: 'cliuo1dcs000208i9hga217k5', //replace with current user id
            secondId: selectedUserId,
          },
        })
        .then((response) => setMessages(response.data))
        .catch((error) => console.error('Error fetching messages:', error));
    }
  }, [selectedUserId]);

  const handleUserClick = (userId) => {
    setModalVisible(true);
    setSelectedUserId(userId);
  };

  const handleSendMessage = () => {
    axios
      .post('http://localhost:3000/api/messages', {
        senderId: 'cliuo1dcs000208i9hga217k5', //replace with current user id
        recipientId: selectedUserId,
        body: newMessage,
      })
      .then((response) => {
        setNewMessage('');
        setMessages([...messages, response.data]);
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <View style={styles.container}>
      {users.map(user => (
        <TouchableOpacity key={user.id} onPress={() => handleUserClick(user.id)}>
          <Text style={styles.username}>{user.username}</Text>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Messages</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />

          {messages.map(message => (
            <Text key={message.id} style={styles.message}>{message.body}</Text>
          ))}

          <TextInput
            value={newMessage}
            onChangeText={text => setNewMessage(text)}
            placeholder="Type your message"
            style={styles.input}
          />
          <Button onPress={handleSendMessage} title="Send" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  username: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
});

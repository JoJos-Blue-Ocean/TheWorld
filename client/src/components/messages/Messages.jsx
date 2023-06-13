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
    axios.get('your-api-url/users-with-messages')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users with messages:', error));
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      axios.get(`your-api-url/messages/${selectedUserId}`)
        .then(response => setMessages(response.data))
        .catch(error => console.error('Error fetching messages:', error));
    }
  }, [selectedUserId, messages]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setModalVisible(true);
  };

  const handleSendMessage = () => {
    axios.post('your-api-url/messages', {
      sender_id: loggedInUserId, // Replace with the logged-in user ID
      recipient_id: selectedUserId,
      body: newMessage
    })
      .then(response => {
        setNewMessage('');
        setMessages([...messages, response.data]);
      })
      .catch(error => console.error('Error sending message:', error));
  };

  return (
    <View>
      {users.map(user => (
        <TouchableOpacity key={user.id} onPress={() => handleUserClick(user.id)}>
          <Text>{user.username}</Text>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible}>
        <View>
          <Text>Messages</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />

          {messages.map(message => (
            <Text key={message.id}>{message.body}</Text>
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

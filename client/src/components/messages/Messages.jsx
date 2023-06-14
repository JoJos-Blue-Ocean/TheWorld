import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button, Modal, TouchableOpacity } from 'react-native';

export default function Messages() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/messages/users')
  //     .then(response => setUsers(response.data))
  //     .catch(error => console.error('Error fetching users with messages:', error));
  // }, []);
  useEffect(() => {
    if (true) {
      axios
        .get('http://localhost:3000/api/messages/rooms', {
          params: { userId: 'b' },
        })
        .then((response) => setRooms(response.data))
        .catch((error) => console.error('Error fetching messages:', error));
    }
  }, []);

  useEffect(() => {
    if (rooms.length) {
      const temp = [];
      rooms.forEach((room) => {
        if (room.user_one !== 'b') {
          temp.push(axios
            .get('http://localhost:3000/api/profile/simpleProfile', {
              params: { selectedUserId: room.user_one, personalId: 'b' },
            })
            .then(({ data }) => data)
            .catch((error) => console.error('Error fetching rooms')));
        } else if (room.user_two !== 'b') {
          temp.push(axios
            .get('http://localhost:3000/api/profile/simpleProfile', {
              params: { selectedUserId: room.user_two, personalId: 'b' },
            })
            .then(({ data }) => data)
            .catch((error) => console.error('Error fetching rooms')));
        }
      });
      Promise.all(temp).then((results) => {
        console.log(results);
        setUsers(results);
      });
    }
  }, [rooms]);

  const handleUserClick = (roomId) => {
    axios
      .get('http://localhost:3000/api/messages/', {
        params: { roomId },
      })
      .then(({ data }) => setMessages(data))
      .catch((error) => console.error('FAILED TO GET MESSAGES'));
    setModalVisible(true);
  };

  const handleSendMessage = (roomId) => {
    axios
      .post('http://localhost:3000/api/messages', {
        roomId,
        senderId: 'b', //replace with current user id
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
      {users.map((user) => (
        <TouchableOpacity key={user[0].uid} onPress={() => handleUserClick(user[0].room_id)}>
          <Text style={styles.username}>{user[0].username}</Text>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Messages</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />

          {messages.map(message => (
            <Text key={message.id} style={styles.message}>{message.body}</Text>
          ))}

          <TextInput
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
            placeholder="Type your message"
            style={styles.input}
          />
          <Button onPress={() => handleSendMessage(messages[0].room_id)} title="Send" />
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, TextInput, Button, Modal, TouchableOpacity, Image, ScrollView,
} from 'react-native';

export default function Messages() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sellerId, setSellerId] = useState(null);

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
          temp.push(
            axios
              .get('http://localhost:3000/api/profile/simpleProfile', {
                params: { selectedUserId: room.user_one, personalId: 'b' },
              })
              .then(({ data }) => data)
              .catch((error) => console.error('Error fetching rooms')),
          );
        } else if (room.user_two !== 'b') {
          temp.push(
            axios
              .get('http://localhost:3000/api/profile/simpleProfile', {
                params: { selectedUserId: room.user_two, personalId: 'b' },
              })
              .then(({ data }) => data)
              .catch((error) => console.error('Error fetching rooms')),
          );
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
        senderId: 'b', // replace with current user id
        body: newMessage,
      })
      .then(({ data }) => {
        // const newMessageData = response.data;
        console.log('MESSAGES', messages);
        console.log('DATAAAA', data);

        setMessages([...messages, data]);
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return sellerId ? (
    <View>
      <Text>Seller ID: {sellerId}</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>{'<'}</Text>
      </TouchableOpacity>

      {users.map((user) => (
        <TouchableOpacity key={user[0].uid} onPress={() => handleUserClick(user[0].room_id)} style={styles.userContainer}>
          <Image source={{ uri: user[0].profile_picture }} style={styles.profilePicture} />
          <Text style={styles.username}>{user[0].username}</Text>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButtonModal}>
              <Text style={styles.closeButtonTextModal}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{users.length > 0 && users[0][0].username}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.messageContainer}>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageBubble,
                  {
                    backgroundColor: message.sender_user_id === 'b' ? '#4CAF50' : '#808080',
                    alignSelf: message.sender_user_id === 'b' ? 'flex-end' : 'flex-start',
                  },
                ]}
              >
                <Text style={styles.messageText}>{message.body}</Text>
              </View>
            ))}
          </ScrollView>

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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 10,
  },
  username: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 14,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
  closeButtonModal: {
    padding: 10,
  },
  closeButtonTextModal: {
    fontSize: 18,
    color: 'black',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  messageContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '80%',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
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

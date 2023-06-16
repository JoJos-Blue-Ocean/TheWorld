import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, TextInput, Button, Modal, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import UserContext from '../UserContext';

export default function Messages({ route }) {
  const [uid, setUid] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [otherUserInfo, setOtherUserInfo] = useState(null);

  useEffect(() => {
    if (route.params?.user) {
      // Navigated from NewMessage component
      const { user, roomId } = route.params;
      setOtherUserInfo(user);
      fetchRooms();
      fetchMessages(roomId);
      setModalVisible(true);
    } else {
      // Navigated from Messages component directly
      fetchRooms();
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRooms();
      console.log('im in here');
      if (otherUserInfo && otherUserInfo.room_id) {
        fetchMessages(otherUserInfo.room_id);
      }
    }, 500);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [route, otherUserInfo, modalVisible]);

  const fetchRooms = () => {
    axios
      .get('http://localhost:3000/api/messages/rooms', {
        params: { userId: uid },
      })
      .then((response) => {
        setRooms(response.data);
        const temp = [];
        response.data.forEach((room) => {
          const selectedUserId = room.user_one !== uid ? room.user_one : room.user_two;
          temp.push(
            axios
              .get('http://localhost:3000/api/profile/simpleProfile', {
                params: { selectedUserId, personalId: uid },
              })
              .then(({ data }) => data[0])
              .catch((error) => console.error('Error fetching user info:', error)),
          );
        });
        Promise.all(temp).then((results) => {
          setUsers(results);
        });
      })
      .catch((error) => console.error('Error fetching rooms:', error));
  };

  const fetchMessages = (roomId) => {
    axios
      .get('http://localhost:3000/api/messages/', {
        params: { roomId },
      })
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((error) => console.error('Error fetching messages:', error));
  };

  const handleUserClick = (roomId) => {
    const selectedUser = users.find((user) => user.room_id === roomId);
    setOtherUserInfo(selectedUser);
    fetchMessages(roomId);
    setModalVisible(true);
  };

  const handleSendMessage = (roomId) => {
    axios
      .post('http://localhost:3000/api/messages', {
        roomId,
        senderId: uid,
        body: newMessage,
      })
      .then(({ data }) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <View style={styles.container}>
      {/* Render the list of users */}
      {users.map((user) => (
        <TouchableOpacity
          key={user.uid}
          onPress={() => handleUserClick(user.room_id)}
          style={styles.userContainer}
        >
          <Image source={{ uri: user.profile_picture }} style={styles.profilePicture} />
          <Text style={styles.username}>{user.username}</Text>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButtonModal}>
              <Text style={styles.closeButtonTextModal}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{otherUserInfo && otherUserInfo.username}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.messageContainer}>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageBubble,
                  {
                    backgroundColor: message.sender_user_id === uid ? '#0099ff' : '#808080',
                    alignSelf: message.sender_user_id === uid ? 'flex-end' : 'flex-start',
                  },
                ]}
              >
                <Text style={styles.messageText}>{message.body}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              value={newMessage}
              onChangeText={(text) => setNewMessage(text)}
              placeholder="Type your message"
              style={styles.input}
            />
            <TouchableOpacity onPress={() => handleSendMessage(messages[0].room_id)} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
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
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

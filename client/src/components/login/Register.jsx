import axios from 'axios';
import React, { useState } from 'react';
import {
  Text, View, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import NavigationPane from '../NavigationPane';
import logo from '../../../../assets/vinyl_logo.png';

export default function Login({ route }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        console.log('Signed up with', user);
        const newUser = {
          email: user.email,
          username,
          uid: user.uid,
        };
        console.log('NEW USER OBJ:', newUser);
        // console.log(`${process.env.API_URL}/api/register`);
        axios.post('http://localhost:3000/api/register', newUser)
          .then(() => {
            alert('You have been registered!');
            navigation.navigate('Login');
          });
      })
      .catch((err) => alert(err.message));
  };

  const switchToLogin = () => {
    navigation.navigate('Login');
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Image source={logo} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => { handleSignUp(); }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => switchToLogin()}
          style={[styles.button, styles.buttonOutline]}
        >

          <Text style={styles.buttonOutlineText}>Sign In</Text>
        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizintal: 15,
    paddingVertical: 10,
    borderRadius: 11,
    marginTop: 15,
    borderWidth: 3,
    borderColor: '#333333',
    padding: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button: {
    backgroundColor: '#800000',
    width: '100%',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: '#800000',
    borderWidth: 2,
  },
  buttonOutline: {
    backgroundColor: '#C0C0C0',
    // marginTop: 30,
    borderColor: '#800000',
    borderWidth: 1,
  },
  buttonText: {
    color: '#C0C0C0',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#800000',
    fontWeight: '700',
    fontSize: 16,
  },
  text: {
    marginTop: 30,
  },
});

import React, { useState } from 'react';
import {
  Text, View, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import NavigationPane from '../NavigationPane';

export default function Login({ route }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Signed up with', user);
      })
      .catch(err => alert(err.message))
  };

  const handleLogIn = () => {
    console.log(auth);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        //need to add axios post to add user to database
        navigation.navigate('RecordCatalog', { email: user.email });
        console.log('Logged In with', user);
      })
      .catch(err => alert(err.message))
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Text>This is the login main page</Text>
      <View style={styles.inputContainer}>
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
          onPress={() => { handleLogIn(); }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSignUp()}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
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
    marginTop: 30,
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
});

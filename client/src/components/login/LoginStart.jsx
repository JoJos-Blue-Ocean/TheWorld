import React, { useState } from 'react';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import NavigationPane from '../NavigationPane';

export default function Login( { route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (

    <View>
      <Text>This is the login main page</Text>
      <TextInput
        placeholder="Email"
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
      />
      <Button title="Sign In" onPress={() => {}} />
    </View>

  );
}

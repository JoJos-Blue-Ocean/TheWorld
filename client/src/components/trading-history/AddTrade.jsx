import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable, TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tradingAlbum: {
    position: 'absolute',
    top: '5%',
    left: '3%',
    fontSize: 20,
  },
  addTradingAlbumButton: {
    position: 'absolute',
    top: '10%',
    height: '12%',
    width: '25%',
    left: '3%',
    backgroundColor: 'white',
  },
  desiredAlbum: {
    position: 'absolute',
    top: '27%',
    left: '3%',
    fontSize: 20,
  },
  addDesiredAlbumButton: {
    position: 'absolute',
    top: '32%',
    height: '12%',
    width: '25%',
    left: '3%',
    backgroundColor: 'white',
  },
  descriptionPrompt: {
    fontSize: 20,
    top: '50%',
    textAlign: 'center',
  },
  descriptionBox: {
    position: 'absolute',
    top: '55%',
    width: '80%',
    left: '10%',
    height: '20%',
    backgroundColor: 'white',
  },
  submitButton: {
    top: '75%',
    width: '30%',
    left: '35%',
    backgroundColor: 'grey',
    height: '6%',
  },
  confirm: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
});

export default function AddTrade() {

    return(

      <View style={styles.container}>
        <Text style={styles.tradingAlbum}>Trading Album</Text>
        <Pressable style={styles.addTradingAlbumButton}>
          <Text>+</Text>
        </Pressable>
        <Text style={styles.desiredAlbum}>Desired Album</Text>
        <Pressable style={styles.addDesiredAlbumButton}>
          <Text>
            +
          </Text>
        </Pressable>
        <Text style={styles.descriptionPrompt}>Description</Text>
        <TextInput style={styles.descriptionBox} />
      <Pressable style={styles.submitButton}>
        <Text style={styles.confirm}>
          Confirm
        </Text>
      </Pressable>
      </View>
    );
};
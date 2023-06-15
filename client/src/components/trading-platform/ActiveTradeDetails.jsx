import axios from 'axios';
import React from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, ScrollView, Button, Alert, TextInput, Pressable,
} from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/core';
import UserContext from '../UserContext';
const { useState, useEffect, useContext } = React;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  albumNameInHeader: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sellerSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    padding: 10,
  },
  sellerIcon: {
    borderRadius: 50,
    height: 50,
    width: 50,
    marginRight: 5,
    borderWidth: 2,
    borderColor: '#333333',
  },
  detailsSection: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  albumThumbnail: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: '#333333',
    marginRight: 5,
  },
  buttonSection: {
    padding: 20,
    paddingBottom: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#A30000',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  textInput: {
    borderWidth: 1,
  },
});

export default function ActiveTradeDetails({ route }) {
  const { trade, master, wantMaster } = route.params;
  const [uid, setUid] = useContext(UserContext);
  const navigation = useNavigation();

  const handleSendMessage = () => {
    axios
      .get('http://localhost:3000/api/messages/checkRoom', {
        params: {
          userId: uid,
          sellerId: trade.seller_id,
        },
      })
      .then(({ data }) => {
        if (data.length) {
          axios
            .get('http://localhost:3000/api/profile/getSingleUser', {
              params: {
                userId: trade.seller_id,
              },
            })
            .then((results) => {
              navigation.navigate('Messages', { user: results.data });
            });
        } else {
          navigation.navigate('NewMessage', { userId: trade.seller_id });
        }
      });
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image
            style={styles.headerImage}
            source={{ uri: master.images[0].uri }}
          />
          <Text style={styles.albumNameInHeader}>
            {`${master.artists[0].name} - ${master.title}`}
          </Text>
        </View>
        <View style={styles.sellerSection}>
          <Image
            style={styles.sellerIcon}
            source={{ uri: trade.profile_picture }}
          />
          <View>
            <Text>{`Owner: ${trade.username}`}</Text>
            <Text>
              {`Rating: ${trade.average_rating.slice(0, 4)} (${trade.ratings_count} ratings)`}
            </Text>
          </View>
        </View>
        <View style={styles.detailsSection}>
          <Text style={styles.heading}>Description</Text>
          <Text>{trade.description ? trade.description : 'N/A'}</Text>
        </View>
        <View style={styles.detailsSection}>
          <Text style={styles.heading}>Want</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={styles.albumThumbnail}
              source={{ uri: wantMaster.images[0].uri }}
            />
            <View>
              <Text>{wantMaster.title}</Text>
              <Text>{wantMaster.artists[0].name}</Text>
              <Text>{wantMaster.year}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonSection}>
          <Button
            title="Send Message"
            onPress={handleSendMessage}
            color="#A30000"
          />
        </View>
      </ScrollView>
    </View>
  );
}

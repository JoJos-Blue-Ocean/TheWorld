import axios from 'axios';
import React from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, ScrollView, Button, Alert, TextInput, Pressable, TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/core';
import { Rating } from 'react-native-ratings';
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
    borderBottomWidth: 1,
    borderColor: 'black',
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
  sellerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
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
  messageButton: {
    marginTop: 20,
    color: 'white',
    backgroundColor: '#800000',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    alignSelf: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
  },
  starRatings: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
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
        <Pressable style={styles.sellerSection} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.heading}>Owner Information</Text>
          <View style={styles.sellerDetails}>
            <Image
              style={styles.sellerIcon}
              source={{ uri: trade.profile_picture }}
            />
            <View>
              <Text>{trade.username}</Text>
              <View style={styles.starRatings}>
                <Rating
                  type="custom"
                  defaultRating={trade.average_rating}
                  readonly
                  imageSize={20}
                  fractions={2}
                  tintColor="#f5f5f5"
                  ratingBackgroundColor="#c0c0c0"
                />
                <Text>{`${trade.average_rating.slice(0, 4)} (${trade.ratings_count} ratings)`}</Text>
              </View>
            </View>
          </View>
        </Pressable>
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
        <View style={styles.messageButton}>
          <TouchableOpacity
            onPress={handleSendMessage}
            color="#A30000"
          >
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

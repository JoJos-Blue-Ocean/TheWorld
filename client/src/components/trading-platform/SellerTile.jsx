import axios from 'axios';
import React from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Rating } from 'react-native-ratings';
import { Entypo } from '@expo/vector-icons';

const { useState, useEffect } = React;

const styles = StyleSheet.create({
  tileContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 100,
    borderBottomWidth: 1,
    padding: 5,
  },
  profilePicture: {
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#333333',
    marginRight: 5,
  },
  username: {
    fontWeight: 'bold',
  },
  leftSection: {
    flexDirection: 'column',
    width: 50,
    marginRight: 10,
  },
  topRow: {
    flexDirection: 'row',
  },
  bottomRow: {

  },
  openDetails: {
    justifyContent: 'center',
    height: '100%',
    width: '10%',
  },
  starRatings: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  rightSection: {
    width: '75%',
  },
});

export default function SellerTile({ trade, master }) {
  const [wantMaster, setWantMaster] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/record-catalog/individualAlbum', {
        params: {
          id: trade.want_album_id,
        },
      })
      .then(({ data }) => {
        setWantMaster(data);
      })
      .catch((err) => console.error('OH NO: ', err));
  }, []);

  return (
    <View style={styles.tileContainer}>
      <View style={styles.leftSection}>
        <Image
          style={styles.profilePicture}
          source={{ uri: trade.profile_picture }}
        />
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.username}>{trade.username}</Text>
        <View>
          <View style={styles.starRatings}>
            <Rating
              type="custom"
              startingValue={trade.average_rating ? trade.average_rating : 0}
              readonly
              imageSize={20}
              fractions={2}
              tintColor="#F5F5F5"
              ratingBackgroundColor="#C0C0C0"
            />
            <Text>{`${trade.average_rating ? trade.average_rating.slice(0, 4) : '0'} (${trade.ratings_count} ratings)`}</Text>
          </View>
        </View>
        <Text numberOfLines={2}>{trade.description ? trade.description : 'N/A'}</Text>
      </View>

      <View style={styles.openDetails}>
        {
          wantMaster
            ? (
              <Pressable onPress={() => navigation.navigate('ActiveTradeDetails', { trade, master, wantMaster })}>
                <Entypo name="chevron-right" size={24} color="black" />
              </Pressable>
            ) : null
        }
      </View>
    </View>
  );
}

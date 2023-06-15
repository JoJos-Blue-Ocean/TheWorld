import axios from 'axios';
import React from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Constants from 'expo-constants';
import StarRating from '../StarRating';

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
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#333333',
    marginRight: 5,
  },
  username: {
    fontWeight: 'bold',
  },
  leftSection: {
    flexDirection: 'column',
    width: '90%',
  },
  topRow: {
    flexDirection: 'row',
  },
  bottomRow: {

  },
  rightSection: {
    justifyContent: 'center',
    height: '100%',
    width: '10%',
  },
});

export default function SellerTile({ trade, master }) {
  const [wantMaster, setWantMaster] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`https://api.discogs.com/masters/${trade.want_album_id}`, {
        params: {
          key: Constants.expoConfig.extra.discogsKey,
          secret: Constants.expoConfig.extra.discogsSecret,
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
        <View style={styles.topRow}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.profilePicture}
              source={{ uri: trade.profile_picture }}
            />
          </View>
          <View>
            <Text style={styles.username}>{trade.username}</Text>
            <StarRating rating={trade.average_rating} />
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Text>{`${trade.description.slice(0, 90)}...`}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        {
          wantMaster
            ? (
              <Button
                title=">"
                onPress={() => navigation.navigate('ActiveTradeDetails', { trade, master, wantMaster })}
              />
            )
            : null
        }
      </View>
    </View>
  );
}

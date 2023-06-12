import React from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

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

export default function SellerTile({ trade, albumDetails }) {
  const navigation = useNavigation();

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
            <Text>{`Rating: ${Number(trade.average_rating).toFixed(2)}`}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Text>{`${trade.description.slice(0, 90)}...`}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Button
          title="D"
          onPress={() => navigation.navigate('ActiveTradeDetails', { trade, albumDetails })}
        />
      </View>
    </View>
  );
}

import axios from 'axios';
import React from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, ScrollView, Button, Alert,
} from 'react-native';
import Constants from 'expo-constants';

const { useState, useEffect } = React;

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
});

export default function ActiveTradeDetails({ route }) {
  const { trade, master, wantMaster } = route.params;

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
            title="Make offer"
            onPress={() => Alert.alert('Button pressed')}
            color="#A30000"
          />
        </View>
      </ScrollView>
    </View>
  );
}

import React, { useState, useContext } from 'react';
import {
  StyleSheet, Text, View, Image, Pressable, TextInput, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { Rating } from 'react-native-ratings';
import UserList from './UserList';
import UserContext from '../UserContext';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  title: {
    top: '5%',
    textAlign: 'center',
    fontSize: 20,
  },
  sellingAlbumImage: {
    position: 'absolute',
    height: '12%',
    width: '30%',
    top: '12%',
    left: '5%',
  },
  sellingAlbumSongName: {
    position: 'absolute',
    top: '15%',
    left: '40%',
  },
  sellingAlbumArtist: {
    position: 'absolute',
    top: '20%',
    left: '40%',
  },
  desiredAlbumImage: {
    position: 'absolute',
    height: '12%',
    width: '30%',
    top: '35%',
    left: '5%',
  },
  desiredAlbumSongName: {
    position: 'absolute',
    top: '37%',
    left: '40%',
  },
  desiredAlbumArtist: {
    position: 'absolute',
    top: '42%',
    left: '40%',
  },
  selectTrader: {
    top: '50%',
    textAlign: 'center',
    fontSize: 14,
  },
  traderSearchBar: {
    height: 30,
    width: '80%',
    left: '10%',
    borderWidth: 1,
    padding: 5,
  },
  rateTrader: {
    top: '69%',
    textAlign: 'center',
    fontSize: 14,
  },
  completeButton: {
    position: 'absolute',
    bottom: '10%',
    height: '5%',
    width: '50%',
    left: '25%',
    borderRadius: 8,
    backgroundColor: '#800000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
  },
  starsContainer: {
    position: 'absolute',
    height: '5%',
    width: '22%',
    left: '32%',
    top: '76%',
    flexDirection: 'row',
  },
  forContainer: {
    position: 'absolute',
    width: '30%',
    left: '25%',
    top: '29%',
  },
  for: {
    textAlign: 'center',
    fontSize: 18,
  },
  scroll: {
    flex: 1,
  },
  components: {
    height: 1000,
  },
  userSearchContainer: {
    width: '100%',
    position: 'absolute',
    top: '55%',
    zIndex: 1,
  },
  buyerDetails: {
    position: 'absolute',
    top: '59%',
    height: '14%',
    width: '60%',
    left: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyerImage: {
    position: 'relative',
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

export default function CompleteTradeForm({ route }) {
  const navigation = useNavigation();
  const [searchLength, setSearchLength] = useState(0);
  const [search, setSearch] = useState('');
  const [currentRating, setCurrentRating] = useState(3);
  const [uid, setUid] = useContext(UserContext);
  const [buyerId, setBuyerId] = useState('');
  const [buyerImage, setBuyerImage] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerSelected, setBuyerSelected] = useState(false);

  const ratingCompleted = (rating) => {
    setCurrentRating(rating);
  };

  const {
    sellingAlbumImage,
    sellingAlbumSongName,
    sellingAlbumArtist,
    desiredAlbumImage,
    desiredAlbumSongName,
    desiredAlbumArtist,
    tradeId,
  } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.components}>
          <Text style={styles.title}>Complete Trade?</Text>
          <Image source={{ uri: sellingAlbumImage }} style={styles.sellingAlbumImage} />
          <Text style={styles.sellingAlbumSongName}>{sellingAlbumSongName}</Text>
          <Text style={styles.sellingAlbumArtist}>{sellingAlbumArtist}</Text>
          <View style={styles.forContainer}>
            <Text style={styles.for}>Trading For</Text>
          </View>
          <Image source={{ uri: desiredAlbumImage }} style={styles.desiredAlbumImage} />
          <Text style={styles.desiredAlbumSongName}>{desiredAlbumSongName}</Text>
          <Text style={styles.desiredAlbumArtist}>{desiredAlbumArtist}</Text>
          <Text style={styles.selectTrader}>Who did you trade with?</Text>
          <View style={styles.userSearchContainer}>
            <TextInput
              style={styles.traderSearchBar}
              onChangeText={(e) => {
                setSearch(e);
                setSearchLength(e.length);
              }}
            />
            {(searchLength > 0) && (
            <UserList
              search={search}
              setSearch={(e) => { setSearch(e); }}
              setBuyerId={(e) => { setBuyerId(e); }}
              setBuyerName={(e) => { setBuyerName(e); }}
              setBuyerImage={(e) => { setBuyerImage(e); }}
              setBuyerSelected={(e) => { setBuyerSelected(e); }}
              setSearchLength={(e) => { setSearchLength(e); }}
            />
            )}
          </View>
          {buyerSelected && (
          <View style={styles.buyerDetails}>
            <Image source={{ uri: buyerImage }} style={styles.buyerImage} />
            <Text>{buyerName}</Text>
          </View>
          )}
          <Text style={styles.rateTrader}>Please Give This Person a Rating</Text>
          <View style={styles.starsContainer}>
            <Rating
              type="custom"
              startingValue={3}
              imageSize={35}
              tintColor="#F5F5F5"
              ratingBackgroundColor="#C0C0C0"
              onFinishRating={ratingCompleted}
            />
          </View>
          <Pressable
            style={styles.completeButton}
            onPress={() => {
              async function fetch() {
                try {
                  const response = await axios.put('http://localhost:3000/api/trade-history/complete-trade', {
                    id: tradeId,
                    buyer_id: buyerId,
                  });
                  return response;
                } catch (error) {
                  console.error(error);
                }
                try {
                  const response = await axios.post('http://localhost:3000/api/trade-history/add-rating', {
                    sender_id: uid,
                    recipient_id: buyerId,
                    trade_id: tradeId,
                    rating: currentRating,
                  });
                  return response;
                } catch (error) {
                  console.error(error);
                }
              }
              fetch()
                .then(() => {
                  navigation.navigate('TradingHistory');
                });
            }}
          >
            <Text style={styles.completeButtonText}>
              Complete
            </Text>
          </Pressable>

        </View>
      </ScrollView>
    </View>
  );
}

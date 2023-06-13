import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import MakeListingTrade from './MakeListingTrade';
import adaptiveIcon from '../../../../assets/favicon.png';

export default function YourListing() {
  const exampleTrades = [{
    id: 1,
    sellingAlbumImage: adaptiveIcon,
    sellingAlbumSongName: 'Song Name',
    sellingAlbumArtist: 'Artist',
    desiredAlbumImage: adaptiveIcon,
    desiredAlbumSongName: 'Song Name',
    desiredAlbumArtist: 'Artist',
    date: 'Sun Jun 11',
    status: 'open',
  },
  {
    id: 2,
    sellingAlbumImage: adaptiveIcon,
    sellingAlbumSongName: 'Song Name',
    sellingAlbumArtist: 'Artist',
    desiredAlbumImage: adaptiveIcon,
    desiredAlbumSongName: 'Song Name',
    desiredAlbumArtist: 'Artist',
    date: 'Sun Jun 11',
    status: 'open',
  },
  {
    id: 3,
    sellingAlbumImage: adaptiveIcon,
    sellingAlbumSongName: 'Song Name',
    sellingAlbumArtist: 'Artist',
    desiredAlbumImage: adaptiveIcon,
    desiredAlbumSongName: 'Song Name',
    desiredAlbumArtist: 'Artist',
    date: 'Sun Jun 11',
    status: 'open',
  },
  {
    id: 4,
    sellingAlbumImage: adaptiveIcon,
    sellingAlbumSongName: 'Song Name',
    sellingAlbumArtist: 'Artist',
    desiredAlbumImage: adaptiveIcon,
    desiredAlbumSongName: 'Song Name',
    desiredAlbumArtist: 'Artist',
    date: 'Sun Jun 11',
    status: 'open',
  },
  {
    id: 5,
    sellingAlbumImage: adaptiveIcon,
    sellingAlbumSongName: 'Song Name',
    sellingAlbumArtist: 'Artist',
    desiredAlbumImage: adaptiveIcon,
    desiredAlbumSongName: 'Song Name',
    desiredAlbumArtist: 'Artist',
    date: 'Sun Jun 11',
    status: 'open',
  },
  {
    id: 6,
    sellingAlbumImage: adaptiveIcon,
    sellingAlbumSongName: 'Song Name',
    sellingAlbumArtist: 'Artist',
    desiredAlbumImage: adaptiveIcon,
    desiredAlbumSongName: 'Song Name',
    desiredAlbumArtist: 'Artist',
    date: 'Sun Jun 11',
    status: 'open',
  },
  ];

  return (
    <View style={styles.trades} contentContainerStyle={styles.contentContainer}>
      <ScrollView>
        {
          exampleTrades.map((trade) => (
            <MakeListingTrade
              key={trade.id}
              id={trade.id}
              sellingAlbumImage={trade.sellingAlbumImage}
              sellingAlbumSongName={trade.sellingAlbumSongName}
              sellingAlbumArtist={trade.sellingAlbumArtist}
              desiredAlbumImage={trade.desiredAlbumImage}
              desiredAlbumSongName={trade.desiredAlbumSongName}
              desiredAlbumArtist={trade.desiredAlbumArtist}
              date={trade.date}
              status={trade.status}
            />
          ))
        }

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  trades: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  scroll: {
    flex: 1,
  },
});

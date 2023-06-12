import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  ];

  return (
    <View style={styles.trades}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  trades: {
    position: 'absolute',
    height: '80%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'grey',
  },
});

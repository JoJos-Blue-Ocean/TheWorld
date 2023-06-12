import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import MakeCompleteTrade from './MakeCompleteTrade';
import adaptiveIcon from '../../../../assets/favicon.png';
import bob from '../../../../assets/bob.png';

export default function TransactionHistory() {
  const exampleTrades = [{
    id: 1,
    sellingAlbumImage: adaptiveIcon,
    sellingAlbumSongName: 'Song Name',
    sellingAlbumArtist: 'Artist',
    desiredAlbumImage: adaptiveIcon,
    desiredAlbumSongName: 'Song Name',
    desiredAlbumArtist: 'Artist',
    date: 'Sun Jun 11',
    status: 'Complete',
    buyerName: 'Kono Dio Da',
    buyerImage: bob,
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
    status: 'Complete',
    buyerName: 'Giorno Giovanna',
    buyerImage: bob,
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
    status: 'Complete',
    buyerName: 'Kono Dio Da',
    buyerImage: bob,
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
    status: 'Complete',
    buyerName: 'Giorno Giovanna',
    buyerImage: bob,
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
    status: 'Complete',
    buyerName: 'Kono Dio Da',
    buyerImage: bob,
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
    status: 'Complete',
    buyerName: 'Giorno Giovanna',
    buyerImage: bob,
  },
  ];

  return (
    <View style={styles.trades}>
      <ScrollView>
        {
          exampleTrades.map((trade) => (
            <MakeCompleteTrade
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
              buyerName={trade.buyerName}
              buyerImage={trade.buyerImage}
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
    backgroundColor: 'grey',
  },
  scroll: {
    flex: 1,
  },
});

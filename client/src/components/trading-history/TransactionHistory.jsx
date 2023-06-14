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

export default function TransactionHistory({ list, userId }) {
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
          list.map((trade) => (
            <MakeCompleteTrade
              key={trade.id}
              id={trade.id}
              sellingAlbumImage={exampleTrades[0].sellingAlbumImage}
              sellingAlbumSongName={exampleTrades[0].sellingAlbumSongName}
              sellingAlbumArtist={exampleTrades[0].sellingAlbumArtist}
              desiredAlbumImage={exampleTrades[0].desiredAlbumImage}
              desiredAlbumSongName={exampleTrades[0].desiredAlbumSongName}
              desiredAlbumArtist={exampleTrades[0].desiredAlbumArtist}
              date={trade.created_at}
              status={trade.status}
              buyerName={trade.username}
              buyerImage={trade.profile_picture}
              tradingAlbumId={trade.have_album_id}
              desiredAlbumId={trade.want_album_id}
              userId={userId}
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

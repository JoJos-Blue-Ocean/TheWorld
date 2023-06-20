import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import MakeCompleteTrade from './MakeCompleteTrade';

export default function TransactionHistory({ list, userId }) {
  return (
    <View style={styles.trades}>
      <ScrollView>
        {
          list.map((trade) => (
            <MakeCompleteTrade
              key={trade.id}
              id={trade.id}
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

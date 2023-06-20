import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import MakeListingTrade from './MakeListingTrade';

export default function YourListing({ list, userId, refresh, setRefresh }) {
  return (
    <View style={styles.trades}>
      <ScrollView>
        {
          list.map((trade) => (
            <MakeListingTrade
              key={trade.id}
              id={trade.id}
              date={trade.created_at}
              status={trade.status}
              tradingAlbumId={trade.have_album_id}
              desiredAlbumId={trade.want_album_id}
              userId={userId}
              refresh={refresh}
              setRefresh={setRefresh}
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

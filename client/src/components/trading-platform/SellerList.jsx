import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
} from 'react-native';
import SellerTile from './SellerTile';

export default function SellerList({ openTrades, master }) {
  console.log('LIST OF TRADES', openTrades.length);
  return (
    <View>
      {openTrades.map(
        (trade) => <SellerTile key={trade.id} trade={trade} master={master} />,
      )}
    </View>
  );
}

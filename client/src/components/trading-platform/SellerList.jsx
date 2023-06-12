import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
} from 'react-native';
import SellerTile from './SellerTile';

export default function SellerList({ openTrades }) {
  return (
    <View>
      {openTrades.map((trade) => <SellerTile key={trade.id} trade={trade} />)}
      {openTrades.map((trade) => <SellerTile key={trade.id} trade={trade} />)}
    </View>
  );
}

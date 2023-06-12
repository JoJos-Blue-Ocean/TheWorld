import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
} from 'react-native';
import SellerTile from './SellerTile';

export default function SellerList({ openTrades, albumDetails }) {
  return (
    <View>
      {openTrades.map((trade) => <SellerTile key={trade.id} trade={trade} albumDetails={albumDetails} />)}
      {/* Have 2 maps just to test scrolling */}
      {openTrades.map((trade) => <SellerTile key={trade.id} trade={trade} albumDetails={albumDetails} />)}
    </View>
  );
}

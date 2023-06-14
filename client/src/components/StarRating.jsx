import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';

// Import the local image assets
import starUnfilled from '../../../assets/icons/star_unfilled.png';
import starOneQuarter from '../../../assets/icons/star-one-quarter.png';
import starHalf from '../../../assets/icons/star-half.png';
import starThreeQuarter from '../../../assets/icons/star-three-quarter.png';
import starFilled from '../../../assets/icons/star.png';

const styles = StyleSheet.create({
  productInformationReviews: {
    color: 'var(--font-color)',
    marginBottom: 10,
  },
  productInformationReviews0: {
    top: 2,
    left: 1,
    height: 12,
    width: 12,
    resizeMode: 'contain',
  },
  productInformationReviews1: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  productInformationReviews2: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  productInformationReviews3: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  productInformationReviews4: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
});

export default function StarRating({ rating }) {
  const stars = [];
  let i = rating;
  for (; i >= 1; i -= 1) {
    stars.push(<Image source={starFilled} title="filled star" style={styles.productInformationReviews4} key={`${i} filled`} />);
  }
  if (i > 0 && i < 0.25) {
    stars.push(<Image source={starOneQuarter} title="one quarter star" style={styles.productInformationReviews1} key={i} />);
  }
  if (i >= 0.25 && i < 0.75) {
    stars.push(<Image source={starHalf} title="half star" style={styles.productInformationReviews2} key={i} />);
  }
  if (i >= 0.75 && i < 1) {
    stars.push(<Image source={starThreeQuarter} title="three quarter star" style={styles.productInformationReviews3} key={i} />);
  }
  for (let j = 5 - rating; j >= 1; j -= 1) {
    stars.push(<Image source={starUnfilled} title="unfilled star" style={styles.productInformationReviews0} key={`${j} unfilled`} />);
  }
  return stars;
}
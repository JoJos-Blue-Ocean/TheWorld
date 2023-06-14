import React from 'react';
import {
  StyleSheet, Text,
} from 'react-native';

const styles = StyleSheet.create({
  productInformationReviews: {
    color: 'var(--font-color)',
    marginBottom: '10px',
  },
  productInformationReviews0: {
    background: 'url("../../../dist/assets/icons/star_unfilled.png") 0 0 / 16px no-repeat',
    height: 16,
    width: 16,
    display: 'inline-block',
  },
  productInformationReviews1: {
    background: 'url("../../../dist/assets/icons/star-one-quarter.png") 0 0 / 16px no-repeat',
    height: 16,
    width: 16,
    display: 'inline-block',
  },
  productInformationReviews2: {
    background: 'url("../../../dist/assets/icons/star-half.png") 0 0 / 16px no-repeat',
    height: 16,
    width: 16,
    display: 'inline-block',
  },
  productInformationReviews3: {
    background: 'url("../../../dist/assets/icons/star-three-quarter.png") 0 0 / 16px no-repeat',
    height: 16,
    width: 16,
    display: 'inline-block',
  },
  productInformationReviews4: {
    background: 'url("../../../dist/assets/icons/star.png") 0 0 / 16px no-repeat',
    height: 16,
    width: 16,
    display: 'inline-block',
  },
});

export default function StarRating({ rating }) {
  const stars = [];
  let i = rating;
  for (; i >= 1; i -= 1) {
    stars.push(<Text title="filled star" style={styles.productInformationReviews4} key={`${i} filled`} />);
  }
  if (i > 0 && i < 0.25) {
    stars.push(<Text title="one quarter star" style={styles.productInformationReviews1} key={i} />);
  }
  if (i >= 0.25 && i < 0.75) {
    stars.push(<Text title="half star" style={styles.productInformationReviews2} key={i} />);
  }
  if (i >= 0.75 && i < 1) {
    stars.push(<Text title="three quarter star" style={styles.productInformationReviews3} key={i} />);
  }
  for (let j = (5 - rating); j >= 1; j -= 1) {
    stars.push(<Text title="unfilled star" style={styles.productInformationReviews0} key={`${j} unfilled`} />);
  }
  return stars;
}

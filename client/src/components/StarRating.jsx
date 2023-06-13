import React from 'react';
import {
  Text,
} from 'react-native';

export default function StarRating({ rating }) {
  const stars = [];
  let i = rating;
  for (; i >= 1; i -= 1) {
    stars.push(<Text title="filled star" className="product-information__reviews--4" key={`${i} filled`} />);
  }
  if (i > 0 && i < 0.25) {
    stars.push(<Text title="one quarter star" className="product-information__reviews--1" key={i} />);
  }
  if (i >= 0.25 && i < 0.75) {
    stars.push(<Text title="half star" className="product-information__reviews--2" key={i} />);
  }
  if (i >= 0.75 && i < 1) {
    stars.push(<Text title="three quarter star" className="product-information__reviews--3" key={i} />);
  }
  for (let j = (5 - rating); j >= 1; j -= 1) {
    stars.push(<Text title="unfilled star" className="product-information__reviews--0" key={`${j} unfilled`} />);
  }
  return stars;
}

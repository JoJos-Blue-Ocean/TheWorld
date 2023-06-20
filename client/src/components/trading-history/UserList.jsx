import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import MakeUser from './MakeUser';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'white',
    height: '80%',
    width: '80%',
    left: '10%',
  },
  scroll: {
    flex: 1,
  },
});

export default function UserList({
  search,
  setSearch,
  setBuyerId,
  setSearchLength,
  setBuyerName,
  setBuyerImage,
  setBuyerSelected,
}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get('http://localhost:3000/api/trade-history/get-users', {
          params: {
            search,
          },
        });
        setList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [search]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {list.map((user) => (
          <MakeUser
            user={user}
            setBuyerId={setBuyerId}
            setSearch={setSearch}
            setSearchLength={setSearchLength}
            setBuyerName={setBuyerName}
            setBuyerImage={setBuyerImage}
            setBuyerSelected={setBuyerSelected}
          />
        ))}
      </ScrollView>
    </View>
  );
};
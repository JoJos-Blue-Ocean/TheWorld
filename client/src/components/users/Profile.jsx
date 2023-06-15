import {
  StyleSheet, Text, View, Image, Pressable, Modal,
  TextInput, Alert,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/core';
import UserContext from '../UserContext';
import NavigationPane from '../NavigationPane';

// TODO: implement route.user_uid in props

export default function Profile({route}) {
/*
  Condition render: If the User clicks on a different user, recieve the user_uid
  of said user in nav and render their stats
*/
  const [uid, setUid] = useContext(UserContext);
  const [curUser, setCurUser] = useState({});
  const [bioChange, setBio] = useState('');
  const [locationChange, setLocation] = useState('');
  const [pfpChange, setPfp] = useState('');
  const [loading, setLoading] = useState(true);
  const [foreign, setForeign] = useState(false);
  const [modalState, setModalState] = useState(false);

  const navigation = useNavigation({ route });

  const changeSettings = (changes) => {
    // Update uid
    console.log(changes);
    axios.put(`http://localhost:3000/api/profile/${uid}`, {
      user: {
        uid: uid,
        profile_picture: changes.pfpChange || curUser.profile_picture,
        biography: changes.bioChange || curUser.biography,
        location: changes.locationChange || curUser.location,
      },
    }).then((results) => {
      retrieveStats();
      setLocation('');
      setBio('');
      setPfp('');
      closeModal();
    })
      .catch((err) => console.error('ERROR: ', err));
  };

  const uploadImage = () => {

  };

  const checkForeign = () => {
    if (route.params) {
      route.params.uid === uid ? setForeign(false) : setForeign(true);
    }
  };

  const retrieveStats = () => {
  //  QUERY DATABASE FOR STATS
    axios.get(`http://localhost:3000/api/profile/${uid}`)
      .then((results) => {
        setCurUser(results.data[0]);
        setLoading(false);
      })
      .catch((err) => console.log('error: ', err));
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  useEffect(() => {
    // If other user's profile, retrieve their stats
    // else retrieve your stats
    retrieveStats();
    checkForeign();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View />
      ) : (
        <View style={styles.container}>
          <Modal
            visible={modalState}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <Pressable
                style={styles.cButton}
                onPress={() => closeModal()}
              >
                <Text style={{ fontSize: '20', fontWeight: 'bold' }}>Return</Text>
              </Pressable>
              <Text style={styles.modalHeader}>Settings</Text>
              <View style={styles.modalForms}>
                <Pressable
                  className="settings-picture"
                  onPress={() => {
                  // launchImageLibrary();
                  }}
                >
                  <Text style={styles.modalsubHeader}>Change Profile Picture</Text>
                  <View className="profile-picture" style={styles.modalprofile_picture}>
                    {curUser.profile_picture ? (
                      <Image
                        source={{ uri: curUser.profile_picture }}
                        style={styles.modalImg}
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        source={require('../../../../assets/bob.png')}
                        style={styles.modalImg}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.modalPfpBuddy}>
                      <Text style={styles.modalPfpBuddyTxt}>
                        +
                      </Text>
                    </View>
                  </View>
                </Pressable>
                <View className="settings-location">
                  <Text style={styles.modalsubHeader}>Change Location</Text>
                  <TextInput
                    style={styles.modalLocationInput}
                    maxLength={25}
                    placeholder={curUser.location}
                    onChangeText={(newText) => setLocation(newText)}
                  />
                  <Text style={{ fontSize: 15, marginLeft: '60%', color: '#757575' }}>Max 25 chars</Text>
                  <View className="settings-bio">
                    <Text style={styles.modalsubHeader}>Change Bio</Text>
                    <TextInput
                      className="bio-input"
                      style={styles.modalBioInput}
                      multiline
                      numberOfLines={4}
                      maxLength={350}
                      placeholder={curUser.biography}
                      onChangeText={(newText) => setBio(newText)}
                    />
                    <Text style={{ fontSize: 15, marginLeft: '60%', color: '#757575' }}>Max 150 chars</Text>
                  </View>
                  <Pressable
                    style={styles.confButton}
                    className="confirm-button"
                    onPress={() => { changeSettings({ bioChange, locationChange, pfpChange }); }}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          {
          !foreign ? (
            (
              <Pressable
                style={styles.sButton}
                onPress={() => openModal()}
              >
                <Text style={{ fontSize: '50', lineHeight: '29', fontWeight: 'bold' }}>...</Text>
              </Pressable>
            )) : (
              <View style={styles.sButton}>
                <Text style={{
                  fontSize: '50', lineHeight: '29', fontWeight: 'bold', color: '#F5F5F5',
                }}
                >
                  ...
                </Text>
              </View>
          )

        }

          <View className="pic-name" style={styles.picName}>
            <View className="profile-picture" style={styles.profile_picture}>
              {curUser.profile_picture ? (
                <Image
                  source={{ uri: curUser.profile_picture }}
                  style={styles.modalImg}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require('../../../../assets/bob.png')}
                  style={styles.modalImg}
                  resizeMode="cover"
                />
              )}
            </View>
            <View className="info" style={styles.info}>
              <Text className="name" style={styles.name}>{curUser.username}</Text>
              <Text className="location" style={styles.location}>{curUser.location}</Text>
            </View>
          </View>
          <View className="stats-col" style={styles.statsBox}>
            <View className="profile-stats" style={styles.stats}>
              <Text style={styles.statsMeta}>
                {curUser.reviews}
                {' '}
                {'\n'}
                Reviews
                {'\n'}
              </Text>
              <Text style={styles.statsMeta}>
                {Math.trunc(curUser.average_rating * 100) / 100}
                {' '}
                {'\n'}
                Rating
                {'\n'}
              </Text>
              <Text style={styles.statsMeta}>
                {curUser.trades}
                {' '}
                {'\n'}
                Trades
              </Text>
            </View>
          </View>
          {
          foreign ? (
            (
              <Pressable
            style={styles.mButton}
            className="message-button"
            onPress={() => navigation.navigate('Messages', { user: {uid: curUser.uid, username: curUser.username, profile_picture: curUser.profile_picture} })}
          >
            <Text style={styles.buttonText}>Message</Text>
          </Pressable>
            )) : (
              <View />
          )

        }

          <View className="bio" style={styles.bio}>
            <Text style={styles.bioText}>
              {curUser.biography}
            </Text>
          </View>
          <Pressable
            style={styles.wButton}
            className="message-button"
          // WILL CHANGE WHEN QUERIES ARE CREATED, CHANGE curUser.ID TO CORRECT BODY REFERENCE
            onPress={() => navigation.navigate('WishList', { uid: uid })}
          >
            <Text style={styles.buttonText}>Wishlist</Text>
          </Pressable>
        </View>
      ) }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  picName: {
    width: '66%',
    alignItems: 'center',
  },
  statsBox: {
    width: '33%',
  },
  img: {
    borderWidth: 4,
    borderRadius: 100,
    width: 125,
    height: 125,
    alignItems: 'center',
    marginTop: '12%',
  },
  stats: {
    width: '50%',
    marginTop: '11%',
    marginLeft: '2%',
    marginRight: '11%',
  },
  statsMeta: {
    lineHeight: 18,
    textAlign: 'left',
    fontSize: 17,
  },
  info: {
    alignItems: 'center',
  },
  bio: {
    width: '90%',
    height: '28%',
    marginTop: '5%',
    marginBottom: '21%',
    margin: '5%',
    justifyContent: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#757575',
  },
  bioText: {
    textAlign: 'center',
    fontSize: 20,
  },
  name: {
    fontSize: 26,
    alignItems: 'center',
  },
  location: {
    fontSize: 15,
  },
  // ###### BUTTONS ######
  mButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
    elevation: 3,
    marginLeft: 'auto',
    marginRight: '10%',
    marginBottom: '15%',
    backgroundColor: '#A30000',
  },
  wButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
    width: '33%',
    marginLeft: '33%',
    marginRight: '33%',
    elevation: 3,
    backgroundColor: '#A30000',
    alignItems: 'center',
  },
  buttonText: {
    color: '#C0C0C0',
    fontSize: 20,
  },
  sButton: {
    marginLeft: '85%',
    marginTop: '2%',
  },
  // ###### MODAL ######
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  modalHeader: {
    fontSize: '25',
    marginBottom: '2%',
  },
  modalForms: {
    width: '90%',
  },
  cButton: {
    marginRight: '80%',
    marginTop: '17%',
  },
  modalsubHeader: {
    margin: '5%',
    textAlign: 'center',
    fontSize: 21,
  },
  modalBioInput: {
    borderWidth: 1,
    borderRadius: 10,
    height: 100,
    padding: '1%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  modalprofile_picture: {
    marginLeft: '33%',
    marginRight: '33%',
  },
  modalPfpBuddy: {
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: '#757575',
    borderRadius: 15,
  },
  modalPfpBuddyTxt: {
    lineHeight: 40,
    textAlign: 'center',
    paddingHorizontal: '5%',
    fontSize: 40,
    color: '#F5F5F5',
  },
  modalImg: {
    borderWidth: 4,
    borderRadius: 100,
    width: 125,
    height: 125,
  },
  modalLocationInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: '1%',
    marginLeft: '15%',
    marginRight: '15%',
  },
  confButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
    width: '33%',
    marginLeft: '33%',
    marginTop: '10%',
    marginRight: '33%',
    elevation: 3,
    backgroundColor: '#A30000',
    alignItems: 'center',
  },
});

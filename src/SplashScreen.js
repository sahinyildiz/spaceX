import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { CommonActions } from '@react-navigation/native';

const Splash = (props) => {
  useEffect(() => {
    loginCotrol();
  }, []);

  const loginCotrol = async () => {
    setTimeout(async function () {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'DashboardScreen' },
          ],
        })
      );
    }, 3000)
  }
  return (
    <SafeAreaView style={styles.splashArea}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="light-content"
        translucent={true}
      />
      <Image
        source={require('../images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  splashArea: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: width / 1.5,
    height: height / 1.5
  },
});
export default Splash;

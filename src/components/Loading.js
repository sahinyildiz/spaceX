import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native';
import LottieView from 'lottie-react-native';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const statusbar = StatusBar.currentHeight;
const Loading = (props) => {
  return (
    <View style={styles.loaderArea}>
      <LottieView style={styles.lottie} source={require("../../images/loader.json")} autoPlay loop />
    </View>
  );
};
const styles = StyleSheet.create({
  loaderArea: {
    width: deviceWidth,
    height: Platform.OS === 'ios' ? deviceHeight : deviceHeight,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 99,
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: deviceWidth / 7,
    height: deviceHeight / 7
  }
});
export default Loading;

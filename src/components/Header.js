import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  View,
  Text,
  Platform,
} from 'react-native';
let width = Dimensions.get('window').width;
const Header = (props) => {
  return (
    <View style={styles.header}>
      <StatusBar
        backgroundColor="#005288"
        barStyle="light-content"
        translucent={true}
      />
      <View style={styles.headerLeft}>
        {
          props.back && <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={require('../../images/back-button.png')} style={{ width: 26, height: 26, marginLeft: 10 }} resizeMode="cover" />
          </TouchableOpacity>
        }
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.title}>{props.title ? props.title : 'SPACEX'}</Text>
      </View>
      <View style={styles.headerRight} />
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    backgroundColor: '#005288',
    borderBottomColor: '#005288',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  menu: {
    width: 20,
    height: 20,
  },
  headerLeft: {
    width: 60,
    justifyContent: 'center',
    paddingLeft: 10,
    height: 60,
  },
  headerCenter: {
    width: width - 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    width: 60,
    justifyContent: 'center',
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  logo: {
    width: width / 2.5,
  },
  title: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold'
  }
});
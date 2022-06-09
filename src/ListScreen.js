import React from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Header from './components/Header';
import moment from 'moment';

const ListScreen = (props) => {
  return (
    <SafeAreaView style={styles.dashboardArea}>
      <Header back={true} title='Sonuçlar' navigation={props.navigation} />
      <View style={styles.dashboard}>
        {
          props.route.params.data.length > 0 && props.route.params.data.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => {
                props.navigation.navigate('ListDetailScreen', {
                  data: item
                })
              }} key={index} style={styles.listArea}>
                <View style={styles.listAreaLeft}>
                  <Image source={{ uri: item.links.patch.small }} style={{ width: 36, height: 36 }} resizeMode="contain" />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.listAreaTop}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ fontSize: 12 }}>{moment(item.date_local).format("DD.MM.YYYY")}</Text>
                  </View>
                  <View style={styles.listAreaCenter}>
                    <Text>Uçuş Numarası : {item.flight_number}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  dashboardArea: {
    backgroundColor: '#fff',
    flex: 1,
  },
  dateArea: {
    height: 50,
    color: '#1e2f5e',
    justifyContent: 'center',
  },
  dashboard: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: 30
  },
  listArea: {
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row'
  },
  listAreaTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listAreaCenter: {
    marginTop: 5
  },
  listAreaLeft: {
    justifyContent: 'center',
    marginRight: 10
  }
});
export default ListScreen;

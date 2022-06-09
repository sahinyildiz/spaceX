import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import Header from './components/Header';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import LoadingMed from './components/Loading';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
const width = Dimensions.get('window').width;

const DashboardScreen = (props) => {
  const [loader, setLoader] = useState(false);
  const [beginDate, setBeginDate] = useState(new Date());
  const [beginDateOpen, setBeginDateOpen] = useState(false);
  const [beginDateVisible, setBeginDateVisible] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [endDateVisible, setEndDateVisible] = useState('');
  const [resultNumberData, setResultNumberData] = useState([
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },
  ]);
  const [resultNumber, setResultNumber] = useState('');
  const [flightNumberData, setFlightNumberData] = useState([
    { title: "Sıraya göre artan" },
    { title: "Sıraya göre azalan" }
  ]);
  const [flightNumber, setFlightNumber] = useState('');
  const searchClick = () => {
    if (resultNumber == '') {
      Alert.alert(
        "SpaceX",
        "Lütfen sonuç sayısını seçin",
        [{ text: "OK" }]
      );
    }
    else if (beginDateVisible == '') {
      Alert.alert(
        "SpaceX",
        "Başlangıç tarihini seçin",
        [{ text: "OK" }]
      );
    }
    else if (endDateVisible == '') {
      Alert.alert(
        "SpaceX",
        "Bitiş tarihini seçin",
        [{ text: "OK" }]
      );
    }
    else if (flightNumber == '') {
      Alert.alert(
        "SpaceX",
        "Uçuş sıralamasını seçin",
        [{ text: "OK" }]
      );
    }
    else {
      setLoader(true);
      axios.post("https://api.spacexdata.com/v5/launches/query", {
        "query": {
          "date_utc": {
            "$gte": beginDate,
            "$lte": endDate
          }
        },
        "options": {
          "sort": {
            "flight_number": flightNumber == 'Sıraya göre artan' ? 'asc' : 'desc'
          },
          "limit": resultNumber
        }
      }).then(async ({ data }) => {
        setLoader(false);
        if (data.docs.length > 0) {
          props.navigation.navigate('ListScreen', {
            data: data.docs
          })
        }
        else {
          Alert.alert(
            "SpaceX",
            "Seçmiş olduğunuz kriterlere ait sonuç bulunamadı.",
            [{ text: "OK" }]
          );
        }
      }).catch(err => console.log(err));
    }
  }
  return (
    <SafeAreaView style={styles.dashboardArea}>
      {loader ? <LoadingMed /> : null}
      <Header navigation={props.navigation} />
      <View style={styles.dashboard}>
        <SelectDropdown
          data={resultNumberData}
          onSelect={(selectedItem, index) => {
            setResultNumber(selectedItem.title);
          }}
          defaultButtonText={"Sonuç sayısı"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            return item.title;
          }}
          buttonStyle={{
            width: width - 60,
            backgroundColor: "#FFF",
            borderBottomWidth: 1,
            borderColor: resultNumber != '' ? '#3F8528' : '#aaa',
            paddingLeft: 0,
            paddingRight: 0,
            marginBottom: 20
          }}
          buttonTextStyle={{
            color: resultNumber != '' ? '#000' : '#aaa',
            textAlign: "left",
            marginLeft: 0,
            fontSize: 15
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <Image source={require('../images/down-arrow.png')} style={{ width: 14, height: 14 }} resizeMode="cover" />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
        <View style={styles.dateView}>
          <View style={[styles.dateAreas, {
            borderColor: beginDateVisible != '' ? '#3F8528' : '#aaa',
          }]}>
            <TouchableOpacity style={styles.dateArea} onPress={() => { setBeginDateOpen(true) }}>
              <Text style={{ color: beginDateVisible != '' ? '#000' : '#aaa' }}>{beginDateVisible != '' ? beginDateVisible : 'Başlangıç tarihini seçin'}</Text>
            </TouchableOpacity>
            <Image source={require('../images/calendar.png')} style={{ width: 18, height: 18 }} resizeMode="cover" />
          </View>
          <DatePicker
            modal
            open={beginDateOpen}
            mode={'date'}
            date={beginDate}
            onConfirm={(date) => {
              setBeginDate(date);
              setBeginDateOpen(false);
              setBeginDateVisible(moment(date).format("DD.MM.YYYY"));
            }}
            onCancel={() => {
              setBeginDateOpen(false)
            }}
          />
        </View>
        <View style={styles.dateView}>
          <View style={[styles.dateAreas, {
            borderColor: endDateVisible != '' ? '#3F8528' : '#aaa',
            marginTop: 20
          }]}>
            <TouchableOpacity style={styles.dateArea} onPress={() => { setEndDateOpen(true) }}>
              <Text style={{ color: endDateVisible != '' ? '#000' : '#aaa' }}>{endDateVisible != '' ? endDateVisible : 'Bitiş tarihini seçin'}</Text>
            </TouchableOpacity>
            <Image source={require('../images/calendar.png')} style={{ width: 18, height: 18 }} resizeMode="cover" />
          </View>
          <DatePicker
            modal
            open={endDateOpen}
            mode={'date'}
            date={endDate}
            onConfirm={(date) => {
              setEndDate(date);
              setEndDateOpen(false);
              setEndDateVisible(moment(date).format("DD.MM.YYYY"));
            }}
            onCancel={() => {
              setEndDateOpen(false)
            }}
          />
        </View>
        <View style={styles.bottomDropDown}>
          <SelectDropdown
            data={flightNumberData}
            onSelect={(selectedItem, index) => {
              setFlightNumber(selectedItem.title);
            }}
            defaultButtonText={"Uçuş sıralaması"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.title;
            }}
            rowTextForSelection={(item, index) => {
              return item.title;
            }}
            buttonStyle={{
              width: width - 60,
              backgroundColor: "#FFF",
              borderBottomWidth: 1,
              borderColor: flightNumber != '' ? '#3F8528' : '#aaa',
              paddingLeft: 0,
              paddingRight: 0,
              marginBottom: 20
            }}
            buttonTextStyle={{
              color: flightNumber != '' ? '#000' : '#aaa',
              textAlign: "left",
              marginLeft: 0,
              fontSize: 15
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <Image source={require('../images/down-arrow.png')} style={{ width: 14, height: 14 }} resizeMode="cover" />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
        <View style={styles.btnAreaView}>
          <TouchableOpacity onPress={() => { searchClick() }} style={styles.btnArea}>
            <Text style={styles.btnText}>Şimdi Ara</Text>
          </TouchableOpacity>
        </View>
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
  dateAreas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  btnArea: {
    backgroundColor: '#005288',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 40
  },
  btnAreaView: {
    marginTop: 40
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomDropDown: {
    marginTop: 20
  }
});
export default DashboardScreen;

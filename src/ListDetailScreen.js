import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  Text,
  Dimensions
} from 'react-native';
import Header from './components/Header';
import moment from 'moment';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ListDetailScreen = (props) => {
  const [slideItem, setSlideItem] = useState(0);
  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <Image source={{ uri: item }} style={{ width: width - 60, height: height / 4.5 }} resizeMode="contain" />
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.dashboardArea}>
      <Header back={true} title={props.route.params.data.name} navigation={props.navigation} />
      <View style={styles.dashboard}>
        <View style={styles.sliderArea}>
          <Carousel
            data={props.route.params.data.links.flickr.original}
            renderItem={CarouselCardItem}
            sliderWidth={width}
            itemWidth={width - 60}
            inactiveSlideShift={0}
            useScrollView={true}
            inactiveSlideScale={1}
            inactiveSlideOpacity={0}
            onSnapToItem={(index) => setSlideItem(index)}
            loop={true}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={5000}
          />
          <Pagination
            dotsLength={props.route.params.data.links.flickr.original.length}
            activeDotIndex={slideItem}
            containerStyle={styles.containerStyleDots}
            dotStyle={styles.dots}
            inactiveDotOpacity={0.2}
            inactiveDotScale={1}
          />
        </View>
        <View style={styles.descriptionArea}>
          <Text style={[styles.titleText, { marginBottom: 10, color: '#aaa' }]}>İsim : <Text style={{ color: '#333', fontWeight: 'bold' }}>{props.route.params.data.name}</Text></Text>
          <Text style={[styles.titleText, { marginBottom: 10, color: '#aaa' }]}>Uçuş numarası : <Text style={{ color: '#333', fontWeight: 'bold' }}>{props.route.params.data.flight_number}</Text></Text>
          <Text style={[styles.titleText, { marginBottom: 10, color: '#aaa' }]}>Tarih : <Text style={{ color: '#333', fontWeight: 'bold' }}>{moment(props.route.params.data.date_local).format("DD.MM.YYYY")}</Text></Text>
          <Text style={[styles.titleText, { marginBottom: 10,color:'#111' }]}>Detaylar </Text>
          <Text style={styles.titleText}>{props.route.params.data.details}</Text>
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
  sliderArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center'
  },
  containerStyleDots: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginBottom: 20
  },
  dots: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#005288',
    marginTop: 15
  },
  descriptionArea: {

  },
  titleText: {
    fontWeight: 'normal'
  }
});
export default ListDetailScreen;

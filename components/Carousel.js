import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'

const Carousel = () => {
    const images = [
        "https://media.istockphoto.com/id/1346705134/vi/anh/n%E1%BB%99i-th%E1%BA%A5t-c%E1%BB%ADa-h%C3%A0ng-gi%E1%BA%B7t-%E1%BB%A7i-v%E1%BB%9Bi-qu%E1%BA%A7y-v%C3%A0-m%C3%A1y-gi%E1%BA%B7t-3d-k%E1%BA%BFt-xu%E1%BA%A5t.jpg?s=1024x1024&w=is&k=20&c=t11271X9PtizuZe92ff8oyPnt82T2VT7iqV0YHf-owU=",
        "https://media.istockphoto.com/id/1346590504/vi/anh/n%E1%BB%99i-th%E1%BA%A5t-c%E1%BB%ADa-h%C3%A0ng-gi%E1%BA%B7t-%E1%BB%A7i-v%E1%BB%9Bi-qu%E1%BA%A7y-v%C3%A0-m%C3%A1y-gi%E1%BA%B7t-3d-k%E1%BA%BFt-xu%E1%BA%A5t.jpg?s=1024x1024&w=is&k=20&c=eCu3iLEqElo-VUgG5DT60aRCiEhuB6h6EQMYrr8i78Y="
    ];
  return (
    <View>
      <SliderBox 
      images={images} 
      autoPlay 
      circleloop 
      dotColor={'#13274F'} 
      inativeDotColor="#90A4AE" 
      ImageComponentStyle={{
        borderRadius:6,
        width:"94%",
      }}
      />
    </View>
  );
};

export default Carousel

const styles = StyleSheet.create({})
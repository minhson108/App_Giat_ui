import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Services = () => {

    const services = [
        {
            id: "0",
            image: "https://static.thenounproject.com/png/3226-200.png",
            name: "Giặt Máy",
        },
        {
            id: "11",
            image: "https://i.pinimg.com/236x/b6/56/9a/b6569a0232a5e7683c74085650c9383d--laundry-care-symbols-the-hand.jpg",
            name: "Giặt tay",
        },
        {
            id: "12",
            image: "https://png.pngtree.com/png-clipart/20190904/original/pngtree-an-electric-iron-png-image_4491263.jpg",
            name: "Ủi đồ"
        },
        {
            id: "13",
            image: "https://th.bing.com/th/id/OIP.uULU8Glc1drTnQPrFymqIQHaHa?pid=ImgDet&w=206&h=206&c=7&dpr=1.3",
            name: "Phơi đồ",
        },

        ];
  return (
    <View style={{padding: 10}}>
      <Text style={{fontSize:16, fontWeight:"500",marginBottom:7}}>Dịch Vụ</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service,index) => (
            <Pressable style={{margin:0,backgroundColor:"White",padding:20,borderRadius:7}} key={index}>
                <Image source={{uri:service.image}} style={{width:90, height:90}}/>

                <Text style={{textAlign:"center",marginTop:10}}>{service.name}</Text>
            </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})
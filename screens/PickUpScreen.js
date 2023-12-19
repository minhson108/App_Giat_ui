import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PickUpScreen = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantify * item.price).reduce((curr, prev) => curr + prev, 0);
    const [selectedTime, setSelectedTime] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const deliveryTime = [
        {
            id: "0",
            name: "2-3 ngày",
        },
        {
            id: "1",
            name: "3-4 ngày",
        },
        {
            id: "2",
            name: "4-5 ngày",
        },
        {
            id: "3",
            name: "5-6 ngày",
        },
        {
            id: "4",
            name: "Ngày mai",
        }
    ];


    const times = [
        {
            id: "0",
            time: "11:00 PM",
        },
        {
            id: "1",
            time: "12:00 PM",
        },
        {
            id: "2",
            time: "1:00 PM",
        },
        {
            id: "3",
            time: "2:00 PM",
        },
        {
            id: "4",
            time: "3:00 PM",
        },
        {
            id: "5",
            time: "4:00 PM",
        },
    ];
    const navigation = useNavigation();
    const proceedToCart = () => {
        if(!selectedDate || !selectedTime || !delivery){
            Alert.alert(
                "trống hoặc không hợp lệ", 
                "vui lòng chọn tất cả các trường", 
                [
                {
                  text: "Thoát",
                  onPress: () => console.log("Hủy"),
                  style: "Thoát",
                },
                {text: "Đồng ý", onPress: () => console.log("Đồng ý") }
                ],
                {camcelable:false}
              );
        }
        if(selectedDate && selectedTime && delivery)
        {
            navigation.replace("Cart",{
                pickUpDate:selectedDate,
                selectedTime:selectedTime,
                no_Of_days:delivery,
            })
        }
    }
    return (
        <>
            <SafeAreaView>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Nhập địa chỉ</Text>
                <TextInput
                    style={{
                        padding: 40,
                        borderColor: "gray",
                        borderWidth: 0.7,
                        paddingVertical: 80,
                        borderRadius: 9,
                        margin: 10
                    }}
                />

                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Chọn ngày</Text>
                <HorizontalDatepicker
                    mode="gregorian"
                    startDate={new Date("2023-12-20")}
                    endDate={new Date("2023-12-31")}
                    initialSelectedDate={new Date("2020-08-22")}
                    onSelectedDateChange={(date) => setSelectedDate(date)}
                    selectedItemWidth={170}
                    unselectedItemWidth={38}
                    itemHeight={38}
                    itemRadius={10}
                    selectedItemTextStyle={styles.selectedItemTextStyle}
                    unselectedItemTextStyle={styles.selectedItemTextStyle}
                    selectedItemBackgroundColor="#222831"
                    unselectedItemBackgroundColor="#ececec"
                    flatListContainerStyle={styles.flatListContainerStyle}
                />
                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
                    Chọn thời gian
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {times.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => setSelectedTime(item.time)}
                            style={
                                selectedTime.includes(item.time)
                                    ? {
                                        margin: 10,
                                        borderRadius: 7,
                                        padding: 15,
                                        borderColor: "red",
                                        borderWidth: 0.7,
                                    }
                                    : {
                                        margin: 10,
                                        borderRadius: 7,
                                        padding: 15,
                                        borderColor: "gray",
                                        borderWidth: 0.7,
                                    }
                            }
                        >
                            <Text>{item.time}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
                <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
                    Ngày giao hàng
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {deliveryTime.map((item, i) => (
                        <Pressable
                            style={
                                delivery.includes(item.name)
                                    ? {
                                        margin: 10,
                                        borderRadius: 7,
                                        padding: 15,
                                        borderColor: "red",
                                        borderWidth: 0.7,
                                    }
                                    : {
                                        margin: 10,
                                        borderRadius: 7,
                                        padding: 15,
                                        borderColor: "gray",
                                        borderWidth: 0.7,
                                    }
                            }
                            onPress={() => setDelivery(item.name)}
                            key={i}>
                            <Text>{item.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </SafeAreaView>

            {total === 0 ? (
                null
            ) : (
                <Pressable
                    style={{
                        backgroundColor: "#088F8F",
                        marginTop:"auto",
                        padding: 10,
                        marginBottom: 40,
                        margin: 15,
                        borderRadius: 7,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: "600", color: "#FFFFFF" }}>{cart.length} Móm |  ${total}</Text>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: "#FFFFFF", marginVertical: 6 }}>Có thể tính thêm phí</Text>
                    </View>

                    <Pressable onPress={proceedToCart}>
                        <Text style={{ fontSize: 17, fontWeight: "600", color: "#FFFFFF" }}>
                            Giỏ hàng
                        </Text>
                    </Pressable>
                </Pressable>
            )}
        </>
    );
};

export default PickUpScreen

const styles = StyleSheet.create({})
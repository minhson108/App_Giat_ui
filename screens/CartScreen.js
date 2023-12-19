import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cleanCart, decrementQuantify, incrementQuantify } from '../CarReducer';
import { decrementQty, incrementQty } from '../ProductReducer';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const route = useRoute();
    const total = cart.map((item) => item.quantify * item.price).reduce((curr, prev) => curr + prev, 0);
    const navigation = useNavigation();
    const userUid = auth.currentUser.uid;
    const dispatch = useDispatch();
    const placeOrder = async () => {
        navigation.navigate("Order");
        dispatch(cleanCart());
        await setDoc(doc(db,"người dùng",`${userUid}`), {
            orders: { ...cart },
            pickUpDetals: route.params,
        },
            {
                merge: true,
            }
        );
    };
    return (
        <>
            <ScrollView style={{ marginTop: 50 }}>
                {total === 0 ? (
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ marginTop: 40 }}>Giỏ hàng của bạn trống</Text>
                    </View>
                ) : (

                    <>
                        <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
                            <Text>Trở lại</Text>
                        </View>

                        <Pressable style={{ backgroundColor: "#DDDDDD", borderRadius: 12, marginLeft: 10, marginRight: 10, padding: 14 }}>
                            {cart.map((item, index) => (
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 12 }} key={index}>
                                    <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>{item.name}</Text>

                                    {/* button */}
                                    <Pressable
                                        style={{
                                            flexDirection: "row",
                                            paddingHorizontal: 10,
                                            paddingVertical: 5,
                                            alignItems: "center",
                                            borderColor: "#BEBEBE",
                                            borderWidth: 0.5,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Pressable
                                            onPress={() => {
                                                dispatch(decrementQuantify(item));
                                                dispatch(decrementQty(item));
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    color: "#088F8F",
                                                    paddingHorizontal: 6,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                -
                                            </Text>
                                        </Pressable>

                                        <Pressable>
                                            <Text
                                                style={{
                                                    fontSize: 19,
                                                    color: "#088F8F",
                                                    paddingHorizontal: 8,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {item.quantify}
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() => {
                                                dispatch(incrementQuantify(item));
                                                dispatch(incrementQty(item));
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    color: "#088F8F",
                                                    paddingHorizontal: 6,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                +
                                            </Text>
                                        </Pressable>
                                    </Pressable>
                                    <Text style={{ fontSize: 16, fontWeight: "500" }}>
                                        ${item.price * item.quantify}
                                    </Text>
                                </View>
                            ))}
                        </Pressable>

                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                                Chi tiết thanh toán
                            </Text>
                            <View
                                style={{
                                    backgroundColor: "#DDDDDD",
                                    borderRadius: 7,
                                    padding: 10,
                                    marginTop: 15,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text style={{ fontSize: 18, fontWeight: "400", color: "gray" }}>
                                        Tổng cộng đồ
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: "400" }}>
                                        ${total}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 8,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18, fontWeight: "400", color: "gray"
                                        }}>
                                        Phí giao hàng | 1.2km
                                    </Text>
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                                    >
                                        Miễn phí
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                                    >
                                        Giao hàng miễn phí theo đơn đặt hàng của bạn
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        borderColor: "gray",
                                        height: 1,
                                        borderWidth: 0.5,
                                        marginTop: 10,
                                    }}
                                />

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 10,
                                    }}>
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>
                                        Ngày đã chọn
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18, fontWeight: "400", color: "#088F8F",
                                        }}
                                    >
                                        {/*route.params.pickUpDate */}
                                    </Text>
                                </View>

                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}>
                                    <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>
                                        Số ngày
                                    </Text>
                                    <Text style={{
                                        fontSize: 18, fontWeight: "400", color: "#088F8F"
                                    }}>
                                        {route.params.no_Of_days}
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginVertical: 10,
                                }}>
                                    <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>
                                        Chọn thời gian nhận
                                    </Text>
                                    <Text style={{
                                        fontSize: 18, fontWeight: "400", color: "#088F8F"
                                    }}>
                                        {route.params.selectedTime}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        borderColor: "gray",
                                        height: 1,
                                        borderWidth: 0.5,
                                        marginTop: 10,
                                    }} />
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginVertical: 8,
                                }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                        Thanh toán
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                        {total + 95}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>

            {total === 0 ? (
                null
            ) : (
                <Pressable
                    style={{
                        backgroundColor: "#088F8F",
                        marginTop: "auto",
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

                    <Pressable onPress={placeOrder}>
                        <Text style={{ fontSize: 17, fontWeight: "600", color: "#FFFFFF" }}>
                            Thanh toán
                        </Text>
                    </Pressable>
                </Pressable>
            )}
        </>
    );
};

export default CartScreen

const styles = StyleSheet.create({})
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQuantify, incrementQuantify } from '../CarReducer';
import { decrementQty, incrementQty } from '../ProductReducer';

const DressItem = ({ item }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const addItemToCart = () => {
        dispatch(addToCart(item));   // cart
        dispatch(incrementQty(item));    //product
    };
    return (
        <View>
            <Pressable
                style={{
                    backgroundColor: "#F8F8F8",
                    borderRadius: 8,
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 14,
                }}
            >
                <View>
                    <Image
                        style={{ width: 90, height: 90 }}
                        source={{ uri: item.image }}
                    />
                </View>

                <View>
                    <Text
                        style={{
                            width: 83,
                            fontSize: 17,
                            fontWeight: "500",
                            marginBottom: 7
                        }}
                    >
                        {item.name}
                    </Text>
                    <Text style={{ 
                        width: 60, 
                        color: "gray", 
                        fontSize: 15 
                        }}>
                        ${item.price}
                    </Text>
                </View>

                {cart.some((c) => c.id === item.id) ? (
                    <Pressable
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                        }}
                    >
                        <Pressable
                            onPress={() => {
                                dispatch(decrementQuantify(item));
                                dispatch(decrementQty(item));
                            }}
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                borderColor: "#BEBEBE",
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "#088F8F",
                                    paddingHorizontal: 6,
                                    fontWeight: "600",
                                    textAlign: "center",
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
                            }}
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                borderColor: "#BEBEBE",
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "#088F8F",
                                    paddingHorizontal: 6,
                                    fontWeight: "600",
                                    textAlign: "center",
                                }}
                            >
                                +
                            </Text>
                        </Pressable>
                    </Pressable>
                ) : (
                    <Pressable onPress={addItemToCart} style={{ width: 80 }}>
                        <Text style={{
                            borderColor: "gray",
                            borderRadius: 6,
                            borderWidth: 0.8,
                            marginVertical: 10,
                            color: "#088F8F",
                            textAlign: "center",
                            padding: 5,
                            fontSize: 17,
                            fontWeight: "bold",
                        }}
                        >
                            Chọn
                        </Text>
                    </Pressable>
                )}
            </Pressable>
        </View>
    );
};

export default DressItem

const styles = StyleSheet.create({})
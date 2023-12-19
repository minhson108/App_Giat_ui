import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Pressable, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigation = useNavigation("");
    const register = () => {
        if (email === "" || password === "" || phone === "") {
            Alert.alert(
                "Thông tin không hợp lệ",
                "Vui lòng đền đầy đủ tất cả thông tin",
                [
                    {
                        text: 'Thoát',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'Đồng ý', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        }
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("Xác thực người dùng", userCredential);
            const user = userCredential._tokenResponse.email;
            const myUserUid = auth.currentUser.uid;

            setDoc(doc(db,"người dùng",`${myUserUid}`), {
                email:user,
                phone:phone
            })
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "White", alignItems: "center", padding: 10 }}>
            <Text>RegisterScreen</Text>
            <KeyboardAvoidingView>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Đăng Ký</Text>
                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Tạo tài khoản mới</Text>
                </View>
                <View style={{ marginTop: 50 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                        <TextInput placeholder='Email'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor="black"
                            style={{
                                fontSize: email ? 18 : 18,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                width: 300,
                                marginVertical: 20,
                                marginLeft: 13
                            }} />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="key-outline" size={24} color="black" />
                        <TextInput placeholder='Password'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            placeholderTextColor="black"
                            style={{
                                fontSize: password ? 18 : 18,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                width: 300,
                                marginVertical: 20,
                                marginLeft: 13
                            }} />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="phone" size={24} color="black" />
                        <TextInput placeholder='Phone'
                            value={phone}
                            onChangeText={(text) => setPhone(text)}

                            placeholderTextColor="black"
                            style={{
                                fontSize: password ? 18 : 18,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                width: 300,
                                marginVertical: 20,
                                marginLeft: 13
                            }} />
                    </View>

                    <Pressable
                        onPress={register}
                        style={{
                            width: 200,
                            backgroundColor: "#318CE7",
                            padding: 15,
                            borderRadius: 7,
                            marginTop: 50,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}>
                        <Text
                            style={{ fontSize: 18, textAlign: "center", color: "#FFFFFF" }}>Đăng Ký</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 17, color: "gray",
                                fontWeight: "500"
                            }}>
                            Bạn đã có tài khoản? Đăng nhập
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})
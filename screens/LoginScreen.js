import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                setLoading(false);
            }
            if (authUser) {
                navigation.navigate("Home");
            }
        });
    }, [])

    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("Xác thực người dùng", userCredential);
            const user = userCredential.user;
            console.log("Chi tiết người dùng", user)
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "White", alignItems: "center", padding: 10 }}>
            {loading ? (
                <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1}}>
                    <Text>Loading</Text>
                    <ActivityIndicator size="large" color={"red"} />
                </View>
            ) : (
                <KeyboardAvoidingView>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                        <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Đăng Nhập</Text>
                        <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Đăng nhập vào tài khoản của bạn</Text>
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

                        <Pressable onPress={login}
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
                                style={{ fontSize: 18, textAlign: "center", color: "#FFFFFF" }}>Đăng nhập</Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 17, color: "gray",
                                    fontWeight: "500"
                                }}>
                                Bạn chưa có tài khoản? Đăng ký
                            </Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            )}

        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
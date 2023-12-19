import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Alert,
    Pressable,
    Image,
    TextInput,
    ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import * as Location from "expo-location";
import { MaterialIcons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';



const HomeScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const [items, setItems] = useState([]);
    const total = cart.map((item) => item.quantify * item.price).reduce((curr, prev) => curr + prev, 0);
    const navigation = useNavigation();
    console.log(cart);
    const [dissplayCurrentAddress, setdissplayCurrentAddress] = useState("We are loading your location");
    const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, []);
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Location services not enabled",
                "Please enabled the location services",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        } else {
            setlocationServicesEnabled(enabled)
        }
    }
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission denied",
                "allow the app to use the location services",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        };

        const { coords } = await Location.getCurrentPositionAsync();
        console.log(coords)
        if (coords) {
            const { latitude, longitude } = coords;

            let reponse = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            console.log(reponse)

            for (let item of reponse) {
                let address = `${item.name} ${item.city} ${item.postalCode}`;
                setdissplayCurrentAddress(address)
            }
        }
    };
    const product = useSelector((state) => state.product.product);
    const dispatch = useDispatch();
    useEffect(() => {
        if (product.length > 0) return;

        const fetchProducts = async() => {
            const colRef = collection(db,"types");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach((doc) => {
                items.push(doc.data());
            });
            items?.map((service) => dispatch(getProducts(service)));
        };
        fetchProducts();
    }, [])
    console.log(product)
    const services = [
        {
            id: "0",
            image: "https://4men.com.vn/thumbs/2022/09/ao-so-mi-regular-icon-dog-asm106-mau-bo-21494-p.JPG",
            name: "Áo sơ mi",
            quantify: 0,
            price: 9
        },
        {
            id: "1",
            image: "https://th.bing.com/th/id/OIP.apGM30M34L2KBQUoz0hW0gHaHa?w=207&h=207&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            name: "Áo khoác",
            quantify: 0,
            price: 10
        },
        {
            id: "2",
            image: "https://th.bing.com/th/id/OIP.G7C-Ohoj3gE0KImK2SjC4QHaHa?pid=ImgDet&w=206&h=206&c=7&dpr=1.3",
            name: "Váy",
            quantify: 0,
            price: 10
        },
        {
            id: "3",
            image: "https://th.bing.com/th/id/OIP.CvnG4dY4KR1IdlxIMovrngHaLW?pid=ImgDet&w=202&h=310&c=7&dpr=1.3",
            name: "Đồ trẻ em",
            quantify: 0,
            price: 5
        },
        {
            id: "4",
            image: "https://ae01.alicdn.com/kf/S25806cd442a647859754d89c9f07ff99O/Fugees-T-Shirt-for-Women-Clothing-Oversized-T-shirt-Anime-Tops-Manga-Formula-1-Short-Sleeve.jpg",
            name: "Áo thun",
            quantify: 0,
            price: 7
        },
        {
            id: "5",
            image: "https://cdn.becungshop.vn/images/icon/quan-be-trai-80.png",
            name: "Quần",
            quantify: 0,
            price: 10
        },
        {
            id: "6",
            image: "https://huyphu.com/cdn/720/Product/fc3CR9M3g/1574651954127.jpg",
            name: "Vớ",
            quantify: 0,
            price: 1
        },
    ];
    return (
        <>
            <ScrollView style={{ backgroundColor: "F0F0F0", flex: 1, marginTop: 50 }}>
                {/* Location and Profile */}
                <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                    <MaterialIcons name="location-on" size={30} color="#fd5c63" />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
                        <Text>{dissplayCurrentAddress}</Text>
                    </View>

                    <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{
                                uri: "https://yt3.ggpht.com/yti/ADpuP3NE2JpZ7zChy60ELigk6cOcvfvuXDGMLDH1Qw=s108-c-k-c0x00ffffff-no-rj",
                            }}
                        />
                    </Pressable>
                </View>

                {/* Search  */}
                <View
                    style={{
                        padding: 10,
                        margin: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderWidth: 0.8,
                        borderColor: "#C0C0C0",
                        borderRadius: 7
                    }}
                >
                    <TextInput placeholder="tìm kiếm các mục hoặc nhiều hơn" />
                    <Feather name="search" size={24} color="#fd5c63" />
                </View>

                {/* Search  */}
                <Carousel />

                {/* services  */}
                <Services />

                {/* Sản phẩm  */}
                {product.map((item, index) => (
                    <DressItem item={item} key={index} />
                ))}
            </ScrollView>
            {total === 0 ? (
                null
            ) : (
                <Pressable
                    style={{
                        backgroundColor: "#088F8F",
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
                        <Text style={{ fontSize: 17, fontWeight: "600", color: "#FFFFFF" }}>{cart.length}
                            Móm |  ${total}
                        </Text>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: "#FFFFFF", marginVertical: 6 }}>
                            Có thể tính thêm phí
                        </Text>
                    </View>

                    <Pressable onPress={() => navigation.navigate("PickUp")}>
                        <Text style={{ fontSize: 17, fontWeight: "600", color: "#FFFFFF" }}>Tiếp tục</Text>
                    </Pressable>
                </Pressable>
            )}

        </>
    );
};

export default HomeScreen

const styles = StyleSheet.create({})
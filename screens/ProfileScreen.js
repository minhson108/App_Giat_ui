import { StyleSheet, Text, View,SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';

const ProfileScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const signOutuser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login");
        }).catch(err => {
            console.log(err);
        })
        
    }
  return (
    <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Pressable style={{marginVertical:10}}>
        <Text>Chào mừng {user.email}</Text>
      </Pressable>

      <Pressable onPress={signOutuser}>
        <Text>Đăng xuất</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
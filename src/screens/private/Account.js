import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import GuestComponent from '../../components/GuestComponent';

const Account = ({ navigation }) => {
    const { setLoggedIn, loggedIn } = useContext(AppContext);
    const [user, setUser] = useState({});
    
    useFocusEffect(useCallback(() => {
        getUserDetails();
    }, []));

    const getUserDetails = async () => {
        const token = await AsyncStorage.getItem('token');
        const tokenDecoded = jwtDecode(token);
        setUser(tokenDecoded?.user);
    }

  return (
    <SafeAreaView>
        <View style={styles.titleView}>
            <Text style={styles.titleAppName}>Account</Text>
        </View>

        {/* ****************** This is to check if we are logged in or not. and if we are logged in it will show the user profile account contents, the phone, the name, and address. ****************** */}
       
        {
            loggedIn ?
            <>
                <View style={{
                    flexDirection: 'column',
                }}>
                    <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg' }} style={styles.image} />
                    <View style={[styles.TextView, { marginTop: 30, }]}>
                        <Text style={{ fontFamily: 'Quicksand-Bold', color: '#4c4c4c', }}>{user?.name}</Text>
                    </View>
                    <View style={styles.TextView}>
                        <Text style={{ fontFamily: 'Quicksand-Bold', color: '#4c4c4c', }}>{user?.phone}</Text>
                    </View>
                    <View style={styles.TextView}>
                        <Text style={{ fontFamily: 'Quicksand-Bold', color: '#4c4c4c', }}>{user?.address || 'No address added yet'}</Text>
                    </View>
                </View>

                {/* ***************** This is a button for logout for *************  */}
                <TouchableOpacity onPress={ async () => {
                    await AsyncStorage.removeItem('token');
                    setLoggedIn(false);
                }} activeOpacity={.7} style={[styles.buttonDelete, { backgroundColor: '#090e2c' }]}>
                    <AntDesign name='logout' size={24} color={'#fff'} />
                    <Text style={{ fontFamily: 'Quicksand-Bold', color: '#fff', }}>Logout</Text>
                </TouchableOpacity>

            </>
            :
            
            <GuestComponent navigation={navigation} />
        }
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({
    buttonDelete: {
        width: '80%',
        height: 60,
        borderRadius: 20,
        backgroundColor: '#a12',
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center'
    },
    TextView: {
        width: '80%',
        height: 50,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#c4c4c4',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 80,
        alignSelf: 'center',
        marginTop: 30,
    },
    titlePastTrips: {
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 20,
    },
    titleAppName: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 34,
        color: '#000'
    },
    titleView: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',   
        alignSelf: 'center',
        marginTop: 10,
    },
})
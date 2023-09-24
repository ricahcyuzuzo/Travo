import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

const GuestComponent = ({ navigation }) => {
  return (
    <View>
        <Text style={{
            fontSize: 50,
            alignSelf: 'center',
            marginVertical: 20,
            fontFamily: 'Quicksand-Bold', 
            color: '#000'
        }}>Guest</Text>
        <FontAwesome5 name='lock' size={204} style={{ alignSelf: 'center', marginTop: 50, }} color='#4c4c4c' />
        <Text style={{
            fontSize: 20,
            alignSelf: 'center',
            marginVertical: 20,
            fontFamily: 'Quicksand-Regular',
            textAlign: 'center',
            width: '90%' ,
            color: '#000'
        }}>You need to log in or create an account first to see this screen</Text>

        <TouchableOpacity onPress={ async () => {
            navigation.navigate('Login');
        }} activeOpacity={.7} style={[styles.buttonDelete, { backgroundColor: '#090e2c' }]}>
            <AntDesign name='lock' size={24} color={'#fff'} />
            <Text style={{ fontFamily: 'Quicksand-Bold', color: '#fff', }}>Login</Text>
        </TouchableOpacity>
    </View>
  )
}

export default GuestComponent

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
})
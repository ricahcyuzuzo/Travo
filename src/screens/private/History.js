import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import TicketComponent from '../../components/TicketComponent';
import { AppContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../config/api';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import GuestComponent from '../../components/GuestComponent';

const History = ({ navigation }) => {
    const { loggedIn } = useContext(AppContext);
    const [history, setHistory] = useState([]);

    useFocusEffect(useCallback(() => {
        getData();
    }, []));

    const getData = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${API_URL}/history`, {
            headers: {
                Authorization: token,
            },
        }).then(res => {
            console.log(res.data.tickets, 'JJJ')
            setHistory(res.data.tickets);
        }).catch(err => {
            console.log(err);
        })
    }

  return (
    <SafeAreaView>
        <ScrollView style={{
            
        }}>

        <View style={styles.titleView}>
            <Text style={styles.titleAppName}>History</Text>
        </View>
        {
            loggedIn ?
                    history.map((item, idx) => {
                        const agency = JSON.parse(item.ticket.agency);
                        let distance = Math.abs(new Date(item.ticket.time) - new Date(item.ticket.arrival));
                        const hours = Math.floor(distance / 3600000);
                        distance -= hours * 3600000;
                        const minutes = Math.floor(distance / 60000);
                        const duration = `${hours} ${hours > 1 ? 'Hrs' : 'Hr' }`
                        return <TicketComponent  on={moment(item.ticket.time).isBefore() ? false : true} id={item._id} Component={'View'} navigation={navigation} date={item.ticket.time} arrival={item.ticket.arrival.split("T")[1]} departure={item.ticket.time.split("T")[1]} duration={duration} from={item.ticket.from} name={agency.name} fromExact={item.ticket.from} price={item.ticket.price} remainingSeats={item.remainingSeats} to={item.ticket.destination} toExact={item.ticket.destination} tripType={item.tripType} key={idx} />
                    })
            : 
            <GuestComponent navigation={navigation} />
        }
        <View style={{ height: 100, }} />
        </ScrollView>
    </SafeAreaView>
  )
}

export default History

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
    titlePastTrips: {
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 20,
        color: '#000'
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
    iconImage: {
        width: 45,
        height: 45,
        resizeMode: 'stretch',
        alignSelf: 'flex-start',
        borderRadius: 15,
    },
})
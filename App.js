
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoard from './src/screens/public/OnBoard';
import Tabs from './src/screens/public/Tabs';
import AgencyList from './src/screens/private/AgencyList';
import CreateTicket from './src/screens/private/CreateTicket';
import Tracker from './src/screens/private/Tracker';
import Login from './src/screens/public/Login';
import Signup from './src/screens/public/Signup';
import { AppContext } from './src/context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

function App(){
  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('./src/assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Light': require('./src/assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('./src/assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('./src/assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-SemiBold': require('./src/assets/fonts/Quicksand-SemiBold.ttf'),
  });

  const [loggedIn, setLoggedIn] = useState(false);

  
  useEffect(() => {
    checkLoggedIn();
  }, []);

  
  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  }
  
  if (!fontsLoaded) {
    return (
      <AppLoading />
    )
  }
  return (
    <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <>
            {loggedIn ? 
            <>
              <Stack.Screen name='Bottom' navigationKey={loggedIn ? 'user' : 'guest'} component={Tabs} />
              <Stack.Screen name='Agency' component={AgencyList} />
              <Stack.Screen name='Create' component={CreateTicket} />
              {/* <Stack.Screen name='Track' component={Tracker} /> */}
            </>
            :
            <>
              <Stack.Screen name='OnBoard' component={OnBoard} />
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Signup' component={Signup} />
              <Stack.Screen name='Bottom' component={Tabs} />
              <Stack.Screen name='Agency' component={AgencyList} />
            </>
            }
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;

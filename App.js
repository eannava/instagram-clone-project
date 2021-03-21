import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import firebase from 'firebase/app'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))





// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzt0hjBZOMVhmnLH3Wo6Z684Q-OhUp1cA",
  authDomain: "instagram-clone-cf8f4.firebaseapp.com",
  projectId: "instagram-clone-cf8f4",
  storageBucket: "instagram-clone-cf8f4.appspot.com",
  messagingSenderId: "582863379894",
  appId: "1:582863379894:web:e5c78ff53c6a39bf05f517",
  measurementId: "G-KV4J6HG615"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/login'
import MainScreen from './components/Main'
import AddScreen from './components/Main/Add'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded} = this.state;
    if(!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
      <NavigationContainer>
      <Stack.Navigator initialRoutName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
      </NavigationContainer>
        );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRoutName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Add" component={AddScreen}/>
      </Stack.Navigator>
        </NavigationContainer>
      </Provider>
     
      
    )
  }
}

export default App



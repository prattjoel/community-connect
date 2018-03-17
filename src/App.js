import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
// import Router from './Nav/Router';
import MainNavigation from './containers/NavContainer';

console.ignoredYellowBox = ['Remote debugger'];

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBS012kYgoyxm6ig-ldjhVUElcPldg1wE4',
      authDomain: 'communityconnect-aa662.firebaseapp.com',
      databaseURL: 'https://communityconnect-aa662.firebaseio.com',
      projectId: 'communityconnect-aa662',
      storageBucket: '',
      messagingSenderId: '399029413772'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
         <View style={{ flex: 1 }}>
            <MainNavigation />
         </View>
      </Provider>
    );
  }
}

// const styles = {
//   containerStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#d5e6f4'
//   }
// };

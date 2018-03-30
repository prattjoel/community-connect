import React, { Component } from 'react';
import Expo, { FileSystem } from 'expo';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { CacheManager } from 'react-native-expo-image-cache';
import reducers from './reducers';
// import Router from './Nav/Router';
import MainNavigation from './containers/NavContainer';

console.ignoredYellowBox = ['Remote debugger'];

export default class App extends Component {
  componentWillMount() {
      // console.log('App component mounted');
      // const BASE_DIR = `${FileSystem.cacheDirectory}expo-image-cache/`;
      // const currentFiles = FileSystem.readDirectoryAsync(BASE_DIR);
      // console.log('files before clear cache: ', currentFiles);
      CacheManager.clearCache();

      // const filesAfterCacheClear = FileSystem.readDirectoryAsync(BASE_DIR);
      // console.log('files after clear cache: ', filesAfterCacheClear);


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

  // componentWillUnMount() {
  //     console.log('App component unmounted');
  // }

  render() {
      const middleware = createReactNavigationReduxMiddleware(
        'root',
        state => state.nav,
      );
      const addListener = createReduxBoundAddListener('root');

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
         <View style={{ flex: 1 }}>
            <MainNavigation
                addListener={addListener}
            />
         </View>
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);

// const styles = {
//   containerStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#d5e6f4'
//   }
// };

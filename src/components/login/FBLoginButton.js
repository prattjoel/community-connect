'use-strict';

import React, { Component } from 'react';
import firebase from 'firebase';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import {
    LoginButton,
    AccessToken
} from 'react-native-fbsdk';
import { NavigationActions } from 'react-navigation';
import User from '../../User';
import Spinner from '../common/Spinner';

export default class FBLoginButton extends Component {

    static navigationOptions = ({ navigation }) => {
        // debugger;
        const titleText = 'Logout';
        const updatedTitile = navigation.state.params ? navigation.state.params.title : titleText;

        const displayHomeButton = () => {
            // console.log('test showHomeButton');
            // return 'test';
            if (navigation.state.params) {
                if (navigation.state.params.showHomeButton) {
                    const button =
                    (
                        <Text
                            onPress={() => {
                                navigation.navigate('Home');
                            }
                        }
                        >
                            Home
                        </Text>
                    );
                    return button;
                }
            }
        };

        return ({
            title: updatedTitile,
            headerRight: displayHomeButton()
        });
    }

    componentWillMount() {
        // this.props.navigation.setParams({ title: 'FB' });

        this._isLoggedin();
        if (this.props.isSignedIn) {
            this.props.navigation.setParams({ title: 'Logout', showHomeButton: true });
        } else {
            this.props.navigation.setParams({ title: 'Login', showHomeButton: false });
        }
    }


    // Login user to firebase using acces token from Facebook login
    _firebaseLogin = (token) => {
        this.props.updateLoading(true);
        console.log('loading status firbaseLogin:');
        console.log(this.props.isLoading);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential)
        .then((result) => {
            // console.log('result is: ');
            // console.log(result);
            const { displayName, uid } = result;
            // console.log('name and id are: ');
            // console.log(displayName);
            // console.log(uid);
            this._createUser(displayName, uid, token);
            // console.log(user);
            // console.log(`User token is: ${token}`);
            this.props.updateLoading(false);
            console.log('loading status after firbaseLogin:');
            console.log(this.props.isLoading);
        })
        .catch((error) => {
            console.log('error is: ');
            console.log(error);
        });
    };

    // Logout user from Firebase
    _firebaseLogout = () => {
        this.props.navigation.setParams({ title: 'Login', showHomeButton: false });
        // console.log(this.props.navigation);
        this.props.updateLoading(true);

        firebase.auth().signOut().then(
            () => {
                console.log('user Signed Out of firebase');
                this.props.updateSignIn(false);
                // console.log('user sign in status after firebase logout');
                // console.log(this.props.isSignedIn);
                this.props.updateLoading(false);
            }).catch(
                (error) => {
                    console.log('firebase sign out error');
                    console.log(error);
                    this.props.updateLoading(false);
                });
            };

            //Finish login to Facebook and obtain acces token for firebase login
            _fbLoginComplete = (error, result) => {
                // console.log('login finished called');
                if (error) {
                    console.log(`Login failed with error: ${result.error}`);
                } else if (result.isCancelled) {
                    console.log('Login was cancelled');
                } else {
                    // console.log(`Login was successful with permissions: ${result.grantedPermissions}`);
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            const token = data.accessToken.toString();
                            const user = this._firebaseLogin(token);
                        }
                    );
                }
            };

            // Create user instance from FB graph API request and Firebase auth
            _createUser = (name, userID, token) => {
                const graphUrl = `https://graph.facebook.com/v2.11/me?fields=id,name,email&access_token=${token}`;
                // console.log(graphUrl);
                fetch(graphUrl)
                .then(
                    (response) => {
                        // console.log('response from graph request is:');
                        // console.log(response);
                        response.json()
                        .then(
                            (json) => {
                                // console.log('json is:');
                                // console.log(json);
                                const currentUser = new User(name, json.email, userID);
                                // console.log('currentUser is:');
                                // console.log(currentUser);
                                this._addUserToDatabase(currentUser);
                            }
                        );
                    })
                    .catch(
                        (error) => {
                            console.log('error with graph request: ');
                            console.log(error);
                        }
                    );
                };

                //Add the user to firebase database
                _addUserToDatabase = (currentUser) => {
                    const { userID, email, name } = currentUser;
                    const database = firebase.database();
                    database.ref(`users/${userID}`).update({
                        name,
                        email
                    });
                };

                goToHomeScreen = () => {
                    const goHome = NavigationActions.navigate({
                        routeName: 'Home'
                    });
                    // debugger;
                    this.props.navigation.dispatch(goHome);
                };

                // Add listener to see if the user is signed in to Firebase
                _isLoggedin = () => {
                    // debugger;
                    this.props.updateLoading(true);
                    // console.log('isSignedIn in _isLoggedin');
                    // console.log(this.props.isSignedIn);
                    if (!this.props.isSignedIn) {
                        firebase.auth().onAuthStateChanged((user) => {
                            if (user) {
                                this.props.navigation.setParams({ title: 'Logout' });
                                // console.log('signed in user:');
                                const userID = user.uid;
                                const databaseRef = firebase.database().ref(`users/${user.uid}`);
                                // console.log('databaseRef:');
                                // console.log(databaseRef);
                                databaseRef.once('value')
                                .then((snapshot) => {
                                    // console.log('snapshot:');
                                    // console.log(snapshot);
                                    const name = snapshot.child('name').val();
                                    const email = snapshot.child('email').val();
                                    const currentUser = new User(name, email, userID);
                                    // debugger;
                                    this.props.updateSignIn(true);
                                    // console.log('isSignedIn after logged in');
                                    // console.log(this.props.isSignedIn);
                                    // debugger;
                                    // this.props.navigation.navigate('Home');
                                    this.props.updateLoading(false);
                                    this.goToHomeScreen();
                                    // console.log(currentUser);
                                })
                                .catch((error) => {
                                    this.props.updateLoading(false);
                                    console.log('error checking for user signed in status:');
                                    console.log(error);
                                });
                            } else {
                                console.log('user not signed in');
                                // this.props.navigation.setParams({ title: 'Login' });
                                this.props.updateLoading(false);
                            }
                        });
                    } else {
                        this.props.updateLoading(false);
                    }
                };

                render() {
                    return (
                        <View style={styles.containerStyle}>
                            {
                                !this.props.isLoading &&
                                <LoginButton
                                readPermissions={['public_profile']}
                                onLoginFinished={this._fbLoginComplete.bind(this)}
                                onLogoutFinished={this._firebaseLogout.bind(this)}
                                />
                            }
                            {
                                this.props.isLoading &&
                                <Spinner />
                            }
                        </View>
                    );
                }
            }

            const styles = StyleSheet.create({
                containerStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#192D59',
                },
            });

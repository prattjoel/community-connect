'use-strict';

import React, { Component } from 'react';
import firebase from 'firebase';
import Expo from 'expo';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { NavigationActions } from 'react-navigation';
import User from '../../User';
import Spinner from '../common/Spinner';

export default class FBLoginButton extends Component {

    // Control header title and home button for navigation.
    static navigationOptions = ({ navigation }) => {
        const titleText = 'Logout';
        const updatedTitile = navigation.state.params ? navigation.state.params.title : titleText;
        const button =
        (
            <Ionicons
                name='ios-home'
                size={30}
                style={{ marginRight: 10 }}
                // color='#FFCB76'
                onPress={() => {
                    navigation.navigate('Home');
                }
            }
            />
    );

    // Show Home button to take user back to home screen.
        const displayHomeButton = () => {
            if (navigation.state.params) {
                if (navigation.state.params.showHomeButton) {
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
    _firebaseLogin = (token, email, profilePicUrl) => {
        this.props.updateLoading(true);
        console.log('loading status firbaseLogin:');
        console.log(this.props.isLoading);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential)
        .then((result) => {
            // debugger;
            const { displayName, uid } = result;
            this._createUser(displayName, uid, email, profilePicUrl);
            this.props.updateLoading(false);
            console.log('loading status after firbaseLogin:');
            console.log(this.props.isLoading);
        })
        .catch((error) => {
            console.log('error signing in to Firebase: ');
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

    // Sign user in or out depending on if the user is already signed in or not.
    _manageLogin = () => {
        if (this.props.isSignedIn) {
            this._firebaseLogout();
        } else {
            this._loginToFacebook();
        }
    }

    // Log user in to Facebook using Expo's Facebook login.
    _loginToFacebook = async () => {
        const fbID = '421198768323165';
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(fbID, {
            permissions: ['public_profile', 'email'],
        });

        if (type === 'success') {
            const response = await fetch(
                `https://graph.facebook.com/v2.11/me?fields=id,name,email,picture&access_token=${token}`
            );
            // console.log('response', response);
            const jsonResp = await response.json();
            console.log('USER INFO', jsonResp);
            const email = jsonResp.email;
            // const profilePicUrl = jsonResp.picture.data.url;
            const profilePicUrl = `https://graph.facebook.com/v2.11/${jsonResp.id}/picture`;
            console.log('profile url: ', profilePicUrl);
            this._firebaseLogin(token, email, profilePicUrl);
        } else {
            console.log('Type from FB login attempt is: ', type);
        }
    }

    // Add user to state in Redux
    _createUser = (name, userID, email, profilePicUrl) => {
        const currentUser = new User(name, email, userID, profilePicUrl);
        console.log('currentUser is:', currentUser);
        this._addUserToDatabase(currentUser);
    }

    //Add the user to firebase database
    _addUserToDatabase = (currentUser) => {
        const { userID, email, name, profilePicUrl } = currentUser;
        const database = firebase.database();
        database.ref(`users/${userID}`).update({
            name,
            email,
            profilePicUrl
        });
    };

    // Navigate to Home Screen
    goToHomeScreen = () => {
        const goHome = NavigationActions.navigate({
            routeName: 'Home'
        });
        // debugger;
        this.props.navigation.dispatch(goHome);
    };

    // Add listener to see if the user is signed in to Firebase
    _isLoggedin = () => {
        this.props.updateLoading(true);
        if (!this.props.isSignedIn) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.props.navigation.setParams({ title: 'Logout' });
                    // const userID = user.uid;
                    const databaseRef = firebase.database().ref(`users/${user.uid}`);
                    this._checkFirebaseSignInStatus(databaseRef);
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

    // Use databse refernece to check if user is signed in to Firbase.
    _checkFirebaseSignInStatus = (ref) => {
        ref.once('value')
        .then(() => {
            this.props.updateSignIn(true);
            this.props.updateLoading(false);
            this.goToHomeScreen();
        })
        .catch((error) => {
            this.props.updateLoading(false);
            console.log('error checking for user signed in status:');
            console.log(error);
        });
    }

    // Render text for Login Button for Facebook login
    _showLoginText = () => {
        const loginText = 'Login to Facebook';
        const logoutText = 'Logout';

        return (this.props.isSignedIn ? logoutText : loginText);
    }

        // Render Login button for Facebook login
        _renderLoginButton = () => {
            return (
                <TouchableHighlight
                    onPress={this._manageLogin.bind(this)}
                    >
                        <View style={styles.buttonContainer}>
                            <Text style={styles.textStyle}>
                                {this._showLoginText()}
                            </Text>
                        </View>
                    </TouchableHighlight>
                );
            }

            render() {
                return (
                    <View style={styles.containerStyle}>
                        {
                            !this.props.isLoading &&

                            this._renderLoginButton()
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
                backgroundColor: 'white'
                // backgroundColor: '#FFCB76',
            },
            buttonContainer: {
                borderRadius: 100,
                padding: 24,
                backgroundColor: '#3b5998',
            },
            textStyle: {
                color: 'white',
                fontWeight: 'bold'
            },
        });

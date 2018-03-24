'use strict';

import React from 'react';
import { Keyboard } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Login from '../containers/Login';
import Home from '../components/Home';
import ChatRooms from '../containers/ChatRooms';
import GivingPage from '../components/Giving';
import ContactForm from '../components/ContactForm';
import Announcements from '../components/Announcements';
import SettingsMenu from '../components/Settings';

// import MenuImage from './assets/menu_burger.png';
// import ChatMenuButton from './components/ChatMenuButton';
// import Messages from './components/Messages';

const HomeNav = TabNavigator(
    {
        ChatroomChooser: {
            screen: ChatRooms,
            // navigationOptions: {
            //   headerTitle: 'Messages'
            // },
        },
        GivingPage: {
            screen: GivingPage
        },
        ContactForm: {
            screen: ContactForm
        },
        Announcements: {
            screen: Announcements
        }
    },
);

const MessagesNav = StackNavigator(

    {
        HomeTabs: {
            screen: HomeNav,
            // navigationOptions: {
            //   headerTitle: 'Messages Home'
            // },
        },
        Messages: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'Current Messages',
                headerLeft:
                // renderBackButton(navigation);
                <Ionicons
                    name='ios-arrow-back'
                    size={45}
                    style={{ marginLeft: 10 }}
                    color='#FFCB76'
                    onPress={() => {
                            Keyboard.dismiss();
                            navigation.goBack();
                        }
                    }
                />
        }),
    },
},
{
    // initialRouteName: 'MessageHome',
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
        title: 'Home Page',
        headerRight:
        <Ionicons
            name='ios-menu'
            size={30}
            style={{ marginRight: 10 }}
            color='#FFCB76'
            onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('DrawerToggle');
            }
        }
        />
    })
},
);

const LoginStack = StackNavigator(
    {
        // TODO: only allow navigation to home page if authenticated
        LoginScreen: {
            screen: Login,
            //   navigationOptions: ({ navigation }) => ({
            //     // title: 'FB Login' || `${navigation.state.params.title}`,
            //     title: 'FB',
            //     headerRight:
            //       <Text
            //         onPress={() => {
            //           navigation.navigate('Home');
            //         }
            //         }
            //       >
            //         Home
            //       </Text>
            //   })
        },
    },
    // {
    //   navigationOptions: {
    //     title: 'FB stack'
    //   }
    // }
);

const MenuDrawer = DrawerNavigator(
    {
        MessageHome: {
            screen: MessagesNav
        },
        SettingsMenu: {
            screen: SettingsMenu
        },
        Logout: {
            screen: LoginStack,
        },
    },
    {
        drawerPosition: 'right'
    }
);

const DrawerNav = StackNavigator(
    {
        MenuDrawer: {
            screen: MenuDrawer
        },
    },
    {
        headerMode: 'none'
    }
    // {
    //   // initialRouteName: 'MessageHome',
    //   headerMode: 'float',
    //   navigationOptions: ({ navigation }) => ({
    //     // headerStyle: { backgroundColor: '#4C3E54' },
    //     title: 'Home',
    //     // headerTintColor: 'white',
    //     headerLeft:
    //       <Text
    //         onPress={() => {
    //           navigation.navigate('DrawerToggle');
    //         }
    //         }
    //       >
    //         Menu
    //       </Text>
    //   })
    // }
);

const MainNav = StackNavigator(
    {
        LoginNav: {
            screen: LoginStack,
        },
        Home: {
            screen: DrawerNav,
        },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false
        }
    },
);

export default MainNav;

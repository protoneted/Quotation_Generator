import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import SlpashScreen from "../screens/splashScreen";
import AuthenticationOptionScreen from "../screens/authOptions";
import SignInScreen from "../screens/signInScreen";
import SignUpScreen from "../screens/signUpScreen";
import HomeScreen from "../screens/HomeScreen";
import RequestScreen from "../screens/RequestScreen";
import { Image, View } from "react-native";
import Images from "../assets/Images";
import BillList from "../screens/BillListScreen";
import Quotation from "../screens/QuotationForm";
import BillForm from "../screens/BillForm";
import Pddf from "../screens/QuotationForm";
import FileList from "../screens/RequestScreen";
const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function InitialRoutes() {

    return (
        <>

            <stack.Navigator>
                <stack.Screen name='Splash' component={SlpashScreen} options={{ headerShown: false }} />
                <stack.Screen name='AuthOptions' component={AuthenticationOptionScreen} options={{ headerShown: false }} />
                <stack.Screen name='SignIn' component={SignInScreen} options={{ headerShown: false }} />
                <stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }} />
                <stack.Screen name='MainStack' component={BottomNavigations} options={{ headerShown: false }} />
            </stack.Navigator>
        </>
    );
}

export const BottomNavigations = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = Images.tabHomeIcon
                    } else if (route.name === 'Quotations') {
                        iconName = Images.tabRequestIcon
                    } else if (route.name === 'Bills') {
                        iconName = Images.tabProfileIcon
                    }

                    // You can return any component that you like here!
                    return <Image source={iconName} style={{ width: 25, height: 25, tintColor: focused ? 'brown' : 'gray' }} />;
                },
                tabBarActiveTintColor: 'brown',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: "#fff" },
                // You can return any component that you like here!
                tabBarBackground: (() => {
                    return (
                        <></>
                        // <View style={{flex:1, backgroundColor:"black"}}></View>
                    )
                }),
            })}>
            <Tab.Screen name="Home" component={HomeScreenStack} />
            <Tab.Screen name="Quotations" component={FileList}/>
            <Tab.Screen name="Bills" component={BillListStack} />
        </Tab.Navigator>
    )
}

export const BillListStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name='BillList' component={BillList} options={{ headerShown: false }} />
        </stack.Navigator>
    )
}

export const HomeScreenStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
            <stack.Screen name='Quotation' component={Pddf} options={{ headerShown: false }} />
            <stack.Screen name='Bill' component={BillForm} options={{ headerShown: false }} />
        </stack.Navigator>
    )
}
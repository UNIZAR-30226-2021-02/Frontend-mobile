import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import createMaterialTopTabNavigator from "react-navigation-tabs";

import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShopScreen from "./screens/ShopScreen";

import TabBar from "./config/TabBar";
export default () => <AppNavigator />;
/*
const Home = createMaterialTopTabNavigator(
  {
    Home: {
      screen: () => HomeScreen,
    },
    profile: {
      screen: () => ProfileScreen,
    },
    Shop: {
      screen: () => ShopScreen,
    },
  },
  {
    tabBarComponent: TabBar,
  }
);*/

const appSwitchNavigator = createSwitchNavigator({
  Home: HomeScreen,
  LoginScreen: LoginScreen,
  LoadingScreen: LoadingScreen,
  RegisterScreen: RegisterScreen,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

import React from "react";
import { StyleSheet, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShopScreen from "./screens/ShopScreen";

import LeftTabs from "./components/LeftTabs";
import TabBar from "./components/TabBar";
export default () => <AppNavigator />;

const appSwitchNavigator = createSwitchNavigator({
  Home: TabBar,
  LoginScreen: LoginScreen,
  LoadingScreen: LoadingScreen,
  RegisterScreen: RegisterScreen,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

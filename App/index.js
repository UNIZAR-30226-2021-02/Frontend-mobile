import React from "react";
import { StyleSheet, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FriendsScreen from "./screens/FriendsScreen";
import GameScreen from "./screens/GameScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShopScreen from "./screens/ShopScreen";

import LeftTabs from "./components/LeftTabs";
import TabBar from "./components/TabBar";
export default () => <AppNavigator />;

const appSwitchNavigator = createSwitchNavigator({
  Home: TabBar,
  LoginScreen: LoginScreen,
  //aki debe ir loading
  RegisterScreen: RegisterScreen,
  FriendsScreen: FriendsScreen,
  GameScreen: GameScreen,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

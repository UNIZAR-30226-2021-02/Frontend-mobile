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
import LobbyScreen from "./screens/LobbyScreen";
import TurnScreen from "./screens/TurnScreen";

import LeftTabs from "./components/LeftTabs";
import TabBar from "./components/TabBar";
import LoadingScreen from "./screens/LoadingScreen";
export default () => <AppNavigator />;

const appSwitchNavigator = createSwitchNavigator({
 
  LoadingScreen:LoadingScreen,
  LoginScreen: LoginScreen,
  Home: TabBar,
  RegisterScreen: RegisterScreen,
  
  Lobby: LobbyScreen,
  Turn: TurnScreen,
  GameScreen: GameScreen,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

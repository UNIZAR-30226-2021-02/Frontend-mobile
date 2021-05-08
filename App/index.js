import React from "react";
import { StyleSheet, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "./screens/LoginScreen";

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
import hilosScreen from "./screens/HilosScreen";
export default () => <AppNavigator />;

const appSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  Home: TabBar,
  RegisterScreen: RegisterScreen,
  Profile: ProfileScreen,
  Lobby: LobbyScreen,
  Turn: TurnScreen,
  GameScreen: GameScreen,
  Hilos: hilosScreen,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

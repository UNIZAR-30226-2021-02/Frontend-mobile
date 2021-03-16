import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { ScrollView as GHScrollView } from "react-native-gesture-handler";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import GameScreen from "./screens/GameScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShopScreen from "./screens/ShopScreen";

export default () => <AppNavigator />;

const appSwitchNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  LoadingScreen: LoadingScreen,
  HomeScreen: HomeScreen,
  RegisterScreen: RegisterScreen,
  GameScreen: GameScreen,
  ProfileScreen: ProfileScreen,
  ShopScreen: ShopScreen,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

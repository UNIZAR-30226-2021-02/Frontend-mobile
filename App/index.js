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
import FriendsScreen from "./screens/FriendsScreen";
import { Menu } from "./components/Menu";

export default () => <AppNavigator />;

const appSwitchNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  LoginScreen: LoginScreen,
  LoadingScreen: LoadingScreen,
  RegisterScreen: RegisterScreen,
  GameScreen: GameScreen,
  ProfileScreen: ProfileScreen,
  ShopScreen: ShopScreen,
  FriendsScreen: FriendsScreen,
  Menu: Menu,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

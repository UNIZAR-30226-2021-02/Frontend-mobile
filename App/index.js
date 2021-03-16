import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { ScrollView as GHScrollView } from "react-native-gesture-handler";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";

export default () => <LoginScreen />;

const appSwitchNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  LoadingScreen: LoadingScreen,
  HomeScreen: HomeScreen,
  RegisterScreen: RegisterScreen,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

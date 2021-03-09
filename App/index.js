import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { ScrollView as GHScrollView } from "react-native-gesture-handler";
import LoginScreen from "./screens/Login";
import LoadingScreen from "./screens/Loading";
import HomeScreen from "./screens/Home";

export default () => <AppNavigator />;

const appSwitchNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  LoadingScreen: LoadingScreen,
  HomeScreen: HomeScreen,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

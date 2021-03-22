import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";

export default () => <AppNavigator />;

const appSwitchNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  HomeScreen: HomeScreen,
  RegisterScreen: RegisterScreen,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

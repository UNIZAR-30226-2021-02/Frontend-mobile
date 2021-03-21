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
export default () => <AppNavigator />;

const AppContent = createSwitchNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Shop: {
      screen: ShopScreen,
    },
  },
  {
    //Set to true if you want to destroy state on tab changes.
    resetOnBlur: false,
  }
);

class TabBar extends React.PureComponent {
  static router = AppContent.router;
  constructor() {
    super();
    this.state = {
      selectedTab: "Home",
    };
  }
  onTabPressed = (routeName) => {
    this.props.navigation.navigate({ routeName });
  };
  handleNavChange = ({ action }) => {
    // Handles when navigation is triggered from within a tabs content:
    if (action.type === NavigationActions.NAVIGATE) {
      this.setState({
        selectedTab: action.routeName,
      });
    }
  };
  render() {
    const { navigation } = this.props;
    const tabs = [
      {
        tabName: "Home",
        tabIcon: "home",
      },
      {
        tabName: "Profile",
        tabIcon: "user",
      },
      {
        tabName: "Shop",
        tabIcon: "shoppingcart",
      },
    ];
    return (
      <View style={styles.box}>
        <LeftTabs
          width={"10%"}
          tabs={tabs}
          onTabPressed={this.onTabPressed}
          selectedTab={this.state.selectedTab}
        />
        <View style={styles.content}>
          <AppContent
            navigation={navigation}
            screenProps={{ onDidFocus: this.handleNavChange }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
});

const appSwitchNavigator = createSwitchNavigator({
  Home: createAppContainer(TabBar),
  LoginScreen: LoginScreen,
  LoadingScreen: LoadingScreen,
  RegisterScreen: RegisterScreen,
});

const AppNavigator = createAppContainer(appSwitchNavigator);

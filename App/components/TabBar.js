import React from "react";
import { StyleSheet, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";

import ProfileScreen from "../screens/ProfileScreen";
import ShopScreen from "../screens/ShopScreen";

import LeftTabs from "./LeftTabs";

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
    this.setState({
      selectedTab: routeName,
    });
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

export default createAppContainer(TabBar);

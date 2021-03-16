import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";

import Colors from "../constants/colors";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    if (CheckLogged()) {
      this.props.navigation.navigate("HomeScreen");
    } else {
      this.props.navigation.navigate("LoginScreen");
    }
  }; /*
      }.bind(this)
    );
  };*/
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    flex: 1,
  },
});

export default LoadingScreen;

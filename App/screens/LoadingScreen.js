import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../constants/colors";
import { setClientToken, setClientName } from "../util/APIKit";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  CheckLogged(){
    AsyncStorage.getItem("@token", (err, token) => {
      if(token!==""){
        return true
      }else{
        return false
      }
    });
  }

  setCredentials(){
    AsyncStorage.getItem("@token", (err, token) => {
      setClientToken(token);
    });

    AsyncStorage.getItem("@mail", (err, mail) => {
      setClientMail(mail);
    });
    
  }

  checkIfLoggedIn = () => {
    if (this.CheckLogged()) {
      
      this.props.navigation.navigate("Game");
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

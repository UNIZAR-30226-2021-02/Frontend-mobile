import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";

import { Login } from "../util/Login";
import Colors from "../constants/colors";
const screen = Dimensions.get("window");

export default ({ navigation }) => {
  const [username, setTextU] = useState("");
  const [password, setTextP] = useState("");
  return (
    <SafeAreaView style={styles.backgrdContainer}>
      <ScrollView style={{ flex: 1, alignContent: "center" }}>
        <StatusBar
          backgroundColor={Colors.background}
          barstyle="dark-content"
        />
        <View style={styles.container}>
          <Text style={styles.textH1}>Username</Text>
          <TextInput
            style={styles.textView}
            placeholder="Username"
            onChangeText={(username) => setTextU(username)}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.textH1}>Password</Text>
          <TextInput
            style={styles.textView}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setTextP(password)}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log(username);
              console.log(password);
              navigation.navigate("HomeScreen");
              if (Login("admin", "1234")) {
                navigation.navigate("HomeScreen");
              }
            }}
          >
            <Text style={styles.textButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={styles.textButton}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgrdContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.background,
    flex: 1,
  },
  container: {
    width: screen.width * 0.75,
    height: screen.height * 0.15,
  },
  button: {
    position: "absolute",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    top: 10,
    backgroundColor: Colors.white,
    height: 40,
    width: 200,
  },
  textH1: {
    top: 10,
    color: Colors.white,
    fontSize: 20,
    paddingVertical: 16,
  },
  textH2: {
    top: -130,
    color: Colors.tranparentwhite,
    fontSize: 14,
    paddingVertical: 16,
  },
  textView: {
    color: Colors.grey,
    backgroundColor: Colors.white,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

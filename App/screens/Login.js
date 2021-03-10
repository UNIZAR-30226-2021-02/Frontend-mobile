import React, { Component } from "react";
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
} from "react-native";

import FieldInput from "../components/FieldInput";
import Colors from "../constants/colors";
const screen = Dimensions.get("window");

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.backgrdContainer}>
      <StatusBar backgroundColor={Colors.background} barstyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.textH1}>Username</Text>
        <TextInput style={styles.textView}>Username</TextInput>
      </View>
      <View style={styles.container}>
        <Text style={styles.textH1}>Password</Text>
        <TextInput style={styles.textView}>Password</TextInput>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      >
        <Text style={styles.textButton}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("RegisterScreen");
        }}
      >
        <Text style={styles.textButton}>Register</Text>
      </TouchableOpacity>
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
  },
  image: {
    top: -50,
    //justifyContent: "center",
    //position: "absolute",
    width: screen.width * 0.65,
    height: screen.height * 0.65,
  },
  button: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    top: -60,
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

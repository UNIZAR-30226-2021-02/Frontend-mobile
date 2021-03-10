import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";

import HomeScreen from "./Home";
import Colors from "../constants/colors";
const screen = Dimensions.get("window");

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.backgrdContainer}>
      <TextInput style={styles.input}>Usuario</TextInput>
      <TextInput secureTextEntry={true}>Contraseña</TextInput>
      <TextInput secureTextEntry={true}>Contraseña</TextInput>
      <TextInput>Mail</TextInput>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Go to login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgrdContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "yellow",
    flex: 1,
  },
  input: {},
  button: {},
  text: {},
});

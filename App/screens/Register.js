import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
  useState,
} from "react-native";

const screen = Dimensions.get("window");
const state = { text: "Ususario" };
export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.backgrdContainer}>
      <TextInput
        style={styles.input}
        onFocus={() => {
          console.log("UWU");
          state.text = "";
        }}
      >
        {state.text}
      </TextInput>
      <TextInput secureTextEntry={true}>Contraseña</TextInput>
      <TextInput secureTextEntry={true}>Contraseña</TextInput>
      <TextInput>Mail</TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
      >
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

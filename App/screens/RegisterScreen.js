import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
  useState,
  ScrollView,
} from "react-native";

const screen = Dimensions.get("window");
const state = { text: "Ususario" };
export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.backgrdContainer}>
      <ScrollView style={{ flex: 1, alignContent: "center" }}>
        <TextInput placeholder="Mail" />
        <TextInput placeholder="Username" />
        <TextInput secureTextEntry={true} placeholder="Password" />
        <TextInput secureTextEntry={true} placeholder="Repeat Password" />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <Text style={styles.text}>Go to login</Text>
        </TouchableOpacity>
      </ScrollView>
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

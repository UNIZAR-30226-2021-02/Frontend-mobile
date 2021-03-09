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
} from "react-native";

import HomeScreen from "./Home";
import Colors from "../constants/colors";
const screen = Dimensions.get("window");

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.backgrdContainer}>
      <StatusBar backgroundColor={Colors.background} barstyle="dark-content" />
      <Image
        source={require("../assets/images/loging_img.png")}
        //source={require("../assets/images/16139197173879735.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.textH1}>Chatea y colabora</Text>
      <View style={styles.container}>
        <Text style={styles.textH2}>
          Une tus conversaciones, amigos y archivos, todo en una única red
          social. Una nueva forma de mejorar tu productividad y organización
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      >
        <Text style={styles.textButton}>Sign in</Text>
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
    top: -130,
    fontWeight: "bold",
    color: Colors.white,
    fontSize: 32,
    paddingVertical: 16,
  },
  textH2: {
    top: -130,
    color: Colors.tranparentwhite,
    fontSize: 14,
    paddingVertical: 16,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
